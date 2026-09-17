const $ = (s) => document.querySelector(s);
const esc = (s) =>
    String(s).replace(
        /[&<>"']/g,
        (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
const t = (s) => (/^TODO/.test(s) ? `<span class="todo">${esc(s)}</span>` : esc(s));
const P = DATA.profile,
    D = DATA.dotfiles,
    REPO = `https://github.com/${D.user}/${D.repo}`;
const tags = (a) =>
    `<div class="tags">${a.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>`;
const video = (v) =>
    `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(v.id)}" title="${esc(v.title)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div><p class="todo" style="margin-bottom:24px">${esc(v.title)}</p>`;
const projectCard = (p) =>
    `<a class="card" href="#/projects/${encodeURIComponent(p.id)}"><h3>${esc(p.name)}</h3><p>${esc(p.summary)}</p>${tags(p.stack.slice(0, 4))}</a>`;
const fileFor = (page, id) =>
    id
        ? `${id}.md`
        : {
              home: "index.lua",
              about: "about.md",
              experience: "experience.md",
              projects: "projects/",
              skills: "skills.lua",
              resume: "resume.pdf",
              style: "colorscheme.md",
          }[page] || "index.lua";
const routeFor = (page, id) => (id ? `#/projects/${id}` : `#/${page === "home" ? "" : page}`);
const pages = {
    home: () => `<section class="hero"><div class="hi">-- hello, world</div><div class="big">${esc(P.name)}<span style="color:var(--yellow)">.</span></div><p class="sub">${esc(P.tagline)}</p><div class="btns"><a class="btn" href="#/projects">Explore projects <span>↗</span></a><a class="btn alt" href="#/resume">View resume</a><a class="btn alt" href="#/about">About me</a></div></section>
    <section><h2>Featured projects</h2><div class="grid">${DATA.projects.slice(0, 3).map(projectCard).join("")}</div><p style="margin-top:15px"><a href="#/projects">Browse all projects →</a></p></section>
    <section><h2>Get in touch</h2><p><a href="mailto:${esc(P.email)}">${esc(P.email)}</a> <span style="color:var(--dim)">·</span> <a href="${esc(P.github)}" target="_blank" rel="noopener">GitHub ↗</a> <span style="color:var(--dim)">·</span> <a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a></p></section>`,
    about: () =>
        `<h1>about me</h1><section class="cols"><div>${DATA.about.map((x) => `<p>${t(x)}</p>`).join("")}</div><aside class="side">${DATA.facts.map(([k, v]) => `<div style="margin-bottom:8px"><span style="color:var(--cyan)">${esc(k)}:</span> ${t(v)}</div>`).join("")}</aside></section>`,
    experience: () =>
        `<h1>experience</h1><section class="timeline">${DATA.experience.map((j) => `<div class="job"><h3>${t(j.role)}</h3><div class="meta">${t(j.org)} · ${t(j.dates)} · ${t(j.place)}</div><ul>${j.bullets.map((b) => `<li>${t(b)}</li>`).join("")}</ul></div>`).join("")}</section>`,
    projects: () =>
        `<h1>projects</h1><p style="color:var(--muted)">A selection of things I've built. Select a project to explore its implementation and technical details.</p><div class="grid">${DATA.projects.map(projectCard).join("")}</div>`,
    project: (id) => {
        const p = DATA.projects.find((x) => x.id === id);
        if (!p) return pages.notfound();
        return `<div class="crumb"><a href="#/projects">projects</a> / ${esc(p.id)}</div><h1>${esc(p.name)}</h1><p style="color:var(--muted)">${esc(p.summary)}</p>${p.videos.map(video).join("")}<div class="cols"><div><section><h2>Overview</h2><p>${esc(p.about)}</p></section><section><h2>Technical highlights</h2><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></section></div><aside class="side"><h3>Technology</h3>${tags(p.stack)}<h3 style="margin-top:20px">Links</h3>${p.links.map(([n, u]) => `<div style="margin:6px 0"><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)} ↗</a></div>`).join("")}</aside></div>`;
    },
    skills: () =>
        `<h1>skills</h1>${Object.entries(DATA.skills)
            .map(
                ([g, list]) =>
                    `<section><h2>${esc(g)}</h2><div class="skills">${list.map(([n, i]) => `<div class="skill"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${esc(i)}/${esc(i)}-original.svg" alt="" loading="lazy" onerror="this.style.display='none'">${esc(n)}</div>`).join("")}</div></section>`,
            )
            .join("")}`,
    resume: () =>
        `<h1>resume</h1><div class="btns" style="margin:0 0 16px"><a class="btn" href="${esc(P.resume)}" download>Download PDF</a><a class="btn alt" href="${esc(P.resume)}" target="_blank" rel="noopener">Open in new tab</a></div><object class="pdf" data="${esc(P.resume)}" type="application/pdf"><p class="todo" style="padding:20px">No PDF found. Put your resume at <code>${esc(P.resume)}</code>, or use the download button.</p></object>`,
    style: () =>
        `<h1>colorscheme</h1><p>This portfolio takes its interaction model from Neovim: file navigation, open buffers, keyboard mappings and a command line. Its colors are based on the Melange colorscheme.</p><div class="btns" style="margin:0 0 24px"><a class="btn" href="${REPO}" target="_blank" rel="noopener">View dotfiles on GitHub ↗</a></div><section><h2>Live dotfiles</h2><div id="live"><div class="box todo">Loading dotfiles from GitHub...</div></div></section>`,
    notfound: () =>
        `<h1>E492: not an editor command</h1><p>The requested buffer doesn't exist. <a href="#/">Return to index.lua</a></p>`,
};

// Buffer state is intentionally separate from route rendering: switching files keeps other tabs open.
const buffers = [];
let activeBuffer = null,
    explorerVisible = true,
    pendingKeys = "",
    searchItems = [],
    searchIndex = 0;
const current = () => {
    const [, page = "home", id] = location.hash.slice(1).split("/");
    return { page: page || "home", id: id ? decodeURIComponent(id) : null };
};
const currentKey = () => {
    const { page, id } = current();
    return page === "projects" && id ? `project:${id}` : page;
};
const bufferLabel = (key) => {
    if (key.startsWith("project:")) return `${key.slice(8)}.md`;
    return fileFor(key);
};
const bufferRoute = (key) =>
    key.startsWith("project:") ? routeFor("projects", key.slice(8)) : routeFor(key);
function openBuffer(key, navigate = true) {
    if (!buffers.includes(key)) buffers.push(key);
    activeBuffer = key;
    if (navigate && location.hash !== bufferRoute(key)) location.hash = bufferRoute(key);
    renderEditor();
}
function closeBuffer(key) {
    const i = buffers.indexOf(key);
    if (i < 0) return;
    buffers.splice(i, 1);
    if (activeBuffer === key) {
        const next = buffers[Math.max(0, i - 1)] || "home";
        if (!buffers.length) buffers.push("home");
        activeBuffer = next;
        if (location.hash !== bufferRoute(next)) location.hash = bufferRoute(next);
    } else renderChrome();
}
function renderChrome() {
    const route = current(),
        key = currentKey();
    if (!buffers.includes(key)) buffers.push(key);
    activeBuffer = key;
    $("#bufferline").innerHTML = buffers
        .map(
            (b) =>
                `<div class="buffer-tab ${b === activeBuffer ? "active" : ""}" role="tab" aria-selected="${b === activeBuffer}" data-buffer="${esc(b)}"><span class="tab-file-icon">${b.startsWith("project:") ? "◇" : "▤"}</span><span class="tab-name">${esc(bufferLabel(b))}</span><button class="tab-close" data-close-buffer="${esc(b)}" aria-label="Close ${esc(bufferLabel(b))}" title="Close buffer">×</button></div>`,
        )
        .join("");
    const file = bufferLabel(key),
        parent = key.startsWith("project:")
            ? "projects"
            : key === "home"
              ? "~"
              : key === "projects"
                ? "~"
                : "~";
    $("#breadcrumb").innerHTML =
        `<span>${esc(P.handle)}</span> <span style="color:var(--dim)">/</span> <span>${esc(parent)}</span> <span style="color:var(--dim)">/</span> <span class="crumb-current">${esc(file)}</span>`;
    $("#status").innerHTML =
        `<span class="status-mode">NORMAL</span><span class="status-branch">⌥ main</span><span class="status-file">${esc(file)}</span><span class="status-spacer"></span><button class="status-button" id="status-help" title="Keyboard shortcuts">? keys</button><span class="status-theme">${document.documentElement.dataset.theme} · melange</span><span class="status-position">utf-8&nbsp; · &nbsp;${route.page === "home" ? "1:1" : "1:1"}</span>`;
    document
        .querySelectorAll("#file-tree [data-route]")
        .forEach((a) => a.classList.toggle("active", a.dataset.route === route.page && !route.id));
    document
        .querySelectorAll("#project-tree [data-project]")
        .forEach((a) => a.classList.toggle("active", a.dataset.project === route.id));
    document.title = `${P.handle} | ${route.id || route.page}`;
}
function renderEditor() {
    renderChrome();
    const { page, id } = current(),
        key = currentKey();
    const target = key.startsWith("project:")
        ? pages.project(id)
        : (pages[page] || pages.notfound)();
    $("#app").innerHTML = target;
    if (key === "style") loadDotfiles();
}
function renderProjectTree() {
    $("#project-tree").innerHTML = DATA.projects
        .map(
            (p) =>
                `<a class="tree-file" href="#/projects/${encodeURIComponent(p.id)}" data-project="${esc(p.id)}"><span class="file-icon md">M</span> ${esc(p.id)}.md</a>`,
        )
        .join("");
}
function syncRoute() {
    const key = currentKey();
    if (!buffers.includes(key)) buffers.push(key);
    activeBuffer = key;
    renderEditor();
}
addEventListener("hashchange", syncRoute);
renderProjectTree();
if (!location.hash) location.hash = "#/";
else syncRoute();

// Sidebar folders and mobile drawer.
document.querySelectorAll("[data-folder]").forEach((button) =>
    button.addEventListener("click", () => {
        const panel = document.querySelector(`[data-folder-content="${button.dataset.folder}"]`);
        panel.classList.toggle("closed");
        button.classList.toggle("collapsed");
        button.querySelector(".tree-chevron").textContent = panel.classList.contains("closed")
            ? "›"
            : "⌄";
    }),
);
function toggleExplorer(force) {
    explorerVisible = force ?? !explorerVisible;
    const el = $("#explorer");
    if (innerWidth <= 760) el.classList.toggle("open", explorerVisible);
    else el.style.display = explorerVisible ? "flex" : "none";
}
$("#collapse-explorer").addEventListener("click", () => toggleExplorer(false));
$("#explorer-toggle").addEventListener("click", () => toggleExplorer());
$("#file-tree").addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a && innerWidth <= 760) toggleExplorer(false);
});
$("#bufferline").addEventListener("click", (e) => {
    const close = e.target.closest("[data-close-buffer]");
    if (close) {
        e.stopPropagation();
        closeBuffer(close.dataset.closeBuffer);
        return;
    }
    const tab = e.target.closest("[data-buffer]");
    if (tab) openBuffer(tab.dataset.buffer);
});
$("#theme-toggle").addEventListener("click", () =>
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"),
);
function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
    const b = $("#theme-toggle");
    b.textContent = theme === "dark" ? "☼" : "☾";
    b.title = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#292522" : "#F1F1F1";
    if ($("#status")) renderChrome();
}
setTheme(document.documentElement.dataset.theme || "dark", false);

// Telescope-like fuzzy finder over pages and project metadata.
function buildSearchItems() {
    const items = [
        {
            label: "index.lua",
            detail: "Home · introduction",
            route: "#/",
            kind: "PAGE",
            terms: "home introduction profile",
        },
        { label: "about.md", detail: "About me", route: "#/about", kind: "PAGE", terms: "about" },
        {
            label: "experience.md",
            detail: "Work and experience",
            route: "#/experience",
            kind: "PAGE",
            terms: "work jobs experience",
        },
        {
            label: "projects/",
            detail: "All projects",
            route: "#/projects",
            kind: "DIR",
            terms: "projects",
        },
        {
            label: "skills.lua",
            detail: "Languages, frameworks and tools",
            route: "#/skills",
            kind: "PAGE",
            terms: "skills technologies languages",
        },
        {
            label: "resume.pdf",
            detail: "Resume PDF",
            route: "#/resume",
            kind: "PDF",
            terms: "resume cv",
        },
        {
            label: "colorscheme.md",
            detail: "About this Neovim-inspired interface",
            route: "#/style",
            kind: "PAGE",
            terms: "theme melange neovim colorscheme",
        },
    ];
    DATA.projects.forEach((p) =>
        items.push({
            label: `${p.id}.md`,
            detail: p.summary,
            route: `#/projects/${p.id}`,
            kind: "PROJECT",
            terms: [p.name, p.summary, p.about, ...p.stack, ...p.highlights].join(" "),
        }),
    );
    Object.entries(DATA.skills).forEach(([group, skills]) =>
        skills.forEach(([name]) =>
            items.push({
                label: name,
                detail: `Skill · ${group}`,
                route: "#/skills",
                kind: "SKILL",
                terms: `${name} ${group}`,
            }),
        ),
    );
    return items;
}
searchItems = buildSearchItems();
function openSearch() {
    const overlay = $("#search-overlay");
    overlay.hidden = false;
    $("#palette-input").value = "";
    searchIndex = 0;
    renderSearchResults("");
    $("#palette-input").focus();
}
function closeSearch() {
    $("#search-overlay").hidden = true;
}
function renderSearchResults(query) {
    const q = query.trim().toLowerCase();
    const matches = searchItems
        .map((item) => ({
            ...item,
            score: !q
                ? 1
                : item.label.toLowerCase().includes(q)
                  ? 4
                  : item.terms.toLowerCase().includes(q)
                    ? 2
                    : item.detail.toLowerCase().includes(q)
                      ? 1
                      : 0,
        }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 30);
    searchIndex = Math.min(searchIndex, Math.max(0, matches.length - 1));
    $("#palette-results").innerHTML = matches.length
        ? matches
              .map(
                  (m, i) =>
                      `<button class="palette-result ${i === searchIndex ? "selected" : ""}" data-search-route="${esc(m.route)}"><span style="color:var(--cyan)">${m.kind === "PROJECT" ? "◇" : "▤"}</span><span>${esc(m.label)}</span><span class="result-kind">${esc(m.kind)}</span></button>`,
              )
              .join("")
        : `<div class="palette-result" style="color:var(--dim)">No matching files</div>`;
}
$("#search-open").addEventListener("click", openSearch);
$("#palette-input").addEventListener("input", (e) => {
    searchIndex = 0;
    renderSearchResults(e.target.value);
});
function chooseSearch() {
    const item = $("#palette-results .palette-result.selected");
    if (item?.dataset.searchRoute) {
        location.hash = item.dataset.searchRoute;
        closeSearch();
    }
}
$("#palette-results").addEventListener("click", (e) => {
    const b = e.target.closest("[data-search-route]");
    if (b) {
        location.hash = b.dataset.searchRoute;
        closeSearch();
    }
});
$("#search-overlay").addEventListener("click", (e) => {
    if (e.target.matches("[data-close-overlay]")) closeSearch();
});

// Ex command line.
function openCommand() {
    const row = $("#command-row");
    row.hidden = false;
    $("#command-input").value = "";
    $("#command-input").focus();
}
function closeCommand() {
    $("#command-row").hidden = true;
    $("#app").focus();
}
function runCommand(raw) {
    const cmd = raw.trim().replace(/^:/, "");
    if (!cmd) return closeCommand();
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");
    switch (name) {
        case "e":
        case "edit": {
            const value = arg.replace(/^\/?/, "");
            const match = [...searchItems].find(
                (x) =>
                    x.label === value ||
                    x.route.replace(/^#\/?/, "") === value ||
                    x.route === `#/${value}`,
            );
            if (match) location.hash = match.route;
            else if (value === "~" || value === "index.lua" || value === "") location.hash = "#/";
            else if (value.startsWith("projects/")) {
                const id = value.split("/")[1]?.replace(/\.md$/i, "");
                if (DATA.projects.some((p) => p.id === id)) location.hash = `#/projects/${id}`;
                else flashCommand(`E484: Can't open file ${value}`);
            } else flashCommand(`E345: File not found: ${value}`);
            break;
        }
        case "bn":
        case "bnext":
            cycleBuffer(1);
            break;
        case "bp":
        case "bprevious":
            cycleBuffer(-1);
            break;
        case "bd":
        case "bdelete":
            closeBuffer(activeBuffer);
            break;
        case "q":
        case "quit":
            closeBuffer(activeBuffer);
            break;
        case "colorscheme":
            if (arg === "melange") flashCommand("Melange is active.");
            else flashCommand("Only the Melange colorscheme is available.");
            break;
        case "help":
        case "h":
            openHelp();
            break;
        case "Telescope":
        case "Files":
            closeCommand();
            openSearch();
            break;
        default:
            flashCommand(`E492: Not an editor command: ${name}`);
    }
}
function flashCommand(message) {
    const input = $("#command-input");
    input.value = message;
    input.select();
}
$("#command-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        runCommand(e.target.value);
    }
    if (e.key === "Escape") closeCommand();
});
function cycleBuffer(delta) {
    if (!buffers.length) return;
    const i = buffers.indexOf(activeBuffer);
    const next = buffers[(i + delta + buffers.length) % buffers.length];
    openBuffer(next);
}

function openHelp() {
    $("#help-overlay").hidden = false;
}
function closeHelp() {
    $("#help-overlay").hidden = true;
}
$("#status").addEventListener("click", (e) => {
    if (e.target.closest("#status-help")) openHelp();
});
$("#help-overlay").addEventListener("click", (e) => {
    if (e.target.matches("[data-close-help]")) closeHelp();
});
let lastG = 0;
function inEditable(el) {
    return el && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));
}
addEventListener("keydown", (e) => {
    if (!$("#search-overlay").hidden) {
        if (e.key === "Escape") {
            closeSearch();
            return;
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const count = $("#palette-results").querySelectorAll("[data-search-route]").length;
            searchIndex =
                (searchIndex + (e.key === "ArrowDown" ? 1 : -1) + count) % Math.max(1, count);
            renderSearchResults($("#palette-input").value);
            return;
        }
        if (e.key === "Enter") {
            e.preventDefault();
            chooseSearch();
            return;
        }
        return;
    }
    if (!$("#help-overlay").hidden) {
        if (e.key === "Escape" || e.key === "?") closeHelp();
        return;
    }
    if (!$("#command-row").hidden || inEditable(e.target)) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
        return;
    }
    if (e.key === "Escape") {
        pendingKeys = "";
        return;
    }
    if (e.key === "?") {
        e.preventDefault();
        openHelp();
        return;
    }
    if (e.key === ":") {
        e.preventDefault();
        openCommand();
        return;
    }
    if (e.key === " ") {
        e.preventDefault();
        pendingKeys = "space";
        return;
    }
    if (pendingKeys === "space") {
        pendingKeys = "";
        if (e.key === "e") toggleExplorer();
        else if (e.key === "b") pendingKeys = "space-b";
        return;
    }
    if (pendingKeys === "space-b") {
        pendingKeys = "";
        if (e.key === "d") closeBuffer(activeBuffer);
        return;
    }
    if (e.key === "]") {
        pendingKeys = "]";
        return;
    }
    if (e.key === "[") {
        pendingKeys = "[";
        return;
    }
    if (pendingKeys === "]" && e.key === "b") {
        pendingKeys = "";
        cycleBuffer(1);
        return;
    }
    if (pendingKeys === "[" && e.key === "b") {
        pendingKeys = "";
        cycleBuffer(-1);
        return;
    }
    pendingKeys = "";
    if (e.key === "g") {
        const now = Date.now();
        if (now - lastG < 650) window.scrollTo({ top: 0, behavior: "smooth" });
        lastG = now;
        return;
    }
    if (e.key === "G") {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        return;
    }
    if (e.key === "j") {
        window.scrollBy({ top: 42, behavior: "smooth" });
        return;
    }
    if (e.key === "k") {
        window.scrollBy({ top: -42, behavior: "smooth" });
        return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === "d") {
        window.scrollBy({ top: innerHeight * 0.5, behavior: "smooth" });
        return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
        window.scrollBy({ top: -innerHeight * 0.5, behavior: "smooth" });
        return;
    }
});

/* ---------- live dotfiles panel ---------- */
const ago = (d) => {
    const s = (Date.now() - new Date(d)) / 1e3,
        u = [
            [31536e3, "year"],
            [2592e3, "month"],
            [86400, "day"],
            [3600, "hour"],
            [60, "minute"],
        ];
    for (const [n, l] of u)
        if (s >= n) {
            const v = Math.floor(s / n);
            return `${v} ${l}${v > 1 ? "s" : ""} ago`;
        }
    return "just now";
};
async function gh(url) {
    const k = "gh:" + url;
    try {
        const c = JSON.parse(sessionStorage.getItem(k));
        if (c && Date.now() - c.t < 6e5) return c.d;
    } catch (_) {}
    const r = await fetch(url);
    if (!r.ok) throw new Error("GitHub API " + r.status);
    const d = await r.json();
    try {
        sessionStorage.setItem(k, JSON.stringify({ t: Date.now(), d }));
    } catch (_) {}
    return d;
}
async function loadDotfiles() {
    const box = $("#live"),
        api = `https://api.github.com/repos/${D.user}/${D.repo}`;
    if (!box || box.dataset.loaded) return;
    box.dataset.loaded = "true";
    try {
        const info = await gh(api),
            br = info.default_branch;
        const [commits, tree] = await Promise.all([
            gh(`${api}/commits?per_page=5`),
            gh(`${api}/git/trees/${br}?recursive=1`),
        ]);
        const SKIP = /\.(png|jpe?g|gif|webp|ico|ttf|otf|woff2?|zip|gz|pdf|mp4|bin)$/i;
        const paths = tree.tree
            .filter((x) => x.type === "blob" && x.size < 200000 && !SKIP.test(x.path))
            .map((x) => x.path);
        const first =
            paths.find((p) => /nvim.*init\.lua$/.test(p)) ||
            paths.find((p) => /init\.(lua|vim)$/.test(p)) ||
            paths[0];
        box.innerHTML = `<div class="box"><h3>${esc(info.full_name)}</h3><p style="margin:0">last pushed <b>${ago(info.pushed_at)}</b> · ${paths.length} files · branch <code>${esc(br)}</code> · ${info.stargazers_count} stars</p></div><div class="box"><h3>Latest commits</h3>${commits.map((c) => `<div class="commit"><span>${ago(c.commit.author.date)}</span><a href="${esc(c.html_url)}" target="_blank" rel="noopener">${esc(c.commit.message.split("\n")[0])}</a></div>`).join("")}</div><div class="cols" style="grid-template-columns:1fr 2fr"><div class="box files" id="files">${paths.map((p) => `<button data-p="${esc(p)}">${esc(p)}</button>`).join("")}</div><div class="box"><div id="fname" style="margin-bottom:8px"></div><pre class="code" id="code"></pre></div></div>`;
        const show = async (p) => {
            document
                .querySelectorAll("#files button")
                .forEach((b) => b.classList.toggle("on", b.dataset.p === p));
            $("#fname").innerHTML =
                `<a href="${REPO}/blob/${br}/${encodeURI(p)}" target="_blank" rel="noopener">${esc(p)} ↗</a>`;
            $("#code").textContent = "loading...";
            try {
                const r = await fetch(
                    `https://raw.githubusercontent.com/${D.user}/${D.repo}/${br}/${encodeURI(p)}`,
                );
                $("#code").textContent = await r.text();
            } catch (e) {
                $("#code").textContent = "failed to load: " + e.message;
            }
        };
        $("#files").addEventListener("click", (e) => {
            const b = e.target.closest("button");
            if (b) show(b.dataset.p);
        });
        if (first) show(first);
    } catch (e) {
        box.innerHTML = `<div class="box">Couldn't reach the GitHub API (${esc(e.message)}). You can still <a href="${REPO}" target="_blank" rel="noopener">browse the repo directly</a>.</div>`;
    }
}
