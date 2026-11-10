/* GitHub-backed dotfiles panel and its request cache. */
/* ---------- live dotfiles panel ---------- */
const ago = (d) => {
    const s = (Date.now() - new Date(d)) / 1e3;
    const units = [
        [31536e3, "year"],
        [2592e3, "month"],
        [86400, "day"],
        [3600, "hour"],
        [60, "minute"],
    ];
    for (const [n, l] of units)
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
        sessionStorage.setItem(
            k,
            JSON.stringify({
                t: Date.now(),
                d,
            }),
        );
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
        box.innerHTML = joinHtml(
            `<div class="box"><h3>${esc(info.full_name)}</h3><p style="margin:0">last pushed <b>`,
            `${ago(info.pushed_at)}</b> · ${paths.length} files · branch <code>${esc(br)}</code> · `,
            `${info.stargazers_count} stars</p></div><div class="box"><h3>Latest commits</h3>`,
            `${commits
                .map((c) =>
                    joinHtml(
                        `<div class="commit"><span>${ago(c.commit.author.date)}</span><a href="${esc(c.html_url)}" `,
                        `target="_blank" rel="noopener">${esc(c.commit.message.split("\n")[0])}</a></div>`,
                    ),
                )
                .join("")}</div>`,
            `<div class="live-layout"><div class="box files" id="files" aria-label="Dotfiles">`,
            `${paths.map((p) => `<button data-p="${esc(p)}" title="${esc(p)}">${esc(p)}</button>`).join("")}</div>`,
            `<section class="box code-panel"><div id="fname" class="code-filename"></div>`,
            `<div class="code-viewport"><pre class="code" id="code"></pre></div></section></div>`,
        );
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
        box.innerHTML = joinHtml(
            `<div class="box">Couldn't reach the GitHub API (${esc(e.message)}). You can still <a href="${REPO}" `,
            `target="_blank" rel="noopener">browse the repo directly</a>.</div>`,
        );
    }
}
