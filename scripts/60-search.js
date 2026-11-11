/* Telescope-style file search and live text grep. Content metadata comes from the generated manifest. */
let searchMode = "files",
    searchMatches = [],
    searchReturnFocus = null;

function sectionSearchContent(sections, includeCode = false) {
    return (sections || []).flatMap((section) => [
        section.title,
        ...(section.paragraphs || []),
        ...(section.bullets || []),
        ...(includeCode ? [section.code || ""] : []),
    ]);
}

function projectSearchContent(project) {
    const deepDive = project.deepDive
        ? [project.deepDive.intro, ...sectionSearchContent(project.deepDive.sections)]
        : [];
    return [
        project.name,
        project.summary,
        project.about,
        ...(project.stack || []),
        ...(project.highlights || []),
        ...sectionSearchContent(project.sections),
        ...deepDive,
    ];
}

function blogSearchContent(post) {
    return [
        post.title,
        post.subtitle,
        post.intro,
        ...sectionSearchContent(post.sections, true),
        ...(post.workflow || []),
        ...(post.offsetNotes || []).flatMap((note) => [
            note.title,
            note.offset,
            note.base,
            note.detail,
            ...note.fields,
        ]),
        ...(post.resources || []).flatMap((resource) => [resource.title, resource.note]),
    ];
}

function contentPageData(page) {
    const collection = page.collection ? DATA[page.collection] : null;
    return Array.isArray(collection) ? collection.find((entry) => entry.id === page.id) : null;
}

function valuesAtPath(path) {
    const parts = path.replace(/\[\]/g, ".[]").split(".").filter(Boolean);
    function visit(value, index) {
        if (index === parts.length) return [value];
        if (parts[index] === "[]")
            return Array.isArray(value) ? value.flatMap((item) => visit(item, index + 1)) : [];
        return value == null ? [] : visit(value[parts[index]], index + 1);
    }
    return visit(DATA, 0);
}

function flattenSearchValues(value, includeObjectKeys = false) {
    if (typeof value === "string") return [value];
    if (Array.isArray(value))
        return value.flatMap((item) => flattenSearchValues(item, includeObjectKeys));
    if (value && typeof value === "object") {
        return Object.entries(value).flatMap(([key, item]) => [
            ...(includeObjectKeys ? [key] : []),
            ...flattenSearchValues(item, includeObjectKeys),
        ]);
    }
    return [];
}

const searchProfiles = {
    project: (page) => {
        const project = contentPageData(page);
        return project ? projectSearchContent(project) : [];
    },
    blog: (page) => {
        const post = contentPageData(page);
        return post ? blogSearchContent(post) : [];
    },
    "blog-index": () =>
        DATA.blogPosts
            .filter((post) => post.type !== "technical")
            .map((post) => `${post.title} ${post.subtitle}`)
            .join("\n")
            .split("\n"),
    community: () => {
        const mihon = DATA.community.mihon;
        return [
            mihon.name,
            mihon.summary,
            ...mihon.contributions.flatMap((item) => [item.title, item.status, item.detail]),
        ];
    },
    tutorial: () =>
        VIM_TUTORIAL_STAGES.flatMap((stage) => [
            stage.name,
            stage.goal,
            stage.explanation,
            ...stage.initial,
        ]),
    "project-folder": (page) => {
        const folderPath = page.path.slice(0, page.path.lastIndexOf("/"));
        return CONTENT_PAGES.filter(
            (item) => item.type === "project" && item.path.startsWith(`${folderPath}/`),
        ).flatMap((item) => projectSearchContent(contentPageData(item)));
    },
};

function pageSearchContent(page) {
    const profile = searchProfiles[page.searchProfile];
    if (profile) return profile(page);

    const selected = (page.searchPaths || []).flatMap(valuesAtPath);
    return [
        ...selected.flatMap((value) => flattenSearchValues(value, page.searchObjectKeys)),
        ...(page.searchTerms || []),
    ];
}
function pageSearchKind(page) {
    if (page.type === "project") return "PROJECT";
    if (page.type === "blog") return contentPageData(page)?.type === "technical" ? "NOTES" : "BLOG";
    return page.kind || (page.type === "tutorial" ? "TUTORIAL" : "PAGE");
}

function pageSearchDetail(page) {
    const data = contentPageData(page);
    return page.detail || data?.summary || data?.subtitle || "";
}

function buildSearchItems() {
    const pageItems = CONTENT_PAGES.filter((page) => page.searchable).map((page) => ({
        searchOrder: page.searchOrder,
        label: page.label,
        path: page.path,
        detail: pageSearchDetail(page),
        route: page.route,
        kind: pageSearchKind(page),
        content: pageSearchContent(page),
    }));
    const folderItems = CONTENT_PAGES.filter((page) => page.folderSearch).map((page) => {
        const folder = page.folderSearch;
        const path = page.path.slice(0, page.path.lastIndexOf("/"));
        return {
            searchOrder: folder.searchOrder,
            label: `${path.slice(path.lastIndexOf("/") + 1)}/`,
            path: `${path}/`,
            detail: folder.detail,
            route: folder.route,
            kind: folder.kind || "DIR",
            content: searchProfiles[folder.profile]?.(page) || [],
        };
    });

    return [...pageItems, ...folderItems]
        .sort((a, b) => a.searchOrder - b.searchOrder)
        .map(({ searchOrder, ...item }) => item);
}

searchItems = buildSearchItems();
function normalizeSearch(value) {
    return String(value || "")
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "");
}
function tokenScore(token, value) {
    const text = normalizeSearch(value);
    const at = text.indexOf(token);
    if (at >= 0) return 14 + (at === 0 ? 5 : Math.max(0, 4 - at / 30));
    let pos = -1,
        gaps = 0;
    for (const char of token) {
        const next = text.indexOf(char, pos + 1);
        if (next < 0) return 0;
        gaps += next - pos - 1;
        pos = next;
    }
    return Math.max(0, 5 - gaps * 0.2);
}
function scoreSearch(query, fields) {
    const tokens = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return 1;
    let score = 0;
    for (const token of tokens) {
        const best = Math.max(0, ...fields.map((field) => tokenScore(token, field)));
        if (!best) return 0;
        score += best;
    }
    return score;
}
function highlightSearch(value, query) {
    const text = String(value || "");
    const q = String(query || "").trim();
    if (!q) return esc(text);
    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${safe})`, "ig");
    return text
        .split(regex)
        .map((part) =>
            part.toLowerCase() === q.toLowerCase()
                ? `<mark class="search-hit">${esc(part)}</mark>`
                : esc(part),
        )
        .join("");
}
function grepOccurrences(query) {
    const q = String(query || "")
        .trim()
        .toLowerCase();
    if (!q) return [];
    const results = [];
    for (const item of searchItems) {
        if (item.kind === "DIR") continue;
        let number = 0;
        for (const content of (item.content || []).map(String)) {
            const lower = content.toLowerCase();
            let offset = 0;
            while ((offset = lower.indexOf(q, offset)) !== -1) {
                const start = Math.max(0, offset - 72),
                    end = Math.min(content.length, offset + q.length + 110);
                results.push({
                    ...item,
                    matchText: content,
                    matchExcerpt: `${start ? "…" : ""}${content.slice(start, end).trim()}${end < content.length ? "…" : ""}`,
                    occurrence: ++number,
                });
                offset += Math.max(1, q.length);
                if (results.length >= 160) return results;
            }
        }
    }
    return results;
}
function previewMarkup(item, query) {
    if (!item)
        return `<div class="palette-preview-empty">Type a filename or search term to preview a result.</div>`;
    const text =
        searchMode === "grep"
            ? item.matchExcerpt
            : (item.content || []).filter(Boolean).join("\n\n") || item.detail;
    const path =
        searchMode === "grep" ? `<div class="palette-preview-path">${esc(item.path)}</div>` : "";
    const meta = searchMode === "grep" ? `Match ${item.occurrence} · ${item.kind}` : item.kind;
    return joinHtml(
        `<div class="palette-preview-inner"><div class="palette-preview-meta"><span>${esc(meta)}</span><span>`,
        `${searchMode === "grep" ? "GREP" : "FILE"}</span></div><h3>${esc(item.label)}</h3>`,
        `<p class="palette-preview-detail">${esc(item.detail)}</p>${path}<div class="palette-preview-rule">`,
        `</div><pre class="palette-preview-excerpt">${highlightSearch(text, query)}</pre>`,
        `<div class="palette-preview-open">Enter to open · ↑ / ↓ to inspect another result</div></div>`,
    );
}
function updateSearchSelection() {
    const buttons = [...$("#palette-results").querySelectorAll("[data-search-index]")];
    buttons.forEach((button, index) => button.classList.toggle("selected", index === searchIndex));
    const selected = buttons[searchIndex];
    if (selected)
        selected.scrollIntoView({
            block: "nearest",
        });
    $("#palette-preview").innerHTML = previewMarkup(
        searchMatches[searchIndex],
        $("#palette-input").value,
    );
}
function openSearch(mode = "files") {
    searchMode = mode;
    searchReturnFocus = document.activeElement;
    const overlay = $("#search-overlay");
    overlay.hidden = false;
    $("#palette-input").value = "";
    $("#palette-input").placeholder =
        mode === "grep" ? "Search text across files…" : "Find a file by name…";
    searchIndex = 0;
    renderSearchResults("");
    $("#palette-input").focus();
}
function closeSearch() {
    $("#search-overlay").hidden = true;
    const target =
        searchReturnFocus && searchReturnFocus !== document.body && searchReturnFocus.isConnected
            ? searchReturnFocus
            : $("#app");
    target?.focus?.({
        preventScroll: true,
    });
    searchReturnFocus = null;
}
function setSearchMode(mode) {
    searchMode = mode;
    searchIndex = 0;
    $("#palette-input").placeholder =
        mode === "grep" ? "Search text across files…" : "Find a file by name…";
    renderSearchResults($("#palette-input").value);
    $("#palette-input").focus();
}
function renderSearchResults(query) {
    const q = query.trim();
    if (searchMode === "grep") searchMatches = grepOccurrences(q);
    else
        searchMatches = searchItems
            .filter((item) => item.kind !== "DIR" && scoreSearch(q, [item.label]) > 0)
            .sort((a, b) => a.label.localeCompare(b.label));
    searchIndex = Math.min(searchIndex, Math.max(0, searchMatches.length - 1));
    $("#palette-modes")
        .querySelectorAll("[data-search-mode]")
        .forEach((button) => {
            const active = button.dataset.searchMode === searchMode;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    $("#palette-results").innerHTML = searchMatches.length
        ? searchMatches
              .map((item, index) =>
                  joinHtml(
                      `<button class="palette-result ${index === searchIndex ? "selected" : ""}" data-search-index="${index}" `,
                      `data-search-route="${esc(item.route)}"><span class="result-symbol">`,
                      `${item.kind === "PROJECT" ? "◇" : item.kind === "TUTORIAL" ? "▶" : "▤"}</span>`,
                      `<span class="result-copy"><strong>${esc(item.label)}</strong><small>`,
                      `${esc(searchMode === "grep" ? item.matchExcerpt : item.detail)}</small></span>`,
                      `<span class="result-kind">${esc(item.kind)}</span></button>`,
                  ),
              )
              .join("")
        : joinHtml(
              `<div class="palette-empty">`,
              `${searchMode === "grep" ? "No matching text occurrences." : "No filenames match that search."}</div>`,
          );
    updateSearchSelection();
}
$("#search-open").addEventListener("click", () => openSearch("files"));
$("#palette-input").addEventListener("input", (event) => {
    searchIndex = 0;
    renderSearchResults(event.target.value);
});
$("#palette-modes").addEventListener("click", (event) => {
    const button = event.target.closest("[data-search-mode]");
    if (button) setSearchMode(button.dataset.searchMode);
});
$("#palette-results").addEventListener("pointerover", (event) => {
    const button = event.target.closest("[data-search-index]");
    if (button) {
        searchIndex = Number(button.dataset.searchIndex);
        updateSearchSelection();
    }
});
function chooseSearch() {
    const item = searchMatches[searchIndex];
    if (item?.route) {
        location.hash = item.route;
        closeSearch();
    }
}
$("#palette-results").addEventListener("click", (event) => {
    const button = event.target.closest("[data-search-route]");
    if (button) {
        searchIndex = Number(button.dataset.searchIndex);
        chooseSearch();
    }
});
$("#search-overlay").addEventListener("click", (event) => {
    if (event.target.matches("[data-close-overlay]")) closeSearch();
});
