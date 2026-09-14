const $ = (s) => document.querySelector(s);
const esc = (s) =>
    String(s).replace(
        /[&<>"]/g,
        (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
const t = (s) => (/^TODO/.test(s) ? `<span class="todo">${esc(s)}</span>` : esc(s));
const P = DATA.profile,
    D = DATA.dotfiles,
    REPO = `https://github.com/${D.user}/${D.repo}`;
const NAV = [
    ["home", "~/"],
    ["about", "about.md"],
    ["experience", "experience.md"],
    ["projects", "projects/"],
    ["skills", "skills.lua"],
    ["resume", "resume.pdf"],
    ["style", "why-nvim?"],
];
const tags = (a) =>
    `<div class="tags">${a.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>`;
const video = (v) =>
    `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(v.id)}" title="${esc(v.title)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div><p class="todo" style="margin-bottom:24px">${esc(v.title)}</p>`;
const projectCard = (p) =>
    `<a class="card" href="#/projects/${p.id}"><h3>${esc(p.name)}</h3><p>${esc(p.summary)}</p>${tags(p.stack.slice(0, 4))}</a>`;

const pages = {
    home: () => `<section class="hero"><div class="hi">hi, i'm</div><div class="big">${esc(P.name)}</div>
    <p class="sub">${esc(P.tagline)}</p>
    <div class="btns"><a class="btn" href="#/projects">view projects</a><a class="btn alt" href="#/resume">resume</a><a class="btn alt" href="#/about">about me</a><a class="btn alt" href="#/style">why does this look like nvim?</a></div></section>
    <section><h2>featured projects</h2><div class="grid">${DATA.projects.map(projectCard).join("")}</div></section>
    <section><h2>contact</h2><p><a href="mailto:${esc(P.email)}">${esc(P.email)}</a> &middot; <a href="${esc(P.github)}" target="_blank" rel="noopener">github</a> &middot; <a href="${esc(P.linkedin)}" target="_blank" rel="noopener">linkedin</a></p></section>`,

    about: () => `<h1>about me</h1><section class="cols"><div>${DATA.about.map((x) => `<p>${t(x)}</p>`).join("")}</div>
    <aside class="side">${DATA.facts.map(([k, v]) => `<div><span class="todo">${esc(k)}:</span> ${t(v)}</div>`).join("")}</aside></section>`,

    experience: () =>
        `<h1>experience</h1><section class="timeline">${DATA.experience
            .map(
                (j) => `<div class="job"><h3>${t(j.role)}</h3>
    <div class="meta">${t(j.org)} &middot; ${t(j.dates)} &middot; ${t(j.place)}</div><ul>${j.bullets.map((b) => `<li>${t(b)}</li>`).join("")}</ul></div>`,
            )
            .join("")}</section>`,

    projects: () =>
        `<h1>projects</h1><p class="todo">Click a project for the demo video, details and links.</p><div class="grid">${DATA.projects.map(projectCard).join("")}</div>`,

    project: (id) => {
        const p = DATA.projects.find((x) => x.id === id);
        if (!p) return pages.notfound();
        return `<div class="crumb"><a href="#/projects">projects/</a>${esc(p.id)}</div><h1>${esc(p.name)}</h1><p>${esc(p.summary)}</p>
    ${p.videos.map(video).join("")}
    <div class="cols"><div><section><h2>about</h2><p>${esc(p.about)}</p></section><section><h2>highlights</h2><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></section></div>
    <aside class="side"><h3>stack</h3>${tags(p.stack)}<h3 style="margin-top:18px">links</h3>${p.links.map(([n, u]) => `<div><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)} &#8599;</a></div>`).join("")}</aside></div>`;
    },

    skills: () =>
        `<h1>skills</h1>${Object.entries(DATA.skills)
            .map(
                ([g, list]) =>
                    `<section><h2>${esc(g)}</h2><div class="skills">${list
                        .map(
                            ([n, i]) =>
                                `<div class="skill"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${i}/${i}-original.svg" alt="" loading="lazy" onerror="this.style.display='none'">${esc(n)}</div>`,
                        )
                        .join("")}</div></section>`,
            )
            .join("")}`,

    resume: () => `<h1>resume</h1><div class="btns" style="margin:0 0 16px"><a class="btn" href="${esc(P.resume)}" download>download pdf</a><a class="btn alt" href="${esc(P.resume)}" target="_blank" rel="noopener">open in new tab</a></div>
    <object class="pdf" data="${esc(P.resume)}" type="application/pdf"><p class="todo" style="padding:20px">No PDF found. Put your resume at <code>${esc(P.resume)}</code>, or use the download button.</p></object>`,

    style: () => `<h1>where does this style come from?</h1>
    <p>This site looks like Neovim because I live in it. The colours, keybinding-style navigation and file-tab layout come from my own editor setup, and the panel below is not a screenshot: it reads my real <a href="${REPO}" target="_blank" rel="noopener">dotfiles repo</a> from GitHub every time you load the page. Push a change to my config and it shows up here.</p>
    <div class="btns" style="margin:0 0 24px"><a class="btn" href="${REPO}" target="_blank" rel="noopener">view my dotfiles on github &#8599;</a><a class="btn alt" href="${REPO}/fork" target="_blank" rel="noopener">fork it</a></div>
    <p>If you like it, go check it out, steal what you want, and tell me what you'd change.</p>
    <div id="live"><div class="box todo">loading dotfiles from GitHub...</div></div>`,

    notfound: () => `<h1>E492: not an editor command</h1><p><a href="#/">:e ~/</a></p>`,
};

function render() {
    const [, page = "home", id] = location.hash.slice(1).split("/");
    const key = page === "projects" && id ? "project" : pages[page] ? page : "notfound";
    $("#nav").innerHTML =
        `<a class="brand" href="#/">${esc(P.handle)}</a>` +
        NAV.map(
            ([k, l]) =>
                `<a href="#/${k === "home" ? "" : k}" class="${k === page || (k === "home" && !page) ? "on" : ""}">${l}</a>`,
        ).join("");
    $("#app").innerHTML = pages[key](id);
    $("#status").innerHTML =
        `<span class="mode">NORMAL</span><span>${esc(location.hash.slice(2) || "home")}</span><span class="sp"></span><span class="opt"><a href="${REPO}" target="_blank" rel="noopener">dotfiles &#8599;</a></span><span class="opt">tokyonight</span>`;
    window.scrollTo(0, 0);
    document.title = `${P.handle} | ${page}`;
    if (key === "style") loadDotfiles();
}
addEventListener("hashchange", render);
render();

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
        box.innerHTML = `<div class="box"><h3>${esc(info.full_name)}</h3><p style="margin:0">last pushed <b>${ago(info.pushed_at)}</b> &middot; ${paths.length} files &middot; branch <code>${esc(br)}</code> &middot; ${info.stargazers_count} stars</p></div>
      <div class="box"><h3>latest commits</h3>${commits.map((c) => `<div class="commit"><span>${ago(c.commit.author.date)}</span><a href="${esc(c.html_url)}" target="_blank" rel="noopener">${esc(c.commit.message.split("\n")[0])}</a></div>`).join("")}</div>
      <div class="cols" style="grid-template-columns:1fr 2fr"><div class="box files" id="files">${paths.map((p) => `<button data-p="${esc(p)}">${esc(p)}</button>`).join("")}</div>
      <div class="box"><div id="fname" style="margin-bottom:8px"></div><pre class="code" id="code"></pre></div></div>`;
        const show = async (p) => {
            document
                .querySelectorAll("#files button")
                .forEach((b) => b.classList.toggle("on", b.dataset.p === p));
            $("#fname").innerHTML =
                `<a href="${REPO}/blob/${br}/${encodeURI(p)}" target="_blank" rel="noopener">${esc(p)} &#8599;</a>`;
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
