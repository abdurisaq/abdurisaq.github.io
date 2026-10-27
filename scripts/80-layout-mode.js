/* Conventional-layout toggle and persistence. */
// The boring layout keeps the same content and colors, but removes the editor chrome.
function setLayoutMode(mode, persist = true) {
    const boring = mode === "boring";
    document.body.classList.toggle("boring-mode", boring);
    $("#boring-nav").hidden = !boring;
    if (persist) {
        try {
            localStorage.setItem("portfolio-layout", boring ? "boring" : "fun");
        } catch (_) {}
    }
    const button = document.querySelector("[data-boring-toggle]");
    if (button) button.textContent = boring ? "Back to fun" : "Make it boring";
}
try {
    setLayoutMode(localStorage.getItem("portfolio-layout") || "fun", false);
} catch (_) {
    setLayoutMode("fun", false);
}
document.addEventListener("click", (event) => {
    if (event.target.closest("[data-boring-toggle]")) setLayoutMode("boring");
    if (event.target.closest("[data-fun-toggle]")) setLayoutMode("fun");
});
