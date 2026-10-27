/* Telescope-style file search and live text grep. */
// Telescope-style finder: file navigation plus a content-oriented live grep mode.
let searchMode = "files",
    searchMatches = [],
    searchReturnFocus = null;
function projectSearchContent(p) {
    const deepDive = p.deepDive
        ? [
              p.deepDive.intro,
              ...(p.deepDive.sections || []).flatMap((section) => [
                  section.title,
                  ...(section.paragraphs || []),
                  ...(section.bullets || []),
              ]),
          ]
        : [];
    return [
        p.name,
        p.summary,
        p.about,
        ...(p.stack || []),
        ...(p.highlights || []),
        ...(p.sections || []).flatMap((section) => [
            section.title,
            ...(section.paragraphs || []),
            ...(section.bullets || []),
        ]),
        ...deepDive,
    ];
}
function buildSearchItems() {
    const setupContent = [
        DATA.setup.intro,
        ...DATA.setup.machines.flatMap((m) => [m.device, m.system, m.detail]),
        ...DATA.setup.workflow,
    ];
    const skillsContent = Object.entries(DATA.skills).flatMap(([group, skills]) => [
        group,
        ...skills,
    ]);
    const items = [
        {
            label: "index.lua",
            path: "index.lua",
            detail: "Home · introduction",
            route: "#/",
            kind: "PAGE",
            content: [P.tagline, ...DATA.about, ...DATA.facts.flat()],
        },
        {
            label: "about.md",
            path: "about.md",
            detail: "About me",
            route: "#/about",
            kind: "PAGE",
            content: DATA.about,
        },
        {
            label: "setup.md",
            path: "setup.md",
            detail: "Fedora laptop · Windows and Arch Linux (Omarchy) desktop dual boot · Neovim",
            route: "#/setup",
            kind: "PAGE",
            content: setupContent,
        },
        {
            label: "work.md",
            path: "experience/work.md",
            detail: "Work and experience",
            route: "#/experience",
            kind: "PAGE",
            content: DATA.experience.flatMap((job) => [
                job.role,
                job.org,
                job.dates,
                job.place,
                ...job.bullets,
            ]),
        },
        {
            label: "skills.md",
            path: "experience/skills.md",
            detail: "Languages, frameworks and tools",
            route: "#/skills",
            kind: "PAGE",
            content: skillsContent,
        },
        {
            label: "resume.pdf",
            path: "experience/resume.pdf",
            detail: "Resume · LaTeX source with generated image preview and PDF download",
            route: "#/resume",
            kind: "PDF",
            content: ["resume.pdf", "resume.tex", "curriculum vitae"],
        },
        {
            label: "community.md",
            path: "community.md",
            detail: "Mihon open-source contributions",
            route: "#/community",
            kind: "PAGE",
            content: [
                DATA.community.mihon.name,
                DATA.community.mihon.summary,
                ...DATA.community.mihon.contributions.flatMap((c) => [c.title, c.status, c.detail]),
            ],
        },
        {
            label: "colorscheme.md",
            path: "colorscheme.md",
            detail: "About the Neovim-inspired interface",
            route: "#/style",
            kind: "PAGE",
            content: ["Melange colorscheme from my current dotfiles hosted on GitHub"],
        },
        {
            label: "index.md",
            path: "blog/index.md",
            detail: "Project stories and technical notes",
            route: "#/blog",
            kind: "PAGE",
            content: DATA.blogPosts
                .filter((post) => post.type !== "technical")
                .map((post) => `${post.title} ${post.subtitle}`)
                .join("\n")
                .split("\n"),
        },
        {
            label: "index.md",
            path: "vim/index.md",
            detail: "Interactive Vim motions tutorial",
            route: "#/vim",
            kind: "PAGE",
            content: [
                "vim motions keyboard tutorial VS Code IDE Neovim movement h j k l w b e dd ciw",
            ],
        },
    ];
    DATA.blogPosts.forEach((post) =>
        items.push({
            label: `${post.id}.md`,
            path: `blog/${post.id}.md`,
            detail: post.subtitle,
            route: `#/blog/${post.id}`,
            kind: post.type === "technical" ? "NOTES" : "BLOG",
            content: [
                post.title,
                post.subtitle,
                post.intro,
                ...(post.sections || []).flatMap((section) => [
                    section.title,
                    ...(section.paragraphs || []),
                    ...(section.bullets || []),
                    section.code || "",
                ]),
                ...(post.workflow || []),
                ...(post.offsetNotes || []).flatMap((note) => [
                    note.title,
                    note.offset,
                    note.base,
                    note.detail,
                    ...note.fields,
                ]),
                ...(post.resources || []).flatMap((resource) => [resource.title, resource.note]),
            ],
        }),
    );
    [...DATA.projects, ...DATA.communityProjects].forEach((p) =>
        items.push({
            label: `${p.id}.md`,
            path: `projects/${p.id}.md`,
            detail: p.summary,
            route: projectRoute(p),
            kind: "PROJECT",
            content: projectSearchContent(p),
        }),
    );
    items.push({
        label: "smaller-projects/",
        path: "projects/smaller-projects/",
        detail: "Independent projects and coursework",
        route: "#/projects",
        kind: "DIR",
        content: DATA.smallerProjects.flatMap(projectSearchContent),
    });
    DATA.smallerProjects.forEach((p) =>
        items.push({
            label: `${p.id}.md`,
            path: `projects/smaller-projects/${p.id}.md`,
            detail: p.summary,
            route: projectRoute(p),
            kind: "PROJECT",
            content: projectSearchContent(p),
        }),
    );
    items.push({
        label: "play.md",
        path: "vim/play.md",
        detail: "Interactive Vim motions game",
        route: "#/vim/play",
        kind: "TUTORIAL",
        content: VIM_TUTORIAL_STAGES.flatMap((stage) => [
            stage.name,
            stage.goal,
            stage.explanation,
            ...stage.initial,
        ]),
    });
    return items;
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
    return `<div class="palette-preview-inner"><div class="palette-preview-meta"><span>${esc(meta)}</span><span>${searchMode === "grep" ? "GREP" : "FILE"}</span></div><h3>${esc(item.label)}</h3><p class="palette-preview-detail">${esc(item.detail)}</p>${path}<div class="palette-preview-rule"></div><pre class="palette-preview-excerpt">${highlightSearch(text, query)}</pre><div class="palette-preview-open">Enter to open · ↑ / ↓ to inspect another result</div></div>`;
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
              .map(
                  (item, index) =>
                      `<button class="palette-result ${index === searchIndex ? "selected" : ""}" data-search-index="${index}" data-search-route="${esc(item.route)}"><span class="result-symbol">${item.kind === "PROJECT" ? "◇" : item.kind === "TUTORIAL" ? "▶" : "▤"}</span><span class="result-copy"><strong>${esc(item.label)}</strong><small>${esc(searchMode === "grep" ? item.matchExcerpt : item.detail)}</small></span><span class="result-kind">${esc(item.kind)}</span></button>`,
              )
              .join("")
        : `<div class="palette-empty">${searchMode === "grep" ? "No matching text occurrences." : "No filenames match that search."}</div>`;
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
