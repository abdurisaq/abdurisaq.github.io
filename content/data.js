// Shared page data and the small registry used by routing, search and the explorer.
const CONTENT_PAGES = [];

const DATA = {
    profile: null,
    dotfiles: null,
    setup: null,
    about: null,
    facts: null,
    experience: null,
    skills: null,
    projects: [],
    communityProjects: [],
    smallerProjects: [],
    community: null,
    blogPosts: [],
};

// Each page describes itself in its own file. This helper fills in values that can
// be derived consistently, leaving only page-specific information at the call site.
function addPage(options) {
    const filename = options.path.split("/").pop();
    const id = options.id || filename.replace(/\.[^.]+$/, "");
    const type = options.type || "page";
    const collection =
        options.collection ||
        (type === "project" ? "projects" : type === "blog" ? "blogPosts" : null);
    const route =
        options.route ||
        (type === "project"
            ? `#/${collection === "smallerProjects" ? "smaller-projects" : "projects"}/${encodeURIComponent(id)}`
            : type === "blog"
              ? `#/blog/${encodeURIComponent(id)}`
              : null);

    if (!route) throw new Error(`A route is required for ${options.path}`);

    const routeParts = route.replace(/^#/, "").split("?")[0].split("/").filter(Boolean);
    const defaultKeyPrefix =
        type === "project"
            ? collection === "smallerProjects"
                ? "smaller-project"
                : "project"
            : type === "blog"
              ? "blog"
              : type === "tutorial"
                ? "vim"
                : null;
    const defaultSearchProfile = ["project", "blog", "tutorial"].includes(type) ? type : null;

    CONTENT_PAGES.push({
        ...options,
        id,
        type,
        collection,
        path: options.path,
        label: options.label || filename,
        route,
        routePage: routeParts[0] || "home",
        routeId: routeParts[1] || null,
        keyPrefix: options.keyPrefix ?? defaultKeyPrefix,
        treeOrder: options.treeOrder ?? 0,
        searchable: options.searchable !== false,
        searchPaths: options.searchPaths || [],
        searchTerms: options.searchTerms || [],
        searchProfile: options.searchProfile || defaultSearchProfile,
    });
}
