/* Rendered-content bindings, page rendering, and explorer population. */
const projectTreeEntry = (project) =>
    joinHtml(
        `<a class="tree-file" href="${projectRoute(project)}" data-project="${esc(project.id)}" `,
        `aria-label="${esc(project.id)}.md"><span class="file-type md">MD</span>`,
        `<span class="tree-label">${esc(project.id)}.md</span></a>`,
    );
const blogTreeEntry = (post) =>
    joinHtml(
        `<a class="tree-file" href="#/blog/${encodeURIComponent(post.id)}" data-route="blog" `,
        `data-route-id="${esc(post.id)}" aria-label="${esc(post.id)}.md">`,
        `<span class="file-type md">MD</span><span class="tree-label">${esc(post.id)}.md</span></a>`,
    );

function bindRenderedContent(root) {
    root.querySelectorAll(".screenshot-slot img").forEach((img) => {
        img.addEventListener(
            "load",
            () => img.closest(".screenshot-slot")?.classList.add("has-image"),
            {
                once: true,
            },
        );
        img.addEventListener("error", () => img.remove(), {
            once: true,
        });
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
    // Blog TOC destinations live inside the hash-router URL. Render first, then
    // scroll the active editor pane to the requested section without navigating
    // away from the current post or losing the section on refresh/back/forward.
    const sectionId = current().query.get("section");
    if (/^blog-section-\d+$/.test(sectionId || "")) {
        requestAnimationFrame(() => {
            const activeRoot = splitState?.active === "right" ? splitApp : primary;
            activeRoot.querySelector(`#${sectionId}`)?.scrollIntoView({
                behavior: "auto",
                block: "start",
            });
        });
    }
}
function renderProjectTree() {
    const ordered = [...DATA.projects, ...DATA.communityProjects];
    $("#project-tree").innerHTML = ordered.map(projectTreeEntry).join("");
    $("#smaller-project-tree").innerHTML = DATA.smallerProjects.map(projectTreeEntry).join("");

    const blogTree = $("#blog-tree");
    const deepDiveTree = $("#deep-dive-tree");
    if (blogTree) {
        blogTree.innerHTML = DATA.blogPosts
            .filter((post) => post.type !== "technical")
            .map(blogTreeEntry)
            .join("");
    }
    if (deepDiveTree) {
        deepDiveTree.innerHTML = DATA.blogPosts
            .filter((post) => post.type === "technical")
            .map(blogTreeEntry)
            .join("");
    }
}
