/* Buffer state, route keys, split-pane state, and editor chrome. */
// Buffer state is intentionally separate from route rendering: switching files keeps other tabs open.
const buffers = [];
let activeBuffer = null,
    explorerVisible = innerWidth > 760,
    pendingKeys = "",
    searchItems = [],
    searchIndex = 0;
const current = () => {
    const raw = location.hash.slice(1);
    const [path, hashQuery = ""] = raw.split("?");
    const parts = path.split("/");
    const page = parts[1] || "home";
    const id = parts[2] ? decodeURIComponent(parts[2]) : null;
    return {
        page,
        id,
        query: new URLSearchParams(hashQuery || location.search),
    };
};
const currentKey = () => {
    const { page, id } = current();
    if (page === "projects" && id) return `project:${id}`;
    if (page === "smaller-projects" && id) return `smaller-project:${id}`;
    if (page === "blog" && id) return `blog:${id}`;
    if (page === "vim" && id) return `vim:${id}`;
    return page;
};
const bufferLabel = (key) => {
    if (["project:", "smaller-project:", "blog:", "vim:"].some((prefix) => key.startsWith(prefix)))
        return `${key.slice(key.indexOf(":") + 1)}.md`;
    return fileFor(key);
};
const bufferRoute = (key) => {
    if (key.startsWith("project:")) return routeFor("projects", key.slice(8));
    if (key.startsWith("smaller-project:")) return routeFor("smaller-projects", key.slice(16));
    if (key.startsWith("blog:")) return routeFor("blog", key.slice(5));
    if (key.startsWith("vim:")) return routeFor("vim", key.slice(4));
    return routeFor(key);
};
function renderPageForKey(key) {
    if (key.startsWith("project:")) return pages.project(key.slice(8));
    if (key.startsWith("smaller-project:")) return pages.project(key.slice(16));
    if (key.startsWith("blog:")) return pages.blog(key.slice(5));
    if (key === "blog") return pages.blog(null);
    if (key === "vim:play") return pages.vimPlay(new URLSearchParams());
    if (key.startsWith("vim:")) return pages.vim();
    return (pages[key] || pages.notfound)();
}
function updatePaneTitles() {
    const primaryTitle = $("#primary-pane-title"),
        secondaryTitle = $("#secondary-pane-title");
    if (!splitState) {
        primaryTitle.hidden = true;
        return;
    }
    primaryTitle.hidden = false;
    primaryTitle.textContent = bufferLabel(splitState.leftKey);
    secondaryTitle.textContent = bufferLabel(splitState.rightKey);
}
function activateSplit(which) {
    if (!splitState) return;
    splitState.active = which === "right" ? "right" : "left";
    const key = splitState.active === "left" ? splitState.leftKey : splitState.rightKey;
    const route = bufferRoute(key);
    if (location.hash !== route) location.hash = route;
    else renderEditor();
}
function openSplit(target, orientation = "vertical") {
    const match = searchItems.find(
        (item) =>
            item.label === target ||
            item.path === target ||
            item.route === target ||
            item.route.replace(/^#\/?/, "") === target.replace(/^\/?/, ""),
    );
    const active = currentKey();
    const key = match ? keyForRoute(match.route) : target ? null : active;
    if (!key) {
        flashCommand(`E345: File not found: ${target}`);
        return;
    }
    if (
        key === "vim:play" ||
        key.startsWith("vim:") ||
        active === "vim:play" ||
        active.startsWith("vim:")
    ) {
        flashCommand("Split view is unavailable inside the Vim practice buffer.");
        return;
    }
    if (!splitState)
        splitState = {
            leftKey: active,
            rightKey: key,
            orientation,
            active: "right",
        };
    else if (splitState.active === "left") {
        splitState.rightKey = key;
        splitState.orientation = orientation;
        splitState.active = "right";
    } else {
        splitState.leftKey = key;
        splitState.orientation = orientation;
        splitState.active = "left";
    }
    if (!buffers.includes(key)) buffers.push(key);
    const route = bufferRoute(key);
    if (location.hash !== route) location.hash = route;
    else renderEditor();
}
function showSinglePane(key) {
    splitState = null;
    const route = bufferRoute(key);
    if (location.hash !== route) location.hash = route;
    else renderEditor();
}
function closeToActiveSplit() {
    if (!splitState) return;
    const keep = splitState.active === "left" ? splitState.leftKey : splitState.rightKey;
    showSinglePane(keep);
}
function closeCurrentSplitPane() {
    if (!splitState) return;
    const keep = splitState.active === "left" ? splitState.rightKey : splitState.leftKey;
    showSinglePane(keep);
}
function focusOtherSplit() {
    if (!splitState) return;
    activateSplit(splitState.active === "left" ? "right" : "left");
}
function keyForRoute(route) {
    const path = String(route || "#/")
        .replace(/^#/, "")
        .split("?")[0];
    const parts = path.split("/").filter(Boolean).map(decodeURIComponent);
    if (!parts.length) return "home";
    if (parts[0] === "projects" && parts[1]) return `project:${parts[1]}`;
    if (parts[0] === "smaller-projects" && parts[1]) return `smaller-project:${parts[1]}`;
    if (parts[0] === "blog" && parts[1]) return `blog:${parts[1]}`;
    if (parts[0] === "vim" && parts[1]) return `vim:${parts[1]}`;
    return parts[0];
}
function openBuffer(key, navigate = true) {
    if (!buffers.includes(key)) buffers.push(key);
    activeBuffer = key;
    if (splitState) {
        if (splitState.active === "left") splitState.leftKey = key;
        else splitState.rightKey = key;
    }
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
        .map((b) =>
            joinHtml(
                `<div class="buffer-tab ${b === activeBuffer ? "active" : ""}" role="tab" aria-selected="`,
                `${b === activeBuffer}" data-buffer="${esc(b)}"><span class="tab-file-icon">`,
                `${b.startsWith("project:") ? "◇" : "▤"}</span><span class="tab-name">${esc(bufferLabel(b))}</span>`,
                `<button class="tab-close" data-close-buffer="${esc(b)}" aria-label="Close ${esc(bufferLabel(b))}" `,
                `title="Close buffer">×</button></div>`,
            ),
        )
        .join("");
    const file = bufferLabel(key);
    const parent = key.startsWith("smaller-project:")
        ? "projects / smaller-projects"
        : key.startsWith("project:") || key === "projects"
          ? "projects"
          : key.startsWith("blog:") || key === "blog"
            ? "blog"
            : key.startsWith("vim:") || key === "vim"
              ? "vim"
              : key === "experience" || key === "skills" || key === "resume"
                ? "experience"
                : "~";
    $("#breadcrumb").innerHTML = joinHtml(
        `<span>${esc(P.handle)}</span> <span style="color:var(--dim)">/</span> <span>${esc(parent)}</span> `,
        `<span style="color:var(--dim)">/</span> <span class="crumb-current">${esc(file)}</span>`,
    );
    $("#status").innerHTML = joinHtml(
        `<span class="status-mode">NORMAL</span><span class="status-branch">⌥ main</span>`,
        `<span class="status-file">${esc(file)}</span><span class="status-spacer"></span>`,
        `<button class="status-button" id="status-help" title="Keyboard shortcuts">? keys</button>`,
        `<span class="status-theme">${document.documentElement.dataset.theme} · melange</span>`,
        `<span class="status-position">utf-8&nbsp; · &nbsp;${route.page === "home" ? "1:1" : "1:1"}</span>`,
    );
    document.querySelectorAll("#file-tree [data-route]").forEach((a) => {
        const samePage = a.dataset.route === route.page;
        const sameId = a.dataset.routeId ? a.dataset.routeId === route.id : !route.id;
        a.classList.toggle("active", samePage && sameId);
    });
    document
        .querySelectorAll("#project-tree [data-project], #smaller-project-tree [data-project]")
        .forEach((a) => a.classList.toggle("active", a.dataset.project === route.id));
    document.title = `${P.handle} | ${route.id || route.page}`;
}
