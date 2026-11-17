/* Rendered-content bindings, page rendering, and explorer population. */
function contentTreeFileEntry(page) {
    const extension = page.label.split(".").pop().toLowerCase();
    const typeLabel = extension.toUpperCase();
    const routeId = page.routeId ? ` data-route-id="${esc(page.routeId)}"` : "";
    const projectId = page.type === "project" ? ` data-project="${esc(page.id)}"` : "";
    const resumeClass = page.kind === "PDF" ? " resume-tree-file" : "";
    const title = page.title ? ` title="${esc(page.title)}"` : "";
    const ariaLabel = page.ariaLabel || page.label;

    return joinHtml(
        `<a class="tree-file${resumeClass}" href="${esc(page.route)}" `,
        `data-route="${esc(page.routePage)}"${routeId}${projectId}${title} `,
        `aria-label="${esc(ariaLabel)}"><span class="file-type ${esc(extension)}">`,
        `${esc(typeLabel)}</span><span class="tree-label">${esc(page.label)}</span></a>`,
    );
}

function renderContentFolderContents(folderPath = "", depth = 0) {
    const prefix = folderPath ? `${folderPath}/` : "";
    const descendants = CONTENT_PAGES.filter((page) => page.path.startsWith(prefix));
    const files = descendants.filter((page) => page.path.slice(prefix.length).indexOf("/") === -1);
    const folderNames = [
        ...new Set(
            descendants.flatMap((page) => {
                const remainder = page.path.slice(prefix.length);
                const slash = remainder.indexOf("/");
                return slash === -1 ? [] : [remainder.slice(0, slash)];
            }),
        ),
    ];
    const entries = [
        ...files.map((page) => ({
            order: page.treeOrder,
            type: "file",
            render: () => contentTreeFileEntry(page),
        })),
        ...folderNames.map((name) => {
            const path = folderPath ? `${folderPath}/${name}` : name;
            const nestedPages = descendants.filter((page) => page.path.startsWith(`${path}/`));
            const explicitOrder = nestedPages
                .map((page) => page.folderOrder)
                .filter(Number.isFinite);
            const order = Math.min(
                ...(explicitOrder.length
                    ? explicitOrder
                    : nestedPages.map((page) => page.treeOrder)),
            );
            return {
                order,
                type: "folder",
                render: () => renderContentFolderEntry(path, name, depth),
            };
        }),
    ];

    return entries
        .sort((a, b) => a.order - b.order || a.type.localeCompare(b.type))
        .map((entry) => entry.render())
        .join("");
}

function renderContentFolderEntry(folderPath, name, depth) {
    const folderPage = CONTENT_PAGES.find(
        (page) =>
            page.path.slice(0, page.path.lastIndexOf("/")) === folderPath &&
            page.folderPresentation,
    );
    const presentation = folderPage?.folderPresentation || {};
    const separator = presentation.separator
        ? `<div class="tree-folder-separator" aria-hidden="true"></div>`
        : "";
    const folderClass = [
        "tree-folder",
        ...(depth > 0 ? ["nested"] : []),
        ...(presentation.className ? [presentation.className] : []),
    ].join(" ");
    const contentsClass = [
        "tree-children",
        ...(presentation.contentsClassName ? [presentation.contentsClassName] : []),
    ].join(" ");

    return joinHtml(
        separator,
        `<button class="${folderClass}" type="button" data-folder="${esc(folderPath)}">`,
        `<span class="tree-chevron">⌄</span><span class="folder-icon">▰</span> `,
        `${esc(name)}</button><div class="${contentsClass}" data-folder-content="${esc(folderPath)}">`,
        renderContentFolderContents(folderPath, depth + 1),
        `</div>`,
    );
}

function renderContentTree() {
    $("#file-tree").innerHTML = renderContentFolderContents();
}

function bindRenderedContent(root) {
    root.querySelectorAll(".screenshot-slot img").forEach((img) => {
        const reportLoadFailure = () => {
            if (!img.parentElement) return;
            console.error("[portfolio] Failed to load screenshot:", img.src, `(${img.alt})`);
            img.remove();
        };
        img.addEventListener(
            "load",
            () => img.closest(".screenshot-slot")?.classList.add("has-image"),
            {
                once: true,
            },
        );
        img.addEventListener("error", reportLoadFailure, {
            once: true,
        });
        if (img.complete) {
            if (img.naturalWidth > 0)
                img.closest(".screenshot-slot")?.classList.add("has-image");
            else reportLoadFailure();
        }
    });
    root.querySelectorAll(".video-load").forEach((button) =>
        button.addEventListener("click", () => {
            const figure = button.closest(".video-figure");
            const frame = document.createElement("iframe");
            frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(figure.dataset.videoId)}?rel=0`;
            frame.title =
                figure.querySelector(".video-caption span")?.textContent || "Project demonstration";
            frame.loading = "lazy";
            frame.referrerPolicy = "strict-origin-when-cross-origin";
            frame.allow =
                "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";
            frame.allowFullscreen = true;
            figure.querySelector(".video").replaceChildren(frame);
        }),
    );
}
function renderEditor() {
    renderChrome();
    const key = currentKey();
    const primary = $("#app"),
        secondary = $("#secondary-pane"),
        splitApp = $("#split-app"),
        panes = $("#editor-panes");
    if (splitState) {
        // Keep both buffers mounted; the URL and statusline follow the active pane.
        primary.innerHTML = renderPageForKey(splitState.leftKey);
        splitApp.innerHTML = renderPageForKey(splitState.rightKey);
        secondary.hidden = false;
        panes.dataset.orientation = splitState.orientation;
        $("#primary-pane").classList.toggle("active-pane", splitState.active === "left");
        secondary.classList.toggle("active-pane", splitState.active === "right");
        updatePaneTitles();
        bindRenderedContent(primary);
        bindRenderedContent(splitApp);
    } else {
        secondary.hidden = true;
        delete panes.dataset.orientation;
        $("#primary-pane").classList.remove("active-pane");
        $("#primary-pane-title").hidden = true;
        primary.innerHTML = renderPageForKey(key);
        bindRenderedContent(primary);
    }
    if (key === "style") loadDotfiles();
    if (key === "vim:play") initVimTutorial(current().query);
    // Blog TOC destinations live inside the hash-router URL. Render first, then
    // scroll the active editor pane to the requested section without navigating
    // away from the current post or losing the section on refresh/back/forward.
    const sectionId = current().query.get("section");
    if (/^blog-section-\d+$/.test(sectionId || "")) {
        requestAnimationFrame(() => {
            const activeRoot = splitState?.active === "right" ? splitApp : primary;
            activeRoot.querySelector(`#${sectionId}`)?.scrollIntoView({
                behavior: "auto",
                block: "start",
            });
        });
    }
}
