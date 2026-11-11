// Generated page registry populated by content/manifest.js.
const CONTENT_PAGES = [];

// Shared data namespace. Property order matches the original site-data object.
// Page files below populate these entries before any renderer scripts execute.
const DATA = {
    profile: null,
    dotfiles: null,
    setup: null,
    about: null,
    facts: null,
    experience: null,
    skills: null,
    projects: null,
    communityProjects: null,
    smallerProjects: null,
    community: null,
    blogPosts: null,
};

// Project and article collections are selected by each file's @content header.
// This avoids repeating collection names in both metadata and data registration.
function registerContentData(type, entry) {
    const page = CONTENT_PAGES.find((item) => item.id === entry.id && item.type === type);
    if (!page?.collection) throw new Error(`No content metadata found for data entry: ${entry.id}`);

    (DATA[page.collection] ||= []).push(entry);
}
