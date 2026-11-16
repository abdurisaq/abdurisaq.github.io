# Architecture

The portfolio is a static site built from vanilla HTML, CSS and JavaScript. It has no framework,
bundler, package manager, backend or generated content manifest.

## Entry point

`index.html` contains the document shell, static controls and explicit stylesheet/script lists. It
loads content first and application behavior second. The scripts are classic scripts because they
share top-level bindings; do not add `type="module"` or move files without checking their
dependencies.

## Content

Each file under `content/` owns one page or one collection entry. It declares its explorer path and
route with `addPage()`, then assigns or appends the data used by the renderer.

`content/data.js` defines:

- `DATA`: the content collections and shared site information.
- `CONTENT_PAGES`: the page entries used by route lookup, search and the explorer.
- `addPage()`: a small helper that derives the filename label, page ID, route parts, default
  collection, key prefix and search profile.

Projects append to `DATA.projects`, `DATA.communityProjects` or `DATA.smallerProjects`. Articles
append to `DATA.blogPosts`. The arrays are initialized in `data.js`, so the page files use ordinary
JavaScript array operations rather than a registration system.

The content script tags in `index.html` are the explicit load list. Their order preserves the
original order of project and article collections. Add a new content file by adding its script tag
there; no generator or manifest refresh is needed.

## Rendering and navigation

- `scripts/00-page-renderers.js` contains the page templates and shared HTML helpers.
- `scripts/20-editor-state.js` handles routes, buffers and split-pane state.
- `scripts/30-editor-rendering.js` renders the editor chrome and builds the file explorer
  recursively from each page's `path`.
- `scripts/40-router-startup.js` starts route handling.

The route, explorer label and parent folders are derived in `addPage()` or from the page path. The
page-specific route and explorer order remain next to the content they describe.

## Search

`scripts/60-search.js` builds the search index from `CONTENT_PAGES` and `DATA`. Projects and blog
posts use shared extractors, while regular pages declare `searchPaths` or `searchTerms`. Grep result
ordering is controlled by `searchOrder` on the page entry.

## Styles

The stylesheets are split by visual responsibility and loaded in the order shown in `index.html`.
The order is intentional: later files contain component-specific rules and responsive overrides.
Keep the cascade order stable when adding styles.

## Resume

`resume.tex` is the source document. The platform-specific build scripts generate
`assets/resume.pdf` and `assets/resume-preview.png`; the website displays the image preview and
links to the PDF.

## Adding content

For a new project or article:

1. Create a JavaScript file in the matching `content/` folder.
2. Add an `addPage()` entry with its explorer path and ordering.
3. Append the data to the appropriate `DATA` collection.
4. Add the file to the content script list in `index.html`.

The file's `path` determines its nested explorer location. There is no filesystem scanner because a
browser-only static site cannot enumerate files on its hosting server.
