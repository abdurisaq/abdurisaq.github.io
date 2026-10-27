/* Explorer interactions, keyboard focus helpers, and theme toggle. */
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
let treeNavigationActive = false,
    treePendingG = false,
    explorerReturnFocus = null,
    pendingKeysAt = 0;
function visibleTreeNodes() {
    return [...$("#file-tree").querySelectorAll(".tree-file,.tree-folder")].filter(
        (node) => node.getClientRects().length > 0,
    );
}
function focusTreeNode(node) {
    if (!node) return;
    treeNavigationActive = true;
    node.focus({
        preventScroll: true,
    });
    document
        .querySelectorAll("#file-tree .keyboard-selected")
        .forEach((item) => item.classList.remove("keyboard-selected"));
    node.classList.add("keyboard-selected");
    node.scrollIntoView({
        block: "nearest",
    });
}
function focusExplorer() {
    explorerReturnFocus = document.activeElement;
    toggleExplorer(true);
    const nodes = visibleTreeNodes();
    const active = nodes.find((node) => node.classList.contains("active"));
    focusTreeNode(active || nodes[0]);
}
function focusEditor() {
    treeNavigationActive = false;
    treePendingG = false;
    if (innerWidth <= 760) toggleExplorer(false);
    $("#app").focus({
        preventScroll: true,
    });
}
function moveTreeSelection(delta) {
    const nodes = visibleTreeNodes();
    if (!nodes.length) return;
    let index = nodes.indexOf(document.activeElement);
    if (index < 0) {
        const active = nodes.findIndex((node) => node.classList.contains("active"));
        index = active >= 0 ? active : 0;
    }
    focusTreeNode(nodes[Math.max(0, Math.min(nodes.length - 1, index + delta))]);
}
function collapseTreeFolder() {
    const node = document.activeElement;
    if (node?.matches(".tree-folder")) {
        const panel = document.querySelector(`[data-folder-content="${node.dataset.folder}"]`);
        if (panel && !panel.classList.contains("closed")) {
            panel.classList.add("closed");
            node.classList.add("collapsed");
            node.querySelector(".tree-chevron").textContent = "›";
            return true;
        }
    }
    const container = node?.closest(".tree-children");
    if (container) {
        const parent = document.querySelector(`[data-folder="${container.dataset.folderContent}"]`);
        if (parent) {
            focusTreeNode(parent);
            return true;
        }
    }
    return false;
}
function expandTreeFolder() {
    const node = document.activeElement;
    if (!node?.matches(".tree-folder")) return false;
    const panel = document.querySelector(`[data-folder-content="${node.dataset.folder}"]`);
    if (!panel) return true;
    if (panel.classList.contains("closed")) {
        panel.classList.remove("closed");
        node.classList.remove("collapsed");
        node.querySelector(".tree-chevron").textContent = "⌄";
    }
    const child = visibleTreeNodes().find((item) => item.closest(".tree-children") === panel);
    if (child) focusTreeNode(child);
    return true;
}
function openTreeSelection() {
    const node = document.activeElement;
    if (node?.matches(".tree-folder")) {
        expandTreeFolder();
        return;
    }
    if (node?.matches(".tree-file")) {
        node.click();
        treeNavigationActive = false;
        setTimeout(focusEditor, 0);
    }
}
$("#collapse-explorer").addEventListener("click", () => toggleExplorer(false));
$("#explorer-toggle").addEventListener("click", () => toggleExplorer());
$("#file-tree").addEventListener("focusin", (event) => {
    const node = event.target.closest(".tree-file,.tree-folder");
    if (node) {
        treeNavigationActive = true;
        document
            .querySelectorAll("#file-tree .keyboard-selected")
            .forEach((item) => item.classList.remove("keyboard-selected"));
        node.classList.add("keyboard-selected");
    }
});
$("#file-tree").addEventListener("click", (event) => {
    const node = event.target.closest(".tree-file,.tree-folder");
    if (node?.matches(".tree-folder")) focusTreeNode(node);
    if (node?.matches(".tree-file")) {
        treeNavigationActive = false;
        setTimeout(focusEditor, 0);
    }
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
[
    ["#primary-pane", "left"],
    ["#secondary-pane", "right"],
].forEach(([selector, side]) => {
    const pane = $(selector);
    pane.addEventListener("focusin", () => {
        if (splitState) splitState.active = side;
    });
    pane.addEventListener("pointerdown", () => {
        if (splitState) splitState.active = side;
    });
});
$("#theme-toggle").addEventListener("click", () =>
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"),
);
function setTheme(theme, persist = true) {
    document.documentElement.dataset.theme = theme;
    if (persist) localStorage.setItem("portfolio-theme", theme);
    const b = $("#theme-toggle");
    b.textContent = theme === "dark" ? "☼" : "☾";
    b.title = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#292522" : "#F1F1F1";
    if ($("#status")) renderChrome();
}
setTheme(document.documentElement.dataset.theme || "dark", false);
