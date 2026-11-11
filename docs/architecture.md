# Code map

This is a static site. `index.html` is the entry point; it loads the data, styles and scripts
directly. There is no bundler or runtime module loader. `tools/build-content-manifest.mjs` is a
small build-time scanner that uses Node.js built-ins to discover page files and generate the
registry and ordered script tags. The generated site does not need Node or a backend at runtime.

## Content

The `content/` directory mirrors the page and folder structure shown in the website's file explorer.
Each navigable page has a focused data file, rather than sharing one large site-data, project-data
or blog-data file. These files populate the shared `DATA` object; they do not render HTML or
implement interactions.

| Explorer page or path                    | Data source                                                                    | Responsibility                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `index.lua`                              | `content/index.js`                                                             | Home identity, tagline and contact links                                           |
| `about.md`                               | `content/about.js`                                                             | Biography and quick facts                                                          |
| `setup.md`                               | `content/setup.js`                                                             | Machines and development workflow                                                  |
| `experience/work.md`                     | `content/experience/work.js`                                                   | Experience entries                                                                 |
| `experience/skills.md`                   | `content/experience/skills.js`                                                 | Skill groups                                                                       |
| `experience/resume.pdf`                  | `content/experience/resume.js`, `resume.tex` plus generated files in `assets/` | Resume page metadata, source, PDF and page-image preview                           |
| `projects/index.lua`                     | `content/projects/index.js`                                                    | Project collection landing page and explorer entry                                 |
| `projects/<project>.md`                  | Matching file in `content/projects/`                                           | One featured or community project per file                                         |
| `projects/smaller-projects/<project>.md` | Matching file in `content/projects/smaller-projects/`                          | One smaller project per file                                                       |
| `blog/index.md`                          | `content/blog/index.js`                                                        | Blog collection landing page and explorer entry                                    |
| `blog/<article>.md`                      | Matching file in `content/blog/`                                               | One project story per file                                                         |
| `blog/deep-dives/<article>.md`           | Matching file in `content/blog/deep-dives/`                                    | One technical deep dive per file                                                   |
| `community.md`                           | `content/community.js`                                                         | Open-source contribution details                                                   |
| `colorscheme.md`                         | `content/colorscheme.js`                                                       | Dotfiles repository configuration                                                  |
| `vim/index.md`, `vim/play.md`            | `content/vim/*.js`                                                             | Tutorial page metadata; stages and behavior remain in `scripts/10-vim-tutorial.js` |

The `.js` extensions are intentional: the site is static and loads these as ordinary scripts, while
the Explorer continues to display the existing `.md`, `.lua` and `.pdf` navigation. The content
directory mirrors those paths without changing the visible navigation.

`content/00-data-root.js` creates the shared `DATA` and `CONTENT_PAGES` namespaces.
`content/manifest.js` is generated from the `@content` headers and describes each page's type,
source file, explorer path, route, collection, order and search metadata. Do not edit it by hand.

Each project/article file registers its data through `registerContentData()`. The helper looks up
the page metadata by ID, then appends to the collection declared in that file’s `@content` header.
Collection arrays are created on first use, so collection names are not repeated in both page
metadata and initializer code. `tools/build-content-manifest.mjs` recursively scans the content
directory and sorts files by the unique numeric `loadOrder` in each header. That keeps the original
featured-project, smaller-project and article order stable while removing the manually maintained
script list. The generated script tags are kept between markers in `index.html`.

The same manifest drives the search index, file explorer, script loading order and route-to-filename
lookup. Search content comes from per-page `searchPaths`, `searchTerms` or a small shared search
profile for structured project/article/tutorial data. The Explorer recursively groups the manifest
paths, so nested directories are discovered rather than being separately listed in rendering code.
Optional folder presentation is declared by a page inside the folder; the renderer does not need to
know a folder name such as `deep-dives`.

The browser cannot enumerate a deployed static server's filesystem. The Node scanner performs that
step before deployment and emits ordinary JavaScript and HTML files; the live portfolio remains
static.

## Scripts

The application logic is split by the role each section already had in the original `app.js`.

| File                          | Responsibility                                                       |
| ----------------------------- | -------------------------------------------------------------------- |
| `vim-engine.js`               | Small state engine used by the interactive Vim tutorial              |
| `00-page-renderers.js`        | Shared HTML helpers and the page-template map                        |
| `10-vim-tutorial.js`          | Tutorial stages and the practice interaction                         |
| `20-editor-state.js`          | Route parsing, buffers, split panes and editor status                |
| `30-editor-rendering.js`      | Render cycle, rendered-content bindings and dynamic explorer entries |
| `40-router-startup.js`        | Hash-change listener and initial route render                        |
| `50-explorer-and-theme.js`    | Folder controls, explorer keyboard focus and theme toggle            |
| `60-search.js`                | File search and text Grep                                            |
| `70-commands-and-keyboard.js` | Command-line actions, help dialog and keyboard mappings              |
| `80-layout-mode.js`           | Conventional-layout preference and toggle                            |
| `90-dotfiles-panel.js`        | GitHub API cache and live dotfiles/code panel                        |

The numbered sequence follows the original script's declaration and initialization order. It is not
a suggestion to reorder features by preference. In particular, the route startup file runs after the
render functions and state declarations exist, while later files attach the remaining interface
handlers in the same order as before the split.

These are classic scripts, not ES modules. They share top-level declarations, and some declarations
are intentionally available to later script files. Do not add `type="module"`, wrap files in
closures, rename shared bindings, or change the order without treating that as a behavioral change
and testing it separately.

## Styles

The `styles/` files are slices of the original stylesheet, kept in their original cascade order. The
early files define tokens and foundations; later files define specialized pages and override
responsive/layout details. `index.html` links each file in sequence instead of using CSS imports so
the order is explicit to a reviewer.

## Safe maintenance workflow

1. Identify whether a change belongs to content, rendering/behavior, or visual styling.
2. Edit the narrowest matching file.
3. Preserve route names, element IDs, `data-*` attributes, shared function names and load order
   unless the task explicitly calls for a behavior change.
4. Check each modified JavaScript file with `node --check`.
5. Run the site through a local HTTP server and test the affected route and interaction in a
   browser.
