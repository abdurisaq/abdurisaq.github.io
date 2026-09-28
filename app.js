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
    `<figure class="video-figure"><div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(v.id)}?rel=0" title="${esc(v.title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><figcaption class="video-caption">${esc(v.title)} <a href="https://www.youtube.com/watch?v=${encodeURIComponent(v.id)}" target="_blank" rel="noopener">Watch on YouTube ↗</a></figcaption></figure>`;
const screenshotGallery = (shots) =>
    !shots?.length
        ? ""
        : `<section class="screenshot-section"><div class="section-heading-row"><h2>Project screenshots</h2><span class="section-kicker">drop-in image slots</span></div><div class="screenshot-gallery">${shots.map((shot, i) => `<figure class="screenshot-slot"><div class="screenshot-placeholder"><span>SCREENSHOT ${String(i + 1).padStart(2, "0")}</span><code>${esc(shot.src)}</code><small>Add your image at this path</small></div><img src="${esc(shot.src)}" alt="${esc(shot.alt)}" loading="lazy"><figcaption>${esc(shot.caption || shot.alt)}</figcaption></figure>`).join("")}</div></section>`;
const renderProjectSections = (sections) =>
    (sections || [])
        .map(
            (section) =>
                `<section class="project-story-section"><h2>${esc(section.title)}</h2>${(section.paragraphs || []).map((text) => `<p>${esc(text)}</p>`).join("")}${section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}</section>`,
        )
        .join("");
const renderDeepDive = (dive) =>
    !dive
        ? ""
        : `<section class="deep-dive"><div class="section-heading-row"><h2>Under the hood: reverse engineering Rocket League</h2><span class="section-kicker">UE3 reflection · runtime hooks · binary inspection</span></div><p class="page-intro">${esc(dive.intro)}</p>${(dive.sections || []).map((section) => `<section class="project-story-section"><h3>${esc(section.title)}</h3>${(section.paragraphs || []).map((text) => `<p>${esc(text)}</p>`).join("")}</section>`).join("")}<section class="project-story-section"><h3>My investigation loop</h3><div class="research-flow">${(dive.workflow || []).map((step, i) => `<div class="research-step"><span>${String(i + 1).padStart(2, "0")}</span><strong>${esc(step)}</strong></div>`).join("")}</div></section><figure class="debug-snippet"><figcaption><strong>${esc(dive.snippetTitle || "Debugging excerpt")}</strong><span>${esc(dive.snippetNote || "")}</span></figcaption><pre><code>${esc(dive.snippet || "")}</code></pre></figure>${(dive.resources || []).length ? `<section class="project-story-section research-resources"><h3>Further reading</h3><ul>${dive.resources.map((resource) => `<li><a href="${esc(resource.url)}" target="_blank" rel="noopener">${esc(resource.title)} ↗</a> — ${esc(resource.note)}</li>`).join("")}</ul></section>` : ""}</section>`;
const dataAccessExamples = [
    {
        title: "Read values through a game-facing wrapper",
        note: "This pattern uses named accessors on TrainingEditorSaveDataWrapper, then converts the returned string-like values into std::string.",
        code: `TrainingEditorSaveDataWrapper data = TrainingEditorSaveDataWrapper(p->RPC->TrainingData);
std::string code_from_game = data.GetCode().ToString();
std::string name_from_game = data.GetTM_Name().ToString();`,
        explanation:
            "The wrapper keeps the call site semantic: the code asks for the training code and name instead of manually locating fields in a raw block of memory.",
    },
    {
        title: "Interpret a callback payload with a known layout",
        note: "This layout-based example reads fields after a padding region from the address supplied by the callback wrapper.",
        code: `struct cBall_GameEditor_TA {
    unsigned char pad[0xb10];
    Vector StartLocation;
    Rotator StartRotation;
    float VelocityStartSpeed;
    Rotator VelocityStartRotation;
};

cBall_GameEditor_TA* caller = (cBall_GameEditor_TA*)cw.memory_address;`,
        explanation:
            "This is a lower-level alternative: the cast only gives the bytes a C++ type. It does not prove the offset or field layout is correct. The padding, alignment, field order, and callback contract must be verified for the exact game build before relying on the values.",
    },
];
const renderDataAccessExamples = () =>
    `<section class="project-story-section"><div class="section-heading-row"><h2>Two ways I read game data</h2><span class="section-kicker">wrapper API · verified layout</span></div><p>These examples show two different levels of abstraction. I prefer a named SDK wrapper where one exists; a layout-based view is useful only after the callback payload and field offsets have been checked against the running build.</p>${dataAccessExamples.map((example, i) => `<figure class="debug-snippet"><figcaption><strong>${String(i + 1).padStart(2, "0")} · ${esc(example.title)}</strong><span>${esc(example.note)}</span></figcaption><pre><code>${esc(example.code)}</code></pre><p class="snippet-explanation">${esc(example.explanation)}</p></figure>`).join("")}</section>`;
const deepDiveLink = () =>
    `<section class="deep-dive-link"><div><span class="section-kicker">separate technical article</span><h2>Under the hood: reverse engineering Rocket League</h2><p>The investigation process, UE3 metadata, BakkesMod hooks, and the C++ data-access patterns behind VersatileTraining live in a dedicated deep dive.</p></div><a class="btn" href="#/blog/versatiletraining-reverse-engineering">Read the deep dive <span>↗</span></a></section>`;
const isSmallerProject = (id) => DATA.smallerProjects.some((p) => p.id === id);
const projectRoute = (p) =>
    isSmallerProject(p.id)
        ? `#/smaller-projects/${encodeURIComponent(p.id)}`
        : `#/projects/${encodeURIComponent(p.id)}`;
const projectCard = (p) =>
    `<a class="card" href="${projectRoute(p)}"><h3>${esc(p.name)}</h3><p>${esc(p.summary)}</p>${p.metrics ? `<div class="metric-row">${p.metrics.map((m) => `<span class="metric"><strong>${esc(m.value)}</strong><small>${esc(m.label)}</small></span>`).join("")}</div>` : ""}${tags(p.stack.slice(0, 4))}</a>`;
const fileFor = (page, id) =>
    id
        ? `${id}.md`
        : {
              home: "index.lua",
              about: "about.md",
              setup: "setup.md",
              experience: "work.md",
              projects: "index.lua",
              skills: "skills.md",
              resume: "resume.pdf",
              style: "colorscheme.md",
              community: "community.md",
              blog: "index.md",
              "vim-motions": "vim-motions.md",
          }[page] || "index.lua";
const routeFor = (page, id) =>
    id ? `#/${page}/${encodeURIComponent(id)}` : `#/${page === "home" ? "" : page}`;
const pages = {
    home: () => `<section class="hero"><div class="hi">-- hello, world</div><div class="big">${esc(P.name)}<span style="color:var(--yellow)">.</span></div><p class="sub">${esc(P.tagline)}</p><div class="btns"><a class="btn" href="#/projects">Explore projects <span>↗</span></a><a class="btn alt" href="#/resume">View resume</a><a class="btn alt" href="#/about">About me</a></div></section>
    <section><h2>Featured projects</h2><div class="grid">${DATA.projects.slice(0, 3).map(projectCard).join("")}</div><p style="margin-top:15px"><a href="#/projects">Browse all projects →</a></p></section>
    <section><div class="section-heading-row"><h2>Built for a community</h2><span class="section-kicker">community project</span></div><div class="grid">${DATA.communityProjects.map(projectCard).join("")}</div></section>
    <section><h2>Open-source contributions</h2><p>Ongoing work on a personal Mihon fork, including an upstream bug fix and an extension-filtering contribution.</p><a href="#/community">Read about community contributions →</a></section>
    <section class="home-vim-callout"><div><span class="section-kicker">interactive tutorial</span><h2>Learn vim motions</h2><p>Seven small challenges for the motions that travel with you across Neovim, VS Code, and other editors.</p></div><a class="btn" href="#/vim-motions">Start the lesson <span>↗</span></a></section>
    <section><h2>Get in touch</h2><p><a href="mailto:${esc(P.email)}">${esc(P.email)}</a> <span style="color:var(--dim)">·</span> <a href="${esc(P.github)}" target="_blank" rel="noopener">GitHub ↗</a> <span style="color:var(--dim)">·</span> <a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a></p></section>`,
    about: () =>
        `<h1>about me</h1><section class="cols"><div>${DATA.about.map((x) => `<p>${t(x)}</p>`).join("")}</div><aside class="side">${DATA.facts.map(([k, v]) => `<div style="margin-bottom:8px"><span style="color:var(--cyan)">${esc(k)}:</span> ${t(v)}</div>`).join("")}</aside></section>`,
    experience: () =>
        `<h1>experience</h1><section class="timeline">${DATA.experience.map((j) => `<div class="job"><h3>${t(j.role)}</h3><div class="meta">${t(j.org)} · ${t(j.dates)} · ${t(j.place)}</div><ul>${j.bullets.map((b) => `<li>${t(b)}</li>`).join("")}</ul></div>`).join("")}</section>`,
    projects: () =>
        `<h1>projects</h1><p class="page-intro">Selected work first, followed by community software and smaller independent projects.</p><section><h2>Featured projects</h2><div class="grid">${DATA.projects.slice(0, 3).map(projectCard).join("")}</div></section><section><div class="section-heading-row"><h2>Community project</h2><span class="section-kicker">player adoption</span></div><div class="grid">${DATA.communityProjects.map(projectCard).join("")}</div></section>${DATA.projects.length > 3 ? `<section><h2>Additional selected work</h2><div class="grid">${DATA.projects.slice(3).map(projectCard).join("")}</div></section>` : ""}<section><div class="section-heading-row"><h2>Smaller projects</h2><span class="section-kicker">more experiments</span></div><p>Smaller applications, coursework and systems exercises. Each project has its own page in <code>projects/smaller-projects/</code>.</p><div class="grid">${DATA.smallerProjects.map(projectCard).join("")}</div></section>`,
    project: (id) => {
        const p = [...DATA.projects, ...DATA.communityProjects, ...DATA.smallerProjects].find(
            (x) => x.id === id,
        );
        if (!p) return pages.notfound();
        const projectFolder = isSmallerProject(id) ? "smaller-projects" : "projects";
        return `<div class="crumb"><a href="#/projects">projects</a> / ${projectFolder === "smaller-projects" ? `<span>smaller-projects</span> / ` : ""}${esc(p.id)}</div>
      <h1>${esc(p.name)}</h1>
      <p class="page-intro">${esc(p.summary)}</p>
      ${p.image ? `<figure class="project-media"><img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.name)}" loading="lazy"><figcaption>${esc(p.imageAlt || p.name)}</figcaption></figure>` : ""}
      ${p.metrics ? `<div class="metrics-panel"><div class="metrics-label">${esc(p.metricsLabel || "Community reach · figures provided")}</div><div class="metric-row">${p.metrics.map((m) => `<div class="metric"><strong>${esc(m.value)}</strong><small>${esc(m.label)}</small></div>`).join("")}</div></div>` : ""}
      <div class="cols project-layout"><div>
        <section><h2>What it is</h2><p>${esc(p.about)}</p></section>
        ${renderProjectSections(p.sections)}
        ${p.deepDive ? deepDiveLink() : ""}
        <section><h2>Technical highlights</h2><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></section>
      </div><aside class="side"><h3>Technology</h3>${tags(p.stack)}<h3 style="margin-top:20px">Links</h3>${p.links.map(([n, u]) => `<div style="margin:6px 0"><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)} ↗</a></div>`).join("")}</aside></div>
      ${screenshotGallery(p.screenshots)}
      ${(p.videos || []).length ? `<section><h2>Demo</h2>${p.videos.map(video).join("")}</section>` : ""}`;
    },
    blog: () =>
        `<h1>writing</h1><p class="page-intro">Longer technical notes live here, separate from the project summaries. The project pages stay focused on what I built; the deep dives go into how I investigated and implemented the harder parts.</p><section class="blog-list"><a class="blog-card" href="#/blog/versatiletraining-reverse-engineering"><span class="section-kicker">reverse engineering · C++ · BakkesMod</span><h2>Inside VersatileTraining: investigating Rocket League game data</h2><p>From UE3 metadata and function discovery to BakkesMod hooks, parameter inspection, and the trade-offs between wrapper APIs and verified memory layouts.</p><span class="blog-read">Read article ↗</span></a></section>`,
    blogArticle: (id) => {
        if (id !== "versatiletraining-reverse-engineering") return pages.notfound();
        const project = DATA.projects.find((item) => item.id === "versatiletraining");
        const dive = project?.deepDive;
        if (!dive) return pages.notfound();
        return `<div class="crumb"><a href="#/blog">writing</a> / <span>versatiletraining-deep-dive.md</span></div><article class="blog-article"><div class="article-meta"><span>TECHNICAL DEEP DIVE</span><span>Rocket League · UE3 · C++</span></div><h1>Inside VersatileTraining: investigating Rocket League game data</h1><p class="page-intro">A closer look at how I traced game behavior, connected runtime events to BakkesMod callbacks, and worked from readable wrappers toward validated data layouts.</p><p class="article-project-link">Part of <a href="#/projects/versatiletraining">VersatileTraining</a> — a configurable Rocket League training plugin.</p>${renderDeepDive(dive)}${renderDataAccessExamples()}<p class="article-footnote">Offsets and runtime layouts are version-specific. A pointer cast does not validate a structure; the event contract and field layout need to be confirmed against the build being inspected.</p><div class="btns"><a class="btn alt" href="#/projects/versatiletraining">Back to the project</a><a class="btn alt" href="#/blog">All writing</a></div></article>`;
    },
    "vim-motions": () => renderVimTutorialMarkup(),
    skills: () =>
        `<h1>skills</h1><p class="page-intro">Technologies and tools used across projects and coursework.</p>${Object.entries(
            DATA.skills,
        )
            .map(
                ([g, list]) =>
                    `<section class="skill-group"><h2>${esc(g)}</h2><div class="skill-list">${list.map((name) => `<span class="skill-chip">${esc(name)}</span>`).join("")}</div></section>`,
            )
            .join("")}`,
    setup: () =>
        `<h1>my setup</h1><p class="page-intro">${esc(DATA.setup.intro)}</p><section class="setup-grid">${DATA.setup.machines.map((machine) => `<article class="setup-machine"><div class="setup-device">${esc(machine.device)}</div><h2>${esc(machine.system)}</h2><p>${esc(machine.detail)}</p></article>`).join("")}</section><section><h2>How I work</h2><ul>${DATA.setup.workflow.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section><p class="community-footnote">This is a snapshot of the environment I use, not a required stack for the projects above. Individual projects still use the platform and toolchain their requirements call for.</p>`,
    community: () => {
        const m = DATA.community.mihon;
        return `<h1>community contributions</h1><p class="page-intro">Ongoing open-source work and projects shaped by real user workflows. I keep upstream pull requests separate from changes that live only in my fork.</p><section class="community-intro"><div><h2>${esc(m.name)}</h2><p>${esc(m.summary)}</p><a href="${esc(m.repo)}" target="_blank" rel="noopener">View personal fork ↗</a>${m.stack ? tags(m.stack) : ""}</div><div class="contribution-count"><strong>${m.contributions.filter((c) => c.status === "Merged upstream").length}</strong><span>merged upstream</span></div></section><section><h2>Upstream contributions</h2><div class="contribution-list">${m.contributions
            .filter((c) => c.url)
            .map(
                (c) =>
                    `<article class="contribution"><div class="contribution-heading"><h3>${esc(c.title)}</h3><span class="contribution-status ${c.status === "Merged upstream" ? "merged" : "open"}">${esc(c.status)}</span></div><p>${esc(c.detail)}</p><a href="${esc(c.url)}" target="_blank" rel="noopener">View pull request ↗</a></article>`,
            )
            .join(
                "",
            )}</div></section><section><h2>Additional work in the fork</h2><div class="contribution-list">${m.contributions
            .filter((c) => !c.url)
            .map(
                (c) =>
                    `<article class="contribution"><div class="contribution-heading"><h3>${esc(c.title)}</h3><span class="contribution-status fork">${esc(c.status)}</span></div><p>${esc(c.detail)}</p>${c.branchUrl ? `<a href="${esc(c.branchUrl)}" target="_blank" rel="noopener">View implementation branch ↗</a>` : ""}${c.issueUrl ? `${c.branchUrl ? ` <span class="link-separator">·</span> ` : ""}<a href="${esc(c.issueUrl)}" target="_blank" rel="noopener">Original issue #1232 ↗</a>` : ""}</article>`,
            )
            .join(
                "",
            )}</div></section><p class="community-footnote">This is ongoing personal work for a tablet-oriented workflow; upstream status is shown explicitly so proposed and fork-only changes are not presented as merged contributions.</p>`;
    },
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
    explorerVisible = innerWidth > 760,
    pendingKeys = "",
    searchItems = [],
    searchIndex = 0;
const current = () => {
    const parts = location.hash.slice(1).split("/");
    const page = parts[1] || "home";
    const id = parts[2] ? decodeURIComponent(parts[2]) : null;
    return { page, id };
};
const currentKey = () => {
    const { page, id } = current();
    if (page === "projects" && id) return `project:${id}`;
    if (page === "smaller-projects" && id) return `smaller-project:${id}`;
    if (page === "blog" && id) return `blog:${id}`;
    return page;
};
const bufferLabel = (key) => {
    if (key.startsWith("blog:")) return "versatiletraining-deep-dive.md";
    if (key.startsWith("project:") || key.startsWith("smaller-project:"))
        return `${key.slice(key.indexOf(":") + 1)}.md`;
    return fileFor(key);
};
const bufferRoute = (key) => {
    if (key.startsWith("project:")) return routeFor("projects", key.slice(8));
    if (key.startsWith("smaller-project:")) return routeFor("smaller-projects", key.slice(16));
    if (key.startsWith("blog:")) return routeFor("blog", key.slice(5));
    return routeFor(key);
};
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
    const file = bufferLabel(key);
    const parent = key.startsWith("smaller-project:")
        ? "projects / smaller-projects"
        : key.startsWith("project:") || key === "projects"
          ? "projects"
          : key.startsWith("blog:") || key === "blog"
            ? "writing"
            : key === "vim-motions"
              ? "lessons"
              : key === "experience" || key === "skills" || key === "resume"
                ? "experience"
                : "~";
    $("#breadcrumb").innerHTML =
        `<span>${esc(P.handle)}</span> <span style="color:var(--dim)">/</span> <span>${esc(parent)}</span> <span style="color:var(--dim)">/</span> <span class="crumb-current">${esc(file)}</span>`;
    $("#status").innerHTML =
        `<span class="status-mode">NORMAL</span><span class="status-branch">⌥ main</span><span class="status-file">${esc(file)}</span><span class="status-spacer"></span><button class="status-button" id="status-help" title="Keyboard shortcuts">? keys</button><span class="status-theme">${document.documentElement.dataset.theme} · melange</span><span class="status-position">utf-8&nbsp; · &nbsp;${route.page === "home" ? "1:1" : "1:1"}</span>`;
    document
        .querySelectorAll("#file-tree [data-route]")
        .forEach((a) => a.classList.toggle("active", a.dataset.route === route.page && !route.id));
    document
        .querySelectorAll("#file-tree [data-article]")
        .forEach((a) =>
            a.classList.toggle("active", a.dataset.article === route.id && route.page === "blog"),
        );
    document
        .querySelectorAll("#project-tree [data-project], #smaller-project-tree [data-project]")
        .forEach((a) => a.classList.toggle("active", a.dataset.project === route.id));
    document.title = `${P.handle} | ${route.id || route.page}`;
}
function renderEditor() {
    renderChrome();
    const { page, id } = current(),
        key = currentKey();
    const target =
        key.startsWith("project:") || key.startsWith("smaller-project:")
            ? pages.project(id)
            : key.startsWith("blog:")
              ? pages.blogArticle(id)
              : (pages[page] || pages.notfound)();
    $("#app").innerHTML = target;
    document.querySelectorAll(".screenshot-slot img").forEach((img) => {
        img.addEventListener(
            "load",
            () => img.closest(".screenshot-slot")?.classList.add("has-image"),
            { once: true },
        );
        img.addEventListener("error", () => img.remove(), { once: true });
        if (img.complete && img.naturalWidth > 0)
            img.closest(".screenshot-slot")?.classList.add("has-image");
    });
    if (key === "style") loadDotfiles();
    if (key === "vim-motions") initVimTutorial();
}
function renderProjectTree() {
    const ordered = [
        ...DATA.projects.slice(0, 3),
        ...DATA.communityProjects,
        ...DATA.projects.slice(3),
    ];
    $("#project-tree").innerHTML = ordered
        .map(
            (p) =>
                `<a class="tree-file" href="${projectRoute(p)}" data-project="${esc(p.id)}"><span class="file-type md">MD</span><span class="tree-label">${esc(p.id)}.md</span></a>`,
        )
        .join("");
    $("#smaller-project-tree").innerHTML = DATA.smallerProjects
        .map(
            (p) =>
                `<a class="tree-file" href="${projectRoute(p)}" data-project="${esc(p.id)}"><span class="file-type md">MD</span><span class="tree-label">${esc(p.id)}.md</span></a>`,
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
function setTheme(theme, persist = true) {
    document.documentElement.dataset.theme = theme;
    if (persist) {
        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch (_) {}
    }
    const b = $("#theme-toggle");
    b.textContent = theme === "dark" ? "☼" : "☾";
    b.title = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#292522" : "#F1F1F1";
    if ($("#status")) renderChrome();
}
setTheme(document.documentElement.dataset.theme || "dark", false);

// Telescope-style finder: file navigation plus a content-oriented live grep mode.
let searchMode = "files";
function projectSearchContent(p) {
    const deepDive = p.deepDive
        ? [
              p.deepDive.intro,
              ...(p.deepDive.sections || []).flatMap((section) => [
                  section.title,
                  ...(section.paragraphs || []),
                  ...(section.bullets || []),
              ]),
              ...(p.deepDive.workflow || []),
              p.deepDive.snippetNote,
              p.deepDive.snippet,
              ...(p.deepDive.resources || []).flatMap((resource) => [
                  resource.title,
                  resource.note,
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
            label: "projects/",
            path: "projects/",
            detail: "Featured, community and smaller projects",
            route: "#/projects",
            kind: "DIR",
            content: [...DATA.projects, ...DATA.communityProjects, ...DATA.smallerProjects].flatMap(
                projectSearchContent,
            ),
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
            detail: "Resume PDF",
            route: "#/resume",
            kind: "PDF",
            content: ["resume", "curriculum vitae"],
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
            detail: "About this Neovim-inspired interface",
            route: "#/style",
            kind: "PAGE",
            content: ["Melange light dark themes Neovim colorscheme dotfiles live preview"],
        },
        {
            label: "writing/index.md",
            path: "writing/index.md",
            detail: "Technical deep dives and notes",
            route: "#/blog",
            kind: "PAGE",
            content: ["writing blog articles reverse engineering Rocket League BakkesMod C++"],
        },
        {
            label: "versatiletraining-deep-dive.md",
            path: "writing/versatiletraining-deep-dive.md",
            detail: "Inside VersatileTraining: investigating Rocket League game data",
            route: "#/blog/versatiletraining-reverse-engineering",
            kind: "ARTICLE",
            content: [
                DATA.projects.find((p) => p.id === "versatiletraining")?.deepDive?.intro || "",
                ...dataAccessExamples.flatMap((x) => [x.title, x.note, x.code, x.explanation]),
            ],
        },
        {
            label: "vim-motions.md",
            path: "vim-motions.md",
            detail: "Seven-stage interactive Vim motions tutorial",
            route: "#/vim-motions",
            kind: "PLAY",
            content: ["Vim motions hjkl w b e dd x yy p i Esc ciw interactive tutorial"],
        },
    ];
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
function searchExcerpt(item, query) {
    const content = (item.content || []).map((x) => String(x)).filter(Boolean);
    const tokens = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
    const matching =
        content.find((text) => tokens.some((token) => normalizeSearch(text).includes(token))) ||
        content[0] ||
        item.detail;
    const normalized = normalizeSearch(matching);
    const first =
        tokens
            .map((token) => normalized.indexOf(token))
            .filter((index) => index >= 0)
            .sort((a, b) => a - b)[0] ?? 0;
    const start = Math.max(0, first - 52),
        end = Math.min(matching.length, start + 150);
    return `${start > 0 ? "…" : ""}${matching.slice(start, end).trim()}${end < matching.length ? "…" : ""}`;
}
function openSearch(mode = "files") {
    searchMode = mode;
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
function setSearchMode(mode) {
    searchMode = mode;
    searchIndex = 0;
    renderSearchResults($("#palette-input").value);
}
function renderSearchResults(query) {
    const q = query.trim();
    const matches = searchItems
        .map((item) => {
            const content = item.content || [];
            const fields =
                searchMode === "grep"
                    ? content
                    : [item.label, item.path || "", item.detail, ...content];
            return {
                ...item,
                score: scoreSearch(q, fields),
                excerpt: searchMode === "grep" ? searchExcerpt(item, q) : item.detail,
            };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
        .slice(0, 30);
    searchIndex = Math.min(searchIndex, Math.max(0, matches.length - 1));
    $("#palette-modes")
        .querySelectorAll("[data-search-mode]")
        .forEach((button) => {
            const active = button.dataset.searchMode === searchMode;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    $("#palette-results").innerHTML = matches.length
        ? matches
              .map(
                  (item, i) =>
                      `<button class="palette-result ${i === searchIndex ? "selected" : ""}" data-search-route="${esc(item.route)}"><span class="result-symbol">${item.kind === "PROJECT" ? "◇" : item.kind === "DIR" ? "▰" : item.kind === "PLAY" ? "▶" : "▤"}</span><span class="result-copy"><strong>${esc(item.path || item.label)}</strong><small>${esc(item.excerpt || item.detail)}</small></span><span class="result-kind">${esc(item.kind)}</span></button>`,
              )
              .join("")
        : `<div class="palette-empty">No ${searchMode === "grep" ? "content matches" : "matching files"}.</div>`;
}
$("#search-open").addEventListener("click", () => openSearch("files"));
$("#palette-input").addEventListener("input", (e) => {
    searchIndex = 0;
    renderSearchResults(e.target.value);
});
$("#palette-modes").addEventListener("click", (e) => {
    const button = e.target.closest("[data-search-mode]");
    if (button) setSearchMode(button.dataset.searchMode);
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
            const noExtension = value.replace(/\.md$/i, "");
            const match = [...searchItems].find(
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
    if ((e.ctrlKey || e.metaKey) && ["k", "p"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        openSearch("files");
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
    if (e.key === " " && pendingKeys === "space") {
        e.preventDefault();
        pendingKeys = "";
        openSearch("files");
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

/* ---------- interactive Vim motions lesson ---------- */
const VIM_STAGES = [
    {
        title: "Move",
        subtitle: "The home row is your map",
        goal: 'Move the cursor from the start of "the" to the start of "lazy". The target is marked for this first round.',
        lines: ["over the lazy dog"],
        cursor: { line: 0, col: 5 },
        target: { line: 0, col: 9 },
        marker: true,
        teach: "h moves left, j moves down, k moves up, and l moves right. Keep your fingers on the home row.",
    },
    {
        title: "Word motions",
        subtitle: "Move by meaning, not by character",
        goal: 'The marker is gone. Use word motions to place the cursor at the start of "lazy".',
        lines: ["over the lazy dog"],
        cursor: { line: 0, col: 0 },
        target: { line: 0, col: 9 },
        marker: false,
        teach: "w goes to the next word, b goes back, and e lands at the end of a word. Much quicker than l l l l.",
    },
    {
        title: "Delete",
        subtitle: "Remove a whole line",
        goal: 'Delete the line "DELETE ME" and keep the two surrounding lines exactly as they are.',
        lines: ["keep this line", "DELETE ME", "keep this one too"],
        cursor: { line: 1, col: 0 },
        expected: ["keep this line", "keep this one too"],
        teach: "dd deletes the current line. x deletes one character under the cursor.",
    },
    {
        title: "Yank & put",
        subtitle: "Copy a line without selecting it",
        goal: 'Duplicate the first line so the buffer contains "copy me" twice, followed by "leave me".',
        lines: ["copy me", "leave me"],
        cursor: { line: 0, col: 0 },
        expected: ["copy me", "copy me", "leave me"],
        teach: "yy yanks (copies) the current line, and p puts it below the cursor.",
    },
    {
        title: "Insert",
        subtitle: "Temporarily switch modes",
        goal: 'Type "Hello " at the very start of the line, then press Esc to return to normal mode.',
        lines: ["world"],
        cursor: { line: 0, col: 0 },
        expected: ["Hello world"],
        expectedMode: "normal",
        teach: "i enters insert mode, and Esc returns to normal mode. Notice how the editor status color changes with the mode.",
    },
    {
        title: "Change",
        subtitle: "A change is a delete plus insert",
        goal: 'Replace the word "wrong" with "right".',
        lines: ["this word is wrong"],
        cursor: { line: 0, col: 13 },
        expected: ["this word is right"],
        teach: "ciw means change inside word: it removes the word and enters insert mode in one motion. This is the one that tends to stick.",
    },
    {
        title: "Free play",
        subtitle: "Put the motions together",
        goal: "Make the paragraph read cleanly. Use the motions you have learned; there are no key hints on this stage.",
        lines: [
            "Vim turns editing into a sequence of small motions.",
            "A repeated sentence makes this paragraph harder to read.",
            "",
            "A repeated sentence makes this paragraph harder to read.",
            "Fix teh typo before calling it done.",
        ],
        cursor: { line: 0, col: 0 },
        expected: [
            "Vim turns editing into a sequence of small motions.",
            "A repeated sentence makes this paragraph harder to read.",
            "Fix the typo before calling it done.",
        ],
        teach: "You just edited a document without touching the mouse. Try these motions in VS Code with a Vim extension, or in Neovim.",
    },
];
const cloneStageState = (index) => {
    const stage = VIM_STAGES[index];
    return {
        index,
        lines: [...stage.lines],
        line: stage.cursor.line,
        col: stage.cursor.col,
        mode: "normal",
        pending: "",
        yank: null,
        passed: false,
        completed: false,
        message: "",
        shareMessage: "",
    };
};
let vimState = cloneStageState(0);
const vimExpectedStage = (state) => VIM_STAGES[state.index];
const vimCursorFlat = (state) =>
    state.lines.slice(0, state.line).reduce((n, line) => n + line.length + 1, 0) + state.col;
function vimLocationAt(lines, flat) {
    let remaining = Math.max(0, flat);
    for (let line = 0; line < lines.length; line++) {
        if (remaining <= lines[line].length) return { line, col: remaining };
        remaining -= lines[line].length + 1;
    }
    const last = lines.length - 1;
    return { line: last, col: Math.max(0, lines[last].length - 1) };
}
function vimSetFlat(state, flat) {
    const position = vimLocationAt(state.lines, flat);
    state.line = position.line;
    state.col = position.col;
    if (state.mode === "normal")
        state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
}
function vimMoveWord(state, motion) {
    const content = state.lines.join("\n");
    if (!content.length) return;
    let index = vimCursorFlat(state);
    if (motion === "w") {
        index = Math.min(content.length, index + 1);
        while (index < content.length && !/\s/.test(content[index])) index++;
        while (index < content.length && /\s/.test(content[index])) index++;
    } else if (motion === "b") {
        index = Math.max(0, index - 1);
        while (index > 0 && /\s/.test(content[index])) index--;
        while (index > 0 && !/\s/.test(content[index - 1])) index--;
    } else if (motion === "e") {
        index = Math.min(content.length - 1, index + 1);
        while (index < content.length && /\s/.test(content[index])) index++;
        while (index + 1 < content.length && !/\s/.test(content[index + 1])) index++;
    }
    vimSetFlat(state, index);
}
function vimDeleteLine(state) {
    state.lines.splice(state.line, 1);
    if (!state.lines.length) state.lines = [""];
    state.line = Math.min(state.line, state.lines.length - 1);
    state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
}
function vimChangeWord(state) {
    const content = state.lines.join("\n");
    let start = vimCursorFlat(state),
        end = start;
    if (start >= content.length || /\s/.test(content[start] || "")) {
        while (start < content.length && /\s/.test(content[start])) start++;
        end = start;
    }
    while (start > 0 && !/\s/.test(content[start - 1])) start--;
    end = Math.max(start, end);
    while (end < content.length && !/\s/.test(content[end])) end++;
    const next = content.slice(0, start) + content.slice(end);
    state.lines = next.split("\n");
    const position = vimLocationAt(state.lines, start);
    state.line = position.line;
    state.col = position.col;
    state.mode = "insert";
    state.pending = "";
}
function vimHandleKey(event) {
    const key = event.key;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    event.preventDefault();
    event.stopPropagation();
    const state = vimState;
    state.message = "";
    if (state.passed || state.completed) return;

    if (state.mode === "insert") {
        if (key === "Escape") {
            state.mode = "normal";
            state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
        } else if (key === "Backspace") {
            const line = state.lines[state.line];
            if (state.col > 0) {
                state.lines[state.line] = line.slice(0, state.col - 1) + line.slice(state.col);
                state.col--;
            } else if (state.line > 0) {
                const previousLength = state.lines[state.line - 1].length;
                state.lines[state.line - 1] += line;
                state.lines.splice(state.line, 1);
                state.line--;
                state.col = previousLength;
            }
        } else if (key === "Enter") {
            const line = state.lines[state.line];
            state.lines.splice(state.line, 1, line.slice(0, state.col), line.slice(state.col));
            state.line++;
            state.col = 0;
        } else if (key.length === 1) {
            const line = state.lines[state.line];
            state.lines[state.line] = line.slice(0, state.col) + key + line.slice(state.col);
            state.col++;
        }
        renderVimBuffer();
        return;
    }

    if (state.pending === "d") {
        state.pending = "";
        if (key === "d") vimDeleteLine(state);
        renderVimBuffer();
        return;
    }
    if (state.pending === "y") {
        state.pending = "";
        if (key === "y") state.yank = state.lines[state.line];
        renderVimBuffer();
        return;
    }
    if (state.pending === "c") {
        state.pending = key === "i" ? "ci" : "";
        renderVimBuffer();
        return;
    }
    if (state.pending === "ci") {
        state.pending = "";
        if (key === "w") vimChangeWord(state);
        renderVimBuffer();
        return;
    }

    const line = state.lines[state.line] || "";
    switch (key) {
        case "h":
            state.col = Math.max(0, state.col - 1);
            break;
        case "l":
            state.col = Math.min(Math.max(0, line.length - 1), state.col + 1);
            break;
        case "j":
            state.line = Math.min(state.lines.length - 1, state.line + 1);
            state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
            break;
        case "k":
            state.line = Math.max(0, state.line - 1);
            state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
            break;
        case "w":
        case "b":
        case "e":
            vimMoveWord(state, key);
            break;
        case "d":
            state.pending = "d";
            break;
        case "y":
            state.pending = "y";
            break;
        case "c":
            state.pending = "c";
            break;
        case "i":
            state.mode = "insert";
            break;
        case "x":
            if (line.length && state.col < line.length)
                state.lines[state.line] = line.slice(0, state.col) + line.slice(state.col + 1);
            state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
            break;
        case "p":
            if (state.yank !== null) {
                state.lines.splice(state.line + 1, 0, state.yank);
                state.line++;
                state.col = 0;
            }
            break;
        default:
            break;
    }
    renderVimBuffer();
}
function renderVimBuffer() {
    const buffer = $("#vim-buffer");
    if (!buffer) return;
    const stage = vimExpectedStage(vimState);
    buffer.innerHTML = vimState.lines
        .map((line, lineIndex) => {
            const chars = line.length
                ? [...line]
                      .map((char, col) => {
                          const isCursor = vimState.line === lineIndex && vimState.col === col;
                          const isTarget =
                              stage.marker &&
                              stage.target?.line === lineIndex &&
                              stage.target?.col === col;
                          const value = char === " " ? "&nbsp;" : esc(char);
                          return `<span class="vim-char${isTarget ? " vim-target" : ""}${isCursor ? " vim-cursor" : ""}">${value}</span>`;
                      })
                      .join("")
                : `<span class="vim-char${vimState.line === lineIndex ? " vim-cursor" : ""}">&nbsp;</span>`;
            return `<div class="vim-line"><span class="vim-line-number">${String(lineIndex + 1).padStart(2, "0")}</span><span class="vim-line-text">${chars}</span></div>`;
        })
        .join("");
    const mode = $("#vim-mode-pill");
    if (mode) {
        mode.textContent = vimState.mode === "insert" ? "INSERT" : "NORMAL";
        mode.className = `vim-mode-pill ${vimState.mode}`;
    }
    const position = $("#vim-position");
    if (position) position.textContent = `${vimState.line + 1}:${vimState.col + 1}`;
    const pending = $("#vim-pending");
    if (pending)
        pending.textContent = vimState.pending ? ` ${vimState.pending.toUpperCase()}…` : "";
    const lineCount = document.querySelector(".vim-editor-title-right");
    if (lineCount)
        lineCount.textContent = `${String(vimState.lines.length).padStart(2, "0")} lines`;
    const feedback = $("#vim-feedback");
    if (feedback && feedback.classList.contains("is-error")) {
        feedback.textContent = "";
        feedback.className = "vim-feedback";
    }
}
function vimStageMatches() {
    const stage = vimExpectedStage(vimState);
    if (stage.target)
        return vimState.line === stage.target.line && vimState.col === stage.target.col;
    const sameBuffer = JSON.stringify(vimState.lines) === JSON.stringify(stage.expected);
    const correctMode = !stage.expectedMode || vimState.mode === stage.expectedMode;
    return sameBuffer && correctMode;
}
function checkVimStage() {
    if (vimState.passed || vimState.completed) return;
    if (!vimStageMatches()) {
        vimState.message = "Not there yet. Keep editing, then check again.";
        const feedback = $("#vim-feedback");
        if (feedback) {
            feedback.textContent = vimState.message;
            feedback.className = "vim-feedback is-error";
        }
        return;
    }
    vimState.passed = true;
    vimState.message = "Stage complete.";
    if (vimState.index === VIM_STAGES.length - 1) {
        vimState.completed = true;
        renderVimTutorialPage();
        return;
    }
    const teach = $("#vim-teach");
    if (teach) {
        teach.hidden = false;
        teach.innerHTML = `<span class="section-kicker">WHAT YOU LEARNED</span><p>${esc(vimExpectedStage(vimState).teach)}</p><button class="btn" id="vim-next" type="button">Next stage <span>→</span></button>`;
        $("#vim-next")?.addEventListener("click", nextVimStage);
    }
    const check = $("#vim-check");
    if (check) check.disabled = true;
    const feedback = $("#vim-feedback");
    if (feedback) {
        feedback.textContent = "Nice. The buffer matches the goal.";
        feedback.className = "vim-feedback is-success";
    }
}
function resetVimStage() {
    vimState = cloneStageState(vimState.index);
    renderVimTutorialPage();
    $("#vim-buffer")?.focus();
}
function nextVimStage() {
    vimState = cloneStageState(vimState.index + 1);
    renderVimTutorialPage();
    $("#vim-buffer")?.focus();
}
function restartVimLesson() {
    vimState = cloneStageState(0);
    renderVimTutorialPage();
    $("#vim-buffer")?.focus();
}
async function shareVimLesson() {
    const shareData = {
        title: "Vim Motions — Interactive Tutorial",
        text: "I finished this seven-stage Vim motions tutorial.",
        url: `${location.origin}${location.pathname}#/vim-motions`,
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            vimState.shareMessage = "Share sheet opened.";
        } else if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(shareData.url);
            vimState.shareMessage = "Link copied to clipboard.";
        } else {
            const field = document.createElement("textarea");
            field.value = shareData.url;
            field.style.position = "fixed";
            field.style.opacity = "0";
            document.body.appendChild(field);
            field.select();
            const copied = document.execCommand("copy");
            field.remove();
            vimState.shareMessage = copied ? "Link copied to clipboard." : shareData.url;
        }
    } catch (error) {
        if (error?.name !== "AbortError")
            vimState.shareMessage = "Sharing was not available in this browser.";
    }
    const status = $("#vim-share-status");
    if (status) status.textContent = vimState.shareMessage;
}
function renderVimTutorialMarkup() {
    if (vimState.completed)
        return `<div class="vim-completion"><div class="section-kicker">LESSON COMPLETE</div><div class="completion-mark">✓</div><h1>You just edited a document without touching the mouse.</h1><p class="page-intro">You used motions to navigate, delete, copy, insert, and change text. Open VS Code, install a Vim extension, and try w, dd, and ciw on real code. The same ideas work in Neovim and many other editors, too.</p><section class="learned-keys"><h2>Keys and commands learned</h2><div class="key-list">${["h", "j", "k", "l", "w", "b", "e", "dd", "x", "yy", "p", "i", "Esc", "ciw"].map((key) => `<span class="key-chip"><kbd>${key}</kbd></span>`).join("")}</div></section><section class="completion-resources"><h2>Take the motions with you</h2><a href="${esc(REPO)}" target="_blank" rel="noopener"><strong>Author’s dotfiles</strong><span>${esc(REPO)} ↗</span></a><a href="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim" target="_blank" rel="noopener"><strong>Vim extension for VS Code</strong><span>VSCodeVim · Visual Studio Marketplace ↗</span></a><a href="https://neovim.io/doc/user/" target="_blank" rel="noopener"><strong>Neovim :help</strong><span>Open the help docs, or type :help inside Neovim ↗</span></a></section><div class="completion-actions"><button class="btn" id="vim-share" type="button">Share lesson <span>↗</span></button><button class="btn alt" id="vim-restart" type="button">Play again</button><span id="vim-share-status" class="vim-share-status" aria-live="polite">${esc(vimState.shareMessage)}</span></div></div>`;
    const stage = vimExpectedStage(vimState);
    const stepDots = VIM_STAGES.map(
        (item, index) =>
            `<span class="vim-step${index < vimState.index ? " done" : ""}${index === vimState.index ? " current" : ""}" aria-label="Stage ${index + 1}${index < vimState.index ? ", complete" : ""}">${index + 1}</span>`,
    ).join("");
    return `<div class="vim-lesson"><div class="vim-lesson-intro"><div class="section-kicker">INTERACTIVE TUTORIAL · 7 STAGES</div><h1>Vim motions</h1><p>I'm not going to convince you to switch to Neovim. But the best part of the ecosystem — vim motions — travels with you. VS Code, your browser, your IDE. Once it clicks, going back to the mouse feels like a downgrade.</p></div><div class="vim-progress" aria-label="Lesson progress">${stepDots}</div><div class="vim-stage-heading"><div><span class="section-kicker">STAGE ${vimState.index + 1} OF ${VIM_STAGES.length}</span><h2>${esc(stage.title)} <span>— ${esc(stage.subtitle)}</span></h2></div><button class="vim-reset-inline" type="button" id="vim-reset-top">Reset stage ↺</button></div><div class="vim-layout"><section class="vim-instructions"><div class="vim-goal"><span class="section-kicker">YOUR GOAL</span><p>${esc(stage.goal)}</p></div>${vimState.index < 6 ? `<div class="vim-key-hints"><span class="section-kicker">KEYS TO TRY</span>${vimState.index === 0 ? `<div class="motion-grid"><kbd>h</kbd><span>left</span><kbd>j</kbd><span>down</span><kbd>k</kbd><span>up</span><kbd>l</kbd><span>right</span></div>` : vimState.index === 1 ? `<div class="motion-grid"><kbd>w</kbd><span>next word</span><kbd>b</kbd><span>previous word</span><kbd>e</kbd><span>end of word</span></div>` : vimState.index === 2 ? `<div class="motion-grid"><kbd>dd</kbd><span>delete line</span><kbd>x</kbd><span>delete character</span></div>` : vimState.index === 3 ? `<div class="motion-grid"><kbd>yy</kbd><span>yank line</span><kbd>p</kbd><span>put below</span></div>` : vimState.index === 4 ? `<div class="motion-grid"><kbd>i</kbd><span>insert</span><kbd>Esc</kbd><span>normal mode</span></div>` : `<div class="motion-grid"><kbd>ciw</kbd><span>change inside word</span><kbd>Esc</kbd><span>return to normal</span></div>`}</div>` : `<div class="vim-key-hints no-hints"><span class="section-kicker">FREE PLAY</span><p>No hints here. Put the motions together.</p></div>`}<div id="vim-teach" class="vim-teach" ${vimState.passed ? "" : "hidden"}><span class="section-kicker">WHAT YOU LEARNED</span><p>${esc(stage.teach)}</p>${vimState.index < 6 ? `<button class="btn" id="vim-next" type="button">Next stage <span>→</span></button>` : ""}</div></section><section class="vim-practice" aria-label="Practice editor"><div class="vim-editor-window"><div class="vim-editor-title"><span class="vim-file-dot"></span><span>practice.txt</span><span class="vim-editor-title-right">${String(vimState.lines.length).padStart(2, "0")} lines</span></div><div id="vim-buffer" class="vim-buffer" tabindex="0" role="application" aria-label="Vim practice buffer. Focus here and use the keyboard to edit the text."><div class="vim-line"><span class="vim-line-number">01</span><span class="vim-line-text">Click or focus here to start</span></div></div><div class="vim-editor-footer"><span id="vim-mode-pill" class="vim-mode-pill normal">NORMAL</span><span id="vim-pending" class="vim-pending"></span><span class="vim-footer-spacer"></span><span id="vim-position">1:1</span><span>utf-8</span></div></div><div class="vim-editor-actions"><button class="btn" id="vim-check" type="button" ${vimState.passed ? "disabled" : ""}>Check goal</button><button class="btn alt" id="vim-reset" type="button">Reset</button><span id="vim-feedback" class="vim-feedback" aria-live="polite">${esc(vimState.message)}</span></div><p class="vim-editor-hint">Keyboard input goes to the editor while it is focused. Click the buffer, then use the motions — no mouse editing required.</p></section></div></div>`;
}
function renderVimTutorialPage() {
    const app = $("#app");
    if (!app) return;
    app.innerHTML = renderVimTutorialMarkup();
    initVimTutorial();
}
function initVimTutorial() {
    if (vimState.completed) {
        $("#vim-share")?.addEventListener("click", shareVimLesson);
        $("#vim-restart")?.addEventListener("click", restartVimLesson);
        return;
    }
    const buffer = $("#vim-buffer");
    if (buffer) {
        renderVimBuffer();
        buffer.addEventListener("keydown", vimHandleKey);
        buffer.addEventListener("click", () => buffer.focus());
    }
    $("#vim-check")?.addEventListener("click", () => {
        checkVimStage();
        buffer?.focus();
    });
    $("#vim-reset")?.addEventListener("click", resetVimStage);
    $("#vim-reset-top")?.addEventListener("click", resetVimStage);
    $("#vim-next")?.addEventListener("click", nextVimStage);
}

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
        box.innerHTML = `<div class="box"><h3>${esc(info.full_name)}</h3><p style="margin:0">last pushed <b>${ago(info.pushed_at)}</b> · ${paths.length} files · branch <code>${esc(br)}</code> · ${info.stargazers_count} stars</p></div><div class="box"><h3>Latest commits</h3>${commits.map((c) => `<div class="commit"><span>${ago(c.commit.author.date)}</span><a href="${esc(c.html_url)}" target="_blank" rel="noopener">${esc(c.commit.message.split("\n")[0])}</a></div>`).join("")}</div><div class="live-layout"><div class="box files" id="files" aria-label="Dotfiles">${paths.map((p) => `<button data-p="${esc(p)}" title="${esc(p)}">${esc(p)}</button>`).join("")}</div><section class="box code-panel"><div id="fname" class="code-filename"></div><div class="code-viewport"><pre class="code" id="code"></pre></div></section></div>`;
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
