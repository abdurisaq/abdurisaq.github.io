/* Shared HTML helpers and page templates. */
const $ = (s) => document.querySelector(s);
const joinHtml = (...parts) => parts.join("");
const esc = (s) =>
    String(s).replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[c],
    );
const t = (s) => (/^TODO/.test(s) ? `<span class="todo">${esc(s)}</span>` : esc(s));
const P = DATA.profile,
    D = DATA.dotfiles,
    REPO = `https://github.com/${D.user}/${D.repo}`;
const tags = (a) =>
    `<div class="tags">${a.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>`;
const video = (v) =>
    joinHtml(
        `<figure class="video-figure" data-video-id="${esc(v.id)}"><div class="video video-preview">`,
        `<img src="https://i.ytimg.com/vi/${encodeURIComponent(v.id)}/hqdefault.jpg" alt="" loading="lazy">`,
        `<button class="video-load" type="button" aria-label="Load video: ${esc(v.title)}">`,
        `<span class="video-play-icon">▶</span><span>Load video</span></button></div>`,
        `<figcaption class="video-caption"><span>${esc(v.title)}</span>`,
        `<a href="https://www.youtube.com/watch?v=${encodeURIComponent(v.id)}" target="_blank" `,
        `rel="noopener">If the player is unavailable, watch on YouTube ↗</a></figcaption></figure>`,
    );
const screenshotGallery = (shots) =>
    !shots?.length
        ? ""
        : joinHtml(
              `<section class="screenshot-section"><div class="section-heading-row"><h2>Project screenshots</h2>`,
              `<span class="section-kicker">drop-in image slots</span></div><div class="screenshot-gallery">`,
              `${shots
                  .map((shot, i) =>
                      joinHtml(
                          `<figure class="screenshot-slot"><div class="screenshot-placeholder"><span>SCREENSHOT `,
                          `${String(i + 1).padStart(2, "0")}</span><code>${esc(shot.src)}</code>`,
                          `<small>Add your image at this path</small></div><img src="${esc(shot.src)}" alt="${esc(shot.alt)}" `,
                          `loading="lazy"><figcaption>${esc(shot.caption || shot.alt)}</figcaption></figure>`,
                      ),
                  )
                  .join("")}</div>`,
              `</section>`,
          );
const renderSectionBody = (section) =>
    joinHtml(
        (section.paragraphs || []).map((text) => `<p>${esc(text)}</p>`).join(""),
        section.bullets?.length
            ? `<ul>${section.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
            : "",
    );
const renderProjectSections = (sections) =>
    (sections || [])
        .map((section) =>
            joinHtml(
                `<section class="project-story-section"><h2>${esc(section.title)}</h2>`,
                renderSectionBody(section),
                `</section>`,
            ),
        )
        .join("");
const renderBlogSections = (sections) =>
    (sections || [])
        .map((section, i) =>
            joinHtml(
                `<section class="blog-section" id="blog-section-${i + 1}"><h2>${esc(section.title)}</h2>`,
                renderSectionBody(section),
                section.code
                    ? `<pre class="blog-code"><code>${esc(section.code)}</code></pre>`
                    : "",
                section.callout
                    ? `<aside class="blog-callout">${esc(section.callout)}</aside>`
                    : "",
                `</section>`,
            ),
        )
        .join("");
const blogCard = (post) =>
    joinHtml(
        `<a class="blog-card" href="#/blog/${encodeURIComponent(post.id)}"><div class="blog-card-meta">`,
        `${esc(post.category)} <span>·</span> ${esc(post.readTime)}</div><h3>${esc(post.title)}</h3><p>`,
        `${esc(post.subtitle)}</p><span class="blog-card-link">Read the post ↗</span></a>`,
    );
const isSmallerProject = (id) => DATA.smallerProjects.some((p) => p.id === id);
const projectRoute = (p) =>
    isSmallerProject(p.id)
        ? `#/smaller-projects/${encodeURIComponent(p.id)}`
        : `#/projects/${encodeURIComponent(p.id)}`;
const projectCard = (p) =>
    joinHtml(
        `<a class="card" href="${projectRoute(p)}"><h3>${esc(p.name)}</h3><p>${esc(p.summary)}</p>`,
        `${
            p.metrics
                ? joinHtml(
                      `<div class="metric-row">`,
                      `${p.metrics
                          .map((m) =>
                              joinHtml(
                                  `<span class="metric"><strong>${esc(m.value)}</strong>`,
                                  `<small>${esc(m.label)}</small></span>`,
                              ),
                          )
                          .join("")}</div>`,
                  )
                : ""
        }`,
        `${tags(p.stack.slice(0, 4))}</a>`,
    );
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
    home: () =>
        joinHtml(
            `<section class="hero"><div class="hi">-- hello, world</div><div class="big">${esc(P.name)}<span `,
            `style="color:var(--yellow)">.</span></div><p class="sub">${esc(P.tagline)}</p><div class="btns">`,
            `<a class="btn" href="#/projects">Explore projects <span>↗</span></a>`,
            `<a class="btn alt" href="#/resume">View resume</a><a class="btn alt" href="#/about">About me</a>`,
            `</div><div class="boring-invite">`,
            `<p>Does this overwhelm you and you just want a normal website? Click the boring button to make this `,
            `into a boring website.</p>`,
            `<button class="btn alt" type="button" data-boring-toggle>Make it boring</button></div>`,
            `</section>
    <section><h2>Featured projects</h2><div class="grid">`,
            `${DATA.projects.slice(0, 3).map(projectCard).join("")}</div><p style="margin-top:15px">`,
            `<a href="#/projects">Browse all projects →</a></p></section>
    <section>`,
            `<div class="section-heading-row"><h2>Built for a community</h2>`,
            `<span class="section-kicker">community project</span></div><div class="grid">`,
            `${DATA.communityProjects.map(projectCard).join("")}</div></section>
    <section>`,
            `<h2>Open-source contributions</h2>`,
            `<p>Ongoing work on a personal Mihon fork, including an upstream bug fix and an extension-filtering `,
            `contribution.</p><a href="#/community">Read about community contributions →</a>`,
            `</section>
    <section><div class="section-heading-row"><h2>From the blog</h2>`,
            `<span class="section-kicker">field notes</span></div><div class="grid">`,
            `${DATA.blogPosts
                .filter((post) => post.type === "story")
                .slice(0, 3)
                .map(blogCard)
                .join("")}</div>`,
            `<p style="margin-top:15px"><a href="#/blog">Browse the blog →</a></p></section>
    <section>`,
            `<div class="section-heading-row"><h2>Try the motions</h2>`,
            `<span class="section-kicker">interactive · 14 stages</span></div>`,
            `<a class="blog-card vim-home-card" href="#/vim"><h3>Vim motions, without the editor switch</h3>`,
            `<p>A small keyboard-first tutorial. Learn the movements that work in VS Code, your browser, and other `,
            `editors too.</p><span class="blog-card-link">Start learning ↗</span></a></section>
    <section>`,
            `<h2>Get in touch</h2><p><a href="mailto:${esc(P.email)}">${esc(P.email)}</a> <span `,
            `style="color:var(--dim)">·</span> <a href="${esc(P.github)}" target="_blank" rel="noopener">GitHub `,
            `↗</a> <span style="color:var(--dim)">·</span> <a href="${esc(P.linkedin)}" target="_blank" `,
            `rel="noopener">LinkedIn ↗</a></p></section>`,
        ),
    about: () =>
        joinHtml(
            `<h1>about me</h1><section class="cols"><div>${DATA.about.map((x) => `<p>${t(x)}</p>`).join("")}</div>`,
            `<aside class="side">`,
            `${DATA.facts
                .map(([k, v]) =>
                    joinHtml(
                        `<div style="margin-bottom:8px"><span style="color:var(--cyan)">${esc(k)}:</span> `,
                        `${t(v)}</div>`,
                    ),
                )
                .join("")}</aside>`,
            `</section>`,
        ),
    experience: () =>
        joinHtml(
            `<h1>experience</h1><section class="timeline">`,
            `${DATA.experience
                .map((j) =>
                    joinHtml(
                        `<div class="job"><h3>${t(j.role)}</h3><div class="meta">${t(j.org)} · ${t(j.dates)} · ${t(j.place)}</div>`,
                        `<ul>${j.bullets.map((b) => `<li>${t(b)}</li>`).join("")}</ul></div>`,
                    ),
                )
                .join("")}</section>`,
        ),
    projects: () =>
        joinHtml(
            `<h1>projects</h1>`,
            `<p class="page-intro">Selected work first, followed by community software and smaller independent `,
            `projects.</p><section><h2>Featured projects</h2><div class="grid">`,
            `${DATA.projects.slice(0, 3).map(projectCard).join("")}</div></section><section>`,
            `<div class="section-heading-row"><h2>Community project</h2>`,
            `<span class="section-kicker">player adoption</span></div><div class="grid">`,
            `${DATA.communityProjects.map(projectCard).join("")}</div></section>`,
            `${
                DATA.projects.length > 3
                    ? joinHtml(
                          `<section><h2>Additional selected work</h2><div class="grid">`,
                          `${DATA.projects.slice(3).map(projectCard).join("")}</div></section>`,
                      )
                    : ""
            }<section>`,
            `<div class="section-heading-row"><h2>Smaller projects</h2>`,
            `<span class="section-kicker">more experiments</span></div>`,
            `<p>Smaller applications, coursework and systems exercises. Each project has its own page in `,
            `<code>projects/smaller-projects/</code>.</p><div class="grid">`,
            `${DATA.smallerProjects.map(projectCard).join("")}</div></section>`,
        ),
    project: (id) => {
        const p = [...DATA.projects, ...DATA.communityProjects, ...DATA.smallerProjects].find(
            (x) => x.id === id,
        );
        if (!p) return pages.notfound();
        const projectFolder = isSmallerProject(id) ? "smaller-projects" : "projects";
        return joinHtml(
            `<div class="crumb"><a href="#/projects">projects</a> / `,
            `${projectFolder === "smaller-projects" ? `<span>smaller-projects</span> / ` : ""}${esc(p.id)}</div>
  `,
            `    <h1>${esc(p.name)}</h1>
      <p class="page-intro">${esc(p.summary)}</p>
      `,
            `${
                p.storyPostId
                    ? joinHtml(
                          `<aside class="project-blog-cta"><span class="cta-kicker">How this project happened</span><p>`,
                          `<a href="#/blog/${encodeURIComponent(p.storyPostId)}">Read the story behind ${esc(p.name)} ↗</a>`,
                          `${
                              p.technicalPostId
                                  ? ` <span class="link-separator">·</span> <a href="#/blog/${encodeURIComponent(p.technicalPostId)}">Technical notes ↗</a>`
                                  : ""
                          }</p>`,
                          `</aside>`,
                      )
                    : ""
            }
`,
            `      `,
            `${
                p.image
                    ? joinHtml(
                          `<figure class="project-media"><img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.name)}" `,
                          `loading="lazy"><figcaption>${esc(p.imageAlt || p.name)}</figcaption></figure>`,
                      )
                    : ""
            }
`,
            `      `,
            `${
                p.metrics
                    ? joinHtml(
                          `<div class="metrics-panel"><div class="metrics-label">`,
                          `${esc(p.metricsLabel || "Community reach · figures provided")}</div><div class="metric-row">`,
                          `${p.metrics
                              .map((m) =>
                                  joinHtml(
                                      `<div class="metric"><strong>${esc(m.value)}</strong>`,
                                      `<small>${esc(m.label)}</small></div>`,
                                  ),
                              )
                              .join("")}</div>`,
                          `</div>`,
                      )
                    : ""
            }
`,
            `      <div class="cols project-layout"><div>
        <section><h2>What it is</h2><p>${esc(p.about)}</p>`,
            `</section>
        ${renderProjectSections(p.sections)}
        <section>`,
            `<h2>Technical highlights</h2><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>`,
            `</section>
      </div><aside class="side"><h3>Technology</h3>${tags(p.stack)}<h3 `,
            `style="margin-top:20px">Links</h3>`,
            `${p.links
                .map(([name, url]) =>
                    joinHtml(
                        `<div style="margin:6px 0"><a href="${esc(url)}" target="_blank" rel="noopener">`,
                        `${esc(name)} ↗</a></div>`,
                    ),
                )
                .join("")}</aside>`,
            `</div>
      ${screenshotGallery(p.screenshots)}
      `,
            `${(p.videos || []).length ? `<section><h2>Demo</h2>${p.videos.map(video).join("")}</section>` : ""}`,
        );
    },
    skills: () =>
        joinHtml(
            `<h1>skills</h1><p class="page-intro">Technologies and tools used across projects and coursework.</p>`,
            `${Object.entries(DATA.skills)
                .map(([g, list]) =>
                    joinHtml(
                        `<section class="skill-group"><h2>${esc(g)}</h2><div class="skill-list">`,
                        `${list.map((name) => `<span class="skill-chip">${esc(name)}</span>`).join("")}</div></section>`,
                    ),
                )
                .join("")}`,
        ),
    setup: () =>
        joinHtml(
            `<h1>my setup</h1><p class="page-intro">${esc(DATA.setup.intro)}</p><section class="setup-grid">`,
            `${DATA.setup.machines
                .map((machine) =>
                    joinHtml(
                        `<article class="setup-machine"><div class="setup-device">${esc(machine.device)}</div><h2>`,
                        `${esc(machine.system)}</h2><p>${esc(machine.detail)}</p></article>`,
                    ),
                )
                .join("")}</section>`,
            `<section><h2>How I work</h2><ul>${DATA.setup.workflow.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`,
            `</section>`,
            `<p class="community-footnote">This is a snapshot of the environment I use, not a required stack for `,
            `the projects above. Individual projects still use the platform and toolchain their requirements call `,
            `for.</p>`,
        ),
    community: () => {
        const m = DATA.community.mihon;
        return joinHtml(
            `<h1>community contributions</h1>`,
            `<p class="page-intro">Ongoing open-source work and projects shaped by real user workflows. I keep `,
            `upstream pull requests separate from changes that live only in my fork.</p>`,
            `<section class="community-intro"><div><h2>${esc(m.name)}</h2><p>${esc(m.summary)}</p><a href="`,
            `${esc(m.repo)}" target="_blank" rel="noopener">View personal fork ↗</a>${m.stack ? tags(m.stack) : ""}</div>`,
            `<div class="contribution-count"><strong>`,
            `${m.contributions.filter((c) => c.status === "Merged upstream").length}</strong>`,
            `<span>merged upstream</span></div></section><section><h2>Upstream contributions</h2>`,
            `<div class="contribution-list">`,
            `${m.contributions
                .filter((c) => c.url)
                .map((c) =>
                    joinHtml(
                        `<article class="contribution"><div class="contribution-heading"><h3>${esc(c.title)}</h3>`,
                        `<span class="contribution-status ${c.status === "Merged upstream" ? "merged" : "open"}">`,
                        `${esc(c.status)}</span></div><p>${esc(c.detail)}</p><a href="${esc(c.url)}" target="_blank" `,
                        `rel="noopener">View pull request ↗</a></article>`,
                    ),
                )
                .join("")}</div>`,
            `</section><section><h2>Additional work in the fork</h2><div class="contribution-list">`,
            `${m.contributions
                .filter((c) => !c.url)
                .map((c) =>
                    joinHtml(
                        `<article class="contribution"><div class="contribution-heading"><h3>${esc(c.title)}</h3>`,
                        `<span class="contribution-status fork">${esc(c.status)}</span></div><p>${esc(c.detail)}</p>`,
                        `${c.branchUrl ? `<a href="${esc(c.branchUrl)}" target="_blank" rel="noopener">View implementation branch ↗</a>` : ""}`,
                        `${
                            c.issueUrl
                                ? joinHtml(
                                      `${c.branchUrl ? ` <span class="link-separator">·</span> ` : ""}<a href="${esc(c.issueUrl)}" `,
                                      `target="_blank" rel="noopener">Original issue #1232 ↗</a>`,
                                  )
                                : ""
                        }</article>`,
                    ),
                )
                .join("")}</div>`,
            `</section>`,
            `<p class="community-footnote">This is ongoing personal work for a tablet-oriented workflow; upstream `,
            `status is shown explicitly so proposed and fork-only changes are not presented as merged `,
            `contributions.</p>`,
        );
    },
    resume: () =>
        joinHtml(
            `<h1>resume</h1>`,
            `<p class="page-intro">A one-page preview, rendered from LaTeX and presented directly in the `,
            `portfolio. The original PDF is available as a download.</p><section class="resume-viewer">`,
            `<div class="resume-toolbar"><div class="resume-toolbar-info"><strong>resume.pdf</strong>`,
            `<span>Generated from <code>resume.tex</code> · image preview</span></div><a class="btn alt" href="`,
            `${esc(P.resume)}" download="Abdurisaq-Resume.pdf">Download PDF ↓</a></div>`,
            `<figure class="resume-preview-frame">`,
            `<img src="assets/resume-preview.png" alt="Full-page image preview of the resume" loading="eager" `,
            `decoding="async"></figure>`,
            `<p class="resume-caption">The page preview is an image, so the browser's built-in PDF controls never `,
            `appear here. Download the PDF for selectable text and an ATS-friendly copy.</p></section>`,
        ),
    style: () =>
        joinHtml(
            `<h1>colorscheme</h1>`,
            `<p>This portfolio takes its interaction model from Neovim: file navigation, open buffers, keyboard `,
            `mappings and a command line. The colors come from the Melange colorscheme in my current dotfiles, `,
            `hosted on GitHub.</p><div class="btns" style="margin:0 0 24px"><a class="btn" href="${REPO}" `,
            `target="_blank" rel="noopener">My dotfiles ↗</a></div><section><h2>Live dotfiles</h2><div id="live">`,
            `<div class="box todo">Loading dotfiles from GitHub...</div></div></section>`,
        ),
    blog: (id) => {
        if (!id) {
            const stories = DATA.blogPosts.filter((item) => item.type !== "technical");
            const notes = DATA.blogPosts.filter((item) => item.type === "technical");
            return joinHtml(
                `<div class="page-eyebrow">~/blog</div><h1>blog</h1>`,
                `<p class="page-intro">The projects, why I started them, what went wrong, and how they turned out.</p>`,
                `<section class="blog-list">${stories.map(blogCard).join("")}</section>`,
                `${
                    notes.length
                        ? joinHtml(
                              `<section class="blog-technical-list"><div class="section-heading-row"><h2>Deep dives</h2>`,
                              `<span class="section-kicker">~/blog/deep-dives</span></div>`,
                              `<p>Project-specific implementation notes: the lower-level details behind the decisions, experiments `,
                              `and debugging.</p><div class="blog-list">${notes.map(blogCard).join("")}</div></section>`,
                          )
                        : ""
                }`,
            );
        }
        const post = DATA.blogPosts.find((item) => item.id === id);
        if (!post) return pages.notfound();
        const project = [...DATA.projects, ...DATA.communityProjects, ...DATA.smallerProjects].find(
            (item) => item.id === post.projectId,
        );
        const videos = post.videos?.length
            ? joinHtml(
                  `<section class="blog-embedded-media"><h2>Walkthrough</h2>`,
                  `${post.videos.map(video).join("")}</section>`,
              )
            : "";
        const media = post.media?.length
            ? joinHtml(
                  `<section class="blog-embedded-media"><h2>From the README</h2><div class="blog-media-grid">`,
                  `${post.media
                      .map((item) =>
                          joinHtml(
                              `<figure><img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy"><figcaption>`,
                              `${esc(item.caption || item.alt)}</figcaption></figure>`,
                          ),
                      )
                      .join("")}</div>`,
                  `</section>`,
              )
            : "";
        const workflow = post.workflow?.length
            ? joinHtml(
                  `<section class="blog-workflow"><h2>My investigation loop</h2><div class="research-flow">`,
                  `${post.workflow
                      .map((step, i) =>
                          joinHtml(
                              `<div class="research-step"><span>${String(i + 1).padStart(2, "0")}</span>`,
                              `<strong>${esc(step)}</strong></div>`,
                          ),
                      )
                      .join("")}</div>`,
                  `</section>`,
              )
            : "";
        const offsets = post.offsetNotes?.length
            ? joinHtml(
                  `<section class="offset-notes"><h2>A couple of offset notes</h2>`,
                  `<p>These are observations tied to the build I inspected, not stable public layouts.</p>`,
                  `<div class="offset-note-grid">`,
                  `${post.offsetNotes
                      .map((note) =>
                          joinHtml(
                              `<article class="offset-note"><div class="offset-note-head"><strong>${esc(note.title)}</strong><code>`,
                              `${esc(note.offset)}</code></div><small>Base: ${esc(note.base)}</small><p>${esc(note.detail)}</p>`,
                              `<div class="offset-fields">${note.fields.map((field) => `<span>${esc(field)}</span>`).join("")}</div>`,
                              `</article>`,
                          ),
                      )
                      .join("")}</div>`,
                  `</section>`,
              )
            : "";
        const resources = post.resources?.length
            ? joinHtml(
                  `<section class="blog-resources"><h2>Sources and further reading</h2><ul>`,
                  `${post.resources
                      .map((resource) =>
                          joinHtml(
                              `<li><a href="${esc(resource.url)}" target="_blank" rel="noopener">${esc(resource.title)} ↗</a>`,
                              `<span> — ${esc(resource.note || "")}</span></li>`,
                          ),
                      )
                      .join("")}</ul>`,
                  `</section>`,
              )
            : "";
        const related = post.relatedId
            ? joinHtml(
                  `<aside class="blog-related"><p>${esc(post.relatedLabel || "Related technical notes")}</p>`,
                  `<a href="#/blog/${encodeURIComponent(post.relatedId)}">Open the companion write-up ↗</a></aside>`,
              )
            : "";
        const parent = post.parentId
            ? joinHtml(
                  `<aside class="blog-related"><a href="#/blog/${encodeURIComponent(post.parentId)}">← `,
                  `${esc(post.parentLabel || "Back to the story")}</a></aside>`,
              )
            : "";
        const projectLinks = project
            ? joinHtml(
                  `<p class="blog-project-link">Part of <a href="${projectRoute(project)}">${esc(project.name)}</a> · <a `,
                  `href="${esc(project.repo || project.links?.[0]?.[1] || "#")}" target="_blank" rel="noopener">Source `,
                  `code ↗</a></p>`,
              )
            : "";
        const aside =
            post.type === "technical" && post.id === "versatiletraining-ue3-notes"
                ? joinHtml(
                      `<aside class="blog-aside"><strong>What this covers</strong>`,
                      `<p>Package inspection, GObjects and GNames, the BakkesMod Function Scanner, hooks, caller wrappers, `,
                      `parameter dumps and the build-specific offsets I used while building VersatileTraining.</p></aside>`,
                  )
                : "";
        const status = post.statusNote
            ? `<aside class="blog-status-note"><span class="cta-kicker">Status note</span><p>${esc(post.statusNote)}</p></aside>`
            : "";
        return joinHtml(
            `<article class="blog-post"><div class="crumb"><a href="#/blog">blog</a> / <span>${esc(post.id)}.md</span>`,
            `</div><div class="blog-post-meta"><span>${esc(post.category || "")}</span><span>`,
            `${esc(post.date || "")}</span><span>${esc(post.readTime || "")}</span></div><h1>${esc(post.title)}</h1>`,
            `<p class="blog-subtitle">${esc(post.subtitle || "")}</p><p class="blog-lead">${esc(post.intro || "")}</p>`,
            `${projectLinks}${aside}`,
            `${
                post.sections?.length
                    ? joinHtml(
                          `<nav class="blog-toc" aria-label="In this post"><strong>In this post</strong><ol>`,
                          `${post.sections
                              .map((section, i) =>
                                  joinHtml(
                                      `<li><a href="#/blog/${encodeURIComponent(post.id)}?section=blog-section-${i + 1}">`,
                                      `${esc(section.title)}</a></li>`,
                                  ),
                              )
                              .join("")}</ol>`,
                          `</nav>${renderBlogSections(post.sections)}`,
                      )
                    : ""
            }`,
            `${related}${parent}${videos}${media}${offsets}${workflow}${resources}${status}<section `,
            `class="blog-post-end"><a class="btn alt" href="#/blog">← All posts</a>`,
            `${project ? ` <a class="btn" href="${projectRoute(project)}">Back to ${esc(project.name)} ↗</a>` : ""}</section>`,
            `</article>`,
        );
    },
    vim: () =>
        joinHtml(
            `<div class="page-eyebrow">~/vim</div><h1>vim motions</h1>`,
            `<p class="vim-pitch">I'm not going to convince you to switch to Neovim. But the best part of the `,
            `ecosystem — vim motions — travels with you. VS Code, your browser, your IDE. Once it clicks, going `,
            `back to the mouse feels like a downgrade.</p>`,
            `<p class="page-intro">Fourteen small lessons. No plugins, no config, no editor setup. Just you, a `,
            `buffer, and a few keys that start to make sense once you use them.</p>`,
            `<div class="vim-landing-actions"><a class="btn" href="#/vim/play">Start the tutorial ↗</a>`,
            `<a class="btn alt" href="#/vim/play?free=1">Jump into free play</a></div><section><h2>The stages</h2>`,
            `<div class="vim-stage-list">`,
            `${VIM_TUTORIAL_STAGES.map((stage, i) =>
                joinHtml(
                    `<a href="#/vim/play?stage=${i + 1}" class="vim-stage-link"><span>${String(i + 1).padStart(2, "0")}</span>`,
                    `<strong>${esc(stage.name)}</strong><small>${esc(stage.goal)}</small></a>`,
                ),
            ).join("")}</div>`,
            `</section>`,
            `<p class="vim-landing-note">The tutorial saves your stage locally in this browser. You can restart a `,
            `stage at any time with <kbd>r</kbd> or <kbd>Esc</kbd> in Normal mode.</p>`,
        ),
    vimPlay: (query) =>
        joinHtml(
            `<section class="vim-tutorial" id="vim-tutorial" data-free="`,
            `${query.get("free") === "1" ? "true" : "false"}"><div class="vim-tutorial-heading"><div>`,
            `<div class="page-eyebrow">~/vim/play</div><h1>Vim motions practice</h1>`,
            `<p class="vim-tutorial-subtitle">Two panes. One buffer. Solve the goal using the keys you just `,
            `learned.</p></div><a class="vim-back-link" href="#/vim">← Tutorial overview</a></div>`,
            `<div id="vim-tutorial-body"></div>`,
            `<p class="vim-access-note">Accessibility note: this interactive exercise requires direct keyboard `,
            `input. It is not currently usable with screen readers, voice control or switch-access input. The rest `,
            `of the portfolio remains available through its normal links and controls.</p></section>`,
        ),
    notfound: () =>
        joinHtml(
            `<h1>E492: not an editor command</h1>`,
            `<p>The requested buffer doesn't exist. <a href="#/">Return to index.lua</a></p>`,
        ),
};
