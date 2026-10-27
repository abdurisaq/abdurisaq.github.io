/* Ex commands, help dialog, and global keyboard mappings. */
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
    switch (name.toLowerCase()) {
        case "e":
        case "edit": {
            const value = arg.replace(/^\/?/, "");
            const noExtension = value.replace(/\.md$/i, "");
            const match = searchItems.find(
                (x) =>
                    x.label === value ||
                    x.path === value ||
                    x.path?.replace(/\.md$/i, "") === noExtension ||
                    x.route.replace(/^#\/?/, "") === value ||
                    x.route === `#/${value}`,
            );
            if (match) location.hash = match.route;
            else if (value === "~" || value === "index.lua" || value === "") location.hash = "#/";
            else flashCommand(`E345: File not found: ${value}`);
            closeCommand();
            break;
        }
        case "vsplit":
        case "vs":
            closeCommand();
            openSplit(arg, "vertical");
            break;
        case "split":
        case "sp":
            closeCommand();
            openSplit(arg, "horizontal");
            break;
        case "only":
        case "on":
            closeCommand();
            closeToActiveSplit();
            break;
        case "close":
        case "clo":
            closeCommand();
            if (splitState) closeCurrentSplitPane();
            else closeBuffer(activeBuffer);
            break;
        case "wincmd":
        case "windcmd": {
            closeCommand();
            const direction = arg.trim().toLowerCase();
            if (direction === "h") activateSplit("left");
            else if (direction === "l") activateSplit("right");
            else if (direction === "o") focusOtherSplit();
            break;
        }
        case "bn":
        case "bnext":
            closeCommand();
            cycleBuffer(1);
            break;
        case "bp":
        case "bprevious":
            closeCommand();
            cycleBuffer(-1);
            break;
        case "bd":
        case "bdelete":
            closeCommand();
            closeBuffer(activeBuffer);
            break;
        case "q":
        case "quit":
            closeCommand();
            if (splitState) closeCurrentSplitPane();
            else closeBuffer(activeBuffer);
            break;
        case "qa":
        case "qall":
            closeCommand();
            splitState = null;
            buffers.splice(0, buffers.length, "home");
            activeBuffer = "home";
            location.hash = "#/";
            break;
        case "colorscheme":
            closeCommand();
            if (arg === "melange") flashCommand("Melange is active.");
            else flashCommand("Only the Melange colorscheme is available.");
            break;
        case "help":
        case "h":
            closeCommand();
            openHelp();
            break;
        case "telescope":
        case "files":
            closeCommand();
            openSearch(/grep|live_grep/i.test(arg) ? "grep" : "files");
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
    const paletteOpen = !$("#search-overlay").hidden;
    if (paletteOpen) {
        if (e.key === "Escape") {
            e.preventDefault();
            closeSearch();
            return;
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const count = searchMatches.length;
            if (count) {
                searchIndex = (searchIndex + (e.key === "ArrowDown" ? 1 : -1) + count) % count;
                updateSearchSelection();
            }
            return;
        }
        if (e.key === "Tab") {
            e.preventDefault();
            setSearchMode(searchMode === "files" ? "grep" : "files");
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
    if (
        !$("#command-row").hidden ||
        inEditable(e.target) ||
        e.target.closest?.(".vim-buffer") ||
        e.target.id === "vim-play-command-input"
    )
        return;
    if (e.key === "Escape") {
        if (treeNavigationActive && $("#explorer").contains(document.activeElement)) {
            e.preventDefault();
            focusEditor();
            return;
        }
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
    if (e.key === "/") {
        e.preventDefault();
        pendingKeys = "";
        openSearch("grep");
        return;
    }
    if (e.key === " " && pendingKeys === "space") {
        e.preventDefault();
        pendingKeys = "";
        openSearch("files");
        return;
    }
    if (e.key === " ") {
        e.preventDefault();
        pendingKeys = "space";
        pendingKeysAt = Date.now();
        return;
    }
    if (pendingKeys === "space") {
        pendingKeys = "";
        if (e.key.toLowerCase() === "e") {
            e.preventDefault();
            focusExplorer();
        } else if (e.key.toLowerCase() === "l") {
            e.preventDefault();
            focusEditor();
        } else if (e.key.toLowerCase() === "b") pendingKeys = "space-b";
        else if (e.key.toLowerCase() === "t") pendingKeys = "space-t";
        return;
    }
    if (pendingKeys === "space-b") {
        pendingKeys = "";
        if (e.key.toLowerCase() === "d") closeBuffer(activeBuffer);
        return;
    }
    if (pendingKeys === "space-t") {
        pendingKeys = "";
        if (e.key.toLowerCase() === "v") openSplit("", "vertical");
        else if (e.key.toLowerCase() === "s") openSplit("", "horizontal");
        else if (e.key.toLowerCase() === "h") activateSplit("left");
        else if (e.key.toLowerCase() === "l") activateSplit("right");
        else if (e.key.toLowerCase() === "o") focusOtherSplit();
        else if (e.key.toLowerCase() === "x") closeCurrentSplitPane();
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
    if (pendingKeys === "]" && e.key.toLowerCase() === "b") {
        pendingKeys = "";
        cycleBuffer(1);
        return;
    }
    if (pendingKeys === "[" && e.key.toLowerCase() === "b") {
        pendingKeys = "";
        cycleBuffer(-1);
        return;
    }
    pendingKeys = "";
    const focusInTree =
        e.target.closest?.("#file-tree") ||
        (treeNavigationActive && $("#explorer").contains(document.activeElement));
    if (focusInTree) {
        if (e.key === "j" || e.key === "ArrowDown") {
            e.preventDefault();
            moveTreeSelection(1);
            return;
        }
        if (e.key === "k" || e.key === "ArrowUp") {
            e.preventDefault();
            moveTreeSelection(-1);
            return;
        }
        if (e.key === "h" || e.key === "ArrowLeft") {
            e.preventDefault();
            collapseTreeFolder();
            return;
        }
        if (e.key === "l" || e.key === "ArrowRight") {
            e.preventDefault();
            if (!expandTreeFolder()) openTreeSelection();
            return;
        }
        if (e.key === "Enter") {
            e.preventDefault();
            openTreeSelection();
            return;
        }
        if (e.key === "g") {
            if (treePendingG) {
                treePendingG = false;
                focusTreeNode(visibleTreeNodes()[0]);
            } else treePendingG = true;
            return;
        }
        if (e.key === "G") {
            e.preventDefault();
            treePendingG = false;
            const nodes = visibleTreeNodes();
            focusTreeNode(nodes[nodes.length - 1]);
            return;
        }
    }
    const scroller = splitState && splitState.active === "right" ? $("#split-app") : $("#app");
    if (e.key === "g") {
        const now = Date.now();
        if (now - lastG < 650)
            scroller?.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        lastG = now;
        return;
    }
    if (e.key === "G") {
        scroller?.scrollTo({
            top: scroller.scrollHeight,
            behavior: "smooth",
        });
        return;
    }
    if (e.key === "j") {
        scroller?.scrollBy({
            top: 42,
            behavior: "smooth",
        });
        return;
    }
    if (e.key === "k") {
        scroller?.scrollBy({
            top: -42,
            behavior: "smooth",
        });
        return;
    }
});
