/* Initial route synchronization and hash-change listener. */
function syncRoute() {
    const key = currentKey();
    if (!buffers.includes(key)) buffers.push(key);
    activeBuffer = key;
    if (splitState) {
        if (splitState.active === "left") splitState.leftKey = key;
        else splitState.rightKey = key;
    }
    renderEditor();
}
addEventListener("hashchange", syncRoute);
renderProjectTree();
if (!location.hash) location.hash = "#/";
else syncRoute();
