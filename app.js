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
    `<figure class="video-figure" data-video-id="${esc(v.id)}"><div class="video video-preview"><img src="https://i.ytimg.com/vi/${encodeURIComponent(v.id)}/hqdefault.jpg" alt="" loading="lazy"><button class="video-load" type="button" aria-label="Load video: ${esc(v.title)}"><span class="video-play-icon">▶</span><span>Load video</span></button></div><figcaption class="video-caption"><span>${esc(v.title)}</span><a href="https://www.youtube.com/watch?v=${encodeURIComponent(v.id)}" target="_blank" rel="noopener">If the player is unavailable, watch on YouTube ↗</a></figcaption></figure>`;
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
const renderBlogSections = (sections) =>
    (sections || [])
        .map(
            (section, i) =>
                `<section class="blog-section" id="blog-section-${i + 1}"><h2>${esc(section.title)}</h2>${(section.paragraphs || []).map((text) => `<p>${esc(text)}</p>`).join("")}${section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}${section.code ? `<pre class="blog-code"><code>${esc(section.code)}</code></pre>` : ""}${section.callout ? `<aside class="blog-callout">${esc(section.callout)}</aside>` : ""}</section>`,
        )
        .join("");
const blogCard = (post) =>
    `<a class="blog-card" href="#/blog/${encodeURIComponent(post.id)}"><div class="blog-card-meta">${esc(post.category)} <span>·</span> ${esc(post.readTime)}</div><h3>${esc(post.title)}</h3><p>${esc(post.subtitle)}</p><span class="blog-card-link">Read the post ↗</span></a>`;

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
              vim: "index.md",
          }[page] || "index.lua";
const routeFor = (page, id) =>
    id ? `#/${page}/${encodeURIComponent(id)}` : `#/${page === "home" ? "" : page}`;
let splitState = null;
const pages = {
    home: () => `<section class="hero"><div class="hi">-- hello, world</div><div class="big">${esc(P.name)}<span style="color:var(--yellow)">.</span></div><p class="sub">${esc(P.tagline)}</p><div class="btns"><a class="btn" href="#/projects">Explore projects <span>↗</span></a><a class="btn alt" href="#/resume">View resume</a><a class="btn alt" href="#/about">About me</a></div><div class="boring-invite"><p>Does this overwhelm you and you just want a normal website? Click the boring button to make this into a boring website.</p><button class="btn alt" type="button" data-boring-toggle>Make it boring</button></div></section>
    <section><h2>Featured projects</h2><div class="grid">${DATA.projects.slice(0, 3).map(projectCard).join("")}</div><p style="margin-top:15px"><a href="#/projects">Browse all projects →</a></p></section>
    <section><div class="section-heading-row"><h2>Built for a community</h2><span class="section-kicker">community project</span></div><div class="grid">${DATA.communityProjects.map(projectCard).join("")}</div></section>
    <section><h2>Open-source contributions</h2><p>Ongoing work on a personal Mihon fork, including an upstream bug fix and an extension-filtering contribution.</p><a href="#/community">Read about community contributions →</a></section>
    <section><div class="section-heading-row"><h2>From the blog</h2><span class="section-kicker">field notes</span></div><div class="grid">${DATA.blogPosts
        .filter((post) => post.type === "story")
        .slice(0, 3)
        .map(blogCard)
        .join(
            "",
        )}</div><p style="margin-top:15px"><a href="#/blog">Browse the blog →</a></p></section>
    <section><div class="section-heading-row"><h2>Try the motions</h2><span class="section-kicker">interactive · 14 stages</span></div><a class="blog-card vim-home-card" href="#/vim"><h3>Vim motions, without the editor switch</h3><p>A small keyboard-first tutorial. Learn the movements that work in VS Code, your browser, and other editors too.</p><span class="blog-card-link">Start learning ↗</span></a></section>
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
      ${p.storyPostId ? `<aside class="project-blog-cta"><span class="cta-kicker">How this project happened</span><p><a href="#/blog/${encodeURIComponent(p.storyPostId)}">Read the story behind ${esc(p.name)} ↗</a>${p.technicalPostId ? ` <span class="link-separator">·</span> <a href="#/blog/${encodeURIComponent(p.technicalPostId)}">Technical notes ↗</a>` : ""}</p></aside>` : ""}
      ${p.image ? `<figure class="project-media"><img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.name)}" loading="lazy"><figcaption>${esc(p.imageAlt || p.name)}</figcaption></figure>` : ""}
      ${p.metrics ? `<div class="metrics-panel"><div class="metrics-label">${esc(p.metricsLabel || "Community reach · figures provided")}</div><div class="metric-row">${p.metrics.map((m) => `<div class="metric"><strong>${esc(m.value)}</strong><small>${esc(m.label)}</small></div>`).join("")}</div></div>` : ""}
      <div class="cols project-layout"><div>
        <section><h2>What it is</h2><p>${esc(p.about)}</p></section>
        ${renderProjectSections(p.sections)}
        <section><h2>Technical highlights</h2><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></section>
      </div><aside class="side"><h3>Technology</h3>${tags(p.stack)}<h3 style="margin-top:20px">Links</h3>${p.links.map(([n, u]) => `<div style="margin:6px 0"><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)} ↗</a></div>`).join("")}</aside></div>
      ${screenshotGallery(p.screenshots)}
      ${(p.videos || []).length ? `<section><h2>Demo</h2>${p.videos.map(video).join("")}</section>` : ""}`;
    },
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
        `<h1>resume.pdf</h1><p class="page-intro">A PDF copy of my resume.</p><section class="resume-viewer"><div class="resume-toolbar"><span><strong>resume.pdf</strong> <span class="resume-file-path">${esc(P.resume)}</span></span><a class="btn alt" href="${esc(P.resume)}" target="_blank" rel="noopener">Open PDF ↗</a></div><iframe class="pdf" src="${esc(P.resume)}#view=FitH" title="Resume PDF"><p>Your browser cannot display the PDF. <a href="${esc(P.resume)}">Open resume.pdf</a>.</p></iframe><p class="resume-fallback">If the preview is empty, the PDF is not present at <code>${esc(P.resume)}</code>. Add the actual file at that path in the deployed portfolio.</p></section>`,
    style: () =>
        `<h1>colorscheme</h1><p>This portfolio takes its interaction model from Neovim: file navigation, open buffers, keyboard mappings and a command line. The colors come from the Melange colorscheme in my current dotfiles, hosted on GitHub.</p><div class="btns" style="margin:0 0 24px"><a class="btn" href="${REPO}" target="_blank" rel="noopener">My dotfiles ↗</a></div><section><h2>Live dotfiles</h2><div id="live"><div class="box todo">Loading dotfiles from GitHub...</div></div></section>`,
    blog: (id) => {
        if (!id) {
            const stories = DATA.blogPosts.filter((item) => item.type !== "technical");
            const notes = DATA.blogPosts.filter((item) => item.type === "technical");
            return `<div class="page-eyebrow">~/blog</div><h1>blog</h1><p class="page-intro">The projects, why I started them, what went wrong, and how they turned out.</p><section class="blog-list">${stories.map(blogCard).join("")}</section>${notes.length ? `<section class="blog-technical-list"><div class="section-heading-row"><h2>Deep dives</h2><span class="section-kicker">~/blog/deep-dives</span></div><p>Project-specific implementation notes: the lower-level details behind the decisions, experiments and debugging.</p><div class="blog-list">${notes.map(blogCard).join("")}</div></section>` : ""}`;
        }
        const post = DATA.blogPosts.find((item) => item.id === id);
        if (!post) return pages.notfound();
        const project = [...DATA.projects, ...DATA.communityProjects, ...DATA.smallerProjects].find(
            (item) => item.id === post.projectId,
        );
        const videos = post.videos?.length
            ? `<section class="blog-embedded-media"><h2>Walkthrough</h2>${post.videos.map(video).join("")}</section>`
            : "";
        const media = post.media?.length
            ? `<section class="blog-embedded-media"><h2>From the README</h2><div class="blog-media-grid">${post.media.map((item) => `<figure><img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy"><figcaption>${esc(item.caption || item.alt)}</figcaption></figure>`).join("")}</div></section>`
            : "";
        const workflow = post.workflow?.length
            ? `<section class="blog-workflow"><h2>My investigation loop</h2><div class="research-flow">${post.workflow.map((step, i) => `<div class="research-step"><span>${String(i + 1).padStart(2, "0")}</span><strong>${esc(step)}</strong></div>`).join("")}</div></section>`
            : "";
        const offsets = post.offsetNotes?.length
            ? `<section class="offset-notes"><h2>A couple of offset notes</h2><p>These are observations tied to the build I inspected, not stable public layouts.</p><div class="offset-note-grid">${post.offsetNotes.map((note) => `<article class="offset-note"><div class="offset-note-head"><strong>${esc(note.title)}</strong><code>${esc(note.offset)}</code></div><small>Base: ${esc(note.base)}</small><p>${esc(note.detail)}</p><div class="offset-fields">${note.fields.map((field) => `<span>${esc(field)}</span>`).join("")}</div></article>`).join("")}</div></section>`
            : "";
        const resources = post.resources?.length
            ? `<section class="blog-resources"><h2>Sources and further reading</h2><ul>${post.resources.map((resource) => `<li><a href="${esc(resource.url)}" target="_blank" rel="noopener">${esc(resource.title)} ↗</a><span> — ${esc(resource.note || "")}</span></li>`).join("")}</ul></section>`
            : "";
        const related = post.relatedId
            ? `<aside class="blog-related"><p>${esc(post.relatedLabel || "Related technical notes")}</p><a href="#/blog/${encodeURIComponent(post.relatedId)}">Open the companion write-up ↗</a></aside>`
            : "";
        const parent = post.parentId
            ? `<aside class="blog-related"><a href="#/blog/${encodeURIComponent(post.parentId)}">← ${esc(post.parentLabel || "Back to the story")}</a></aside>`
            : "";
        const projectLinks = project
            ? `<p class="blog-project-link">Part of <a href="${projectRoute(project)}">${esc(project.name)}</a> · <a href="${esc(project.repo || project.links?.[0]?.[1] || "#")}" target="_blank" rel="noopener">Source code ↗</a></p>`
            : "";
        const aside =
            post.type === "technical" && post.id === "versatiletraining-ue3-notes"
                ? `<aside class="blog-aside"><strong>What this covers</strong><p>Package inspection, GObjects and GNames, the BakkesMod Function Scanner, hooks, caller wrappers, parameter dumps and the build-specific offsets I used while building VersatileTraining.</p></aside>`
                : "";
        const status = post.statusNote
            ? `<aside class="blog-status-note"><span class="cta-kicker">Status note</span><p>${esc(post.statusNote)}</p></aside>`
            : "";
        return `<article class="blog-post"><div class="crumb"><a href="#/blog">blog</a> / <span>${esc(post.id)}.md</span></div><div class="blog-post-meta"><span>${esc(post.category || "")}</span><span>${esc(post.date || "")}</span><span>${esc(post.readTime || "")}</span></div><h1>${esc(post.title)}</h1><p class="blog-subtitle">${esc(post.subtitle || "")}</p><p class="blog-lead">${esc(post.intro || "")}</p>${projectLinks}${aside}${post.sections?.length ? `<nav class="blog-toc" aria-label="In this post"><strong>In this post</strong><ol>${post.sections.map((section, i) => `<li><a href="#blog-section-${i + 1}">${esc(section.title)}</a></li>`).join("")}</ol></nav>${renderBlogSections(post.sections)}` : ""}${related}${parent}${videos}${media}${offsets}${workflow}${resources}${status}<section class="blog-post-end"><a class="btn alt" href="#/blog">← All posts</a>${project ? ` <a class="btn" href="${projectRoute(project)}">Back to ${esc(project.name)} ↗</a>` : ""}</section></article>`;
    },
    vim: () =>
        `<div class="page-eyebrow">~/vim</div><h1>vim motions</h1><p class="vim-pitch">I'm not going to convince you to switch to Neovim. But the best part of the ecosystem — vim motions — travels with you. VS Code, your browser, your IDE. Once it clicks, going back to the mouse feels like a downgrade.</p><p class="page-intro">Fourteen small lessons. No plugins, no config, no editor setup. Just you, a buffer, and a few keys that start to make sense once you use them.</p><div class="vim-landing-actions"><a class="btn" href="#/vim/play">Start the tutorial ↗</a><a class="btn alt" href="#/vim/play?free=1">Jump into free play</a></div><section><h2>The stages</h2><div class="vim-stage-list">${VIM_TUTORIAL_STAGES.map((stage, i) => `<a href="#/vim/play?stage=${i + 1}" class="vim-stage-link"><span>${String(i + 1).padStart(2, "0")}</span><strong>${esc(stage.name)}</strong><small>${esc(stage.goal)}</small></a>`).join("")}</div></section><p class="vim-landing-note">The tutorial saves your stage locally in this browser. You can restart a stage at any time with <kbd>r</kbd> or <kbd>Esc</kbd> in Normal mode.</p>`,
    vimPlay: (query) =>
        `<section class="vim-tutorial" id="vim-tutorial" data-free="${query.get("free") === "1" ? "true" : "false"}"><div class="vim-tutorial-heading"><div><div class="page-eyebrow">~/vim/play</div><h1>Vim motions practice</h1><p class="vim-tutorial-subtitle">Two panes. One buffer. Solve the goal using the keys you just learned.</p></div><a class="vim-back-link" href="#/vim">← Tutorial overview</a></div><div id="vim-tutorial-body"></div><p class="vim-access-note">Accessibility note: this interactive exercise requires direct keyboard input. It is not currently usable with screen readers, voice control or switch-access input. The rest of the portfolio remains available through its normal links and controls.</p></section>`,
    notfound: () =>
        `<h1>E492: not an editor command</h1><p>The requested buffer doesn't exist. <a href="#/">Return to index.lua</a></p>`,
};

const VIM_TUTORIAL_STAGES = [
    {
        name: "Move around",
        goal: "Move down to the marker, then across to the asterisk. Use h, j, k and l — not the arrow keys.",
        initial: ["The quick brown fox", "jumps over the *", "lazy dog"],
        cursor: { line: 0, col: 0 },
        check: { kind: "cursor", at: { line: 1, col: 15 } },
        requiredKeys: ["j", ...Array(15).fill("l")],
        explanation:
            "h, j, k and l move left, down, up and right. They keep the movement keys beside the home row.",
    },
    {
        name: "Words",
        goal: "Move from the start of The to the start of lazy using word motions.",
        initial: ["The quick brown fox", "jumps over the", "lazy dog"],
        cursor: { line: 0, col: 0 },
        check: { kind: "cursor", at: { line: 2, col: 0 } },
        requiredKeys: Array(7).fill("w"),
        explanation:
            "w moves to the next word. b goes back and e moves to the end of the current word. This stage specifically checks that you used w, not a pile of l presses.",
    },
    {
        name: "Delete a line",
        goal: "Delete the line that says DELETE ME. Keep the other two lines.",
        initial: ["keep this line", "DELETE ME", "keep this one too"],
        cursor: { line: 0, col: 0 },
        check: { kind: "buffer", equals: ["keep this line", "keep this one too"] },
        requiredKeys: ["j", "d", "d"],
        explanation: "dd deletes the current line. x deletes only the character under the cursor.",
    },
    {
        name: "Yank and put",
        goal: "Duplicate the first line so it appears twice.",
        initial: ["copy me", "leave me"],
        cursor: { line: 0, col: 0 },
        check: { kind: "buffer", equals: ["copy me", "copy me", "leave me"] },
        requiredKeys: ["y", "y", "p"],
        explanation: "yy copies the current line. p puts the copied line below the cursor.",
    },
    {
        name: "Insert text",
        goal: "Type Hello at the beginning of the line, then return to Normal mode.",
        initial: ["world"],
        cursor: { line: 0, col: 0 },
        check: { kind: "buffer", equals: ["Hello world"], mode: "normal" },
        requiredKeys: ["i", ...Array.from("Hello "), "Escape"],
        explanation:
            "i enters Insert mode. Escape returns to Normal mode. Watch the status bar change color when you switch modes.",
    },
    {
        name: "Change a word",
        goal: "Replace wrong with right using ciw.",
        initial: ["this word is wrong"],
        cursor: { line: 0, col: 13 },
        check: { kind: "buffer", equals: ["this word is right"], mode: "normal" },
        requiredKeys: ["c", "i", "w", ...Array.from("right"), "Escape"],
        explanation:
            "ciw means change inside word. It removes the word under the cursor and puts you straight into Insert mode.",
    },
    {
        name: "Start and end of line",
        goal: "Use 0 to go to the start of the line, then $ to land on its last character.",
        initial: ["find both ends of this line"],
        cursor: { line: 0, col: 12 },
        check: { kind: "cursor", at: { line: 0, col: 26 } },
        requiredKeys: ["0", "$"],
        explanation:
            "0 jumps to the first column. $ moves to the last character. You do not have to count spaces or repeatedly press l.",
    },
    {
        name: "Jump through the buffer",
        goal: "Jump to the last line with G, then return to the first line with gg.",
        initial: ["top of the file", "somewhere in the middle", "bottom of the file"],
        cursor: { line: 1, col: 4 },
        check: { kind: "cursor", at: { line: 0, col: 0 } },
        requiredKeys: ["G", "g", "g"],
        explanation:
            "G jumps to the last line. gg jumps back to the top. Both are useful when you are moving around a file that is much longer than the screen.",
    },
    {
        name: "Find a character",
        goal: "Use fx to jump to the x in the line.",
        initial: ["one two x marks the spot"],
        cursor: { line: 0, col: 0 },
        check: { kind: "cursor", at: { line: 0, col: 8 } },
        requiredKeys: ["f", "x"],
        explanation:
            "f followed by a character jumps to the next occurrence of that character on the current line.",
    },
    {
        name: "Open a new line",
        goal: "Open a line below the first line, type middle, then return to Normal mode.",
        initial: ["top", "bottom"],
        cursor: { line: 0, col: 0 },
        check: { kind: "buffer", equals: ["top", "middle", "bottom"], mode: "normal" },
        requiredKeys: ["o", ...Array.from("middle"), "Escape"],
        explanation:
            "o opens a new line below the current line and enters Insert mode. O does the same above the current line.",
    },
    {
        name: "Append to a word",
        goal: "Move to the end of 'vim' with a, type !, then return to Normal mode.",
        initial: ["vim"],
        cursor: { line: 0, col: 2 },
        check: { kind: "buffer", equals: ["vim!"], mode: "normal" },
        requiredKeys: ["a", "!", "Escape"],
        explanation:
            "a starts inserting after the cursor. A jumps to the end of the line before inserting.",
    },
    {
        name: "Delete one character",
        goal: "Remove the extra e so the line reads file.",
        initial: ["filee"],
        cursor: { line: 0, col: 4 },
        check: { kind: "buffer", equals: ["file"] },
        requiredKeys: ["x"],
        explanation:
            "x removes the character under the cursor. You do not have to enter Insert mode just to remove one character.",
    },
    {
        name: "Open a line above",
        goal: "Use O to add a new line above the current line, type top, and return to Normal mode.",
        initial: ["middle", "bottom"],
        cursor: { line: 0, col: 0 },
        check: { kind: "buffer", equals: ["top", "middle", "bottom"], mode: "normal" },
        requiredKeys: ["O", ...Array.from("top"), "Escape"],
        explanation: "O opens a line above and enters Insert mode. o opens one below.",
    },
    {
        name: "Free Play",
        goal: "Clean up the paragraph: remove the duplicate line, remove the blank line, and change teh to the.",
        initial: [
            "Keep your hands on the home row.",
            "A good editor keeps your thought moving.",
            "A good editor keeps your thought moving.",
            "Fix teh small details as you go.",
            "",
            "Then get back to building things.",
        ],
        cursor: { line: 0, col: 0 },
        check: {
            kind: "buffer",
            equals: [
                "Keep your hands on the home row.",
                "A good editor keeps your thought moving.",
                "Fix the small details as you go.",
                "Then get back to building things.",
            ],
        },
        requiredSequences: [
            ["d", "d"],
            ["c", "i", "w"],
        ],
        requiredSequenceCounts: { "d,d": 2, "c,i,w": 1 },
        explanation:
            "You used motions to clean up a document without reaching for the mouse. Try w, dd and ciw in your editor or IDE.",
    },
];

let vimAdvanceTimer = null;
function initVimTutorial(query) {
    if (vimAdvanceTimer) clearTimeout(vimAdvanceTimer);
    const root = $("#vim-tutorial");
    const body = $("#vim-tutorial-body");
    if (!root || !body || !window.VimTutorialEngine) return;
    const engine = window.VimTutorialEngine;
    const free = root.dataset.free === "true";
    const progressKey = "vim-motions-tutorial-progress";
    let saved = {};
    try {
        saved = JSON.parse(localStorage.getItem(progressKey) || "{}");
    } catch (_) {}
    const requestedStage = Number(query.get("stage"));
    let stageIndex = free
        ? -1
        : Number.isInteger(requestedStage) &&
            requestedStage >= 1 &&
            requestedStage <= VIM_TUTORIAL_STAGES.length
          ? requestedStage - 1
          : Math.max(0, Math.min(VIM_TUTORIAL_STAGES.length - 1, Number(saved.stage) || 0));
    let state,
        keys = [],
        locked = false,
        focused = false,
        mobilePane = "you",
        helpOpen = false;
    const freeSeed = [
        "This is a scratch buffer.",
        "Try w, b, e, dd, ciw, yy, p, a and x.",
        "Escape returns to Normal mode.",
    ];
    const makeInitialState = () => {
        const source = free
            ? { initial: freeSeed, cursor: { line: 0, col: 0 } }
            : VIM_TUTORIAL_STAGES[stageIndex];
        return {
            buffer: [...source.initial],
            cursor: { ...source.cursor },
            mode: "normal",
            yank: null,
            pendingKey: null,
        };
    };
    const stage = () => (free ? null : VIM_TUTORIAL_STAGES[stageIndex]);
    const target = () => {
        if (free)
            return {
                lines: [
                    "h j k l   move",
                    "w b e     words",
                    "0 $ gg G  line / buffer",
                    "f<char>   find on line",
                    "x dd      delete",
                    "yy p      copy / put",
                    "i Esc     insert / return",
                    "ciw       change inside word",
                ],
                cursor: null,
            };
        const check = stage().check;
        if (check.kind === "cursor") return { lines: [...stage().initial], cursor: check.at };
        return { lines: [...check.equals], cursor: check.cursor || null };
    };
    const keyLabel = (key) =>
        key === "Escape" ? "Esc" : key === "Backspace" ? "⌫" : key === " " ? "Space" : key;
    const renderTextBuffer = (lines, cursor, mode, isGoal = false) =>
        lines
            .map((line, lineIndex) => {
                const chars = Array.from(line);
                let content = "";
                for (let col = 0; col < chars.length; col++) {
                    if (
                        !isGoal &&
                        cursor &&
                        cursor.line === lineIndex &&
                        cursor.col === col &&
                        mode === "insert"
                    )
                        content += '<i class="vim-insert-cursor" aria-hidden="true"></i>';
                    const char = chars[col] === " " ? "&nbsp;" : esc(chars[col]);
                    const atLive =
                        !isGoal &&
                        cursor &&
                        cursor.line === lineIndex &&
                        cursor.col === col &&
                        mode === "normal";
                    const atGoal =
                        isGoal && cursor && cursor.line === lineIndex && cursor.col === col;
                    content += `<span class="${atLive ? "vim-cursor-block" : atGoal ? "vim-goal-marker" : "vim-char"}">${char}</span>`;
                }
                if (!chars.length)
                    content =
                        cursor && cursor.line === lineIndex && mode === "normal" && !isGoal
                            ? '<span class="vim-cursor-block">&nbsp;</span>'
                            : "&nbsp;";
                if (
                    !isGoal &&
                    cursor &&
                    cursor.line === lineIndex &&
                    cursor.col >= chars.length &&
                    mode === "insert"
                )
                    content += '<i class="vim-insert-cursor" aria-hidden="true"></i>';
                if (
                    !isGoal &&
                    cursor &&
                    cursor.line === lineIndex &&
                    cursor.col >= chars.length &&
                    mode === "normal" &&
                    chars.length
                )
                    content = content.replace(
                        /<\/span>$/,
                        '<span class="vim-cursor-block">&nbsp;</span>',
                    );
                return `<div class="vim-line"><span class="vim-line-number">${String(lineIndex + 1).padStart(2, "0")}</span><span class="vim-line-text">${content}</span></div>`;
            })
            .join("");
    const render = () => {
        const goal = target();
        const mode = state.mode;
        $("#vim-goal-buffer").innerHTML = renderTextBuffer(goal.lines, goal.cursor, "normal", true);
        $("#vim-buffer").innerHTML = renderTextBuffer(state.buffer, state.cursor, mode, false);
        $("#vim-stage-count").textContent = free
            ? "FREE PLAY"
            : `STAGE ${stageIndex + 1}/${VIM_TUTORIAL_STAGES.length}`;
        $("#vim-stage-name").textContent = free ? "No goal. Just practice." : stage().name;
        $("#vim-goal-copy").textContent = free
            ? "Try the motions on your own text. This pane is a quick reference."
            : stage().goal;
        $("#vim-keys").innerHTML = `${
            keys.length
                ? keys
                      .slice(-12)
                      .map((key) => `<span>${esc(keyLabel(key))}</span>`)
                      .join("<i>·</i>")
                : '<span class="vim-key-placeholder">Your keystrokes will show up here · :w saves · :q resets</span>'
        }${locked ? '<strong class="vim-key-success">✓</strong>' : ""}`;
        $("#vim-hint").hidden = focused;
        $("#vim-buffer").classList.toggle("has-focus", focused);
        $("#vim-mode-label").textContent =
            mode === "insert" ? "-- INSERT --" : free ? "-- FREE PLAY --" : "-- NORMAL --";
        $("#vim-tutorial-status").classList.toggle("insert-mode", mode === "insert");
        $("#vim-tutorial-status").classList.toggle("free-mode", free);
        $("#vim-stage-position").textContent = free
            ? "scratch buffer"
            : `${stageIndex + 1}/${VIM_TUTORIAL_STAGES.length} · ${stage().name}`;
        $("#vim-explanation").hidden = !locked || free;
        if (locked && !free) $("#vim-explanation-copy").textContent = stage().explanation;
        $("#vim-next").hidden = !locked || free;
        $("#vim-help").hidden = !helpOpen;
        if (helpOpen) $("#vim-help").focus();
        document.querySelectorAll("[data-vim-pane]").forEach((button) => {
            const active = button.dataset.vimPane === mobilePane;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        $("#vim-goal-pane").classList.toggle("mobile-hidden", mobilePane !== "goal");
        $("#vim-you-pane").classList.toggle("mobile-hidden", mobilePane !== "you");
    };
    const reset = () => {
        if (vimAdvanceTimer) clearTimeout(vimAdvanceTimer);
        vimAdvanceTimer = null;
        state = makeInitialState();
        keys = [];
        locked = false;
        helpOpen = false;
        render();
        if (!free) {
            try {
                localStorage.setItem(
                    progressKey,
                    JSON.stringify({ stage: stageIndex, completed: false }),
                );
            } catch (_) {}
        }
    };
    const finish = () => {
        if (vimAdvanceTimer) clearTimeout(vimAdvanceTimer);
        vimAdvanceTimer = null;
        try {
            localStorage.setItem(
                progressKey,
                JSON.stringify({ stage: VIM_TUTORIAL_STAGES.length - 1, completed: true }),
            );
        } catch (_) {}
        body.innerHTML = `<section class="vim-completion"><div class="vim-completion-mark">✓</div><div class="page-eyebrow">~/vim · completed</div><h2>You made it through the basics.</h2><p>You moved around a file, jumped between words and lines, changed text, deleted lines, copied them, and opened new lines. You can use these motions in VS Code with an extension or in Neovim.</p><h3>The motions you tried</h3><div class="vim-motion-list"><span><kbd>h j k l</kbd> move</span><span><kbd>w b e</kbd> words</span><span><kbd>0 $</kbd> line start / end</span><span><kbd>gg G</kbd> file start / end</span><span><kbd>f{char}</kbd> find a character</span><span><kbd>x dd</kbd> delete</span><span><kbd>yy p</kbd> yank and put</span><span><kbd>i Esc</kbd> insert mode</span><span><kbd>ciw</kbd> change inside word</span><span><kbd>a A</kbd> append</span><span><kbd>o O</kbd> open a line</span></div><div class="btns"><a class="btn" href="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim" target="_blank" rel="noopener">Vim extension for VS Code ↗</a><a class="btn alt" href="https://neovim.io/doc/user/" target="_blank" rel="noopener">Neovim :help ↗</a><a class="btn alt" href="https://github.com/abdurisaq/.dotfiles" target="_blank" rel="noopener">My dotfiles ↗</a><button class="btn alt" id="vim-again" type="button">Run it again</button></div></section>`;
        $("#vim-again").addEventListener("click", () => {
            try {
                localStorage.setItem(progressKey, JSON.stringify({ stage: 0, completed: false }));
            } catch (_) {}
            location.hash = "#/vim/play?stage=1";
        });
    };
    const advance = () => {
        if (vimAdvanceTimer) clearTimeout(vimAdvanceTimer);
        vimAdvanceTimer = null;
        if (stageIndex >= VIM_TUTORIAL_STAGES.length - 1) {
            finish();
            return;
        }
        stageIndex += 1;
        try {
            localStorage.setItem(
                progressKey,
                JSON.stringify({ stage: stageIndex, completed: false }),
            );
        } catch (_) {}
        reset();
        // The manual Next button takes focus away from the buffer. Return focus
        // after every stage transition so the next lesson accepts keys immediately.
        setTimeout(() => $("#vim-buffer")?.focus(), 0);
    };
    const matchesSequence = (trace, sequence) => {
        for (let i = 0; i <= trace.length - sequence.length; i++)
            if (sequence.every((key, j) => trace[i + j] === key)) return true;
        return false;
    };
    const stageActionsMatch = () => {
        if (free) {
            const required = stage()?.requiredSequences || [];
            const counts = stage()?.requiredSequenceCounts || {};
            if (!required.every((sequence) => matchesSequence(keys, sequence))) return false;
            return Object.entries(counts).every(([sequence, count]) => {
                const parts = sequence.split(",");
                let found = 0;
                for (let i = 0; i <= keys.length - parts.length; i++)
                    if (parts.every((key, j) => keys[i + j] === key)) found++;
                return found >= count;
            });
        }
        const required = stage()?.requiredKeys;
        return (
            !required ||
            (required.length === keys.length && required.every((key, i) => keys[i] === key))
        );
    };
    const showVimCommand = () => {
        const row = $("#vim-play-command");
        row.hidden = false;
        const input = $("#vim-play-command-input");
        input.value = "";
        input.focus();
    };
    const closeVimCommand = () => {
        $("#vim-play-command").hidden = true;
        buffer().focus();
    };
    const runVimCommand = (raw) => {
        const command = raw.trim().replace(/^:/, "").toLowerCase();
        if (command === "w" || command === "write") {
            const correct = !free && engine.isPass(stage(), state) && stageActionsMatch();
            if (correct) {
                locked = true;
                $("#vim-play-command").hidden = true;
                render();
                $("#vim-next").focus();
            } else {
                $("#vim-play-command-message").textContent = free
                    ? "Free Play has no save target. Keep editing or use :q to reset."
                    : "Not yet. The buffer and the required motions both need to match. Use :q to reset this stage.";
                $("#vim-play-command-message").hidden = false;
            }
            return;
        }
        if (command === "q" || command === "quit") {
            $("#vim-play-command").hidden = true;
            reset();
            buffer().focus();
            return;
        }
        if (command === "qa" || command === "qall") {
            location.hash = "#/vim";
            return;
        }
        if (command === "help" || command === "h") {
            $("#vim-play-command").hidden = true;
            helpOpen = true;
            render();
            return;
        }
        $("#vim-play-command-message").textContent = `E492: Not an editor command: ${command}`;
        $("#vim-play-command-message").hidden = false;
    };
    const onKey = (event) => {
        const key = event.key;
        // The tutorial does not bind browser/system modifier shortcuts.
        if (event.ctrlKey || event.metaKey || event.altKey) {
            event.stopPropagation();
            return;
        }
        if (key === ":" && state.mode === "normal" && !state.pendingKey) {
            event.preventDefault();
            event.stopPropagation();
            showVimCommand();
            return;
        }
        if (key === "/" && state.mode === "normal" && !state.pendingKey) {
            event.preventDefault();
            event.stopPropagation();
            openSearch("grep");
            return;
        }
        if (helpOpen) {
            if (key === "Escape" || key === "?") {
                event.preventDefault();
                event.stopPropagation();
                helpOpen = false;
                render();
                buffer().focus();
            }
            return;
        }
        if (key === "Escape" && state.mode === "normal") {
            event.preventDefault();
            event.stopPropagation();
            reset();
            return;
        }
        if (key === "r" && state.mode === "normal" && !state.pendingKey) {
            event.preventDefault();
            event.stopPropagation();
            reset();
            return;
        }
        if (key === "?" && state.mode === "normal" && !state.pendingKey) {
            event.preventDefault();
            event.stopPropagation();
            helpOpen = true;
            render();
            return;
        }
        if (locked) {
            if (key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                advance();
            }
            return;
        }
        if (!engine.handlesKey(state, key)) {
            if (key.startsWith("Arrow") || key === "Tab" || key === "Enter") event.preventDefault();
            event.stopPropagation();
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        state = engine.handleKey(state, key);
        keys.push(key);
        render();
    };

    if (free) {
        body.innerHTML = `<div class="vim-stage-toolbar"><span class="vim-stage-badge" id="vim-stage-count">FREE PLAY</span></div>${tutorialMarkup()}`;
    } else {
        if (saved.completed && !query.has("stage")) {
            finish();
            return;
        }
        body.innerHTML = `<div class="vim-stage-toolbar"><span class="vim-stage-badge" id="vim-stage-count"></span></div>${tutorialMarkup()}`;
    }
    function tutorialMarkup() {
        return `<div class="vim-stage-intro"><h2 id="vim-stage-name"></h2><p id="vim-goal-copy"></p></div><div class="vim-pane-switch"><button type="button" data-vim-pane="goal" aria-pressed="false">GOAL</button><button type="button" data-vim-pane="you" class="active" aria-pressed="true">YOU</button></div><div class="vim-two-pane"><section class="vim-pane" id="vim-goal-pane"><header><strong>[ GOAL ]</strong><span>target state</span></header><div class="vim-text-buffer vim-goal-buffer" id="vim-goal-buffer"></div></section><section class="vim-pane" id="vim-you-pane"><header><strong>[ YOU ]</strong><span>editable buffer</span></header><div class="vim-buffer vim-text-buffer" id="vim-buffer" tabindex="0" aria-label="Vim practice buffer. Click here and type Vim motions."></div><div class="vim-hint" id="vim-hint">Click here to start typing</div><div class="vim-key-strip" id="vim-keys"></div></section></div><div class="vim-tutorial-status" id="vim-tutorial-status"><strong id="vim-mode-label">-- NORMAL --</strong><span id="vim-stage-position"></span><span class="vim-status-spacer"></span><button type="button" id="vim-help-button">? help</button><button type="button" id="vim-reset-button">r restart</button></div><div class="vim-play-command" id="vim-play-command" hidden><span>:</span><input id="vim-play-command-input" aria-label="Vim tutorial command" autocomplete="off" spellcheck="false"><span class="vim-play-command-hint">:w save · :q reset · :qa exit</span></div><p class="vim-play-command-message" id="vim-play-command-message" hidden></p><section class="vim-explanation" id="vim-explanation" hidden><div class="vim-explanation-check">✓ Nice.</div><p id="vim-explanation-copy"></p><button class="btn" id="vim-next" type="button" hidden>Next stage ↗</button></section><div class="vim-help" id="vim-help" tabindex="-1" hidden><div class="vim-help-card"><div class="dialog-heading"><h2>Motion cheat sheet</h2><button type="button" class="subtle-button" id="vim-help-close">×</button></div><div class="vim-motion-list"><span><kbd>h j k l</kbd> move</span><span><kbd>w b e</kbd> word navigation</span><span><kbd>0 $</kbd> line start / end</span><span><kbd>gg G</kbd> buffer start / end</span><span><kbd>f + character</kbd> find character</span><span><kbd>x dd</kbd> delete character / line</span><span><kbd>yy p</kbd> copy line / put below</span><span><kbd>i Esc</kbd> insert / return to Normal</span><span><kbd>ciw</kbd> change inside word</span><span><kbd>a A</kbd> append after cursor / at line end</span><span><kbd>o O</kbd> open a line below / above</span></div><p>Type <kbd>:w</kbd> and press Enter to submit. <kbd>:q</kbd> resets the current stage. <kbd>:qa</kbd> leaves the tutorial. Press <kbd>Esc</kbd> in Insert mode to return to Normal.</p></div></div>`;
    }
    const buffer = () => $("#vim-buffer");
    buffer().addEventListener("focus", () => {
        focused = true;
        $("#vim-hint").hidden = true;
        buffer().classList.add("has-focus");
    });
    buffer().addEventListener("blur", () => {
        focused = false;
        $("#vim-hint").hidden = false;
        buffer().classList.remove("has-focus");
    });
    buffer().addEventListener("keydown", onKey, true);
    $("#vim-play-command-input").addEventListener("keydown", (event) => {
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
    $("#vim-reset-button").addEventListener("click", reset);
    $("#vim-help-button").addEventListener("click", () => {
        helpOpen = true;
        render();
    });
    // Advance on pointerdown so the stage transition is not lost if the button
    // moves as it takes focus. Keyboard activation produces a click with detail=0.
    $("#vim-next").addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        advance();
    });
    $("#vim-next").addEventListener("click", (event) => {
        if (event.detail === 0) advance();
    });
    $("#vim-help-close").addEventListener("click", () => {
        helpOpen = false;
        render();
        buffer().focus();
    });
    $("#vim-help").addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                helpOpen = false;
                render();
                buffer().focus();
            }
        },
        true,
    );
    document.querySelectorAll("[data-vim-pane]").forEach((button) =>
        button.addEventListener("click", () => {
            mobilePane = button.dataset.vimPane;
            render();
        }),
    );
    reset();
}

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
    return { page, id, query: new URLSearchParams(hashQuery || location.search) };
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
    if (!splitState) splitState = { leftKey: active, rightKey: key, orientation, active: "right" };
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
function closeToActiveSplit() {
    if (!splitState) return;
    const keep = splitState.active === "left" ? splitState.leftKey : splitState.rightKey;
    splitState = null;
    const route = bufferRoute(keep);
    if (location.hash !== route) location.hash = route;
    else renderEditor();
}
function closeCurrentSplitPane() {
    if (!splitState) return;
    const keep = splitState.active === "left" ? splitState.rightKey : splitState.leftKey;
    splitState = null;
    const route = bufferRoute(keep);
    if (location.hash !== route) location.hash = route;
    else renderEditor();
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
            ? "blog"
            : key.startsWith("vim:") || key === "vim"
              ? "vim"
              : key === "experience" || key === "skills" || key === "resume"
                ? "experience"
                : "~";
    $("#breadcrumb").innerHTML =
        `<span>${esc(P.handle)}</span> <span style="color:var(--dim)">/</span> <span>${esc(parent)}</span> <span style="color:var(--dim)">/</span> <span class="crumb-current">${esc(file)}</span>`;
    $("#status").innerHTML =
        `<span class="status-mode">NORMAL</span><span class="status-branch">⌥ main</span><span class="status-file">${esc(file)}</span><span class="status-spacer"></span><button class="status-button" id="status-help" title="Keyboard shortcuts">? keys</button><span class="status-theme">${document.documentElement.dataset.theme} · melange</span><span class="status-position">utf-8&nbsp; · &nbsp;${route.page === "home" ? "1:1" : "1:1"}</span>`;
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
function bindRenderedContent(root) {
    root.querySelectorAll(".screenshot-slot img").forEach((img) => {
        img.addEventListener(
            "load",
            () => img.closest(".screenshot-slot")?.classList.add("has-image"),
            { once: true },
        );
        img.addEventListener("error", () => img.remove(), { once: true });
        if (img.complete && img.naturalWidth > 0)
            img.closest(".screenshot-slot")?.classList.add("has-image");
    });
    root.querySelectorAll(".video-load").forEach((button) =>
        button.addEventListener("click", () => {
            const figure = button.closest(".video-figure");
            const frame = document.createElement("iframe");
            frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(figure.dataset.videoId)}?rel=0`;
            frame.title =
                figure.querySelector(".video-caption span")?.textContent || "Project demonstration";
            frame.loading = "lazy";
            frame.referrerPolicy = "strict-origin-when-cross-origin";
            frame.allow =
                "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";
            frame.allowFullscreen = true;
            figure.querySelector(".video").replaceChildren(frame);
        }),
    );
}
function renderEditor() {
    renderChrome();
    const key = currentKey();
    const primary = $("#app"),
        secondary = $("#secondary-pane"),
        splitApp = $("#split-app"),
        panes = $("#editor-panes");
    if (splitState) {
        // Keep both buffers mounted; the URL and statusline follow the active pane.
        primary.innerHTML = renderPageForKey(splitState.leftKey);
        splitApp.innerHTML = renderPageForKey(splitState.rightKey);
        secondary.hidden = false;
        panes.dataset.orientation = splitState.orientation;
        $("#primary-pane").classList.toggle("active-pane", splitState.active === "left");
        secondary.classList.toggle("active-pane", splitState.active === "right");
        updatePaneTitles();
        bindRenderedContent(primary);
        bindRenderedContent(splitApp);
    } else {
        secondary.hidden = true;
        delete panes.dataset.orientation;
        $("#primary-pane").classList.remove("active-pane");
        $("#primary-pane-title").hidden = true;
        primary.innerHTML = renderPageForKey(key);
        bindRenderedContent(primary);
    }
    if (key === "style") loadDotfiles();
    if (key === "vim:play") initVimTutorial(current().query);
}

function renderProjectTree() {
    const ordered = [...DATA.projects, ...DATA.communityProjects];
    $("#project-tree").innerHTML = ordered
        .map(
            (p) =>
                `<a class="tree-file" href="${projectRoute(p)}" data-project="${esc(p.id)}" aria-label="${esc(p.id)}.md"><span class="file-type md">MD</span><span class="tree-label">${esc(p.id)}.md</span></a>`,
        )
        .join("");
    $("#smaller-project-tree").innerHTML = DATA.smallerProjects
        .map(
            (p) =>
                `<a class="tree-file" href="${projectRoute(p)}" data-project="${esc(p.id)}" aria-label="${esc(p.id)}.md"><span class="file-type md">MD</span><span class="tree-label">${esc(p.id)}.md</span></a>`,
        )
        .join("");
    const blogTree = $("#blog-tree"),
        deepDiveTree = $("#deep-dive-tree");
    if (blogTree)
        blogTree.innerHTML = DATA.blogPosts
            .filter((post) => post.type !== "technical")
            .map(
                (post) =>
                    `<a class="tree-file" href="#/blog/${encodeURIComponent(post.id)}" data-route="blog" data-route-id="${esc(post.id)}" aria-label="${esc(post.id)}.md"><span class="file-type md">MD</span><span class="tree-label">${esc(post.id)}.md</span></a>`,
            )
            .join("");
    if (deepDiveTree)
        deepDiveTree.innerHTML = DATA.blogPosts
            .filter((post) => post.type === "technical")
            .map(
                (post) =>
                    `<a class="tree-file" href="#/blog/${encodeURIComponent(post.id)}" data-route="blog" data-route-id="${esc(post.id)}" aria-label="${esc(post.id)}.md"><span class="file-type md">MD</span><span class="tree-label">${esc(post.id)}.md</span></a>`,
            )
            .join("");
}
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
    $("#app").focus({ preventScroll: true });
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
            detail: "Resume PDF · file not bundled yet",
            route: "#/resume",
            kind: "PDF",
            content: ["resume.pdf", "curriculum vitae"],
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
            detail: "About the Neovim-inspired interface",
            route: "#/style",
            kind: "PAGE",
            content: ["Melange colorscheme from my current dotfiles hosted on GitHub"],
        },
        {
            label: "index.md",
            path: "blog/index.md",
            detail: "Project stories and technical notes",
            route: "#/blog",
            kind: "PAGE",
            content: DATA.blogPosts
                .filter((post) => post.type !== "technical")
                .map((post) => `${post.title} ${post.subtitle}`)
                .join("\n")
                .split("\n"),
        },
        {
            label: "index.md",
            path: "vim/index.md",
            detail: "Interactive Vim motions tutorial",
            route: "#/vim",
            kind: "PAGE",
            content: [
                "vim motions keyboard tutorial VS Code IDE Neovim movement h j k l w b e dd ciw",
            ],
        },
    ];
    DATA.blogPosts.forEach((post) =>
        items.push({
            label: `${post.id}.md`,
            path: `blog/${post.id}.md`,
            detail: post.subtitle,
            route: `#/blog/${post.id}`,
            kind: post.type === "technical" ? "NOTES" : "BLOG",
            content: [
                post.title,
                post.subtitle,
                post.intro,
                ...(post.sections || []).flatMap((section) => [
                    section.title,
                    ...(section.paragraphs || []),
                    ...(section.bullets || []),
                    section.code || "",
                ]),
                ...(post.workflow || []),
                ...(post.offsetNotes || []).flatMap((note) => [
                    note.title,
                    note.offset,
                    note.base,
                    note.detail,
                    ...note.fields,
                ]),
                ...(post.resources || []).flatMap((resource) => [resource.title, resource.note]),
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
    items.push({
        label: "play.md",
        path: "vim/play.md",
        detail: "Interactive Vim motions game",
        route: "#/vim/play",
        kind: "TUTORIAL",
        content: VIM_TUTORIAL_STAGES.flatMap((stage) => [
            stage.name,
            stage.goal,
            stage.explanation,
            ...stage.initial,
        ]),
    });
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
function highlightSearch(value, query) {
    const text = String(value || "");
    const q = String(query || "").trim();
    if (!q) return esc(text);
    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${safe})`, "ig");
    return text
        .split(regex)
        .map((part) =>
            part.toLowerCase() === q.toLowerCase()
                ? `<mark class="search-hit">${esc(part)}</mark>`
                : esc(part),
        )
        .join("");
}
function grepOccurrences(query) {
    const q = String(query || "")
        .trim()
        .toLowerCase();
    if (!q) return [];
    const results = [];
    for (const item of searchItems) {
        if (item.kind === "DIR") continue;
        let number = 0;
        for (const content of (item.content || []).map(String)) {
            const lower = content.toLowerCase();
            let offset = 0;
            while ((offset = lower.indexOf(q, offset)) !== -1) {
                const start = Math.max(0, offset - 72),
                    end = Math.min(content.length, offset + q.length + 110);
                results.push({
                    ...item,
                    matchText: content,
                    matchExcerpt: `${start ? "…" : ""}${content.slice(start, end).trim()}${end < content.length ? "…" : ""}`,
                    occurrence: ++number,
                });
                offset += Math.max(1, q.length);
                if (results.length >= 160) return results;
            }
        }
    }
    return results;
}
function previewMarkup(item, query) {
    if (!item)
        return `<div class="palette-preview-empty">Type a filename or search term to preview a result.</div>`;
    const text =
        searchMode === "grep"
            ? item.matchExcerpt
            : (item.content || []).filter(Boolean).join("\n\n") || item.detail;
    const path =
        searchMode === "grep" ? `<div class="palette-preview-path">${esc(item.path)}</div>` : "";
    const meta = searchMode === "grep" ? `Match ${item.occurrence} · ${item.kind}` : item.kind;
    return `<div class="palette-preview-inner"><div class="palette-preview-meta"><span>${esc(meta)}</span><span>${searchMode === "grep" ? "GREP" : "FILE"}</span></div><h3>${esc(item.label)}</h3><p class="palette-preview-detail">${esc(item.detail)}</p>${path}<div class="palette-preview-rule"></div><pre class="palette-preview-excerpt">${highlightSearch(text, query)}</pre><div class="palette-preview-open">Enter to open · ↑ / ↓ to inspect another result</div></div>`;
}
function updateSearchSelection() {
    const buttons = [...$("#palette-results").querySelectorAll("[data-search-index]")];
    buttons.forEach((button, index) => button.classList.toggle("selected", index === searchIndex));
    const selected = buttons[searchIndex];
    if (selected) selected.scrollIntoView({ block: "nearest" });
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
        mode === "grep" ? "Search text across files…" : "Find a file by name…";
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
        mode === "grep" ? "Search text across files…" : "Find a file by name…";
    renderSearchResults($("#palette-input").value);
    $("#palette-input").focus();
}
function renderSearchResults(query) {
    const q = query.trim();
    if (searchMode === "grep") searchMatches = grepOccurrences(q);
    else
        searchMatches = searchItems
            .filter((item) => item.kind !== "DIR" && scoreSearch(q, [item.label]) > 0)
            .sort((a, b) => a.label.localeCompare(b.label));
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
                      `<button class="palette-result ${index === searchIndex ? "selected" : ""}" data-search-index="${index}" data-search-route="${esc(item.route)}"><span class="result-symbol">${item.kind === "PROJECT" ? "◇" : item.kind === "TUTORIAL" ? "▶" : "▤"}</span><span class="result-copy"><strong>${esc(item.label)}</strong><small>${esc(searchMode === "grep" ? item.matchExcerpt : item.detail)}</small></span><span class="result-kind">${esc(item.kind)}</span></button>`,
              )
              .join("")
        : `<div class="palette-empty">${searchMode === "grep" ? "No matching text occurrences." : "No filenames match that search."}</div>`;
    updateSearchSelection();
}
$("#search-open").addEventListener("click", () => openSearch("files"));
$("#palette-input").addEventListener("input", (event) => {
    searchIndex = 0;
    renderSearchResults(event.target.value);
});
$("#palette-modes").addEventListener("click", (event) => {
    const button = event.target.closest("[data-search-mode]");
    if (button) setSearchMode(button.dataset.searchMode);
});
$("#palette-results").addEventListener("pointerover", (event) => {
    const button = event.target.closest("[data-search-index]");
    if (button) {
        searchIndex = Number(button.dataset.searchIndex);
        updateSearchSelection();
    }
});
function chooseSearch() {
    const item = searchMatches[searchIndex];
    if (item?.route) {
        location.hash = item.route;
        closeSearch();
    }
}
$("#palette-results").addEventListener("click", (event) => {
    const button = event.target.closest("[data-search-route]");
    if (button) {
        searchIndex = Number(button.dataset.searchIndex);
        chooseSearch();
    }
});
$("#search-overlay").addEventListener("click", (event) => {
    if (event.target.matches("[data-close-overlay]")) closeSearch();
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
        if (now - lastG < 650) scroller?.scrollTo({ top: 0, behavior: "smooth" });
        lastG = now;
        return;
    }
    if (e.key === "G") {
        scroller?.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
        return;
    }
    if (e.key === "j") {
        scroller?.scrollBy({ top: 42, behavior: "smooth" });
        return;
    }
    if (e.key === "k") {
        scroller?.scrollBy({ top: -42, behavior: "smooth" });
        return;
    }
});

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
