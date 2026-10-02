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
        : `<section class="deep-dive"><div class="section-heading-row"><h2>Okay, so how did I figure out what Rocket League was doing?</h2><span class="section-kicker">UE3 · BakkesMod · C++</span></div><p class="page-intro">${esc(dive.intro)}</p>${(dive.sections || []).map((section) => `<section class="project-story-section"><h3>${esc(section.title)}</h3>${(section.paragraphs || []).map((text) => `<p>${esc(text)}</p>`).join("")}</section>`).join("")}<section class="project-story-section"><h3>The loop I kept repeating</h3><div class="research-flow">${(dive.workflow || []).map((step, i) => `<div class="research-step"><span>${String(i + 1).padStart(2, "0")}</span><strong>${esc(step)}</strong></div>`).join("")}</div></section><figure class="debug-snippet"><figcaption><strong>${esc(dive.snippetTitle || "Debugging excerpt")}</strong><span>${esc(dive.snippetNote || "")}</span></figcaption><pre><code>${esc(dive.snippet || "")}</code></pre></figure>${(dive.resources || []).length ? `<section class="project-story-section research-resources"><h3>Further reading</h3><ul>${dive.resources.map((resource) => `<li><a href="${esc(resource.url)}" target="_blank" rel="noopener">${esc(resource.title)} ↗</a> — ${esc(resource.note)}</li>`).join("")}</ul></section>` : ""}</section>`;
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
    `<section class="project-story-section"><div class="section-heading-row"><h2>A couple of ways I pulled values out of the game</h2><span class="section-kicker">wrapper API · verified layout</span></div><p>These examples show two different levels of abstraction. I prefer a named SDK wrapper where one exists; a layout-based view is useful only after the callback payload and field offsets have been checked against the running build.</p>${dataAccessExamples.map((example, i) => `<figure class="debug-snippet"><figcaption><strong>${String(i + 1).padStart(2, "0")} · ${esc(example.title)}</strong><span>${esc(example.note)}</span></figcaption><pre><code>${esc(example.code)}</code></pre><p class="snippet-explanation">${esc(example.explanation)}</p></figure>`).join("")}</section>`;
const articleForProject = (projectId) =>
    (DATA.articles || []).find((article) => article.projectId === projectId);
const deepDiveLink = (p) => {
    const article = articleForProject(p.id);
    return article
        ? `<section class="deep-dive-link"><div><span class="section-kicker">personal project story</span><h2>${esc(article.title)}</h2><p>${esc(article.lede.slice(0, 190))}${article.lede.length > 190 ? "…" : ""}</p></div><a class="btn" href="#/blog/${encodeURIComponent(article.id)}">Read the deep dive <span>↗</span></a></section>`
        : "";
};
const isSmallerProject = (id) => DATA.smallerProjects.some((p) => p.id === id);
const projectRoute = (p) =>
    isSmallerProject(p.id)
        ? `#/smaller-projects/${encodeURIComponent(p.id)}`
        : `#/projects/${encodeURIComponent(p.id)}`;
const featuredProjects = () =>
    ["localtether", "versatiletraining", "privateconvert"]
        .map((id) => DATA.projects.find((project) => project.id === id))
        .filter(Boolean);
const additionalProjects = () =>
    DATA.projects.filter(
        (project) => !featuredProjects().some((featured) => featured.id === project.id),
    );
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
    <section><h2>Featured projects</h2><div class="grid">${featuredProjects().map(projectCard).join("")}</div><p style="margin-top:15px"><a href="#/projects">Browse all projects →</a></p></section>
    <section><div class="section-heading-row"><h2>Built for a community</h2><span class="section-kicker">community project</span></div><div class="grid">${DATA.communityProjects.map(projectCard).join("")}</div></section>
    <section><h2>Open-source contributions</h2><p>Ongoing work on a personal Mihon fork, including an upstream bug fix and an extension-filtering contribution.</p><a href="#/community">Read about community contributions →</a></section>
    <section class="home-vim-callout"><div><span class="section-kicker">interactive tutorial</span><h2>Learn vim motions</h2><p>Seven small challenges for the motions that travel with you across Neovim, VS Code, and other editors.</p></div><a class="btn" href="#/vim-motions">Start the lesson <span>↗</span></a></section>
    <section><h2>Get in touch</h2><p><a href="mailto:${esc(P.email)}">${esc(P.email)}</a> <span style="color:var(--dim)">·</span> <a href="${esc(P.github)}" target="_blank" rel="noopener">GitHub ↗</a> <span style="color:var(--dim)">·</span> <a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a></p></section>`,
    about: () =>
        `<h1>about me</h1><section class="cols"><div>${DATA.about.map((x) => `<p>${t(x)}</p>`).join("")}</div><aside class="side">${DATA.facts.map(([k, v]) => `<div style="margin-bottom:8px"><span style="color:var(--cyan)">${esc(k)}:</span> ${t(v)}</div>`).join("")}</aside></section>`,
    experience: () =>
        `<h1>experience</h1><section class="timeline">${DATA.experience.map((j) => `<div class="job"><h3>${t(j.role)}</h3><div class="meta">${t(j.org)} · ${t(j.dates)} · ${t(j.place)}</div><ul>${j.bullets.map((b) => `<li>${t(b)}</li>`).join("")}</ul></div>`).join("")}</section>`,
    projects: () =>
        `<h1>projects</h1><p class="page-intro">Selected work first, followed by community software and smaller independent projects.</p><section><h2>Featured projects</h2><div class="grid">${featuredProjects().map(projectCard).join("")}</div></section><section><div class="section-heading-row"><h2>Community project</h2><span class="section-kicker">player adoption</span></div><div class="grid">${DATA.communityProjects.map(projectCard).join("")}</div></section>${additionalProjects().length ? `<section><h2>Additional selected work</h2><div class="grid">${additionalProjects().map(projectCard).join("")}</div></section>` : ""}<section><div class="section-heading-row"><h2>Smaller projects</h2><span class="section-kicker">more experiments</span></div><p>Smaller applications, coursework and systems exercises. Each project has its own page in <code>projects/smaller-projects/</code>.</p><div class="grid">${DATA.smallerProjects.map(projectCard).join("")}</div></section>`,
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
        ${deepDiveLink(p)}
        <section><h2>Technical highlights</h2><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></section>
      </div><aside class="side"><h3>Technology</h3>${tags(p.stack)}<h3 style="margin-top:20px">Links</h3>${p.links.map(([n, u]) => `<div style="margin:6px 0"><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)} ↗</a></div>`).join("")}</aside></div>
      ${screenshotGallery(p.screenshots)}
      ${(p.videos || []).length ? `<section><h2>Demo</h2>${p.videos.map(video).join("")}</section>` : ""}`;
    },
    blog: () =>
        `<h1>writing</h1><p class="page-intro">The project pages are the quick version. These are the stories behind them: what annoyed me enough to start, what broke along the way, and the bits I had to figure out as I went.</p><section class="blog-list">${(DATA.articles || []).map((article) => `<a class="blog-card" href="#/blog/${encodeURIComponent(article.id)}"><span class="section-kicker">${esc(article.kicker)}</span><h2>${esc(article.title)}</h2><p>${esc(article.lede)}</p><span class="blog-read">Read the story ↗</span></a>`).join("")}</section>`,
    blogArticle: (id) => {
        const article = (DATA.articles || []).find((item) => item.id === id);
        if (!article) return pages.notfound();
        const project = [...DATA.projects, ...DATA.communityProjects, ...DATA.smallerProjects].find(
            (item) => item.id === article.projectId,
        );
        const sectionMarkup = (article.sections || [])
            .map(
                (section) =>
                    `<section class="article-section"><h2>${esc(section.title)}</h2>${(section.paragraphs || []).map((text) => `<p>${esc(text)}</p>`).join("")}${section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}${section.code ? `<pre class="article-code"><code>${esc(section.code)}</code></pre>` : ""}${section.callout ? `<blockquote class="article-callout">${esc(section.callout)}</blockquote>` : ""}</section>`,
            )
            .join("");
        const media = article.media?.length
            ? `<section class="article-media-section"><div class="section-heading-row"><h2>Some clips from the project</h2><span class="section-kicker">original walkthroughs</span></div><div class="article-media-grid">${article.media.map((item) => `<figure class="article-media"><img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy"><figcaption>${esc(item.caption || item.alt)}</figcaption></figure>`).join("")}</div><p class="article-media-note">These are the original project demonstrations; the GIFs are loaded from the public repository.</p></section>`
            : "";
        const videos = article.videos?.length
            ? `<section class="article-video-section"><h2>Here's the walkthrough</h2>${article.videos.map(video).join("")}</section>`
            : "";
        const technical =
            article.technicalDive && project?.deepDive
                ? `${renderDeepDive(project.deepDive)}${renderDataAccessExamples()}<p class="article-footnote">Offsets and runtime layouts are build-specific. A pointer cast does not validate a structure; the event contract and field layout need to be checked against the exact build being inspected.</p>`
                : "";
        const resources = article.resources?.length
            ? `<section class="article-section article-resources"><h2>Sources and further reading</h2><ul>${article.resources.map((resource) => `<li><a href="${esc(resource.url)}" target="_blank" rel="noopener">${esc(resource.title)} ↗</a><span> — ${esc(resource.note)}</span></li>`).join("")}</ul></section>`
            : "";
        return `<div class="crumb"><a href="#/blog">writing</a> / <span>${esc(article.filename || `${article.id}.md`)}</span></div><article class="blog-article"><div class="article-meta"><span>PROJECT DEEP DIVE</span><span>${esc(article.kicker)}</span></div><h1>${esc(article.title)}</h1><p class="article-lede">${esc(article.lede)}</p>${project ? `<p class="article-project-link">Part of <a href="${projectRoute(project)}">${esc(project.name)}</a> · <a href="${esc(project.repo)}" target="_blank" rel="noopener">source code ↗</a></p>` : ""}${sectionMarkup}${videos}${media}${technical}${resources}<div class="btns"><a class="btn alt" href="${project ? projectRoute(project) : "#/projects"}">Back to the project</a><a class="btn alt" href="#/blog">All writing</a></div></article>`;
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
    if (key.startsWith("blog:"))
        return (
            (DATA.articles || []).find((article) => article.id === key.slice(5))?.filename ||
            `${key.slice(5)}.md`
        );
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
    $("#app").scrollTop = 0;
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
    const ordered = [...featuredProjects(), ...DATA.communityProjects, ...additionalProjects()];
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
    const articleTree = $("#article-tree");
    if (articleTree)
        articleTree.innerHTML = (DATA.articles || [])
            .map(
                (article) =>
                    `<a class="tree-file" href="#/blog/${encodeURIComponent(article.id)}" data-article="${esc(article.id)}"><span class="file-type md">MD</span><span class="tree-label">${esc(article.filename || `${article.id}.md`)}</span></a>`,
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
    if (a) {
        treeNavigationActive = false;
        setTimeout(() => {
            if (innerWidth <= 760) toggleExplorer(false);
            focusEditor();
        }, 0);
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
            detail: "Personal project stories and technical deep dives",
            route: "#/blog",
            kind: "PAGE",
            content: (DATA.articles || []).flatMap((article) => [
                article.kicker,
                article.title,
                article.lede,
            ]),
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
    (DATA.articles || []).forEach((article) =>
        items.push({
            label: article.filename || `${article.id}.md`,
            path: `writing/${article.filename || `${article.id}.md`}`,
            detail: article.title,
            route: `#/blog/${encodeURIComponent(article.id)}`,
            kind: "ARTICLE",
            content: [
                article.title,
                article.lede,
                ...(article.sections || []).flatMap((section) => [
                    section.title,
                    ...(section.paragraphs || []),
                    ...(section.bullets || []),
                    section.code || "",
                    section.callout || "",
                ]),
                ...(article.resources || []).flatMap((resource) => [resource.title, resource.note]),
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
    if (item.matchExcerpt) return item.matchExcerpt;
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
    const start = Math.max(0, first - 62),
        end = Math.min(matching.length, start + 190);
    return `${start > 0 ? "…" : ""}${matching.slice(start, end).trim()}${end < matching.length ? "…" : ""}`;
}
function highlightSearchText(value, query) {
    const text = String(value || "");
    const terms = String(query || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);
    if (!terms.length) return esc(text);
    const pattern = new RegExp(
        `(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
        "gi",
    );
    return text
        .split(pattern)
        .map((part) =>
            terms.some((term) => part.toLowerCase() === term.toLowerCase())
                ? `<mark class="search-hit">${esc(part)}</mark>`
                : esc(part),
        )
        .join("");
}
function buildGrepMatches(query) {
    const needle = String(query || "").trim();
    if (!needle) return [];
    const matches = [];
    const lowered = needle.toLowerCase();
    for (const item of searchItems) {
        if (item.kind === "DIR") continue;
        const chunks = (item.content || []).map((value) => String(value || "")).filter(Boolean);
        let itemOccurrence = 0;
        for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
            const chunk = chunks[chunkIndex],
                haystack = chunk.toLowerCase();
            let from = 0;
            while ((from = haystack.indexOf(lowered, from)) !== -1) {
                const start = Math.max(0, from - 78),
                    end = Math.min(chunk.length, from + needle.length + 112);
                matches.push({
                    ...item,
                    matchText: chunk,
                    matchStart: from,
                    matchEnd: from + needle.length,
                    matchExcerpt: `${start > 0 ? "…" : ""}${chunk.slice(start, end).trim()}${end < chunk.length ? "…" : ""}`,
                    occurrence: ++itemOccurrence,
                    chunkIndex,
                });
                from += Math.max(needle.length, 1);
                if (matches.length >= 160) return matches;
            }
        }
    }
    return matches;
}
function previewMarkup(item, query) {
    if (!item)
        return `<div class="palette-preview-empty">Type a filename or search term to see a preview.</div>`;
    const content = (item.content || []).map((value) => String(value || "").trim()).filter(Boolean);
    const fullPreview = content.join("\n\n") || item.detail;
    const preview = searchMode === "grep" ? searchExcerpt(item, query) : fullPreview;
    const shown = String(preview || "").slice(0, 14000);
    const pathLabel = item.path || item.label;
    const detail =
        searchMode === "grep" ? `Match ${item.occurrence || 1} · ${item.detail}` : item.detail;
    const pathMarkup =
        searchMode === "grep" ? `<div class="palette-preview-path">${esc(pathLabel)}</div>` : "";
    return `<div class="palette-preview-inner"><div class="palette-preview-meta"><span>${esc(item.kind)}</span><span>${searchMode === "grep" ? "MATCHING TEXT" : "FILE PREVIEW"}</span></div><h3>${esc(item.label || pathLabel)}</h3><p class="palette-preview-detail">${esc(detail)}</p>${pathMarkup}<div class="palette-preview-rule"></div><pre class="palette-preview-excerpt">${highlightSearchText(shown, query)}</pre><div class="palette-preview-open">↵ open file · preview follows ↑ / ↓ and mouse hover</div></div>`;
}
function updateSearchSelection() {
    const buttons = [...$("#palette-results").querySelectorAll("[data-search-index]")];
    buttons.forEach((button, index) => button.classList.toggle("selected", index === searchIndex));
    const selected = buttons[searchIndex];
    if (selected && !selected.matches(":hover")) selected.scrollIntoView({ block: "nearest" });
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
        mode === "grep" ? "Search text across files..." : "Find a file by name...";
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
    target?.focus?.({ preventScroll: true });
    searchReturnFocus = null;
}
function setSearchMode(mode) {
    searchMode = mode;
    searchIndex = 0;
    $("#palette-input").placeholder =
        mode === "grep" ? "Search text across files..." : "Find a file by name...";
    renderSearchResults($("#palette-input").value);
    $("#palette-input").focus();
}
function renderSearchResults(query) {
    const q = query.trim();
    if (searchMode === "grep") {
        searchMatches = buildGrepMatches(q);
    } else {
        // Find files behaves like Telescope find_files: match the filename only, never the parent path or file contents.
        searchMatches = searchItems
            .filter((item) => item.kind !== "DIR")
            .map((item) => ({ ...item, score: scoreSearch(q, [item.label]), excerpt: item.detail }))
            .filter((item) => item.score > 0)
            .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
            .slice(0, 80);
    }
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
                      `<button class="palette-result ${index === searchIndex ? "selected" : ""}" data-search-index="${index}" data-search-route="${esc(item.route)}"><span class="result-symbol">${item.kind === "PROJECT" ? "◇" : item.kind === "PLAY" ? "▶" : "▤"}</span><span class="result-copy"><strong>${esc(item.label || item.path)}</strong><small>${esc(searchMode === "grep" ? item.matchExcerpt || item.detail : item.detail)}</small></span><span class="result-kind">${esc(item.kind)}</span></button>`,
              )
              .join("")
        : `<div class="palette-empty">${searchMode === "grep" ? "No matching text occurrences." : "No files with that name."}</div>`;
    updateSearchSelection();
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
$("#palette-results").addEventListener("click", (e) => {
    const button = e.target.closest("[data-search-route]");
    if (button) {
        location.hash = button.dataset.searchRoute;
        closeSearch();
    }
});
$("#palette-results").addEventListener("pointerover", (event) => {
    const button = event.target.closest("[data-search-index]");
    if (!button) return;
    searchIndex = Number(button.dataset.searchIndex);
    updateSearchSelection();
});
function chooseSearch() {
    const item = searchMatches[searchIndex];
    if (item?.route) {
        location.hash = item.route;
        closeSearch();
    }
}
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
        case "Explore":
        case "Ex":
            closeCommand();
            focusExplorer();
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
let lastG = 0,
    treeNavigationActive = false,
    treePendingG = false,
    siteWindowPending = false,
    vimWindowReturnFocus = null,
    explorerReturnFocus = null,
    pendingKeysAt = 0;
function inEditable(el) {
    return !!(el && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)));
}
function visibleTreeNodes() {
    return [...$("#file-tree").querySelectorAll(".tree-file,.tree-folder")].filter(
        (node) => node.getClientRects().length > 0,
    );
}
function focusTreeNode(node) {
    if (!node) return;
    treeNavigationActive = true;
    node.focus({ preventScroll: true });
    document
        .querySelectorAll("#file-tree .keyboard-selected")
        .forEach((item) => item.classList.remove("keyboard-selected"));
    node.classList.add("keyboard-selected");
    node.scrollIntoView({ block: "nearest" });
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
    const target = vimWindowReturnFocus?.isConnected ? vimWindowReturnFocus : $("#app");
    target?.focus?.({ preventScroll: true });
}
function openCurrentFileFromTree(node) {
    if (!node) return;
    if (node.matches(".tree-folder")) {
        treeFolderAction(true);
        return;
    }
    if (node.matches(".tree-file")) {
        node.click();
        treeNavigationActive = false;
        setTimeout(() => {
            if (innerWidth <= 760) toggleExplorer(false);
            focusEditor();
        }, 0);
    }
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
function focusTreeParent() {
    const currentNode = document.activeElement,
        container = currentNode?.closest(".tree-children");
    if (!container) return;
    const folderId = container.dataset.folderContent;
    const parent = document.querySelector(`[data-folder="${folderId}"]`);
    if (parent) focusTreeNode(parent);
}
function treeFolderAction(open) {
    const node = document.activeElement;
    if (!node?.matches(".tree-folder")) return false;
    const panel = document.querySelector(`[data-folder-content="${node.dataset.folder}"]`);
    if (!panel) return true;
    const isOpen = !panel.classList.contains("closed");
    if (!open && !isOpen) return false;
    if ((open && !isOpen) || (!open && isOpen)) {
        panel.classList.toggle("closed", !open);
        node.classList.toggle("collapsed", !open);
        node.querySelector(".tree-chevron").textContent = open ? "⌄" : "›";
    }
    if (open) {
        const child = visibleTreeNodes().find((item) => item.closest(".tree-children") === panel);
        if (child) focusTreeNode(child);
    }
    return true;
}
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
});
addEventListener("keydown", (event) => {
    const paletteOpen = !$("#search-overlay").hidden;
    if (
        !paletteOpen &&
        !inEditable(event.target) &&
        event.ctrlKey &&
        event.key.toLowerCase() === "w" &&
        !event.metaKey
    ) {
        siteWindowPending = true;
        event.preventDefault();
        return;
    }
    if (siteWindowPending) {
        siteWindowPending = false;
        event.preventDefault();
        if (event.key.toLowerCase() === "l") focusEditor();
        else if (event.key.toLowerCase() === "h") focusExplorer();
        return;
    }
    if (paletteOpen) {
        if (event.key === "Escape") {
            event.preventDefault();
            closeSearch();
            return;
        }
        if (event.ctrlKey && event.key.toLowerCase() === "f") {
            event.preventDefault();
            setSearchMode("files");
            return;
        }
        if (event.ctrlKey && event.key.toLowerCase() === "g") {
            event.preventDefault();
            setSearchMode("grep");
            return;
        }
        if (event.key === "Tab") {
            event.preventDefault();
            setSearchMode(searchMode === "files" ? "grep" : "files");
            return;
        }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const count = searchMatches.length;
            if (count) {
                searchIndex = (searchIndex + (event.key === "ArrowDown" ? 1 : -1) + count) % count;
                updateSearchSelection();
            }
            return;
        }
        if (event.key === "Enter") {
            event.preventDefault();
            chooseSearch();
            return;
        }
        return;
    }
    if (!$("#help-overlay").hidden) {
        if (event.key === "Escape" || event.key === "?") closeHelp();
        return;
    }
    if (!$("#command-row").hidden || inEditable(event.target)) return;
    if (
        event.key === " " &&
        event.target.closest?.("button,[role=button],input,textarea,select,summary") &&
        !$("#file-tree").contains(event.target)
    )
        return;
    if ((event.ctrlKey || event.metaKey) && ["k", "p"].includes(event.key.toLowerCase())) {
        event.preventDefault();
        openSearch("files");
        return;
    }
    if (event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        openSearch("files");
        return;
    }
    if (event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "g") {
        event.preventDefault();
        openSearch("grep");
        return;
    }
    if (event.key === "Escape") {
        if (treeNavigationActive && $("#explorer").contains(document.activeElement)) {
            event.preventDefault();
            focusEditor();
            return;
        }
        pendingKeys = "";
        treeNavigationActive = false;
        return;
    }
    if (event.key === "?") {
        event.preventDefault();
        openHelp();
        return;
    }
    if (event.key === ":") {
        event.preventDefault();
        openCommand();
        return;
    }
    if (event.key === "/") {
        event.preventDefault();
        pendingKeys = "";
        openSearch("grep");
        return;
    }
    if (event.key === " " && pendingKeys === "space" && Date.now() - pendingKeysAt < 1000) {
        event.preventDefault();
        pendingKeys = "";
        openSearch("files");
        return;
    }
    if (event.key === " ") {
        event.preventDefault();
        pendingKeys = "space";
        pendingKeysAt = Date.now();
        return;
    }
    if (pendingKeys === "space") {
        pendingKeys = "";
        if (Date.now() - pendingKeysAt > 1000) return;
        if (event.key.toLowerCase() === "e") {
            event.preventDefault();
            focusExplorer();
        } else if (event.key.toLowerCase() === "l") {
            event.preventDefault();
            focusEditor();
        } else if (event.key.toLowerCase() === "b") pendingKeys = "space-b";
        return;
    }
    if (pendingKeys === "space-b") {
        pendingKeys = "";
        if (event.key.toLowerCase() === "d") closeBuffer(activeBuffer);
        return;
    }
    if (event.key === "]") {
        pendingKeys = "]";
        return;
    }
    if (event.key === "[") {
        pendingKeys = "[";
        return;
    }
    if (pendingKeys === "]" && event.key.toLowerCase() === "b") {
        pendingKeys = "";
        cycleBuffer(1);
        return;
    }
    if (pendingKeys === "[" && event.key.toLowerCase() === "b") {
        pendingKeys = "";
        cycleBuffer(-1);
        return;
    }
    pendingKeys = "";
    const focusInTree =
        event.target.closest?.("#file-tree") ||
        (treeNavigationActive && $("#explorer").contains(document.activeElement));
    if (focusInTree) {
        if (["j", "ArrowDown"].includes(event.key)) {
            event.preventDefault();
            moveTreeSelection(1);
            return;
        }
        if (["k", "ArrowUp"].includes(event.key)) {
            event.preventDefault();
            moveTreeSelection(-1);
            return;
        }
        if (event.key === "h" || event.key === "ArrowLeft") {
            event.preventDefault();
            if (!treeFolderAction(false)) focusTreeParent();
            return;
        }
        if (event.key === "l" || event.key === "ArrowRight") {
            event.preventDefault();
            if (!treeFolderAction(true) && document.activeElement.matches(".tree-file"))
                openCurrentFileFromTree(document.activeElement);
            return;
        }
        if (event.key === "Enter") {
            event.preventDefault();
            openCurrentFileFromTree(document.activeElement);
            return;
        }
        if (event.key === "g") {
            if (treePendingG) {
                event.preventDefault();
                treePendingG = false;
                focusTreeNode(visibleTreeNodes()[0]);
            } else treePendingG = true;
            return;
        }
        if (event.key === "G") {
            event.preventDefault();
            treePendingG = false;
            const nodes = visibleTreeNodes();
            focusTreeNode(nodes[nodes.length - 1]);
            return;
        }
    }
    const content = $("#app");
    if (event.key === "g") {
        const now = Date.now();
        if (now - lastG < 650) content?.scrollTo({ top: 0, behavior: "smooth" });
        lastG = now;
        return;
    }
    if (event.key === "G") {
        content?.scrollTo({ top: content.scrollHeight, behavior: "smooth" });
        return;
    }
    if (event.key === "j") {
        content?.scrollBy({ top: 42, behavior: "smooth" });
        return;
    }
    if (event.key === "k") {
        content?.scrollBy({ top: -42, behavior: "smooth" });
        return;
    }
    if (event.ctrlKey && event.key.toLowerCase() === "d") {
        content?.scrollBy({ top: innerHeight * 0.5, behavior: "smooth" });
        return;
    }
    if (event.ctrlKey && event.key.toLowerCase() === "u") {
        content?.scrollBy({ top: -innerHeight * 0.5, behavior: "smooth" });
        return;
    }
});

/* ---------- interactive Vim motions lesson ---------- */
const VIM_STAGES = [
    {
        title: "Move",
        subtitle: "The home row is your map",
        goal: "Move from the start of 'the' to the start of 'lazy'. This first round shows the target marker.",
        lines: ["over the lazy dog"],
        cursor: { line: 0, col: 5 },
        target: { line: 0, col: 9 },
        marker: true,
        requiredTrace: ["l", "l", "l", "l"],
        requiredLabel: "exactly four l presses",
        teach: "h moves left, j moves down, k moves up, and l moves right. Keep your fingers on the home row.",
    },
    {
        title: "Word motions",
        subtitle: "Move by meaning, not by character",
        goal: "The marker is gone. Use w to move from 'the' to 'lazy'. This stage checks the motion you used, not just the final cursor position.",
        lines: ["over the lazy dog"],
        cursor: { line: 0, col: 5 },
        target: { line: 0, col: 9 },
        marker: false,
        requiredTrace: ["w"],
        requiredLabel: "one w motion",
        teach: "w goes to the next word, b goes back, and e lands at the end of a word. Much quicker than l l l l.",
    },
    {
        title: "Delete",
        subtitle: "Remove a whole line",
        goal: "Delete the line 'DELETE ME' and keep the two surrounding lines exactly as they are.",
        lines: ["keep this line", "DELETE ME", "keep this one too"],
        cursor: { line: 1, col: 0 },
        expected: ["keep this line", "keep this one too"],
        requiredTrace: ["dd"],
        requiredLabel: "dd (delete the current line)",
        teach: "dd deletes the current line. x deletes one character under the cursor.",
    },
    {
        title: "Yank & put",
        subtitle: "Copy a line without selecting it",
        goal: "Duplicate the first line so the buffer contains 'copy me' twice, followed by 'leave me'.",
        lines: ["copy me", "leave me"],
        cursor: { line: 0, col: 0 },
        expected: ["copy me", "copy me", "leave me"],
        requiredTrace: ["yy", "p"],
        requiredLabel: "yy followed by p",
        teach: "yy yanks (copies) the current line, and p puts it below the cursor.",
    },
    {
        title: "Insert",
        subtitle: "Temporarily switch modes",
        goal: "Type 'Hello ' at the very start of the line, then press Esc to return to normal mode.",
        lines: ["world"],
        cursor: { line: 0, col: 0 },
        expected: ["Hello world"],
        expectedMode: "normal",
        requiredTrace: ["i", "type:Hello ", "Esc"],
        requiredLabel: "i, type Hello , then Esc",
        teach: "i enters insert mode, and Esc returns to normal mode. Notice how the editor status color changes with the mode.",
    },
    {
        title: "Change",
        subtitle: "A change is a delete plus insert",
        goal: "Replace the word 'wrong' with 'right'. Use the change-inside-word operator.",
        lines: ["this word is wrong"],
        cursor: { line: 0, col: 13 },
        expected: ["this word is right"],
        expectedMode: "normal",
        requiredTrace: ["ciw", "type:right", "Esc"],
        requiredLabel: "ciw, type right, then Esc",
        teach: "ciw means change inside word: it removes the word and enters insert mode in one motion. This is the one that tends to stick.",
    },
    {
        title: "Free play",
        subtitle: "Put the motions together",
        goal: "Clean up the paragraph: remove the duplicate sentence, remove the blank line, and fix 'teh'. No hints.",
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
        freePlay: true,
        teach: "You just edited a document without touching the mouse. Open VS Code, install a Vim extension, and try w, dd, and ciw on real code.",
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
        windowPending: false,
        yank: null,
        passed: false,
        completed: false,
        message: "",
        shareMessage: "",
        trace: [],
        insertedText: "",
        freeOps: [],
        lastChangedWord: "",
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
    } else {
        index = Math.min(content.length - 1, index + 1);
        while (index < content.length && /\s/.test(content[index])) index++;
        while (index + 1 < content.length && !/\s/.test(content[index + 1])) index++;
    }
    vimSetFlat(state, index);
}
function vimDeleteLine(state) {
    const removed = state.lines.splice(state.line, 1)[0] ?? "";
    if (!state.lines.length) state.lines = [""];
    state.line = Math.min(state.line, state.lines.length - 1);
    state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
    return removed;
}
function vimChangeWord(state) {
    const content = state.lines.join("\n");
    let start = vimCursorFlat(state);
    while (start < content.length && /\s/.test(content[start] || "")) start++;
    while (start > 0 && !/\s/.test(content[start - 1])) start--;
    let end = start;
    while (end < content.length && !/\s/.test(content[end])) end++;
    state.lastChangedWord = content.slice(start, end);
    const next = content.slice(0, start) + content.slice(end);
    state.lines = next.split("\n");
    const position = vimLocationAt(state.lines, start);
    state.line = position.line;
    state.col = position.col;
    state.mode = "insert";
    state.pending = "";
    state.insertedText = "";
}
function focusVimExplorer() {
    const buffer = $("#vim-buffer");
    vimWindowReturnFocus = buffer;
    toggleExplorer(true);
    const nodes = visibleTreeNodes();
    const active = nodes.find((node) => node.classList.contains("active"));
    focusTreeNode(active || nodes[0]);
    setVimMessage(
        "Explorer focused. Use j/k to move, h/l to collapse or expand, and Enter to open. Ctrl+w l returns here.",
    );
}
function openVimCommand() {
    const row = $("#vim-command-row");
    if (!row) return;
    row.hidden = false;
    $("#vim-command-input").value = "";
    $("#vim-command-input").focus();
}
function closeVimCommand() {
    const row = $("#vim-command-row");
    if (row) row.hidden = true;
    $("#vim-buffer")?.focus();
}
function runVimCommand(raw) {
    const trimmed = raw.trim().replace(/^:/, "");
    const [rawName, ...args] = trimmed.split(/\s+/);
    const name = (rawName || "").toLowerCase();
    const arg = args.join(" ");
    if (name === "w" || name === "write") {
        closeVimCommand();
        checkVimStage();
        return;
    }
    if (name === "q" || name === "quit" || name === "q!") {
        closeVimCommand();
        resetVimStage();
        return;
    }
    if (name === "n" || name === "next") {
        closeVimCommand();
        if (vimState.passed) nextVimStage();
        else setVimMessage("Save with :w before moving to the next stage.", true);
        return;
    }
    if (name === "help") {
        setVimMessage(
            "Commands: :w saves/checks, :q resets this stage, :n advances after a pass, :Explore opens the file tree, :Telescope find_files and :Telescope live_grep open search.",
        );
        closeVimCommand();
        return;
    }
    if (name === "explore" || name === "ex") {
        closeVimCommand();
        focusVimExplorer();
        return;
    }
    if (name === "e" || name === "edit") {
        closeVimCommand();
        runCommand(`e ${arg}`);
        return;
    }
    if (name === "telescope" || name === "files" || name === "grep") {
        closeVimCommand();
        openSearch(name === "grep" || /grep|live_grep/i.test(arg) ? "grep" : "files");
        return;
    }
    $("#vim-command-input").value = `E492: unknown command: ${rawName || ""}`;
    $("#vim-command-input").select();
}
function setVimMessage(message, isError = false) {
    vimState.message = message;
    const feedback = $("#vim-feedback");
    if (feedback) {
        feedback.textContent = message;
        feedback.className = `vim-feedback ${isError ? "is-error" : ""}`;
    }
}
function vimHandleKey(event) {
    const state = vimState,
        key = event.key;
    if (event.target?.id === "vim-command-input") return;
    if (key === "/" && state.mode === "normal") {
        event.preventDefault();
        event.stopPropagation();
        openSearch("grep");
        return;
    }
    if (event.ctrlKey && !event.metaKey && !event.altKey && key.toLowerCase() === "w") {
        event.preventDefault();
        event.stopPropagation();
        state.windowPending = true;
        setVimMessage(
            "Window command: press h for Explorer or l to return to the practice buffer.",
        );
        return;
    }
    if (state.windowPending) {
        event.preventDefault();
        event.stopPropagation();
        state.windowPending = false;
        if (key.toLowerCase() === "h") focusVimExplorer();
        else if (key.toLowerCase() === "l") $("#vim-buffer")?.focus();
        return;
    }
    if (
        event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        ["p", "f", "g"].includes(key.toLowerCase())
    ) {
        event.preventDefault();
        event.stopPropagation();
        openSearch(key.toLowerCase() === "g" ? "grep" : "files");
        return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey || ["Shift", "CapsLock"].includes(key))
        return;
    event.preventDefault();
    event.stopPropagation();
    state.message = "";
    if (key === ":" && state.mode === "normal") {
        openVimCommand();
        return;
    }
    if (vimState.passed || vimState.completed) return;
    if (state.mode === "insert") {
        if (key === "Escape") {
            state.mode = "normal";
            state.trace.push(`type:${state.insertedText}`, "Esc");
            state.insertedText = "";
            state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
        } else if (key === "Backspace") {
            const line = state.lines[state.line];
            if (state.col > 0) {
                state.lines[state.line] = line.slice(0, state.col - 1) + line.slice(state.col);
                state.col--;
                state.insertedText = state.insertedText.slice(0, -1);
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
            state.insertedText += "\n";
        } else if (key.length === 1) {
            const line = state.lines[state.line];
            state.lines[state.line] = line.slice(0, state.col) + key + line.slice(state.col);
            state.col++;
            state.insertedText += key;
        }
        renderVimBuffer();
        return;
    }
    if (state.pending === "d") {
        state.pending = "";
        if (key === "d") {
            const deletedLine = state.line,
                removed = vimDeleteLine(state);
            state.trace.push("dd");
            state.freeOps.push({ op: "dd", line: deletedLine, removed });
        } else state.trace.push(`invalid:d${key}`);
        renderVimBuffer();
        return;
    }
    if (state.pending === "y") {
        state.pending = "";
        if (key === "y") {
            state.yank = state.lines[state.line];
            state.trace.push("yy");
        } else state.trace.push(`invalid:y${key}`);
        renderVimBuffer();
        return;
    }
    if (state.pending === "c") {
        state.pending = key === "i" ? "ci" : "";
        if (!state.pending) state.trace.push(`invalid:c${key}`);
        renderVimBuffer();
        return;
    }
    if (state.pending === "ci") {
        state.pending = "";
        if (key === "w") {
            state.trace.push("ciw");
            vimChangeWord(state);
            state.freeOps.push({ op: "ciw", word: state.lastChangedWord });
        } else state.trace.push(`invalid:ci${key}`);
        renderVimBuffer();
        return;
    }
    const line = state.lines[state.line] || "";
    switch (key) {
        case "h":
            state.col = Math.max(0, state.col - 1);
            state.trace.push("h");
            break;
        case "l":
            state.col = Math.min(Math.max(0, line.length - 1), state.col + 1);
            state.trace.push("l");
            break;
        case "j":
            state.line = Math.min(state.lines.length - 1, state.line + 1);
            state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
            state.trace.push("j");
            break;
        case "k":
            state.line = Math.max(0, state.line - 1);
            state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
            state.trace.push("k");
            break;
        case "w":
        case "b":
        case "e":
            vimMoveWord(state, key);
            state.trace.push(key);
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
            state.insertedText = "";
            state.trace.push("i");
            break;
        case "x":
            if (line.length && state.col < line.length)
                state.lines[state.line] = line.slice(0, state.col) + line.slice(state.col + 1);
            state.col = Math.min(state.col, Math.max(0, state.lines[state.line].length - 1));
            state.trace.push("x");
            break;
        case "p":
            if (state.yank !== null) {
                state.lines.splice(state.line + 1, 0, state.yank);
                state.line++;
                state.col = 0;
            }
            state.trace.push("p");
            break;
        default:
            state.trace.push(`invalid:${key}`);
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
                          const cursor = vimState.line === lineIndex && vimState.col === col,
                              target =
                                  stage.marker &&
                                  stage.target?.line === lineIndex &&
                                  stage.target?.col === col;
                          const value = char === " " ? "&nbsp;" : esc(char);
                          return `<span class="vim-char${target ? " vim-target" : ""}${cursor ? " vim-cursor" : ""}">${value}</span>`;
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
    const count = $(".vim-editor-title-right");
    if (count) count.textContent = `${String(vimState.lines.length).padStart(2, "0")} lines`;
    const feedback = $("#vim-feedback");
    if (feedback && feedback.classList.contains("is-error")) {
        feedback.textContent = "";
        feedback.className = "vim-feedback";
    }
}
function vimStageMatches() {
    const stage = vimExpectedStage(vimState);
    if (JSON.stringify(vimState.lines) !== JSON.stringify(stage.expected || stage.lines))
        return false;
    if (stage.target && (vimState.line !== stage.target.line || vimState.col !== stage.target.col))
        return false;
    if (stage.expectedMode && vimState.mode !== stage.expectedMode) return false;
    if (
        stage.requiredTrace &&
        JSON.stringify(vimState.trace) !== JSON.stringify(stage.requiredTrace)
    )
        return false;
    if (stage.freePlay) {
        const deleted = vimState.freeOps
            .filter((item) => item.op === "dd")
            .map((item) => item.removed);
        const didRemoveDuplicate = deleted.includes(
            "A repeated sentence makes this paragraph harder to read.",
        );
        const didRemoveBlank = deleted.includes("");
        const changed = vimState.freeOps.some((item) => item.op === "ciw" && item.word === "teh");
        const typedReplacement =
            vimState.trace.includes("type:the") && vimState.trace.includes("Esc");
        return (
            didRemoveDuplicate &&
            didRemoveBlank &&
            changed &&
            typedReplacement &&
            vimState.mode === "normal"
        );
    }
    return true;
}
function checkVimStage() {
    if (vimState.passed || vimState.completed) return;
    const stage = vimExpectedStage(vimState);
    if (!vimStageMatches()) {
        let explanation =
            "The final buffer, cursor, mode, or required command sequence does not match yet.";
        if (
            stage.requiredTrace &&
            JSON.stringify(vimState.trace) !== JSON.stringify(stage.requiredTrace)
        )
            explanation = `This stage requires ${stage.requiredLabel}. Your recorded actions were ${vimState.trace.length ? vimState.trace.join(" ") : "none"}. The final result alone is not enough. Use :q to reset.`;
        else if (stage.freePlay)
            explanation =
                "The paragraph needs the exact cleanup: dd the duplicate line, dd the blank line, then ciw on 'teh', type 'the', and press Esc.";
        setVimMessage(explanation, true);
        return;
    }
    vimState.passed = true;
    setVimMessage("Saved. Stage complete.");
    if (vimState.index === VIM_STAGES.length - 1) {
        vimState.completed = true;
        renderVimTutorialPage();
        $("#vim-share")?.focus();
        return;
    }
    const teach = $("#vim-teach");
    if (teach) {
        teach.hidden = false;
        teach.innerHTML = `<span class="section-kicker">WHAT YOU LEARNED</span><p>${esc(stage.teach)}</p><button class="btn" id="vim-next" type="button">Next stage <span>→</span></button>`;
        $("#vim-next")?.addEventListener("click", nextVimStage);
        $("#vim-next")?.focus();
    }
    const check = $("#vim-check");
    if (check) check.disabled = true;
    const feedback = $("#vim-feedback");
    if (feedback) {
        feedback.textContent = "Saved. The required motions and final buffer both match.";
        feedback.className = "vim-feedback is-success";
    }
}
function resetVimStage() {
    vimState = cloneStageState(vimState.index);
    renderVimTutorialPage();
    $("#vim-buffer")?.focus();
}
function nextVimStage() {
    if (!vimState.passed) return;
    if (vimState.index === VIM_STAGES.length - 1) {
        vimState.completed = true;
        renderVimTutorialPage();
        $("#vim-share")?.focus();
        return;
    }
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
        return `<div class="vim-completion"><div class="section-kicker">LESSON COMPLETE</div><div class="completion-mark">✓</div><h1>You just edited a document without touching the mouse.</h1><p class="page-intro">You used motions to navigate, delete, copy, insert, and change text. Open VS Code, install a Vim extension, and try w, dd, and ciw on real code.</p><section class="learned-keys"><h2>Keys and commands learned</h2><div class="key-list">${["h", "j", "k", "l", "w", "b", "e", "dd", "x", "yy", "p", "i", "Esc", "ciw", ":w", ":q", "Ctrl+w h/l", "Ctrl+p", "Ctrl+f", "Ctrl+g", ":Explore", ":e file"].map((key) => `<span class="key-chip"><kbd>${key}</kbd></span>`).join("")}</div></section><section class="completion-resources"><h2>Take the motions with you</h2><a href="${esc(REPO)}" target="_blank" rel="noopener"><strong>Author’s dotfiles</strong><span>${esc(REPO)} ↗</span></a><a href="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim" target="_blank" rel="noopener"><strong>Vim extension for VS Code</strong><span>VSCodeVim · Visual Studio Marketplace ↗</span></a><a href="https://neovim.io/doc/user/" target="_blank" rel="noopener"><strong>Neovim :help</strong><span>Open the help docs, or type :help inside Neovim ↗</span></a></section><div class="completion-actions"><button class="btn" id="vim-share" type="button">Share lesson <span>↗</span></button><button class="btn alt" id="vim-restart" type="button">Play again</button><span id="vim-share-status" class="vim-share-status" aria-live="polite">${esc(vimState.shareMessage)}</span></div></div>`;
    const stage = vimExpectedStage(vimState),
        stepDots = VIM_STAGES.map(
            (item, index) =>
                `<span class="vim-step${index < vimState.index ? " done" : ""}${index === vimState.index ? " current" : ""}" aria-label="Stage ${index + 1}${index < vimState.index ? ", complete" : ""}">${index + 1}</span>`,
        ).join("");
    const hints =
        vimState.index === 0
            ? `<div class="motion-grid"><kbd>h</kbd><span>left</span><kbd>j</kbd><span>down</span><kbd>k</kbd><span>up</span><kbd>l</kbd><span>right</span></div>`
            : vimState.index === 1
              ? `<div class="motion-grid"><kbd>w</kbd><span>next word</span><kbd>b</kbd><span>previous word</span><kbd>e</kbd><span>end of word</span></div>`
              : vimState.index === 2
                ? `<div class="motion-grid"><kbd>dd</kbd><span>delete line</span><kbd>x</kbd><span>delete one character</span></div>`
                : vimState.index === 3
                  ? `<div class="motion-grid"><kbd>yy</kbd><span>yank line</span><kbd>p</kbd><span>put below</span></div>`
                  : vimState.index === 4
                    ? `<div class="motion-grid"><kbd>i</kbd><span>insert mode</span><kbd>Esc</kbd><span>normal mode</span></div>`
                    : `<div class="motion-grid"><kbd>ciw</kbd><span>change inside word</span><kbd>Esc</kbd><span>return to normal</span></div>`;
    return `<div class="vim-lesson"><div class="vim-lesson-intro"><div class="section-kicker">INTERACTIVE TUTORIAL · 7 STAGES</div><h1>Vim motions</h1><p>I'm not going to convince you to switch to Neovim. But the best part of the ecosystem — vim motions — travels with you. VS Code, your browser, your IDE. Once it clicks, going back to the mouse feels like a downgrade.</p></div><div class="vim-progress" aria-label="Lesson progress">${stepDots}</div><div class="vim-stage-heading"><div><span class="section-kicker">STAGE ${vimState.index + 1} OF ${VIM_STAGES.length}</span><h2>${esc(stage.title)} <span>— ${esc(stage.subtitle)}</span></h2></div><button class="vim-reset-inline" type="button" id="vim-reset-top">Reset stage ↺</button></div><div class="vim-layout"><section class="vim-instructions"><div class="vim-goal"><span class="section-kicker">YOUR GOAL</span><p>${esc(stage.goal)}</p></div>${stage.freePlay ? `<div class="vim-key-hints no-hints"><span class="section-kicker">FREE PLAY</span><p>No hints. Use the same motions you have learned. The lesson checks both the operations and the finished text.</p></div>` : `<div class="vim-key-hints"><span class="section-kicker">MOTIONS IN THIS STAGE</span>${hints}</div>`}<div class="vim-key-hints vim-workspace-help"><span class="section-kicker">MOVE AROUND THE WORKSPACE</span><div class="motion-grid"><kbd>Ctrl+w h</kbd><span>focus file Explorer</span><kbd>j / k</kbd><span>move through files</span><kbd>h / l</kbd><span>collapse / expand</span><kbd>Enter</kbd><span>open selected file</span><kbd>Ctrl+w l</kbd><span>return to practice</span><kbd>Ctrl+p</kbd><span>Telescope file search</span><kbd>Ctrl+g / /</kbd><span>Telescope grep</span><kbd>Tab</kbd><span>switch Files / Grep</span><kbd>:e file</kbd><span>open a portfolio file</span></div></div><div id="vim-teach" class="vim-teach" ${vimState.passed ? "" : "hidden"}><span class="section-kicker">WHAT YOU LEARNED</span><p>${esc(stage.teach)}</p>${vimState.index < 6 ? `<button class="btn" id="vim-next" type="button">Next stage <span>→</span></button>` : ""}</div></section><section class="vim-practice" aria-label="Practice editor"><div class="vim-editor-window"><div class="vim-editor-title"><span class="vim-file-dot"></span><span>practice.txt</span><span class="vim-editor-title-right">${String(vimState.lines.length).padStart(2, "0")} lines</span></div><div id="vim-buffer" class="vim-buffer" tabindex="0" role="application" aria-label="Vim practice buffer. Use Vim normal and insert mode keys. Press colon for commands."></div><div class="vim-editor-footer"><span id="vim-mode-pill" class="vim-mode-pill normal">NORMAL</span><span id="vim-pending" class="vim-pending"></span><span class="vim-footer-spacer"></span><span id="vim-position">1:1</span><span>utf-8</span></div><div class="vim-command-row" id="vim-command-row" hidden><span>:</span><input id="vim-command-input" aria-label="Vim lesson command" autocomplete="off" spellcheck="false" placeholder="w · q · Explore · Telescope"><small>Enter runs · Esc returns</small></div></div><div class="vim-editor-actions"><button class="btn" id="vim-check" type="button" ${vimState.passed ? "disabled" : ""}>:w Save / Check</button><button class="btn alt" id="vim-reset" type="button">Reset stage</button><span id="vim-feedback" class="vim-feedback" aria-live="polite">${esc(vimState.message || "Use :w to submit. Then press Enter on Next stage. :q resets this stage.")}</span></div><p class="vim-editor-hint">Keyboard only: focus the buffer, edit with Vim keys, type :w and press Enter. After a pass, Next stage receives focus automatically. Press Enter to continue. The mouse remains optional.</p></section></div></div>`;
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
    $("#vim-check")?.addEventListener("click", () => checkVimStage());
    $("#vim-reset")?.addEventListener("click", resetVimStage);
    $("#vim-reset-top")?.addEventListener("click", resetVimStage);
    $("#vim-next")?.addEventListener("click", nextVimStage);
    $("#vim-command-input")?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            runVimCommand(event.target.value);
        } else if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            closeVimCommand();
        }
    });
}

// Initial deep link routing is delayed until the lesson state above is initialized.
if (location.hash) syncRoute();

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
