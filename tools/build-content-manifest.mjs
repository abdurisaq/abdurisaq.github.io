#!/usr/bin/env node

// Discover content modules, validate their small @content headers, and generate
// the static manifest/script order used by the browser-only portfolio.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(projectRoot, "content");
const manifestPath = path.join(contentRoot, "manifest.js");
const indexPath = path.join(projectRoot, "index.html");
const checkOnly = process.argv.includes("--check");

async function listJavaScriptFiles(directory, prefix = "") {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const relative = path.posix.join(prefix, entry.name);
        const absolute = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...await listJavaScriptFiles(absolute, relative));
        } else if (entry.isFile() && entry.name.endsWith(".js") &&
            !["00-data-root.js", "manifest.js"].includes(entry.name)) {
            files.push(relative);
        }
    }

    return files;
}

function readHeader(source, file) {
    const match = source.match(/^\/\*\s*@content\s*\n([\s\S]*?)\n\*\//);
    if (!match) {
        throw new Error(`${file}: missing /* @content { ... } */ header`);
    }

    try {
        return JSON.parse(match[1]);
    } catch (error) {
        throw new Error(`${file}: invalid @content JSON: ${error.message}`);
    }
}

function routeParts(route) {
    const segments = route.replace(/^#/, "").split("?")[0].split("/").filter(Boolean);
    return {
        routePage: segments[0] || "home",
        routeId: segments[1] || null
    };
}

function createPage(file, header) {
    const source = file.replaceAll("\\", "/");
    const sourceDirectory = path.posix.dirname(source);
    const id = header.id || path.posix.basename(source, ".js");
    const pagePath = (header.pagePath || source.replace(/\.js$/, ".md")).replace(/^\//, "");
    const label = header.label || path.posix.basename(pagePath);
    const type = header.type || "page";
    let route = header.route;
    let collection = header.collection;

    if (type === "project") {
        collection ||= "projects";
        const routeBase = sourceDirectory.startsWith("projects/")
            ? sourceDirectory.slice("projects/".length)
            : "projects";
        route ||= `#/${routeBase}/${encodeURIComponent(id)}`;
    } else if (type === "blog") {
        collection ||= "blogPosts";
        route ||= `#/blog/${encodeURIComponent(id)}`;
    }

    if (!route) {
        throw new Error(`${file}: page route is required for type "${type}"`);
    }

    const { routePage, routeId } = routeParts(route);
    const treeGroup = header.treeGroup ||
        (sourceDirectory === "." ? "root" : sourceDirectory);
    const keyPrefix = header.keyPrefix || (
        type === "project"
            ? (collection === "smallerProjects" ? "smaller-project" : "project")
            : type === "blog" ? "blog" : type === "tutorial" ? "vim" : null
    );

    return {
        ...header,
        id,
        type,
        source,
        path: pagePath,
        label,
        route,
        routePage,
        routeId,
        keyPrefix,
        collection: collection || null,
        treeGroup,
        treeOrder: header.treeOrder ?? header.loadOrder,
        searchable: header.searchable !== false,
        searchOrder: header.searchOrder ?? null,
        searchPaths: header.searchPaths || [],
        searchTerms: header.searchTerms || []
    };
}

function validatePages(pages, files) {
    const loadOrders = new Set();
    const searchOrders = new Set();
    const paths = new Set();
    const routes = new Set();
    const contentIds = new Set();

    for (const page of pages) {
        if (!Number.isFinite(page.loadOrder)) {
            throw new Error(`${page.source}: loadOrder must be a number`);
        }
        if (loadOrders.has(page.loadOrder)) {
            throw new Error(`${page.source}: duplicate loadOrder ${page.loadOrder}`);
        }
        loadOrders.add(page.loadOrder);

        if (paths.has(page.path)) {
            throw new Error(`${page.source}: duplicate explorer path ${page.path}`);
        }
        paths.add(page.path);

        if (routes.has(page.route)) {
            throw new Error(`${page.source}: duplicate route ${page.route}`);
        }
        routes.add(page.route);

        if (page.searchable) {
            if (!Number.isFinite(page.searchOrder)) {
                throw new Error(`${page.source}: searchable pages need a numeric searchOrder`);
            }
            if (searchOrders.has(page.searchOrder)) {
                throw new Error(`${page.source}: duplicate searchOrder ${page.searchOrder}`);
            }
            searchOrders.add(page.searchOrder);
        }

        if (page.folderSearch) {
            const folderOrder = page.folderSearch.searchOrder;
            if (!Number.isFinite(folderOrder)) {
                throw new Error(`${page.source}: folderSearch needs a numeric searchOrder`);
            }
            if (searchOrders.has(folderOrder)) {
                throw new Error(`${page.source}: duplicate folder searchOrder ${folderOrder}`);
            }
            searchOrders.add(folderOrder);
            if (!page.folderSearch.route || !page.folderSearch.detail) {
                throw new Error(`${page.source}: folderSearch needs a route and detail`);
            }
        }

        if (["project", "blog"].includes(page.type)) {
            if (!page.collection) {
                throw new Error(`${page.source}: ${page.type} pages need a collection`);
            }
            const contentKey = `${page.type}:${page.id}`;
            if (contentIds.has(contentKey)) {
                throw new Error(`${page.source}: duplicate ${page.type} id ${page.id}`);
            }
            contentIds.add(contentKey);
        }
    }

    if (!files.includes("projects/index.js") || !files.includes("blog/index.js")) {
        throw new Error("The projects and blog collection page files are required.");
    }
}

const files = await listJavaScriptFiles(contentRoot);
const pages = [];

for (const file of files) {
    const source = await readFile(path.join(contentRoot, file), "utf8");
    const header = readHeader(source, file);
    pages.push(createPage(file, header));
}

validatePages(pages, files);
pages.sort((a, b) => a.loadOrder - b.loadOrder);

const manifestSource = [
    "/* Generated by tools/build-content-manifest.mjs. Edit @content headers, not this file. */",
    `CONTENT_PAGES.push(...${JSON.stringify(pages, null, 4)});`,
    ""
].join("\n");

const contentScripts = [
    "<script src=\"content/00-data-root.js\"></script>",
    "<script src=\"content/manifest.js\"></script>",
    ...pages.map(page => `<script src="content/${page.source}"></script>`)
].join("\n");

const startMarker = "<!-- BEGIN GENERATED CONTENT SCRIPTS -->";
const endMarker = "<!-- END GENERATED CONTENT SCRIPTS -->";
const indexSource = await readFile(indexPath, "utf8");
const start = indexSource.indexOf(startMarker);
const end = indexSource.indexOf(endMarker);

if (start < 0 || end < 0 || end < start) {
    throw new Error("index.html is missing the generated content-script markers.");
}

const nextIndex = indexSource.slice(0, start + startMarker.length) +
    "\n" + contentScripts + "\n" + indexSource.slice(end);

if (checkOnly) {
    const [currentManifest, currentIndex] = await Promise.all([
        readFile(manifestPath, "utf8").catch(() => ""),
        Promise.resolve(indexSource)
    ]);
    if (currentManifest !== manifestSource || currentIndex !== nextIndex) {
        console.error("Content manifest is stale. Run: node tools/build-content-manifest.mjs");
        process.exitCode = 1;
    } else {
        console.log(`Content manifest is current (${pages.length} page files).`);
    }
} else {
    await Promise.all([
        writeFile(manifestPath, manifestSource),
        writeFile(indexPath, nextIndex)
    ]);
    console.log(`Generated manifest and script order for ${pages.length} content files.`);
}
