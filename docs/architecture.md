# Code map

This is a static site. `index.html` is the entry point; it loads the data, styles and scripts
directly. There is no bundler or module loader.

## Content

The `content/` files only define the `DATA` object used by the renderers. The first file creates it,
and the remaining files add their respective data groups. Keep content edits in these files rather
than embedding project or article copy in the renderers.

| File                   | Responsibility                                              |
| ---------------------- | ----------------------------------------------------------- |
| `00-site-data.js`      | Profile, contact links, setup, about, experience and skills |
| `10-project-data.js`   | Featured, community and smaller-project catalogue           |
| `20-community-data.js` | Open-source contribution details                            |
| `30-blog-posts.js`     | Blog stories and technical deep dives                       |

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
