# abdurisaq — portfolio.nvim

A lightweight, static portfolio presented as a Neovim-inspired editor. The site uses vanilla HTML,
CSS and JavaScript; it does not require a framework, bundler or package manager. A small Node.js
utility regenerates the content manifest when page files are added or moved. The generated site
itself remains static and needs no server-side runtime.

## Run locally

The checked-in manifest and script list are ready to run. Serve the folder over HTTP rather than
opening `index.html` directly. This matters for external embeds such as YouTube, which require the
hosting page to send an HTTP referrer.

When you add, move or rename a content page, regenerate the manifest first:

```sh
node tools/build-content-manifest.mjs
```

The generator uses only Node.js built-ins. It scans `content/` recursively, reads each file's
`@content` header, derives its path relative to `content/`, and updates `content/manifest.js` plus
the generated script block in `index.html`. No Node process is needed when the deployed site runs.

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project structure

The code is grouped by responsibility so content, presentation and behavior can be located
independently.

```text
portfolio/
├── index.html                       # Document shell and ordered asset loading
├── content/                          # Page data and metadata mirror the website explorer
│   ├── 00-data-root.js                # Shared DATA and CONTENT_PAGES namespaces
│   ├── manifest.js                   # Generated page registry; do not edit by hand
│   ├── index.js                       # index.lua: home/profile data
│   ├── about.js                       # about.md
│   ├── setup.js                       # setup.md
│   ├── experience/
│   │   ├── work.js                    # experience/work.md
│   │   ├── skills.js                  # experience/skills.md
│   │   └── resume.js                  # experience/resume.pdf metadata
│   ├── colorscheme.js                 # colorscheme.md: dotfiles configuration
│   ├── community.js                   # community.md
│   ├── projects/
│   │   ├── index.js                   # projects/index.lua: collection page
│   │   ├── localtether.js             # projects/localtether.md
│   │   ├── versatiletraining.js       # projects/versatiletraining.md
│   │   ├── privateconvert.js          # projects/privateconvert.md
│   │   ├── versatiletraininghub.js    # projects/versatiletraininghub.md
│   │   ├── organize-my-bakkesmod-garage.js # community project page data
│   │   └── smaller-projects/
│   │       ├── musicapp.js            # projects/smaller-projects/musicapp.md
│   │       └── 353-project.js         # projects/smaller-projects/353-project.md
│   ├── vim/
│   │   ├── index.js                   # vim/index.md metadata
│   │   └── play.js                    # vim/play.md metadata
│   └── blog/
│       ├── index.js                   # blog/index.md: article collection page
│       ├── privateconvert.js          # blog/privateconvert.md
│       ├── musicapp.js                # blog/musicapp.md
│       ├── versatiletraining-story.js # blog/versatiletraining-story.md
│       ├── organize-my-bakkesmod-garage.js # blog story
│       ├── localtether-story.js       # blog/localtether-story.md
│       └── deep-dives/
│           ├── versatiletraining-ue3-notes.js # blog/deep-dives/*.md
│           └── localtether-implementation-notes.js
├── scripts/                           # Rendering and interactive behavior
│   ├── vim-engine.js
│   ├── 00-page-renderers.js
│   ├── 10-vim-tutorial.js
│   ├── 20-editor-state.js
│   ├── 30-editor-rendering.js
│   ├── 40-router-startup.js
│   ├── 50-explorer-and-theme.js
│   ├── 60-search.js
│   ├── 70-commands-and-keyboard.js
│   ├── 80-layout-mode.js
│   └── 90-dotfiles-panel.js
├── styles/                            # Original CSS in ordered cascade layers
├── assets/                            # Images, resume and screenshots
├── tools/
│   └── build-content-manifest.mjs     # Discovers pages and generates the manifest
├── resume.tex
├── build-resume.sh
├── build-resume.bat
└── docs/                              # Architecture and maintenance notes
```

See [`docs/architecture.md`](docs/architecture.md) for the responsibilities and load-order contract
in more detail.

## Where to make changes

- Update home-page identity and contact details in `content/index.js`.
- Update biography copy and quick facts in `content/about.js`.
- Update workstation details in `content/setup.js`.
- Update employment entries in `content/experience/work.js` and grouped skills in
  `content/experience/skills.js`.
- Update dotfiles repository settings in `content/colorscheme.js` and contribution details in
  `content/community.js`.
- Edit one project at a time in its matching file under `content/projects/`; smaller projects live
  under `content/projects/smaller-projects/`.
- Edit one article at a time in its matching file under `content/blog/`; technical deep dives live
  under `content/blog/deep-dives/`.
- Keep `content/projects/index.js` and `content/blog/index.js` as collection landing pages. Project
  and article data files register themselves into the collection named by their own metadata header;
  the arrays are initialized automatically.
- Every page data file starts with a small JSON `@content` header. It declares the page type, load
  order, tree order and search source. The generator derives the page ID, explorer label and
  relative path from the file location wherever possible.
- After adding, moving or renaming a content file, run `node tools/build-content-manifest.mjs`. The
  generated manifest drives the search index, file explorer and route-to-filename lookup. Do not
  hand-edit `content/manifest.js` or the generated script block in `index.html`.
- Change page markup or shared HTML rendering in `scripts/00-page-renderers.js`.
- Change a specific interaction in the matching file under `scripts/` (search, keyboard commands,
  explorer, tutorial, dotfiles, and so on).
- Change visual styles in the relevant file under `styles/`. The numbered stylesheet order is
  intentional because later files contain component-specific and responsive overrides.
- Change the document shell, static navigation controls or asset loading in `index.html`.

## Load order matters

The JavaScript remains in classic-script mode intentionally. The files share the same top-level
scope, and the original application relies on that shared scope and its initialization sequence.
`index.html` loads all content files first, then `vim-engine.js`, then the numbered application
scripts in order. Keep that order, do not add `type="module"`, and do not move the router startup
ahead of the modules that define its dependencies.

The stylesheets are also linked in their numbered order. Their rules preserve the original cascade;
keep the order as shown in `index.html` when adding or rearranging styles.

## Content page metadata

A content file begins with a JSON comment that the generator reads. The page data remains in the
same file; the header declares how the application should expose it. Project and blog entries are
registered into the matching collection automatically from this metadata.

A project page can use this small header:

```js
/* @content
{
    "type": "project",
    "collection": "projects",
    "loadOrder": 260,
    "treeOrder": 60,
    "searchOrder": 260,
    "searchProfile": "project"
}
*/
```

The filename supplies the page ID and `.md` explorer path; project routes are derived from the
project folder. `collection` selects the `DATA` array, which `registerContentData()` creates on
first use. Each project file registers its object with `registerContentData("project", { ... })`;
each blog file uses `registerContentData("blog", { ... })`. `loadOrder` preserves collection order,
`treeOrder` controls its position inside the explorer folder, and `searchOrder` controls Grep
traversal order. Blog pages use `type: "blog"`, `collection: "blogPosts"` and
`searchProfile: "blog"`.

Static pages declare their route and search source explicitly. `searchPaths` selects fields from
`DATA`; `searchTerms` adds short fixed terms when there is no content object. Use `pagePath` only
when the explorer extension differs from the source `.js` file, such as `index.lua` or `resume.pdf`.
`folderOrder` sets where a directory appears alongside root-level files; nested folder order is
inferred from the pages inside it. `folderPresentation` optionally declares classes and separators
for a folder containing that page. `folderSearch` can add a searchable virtual directory entry; its
path and label are derived from the containing folder.

The Explorer is rebuilt recursively from the manifest paths. New subfolders under `content/` appear
in the corresponding tree automatically. Folder-specific presentation is declared in the metadata of
a page inside that folder, rather than being keyed to a hardcoded folder name.

For a new project, create a file under `content/projects/` (or a subfolder), add a `type: "project"`
header with its collection and ordering fields, and register the object with
`registerContentData("project", { ... })`. For a new article, do the same under `content/blog/` with
`type: "blog"` and `registerContentData("blog", { ... })`. The generator discovers the file, derives
its explorer path and route, includes its script, and makes it available to search. The browser
cannot scan the deployed server's directories itself, so run the generator whenever content files
are added, moved or renamed.

Run `node tools/build-content-manifest.mjs --check` to verify that the generated manifest and
`index.html` script list are up to date.

## Interface

- File explorer navigation with readable file-type badges and collapsible project, smaller-project
  and experience folders; blog deep dives are grouped in a clearly separated folder at the bottom of
  `blog/`
- Blog table-of-contents links preserve the current post route and scroll the editor pane to the
  selected section, including on refresh and browser back/forward navigation
- Skills are grouped under `experience/skills.md`; smaller projects live in
  `projects/smaller-projects/`, with one page per project
- `blog/` contains project stories and longer technical field notes
- `vim/` contains the fourteen-stage interactive Vim motions tutorial (`/vim`) and its practice
  route (`/vim/play`)
- `setup.md` describes a Fedora Linux laptop and a Windows + Arch Linux (Omarchy) dual-boot desktop
- Persistent open-buffer tabs with close and cycle behavior
- Telescope-style search with **Files** and **Grep** modes (`Space Space` for filenames, `/` for
  Grep); Files searches filenames only, while Grep lists individual text matches with highlighted
  previews in the right pane
- Ex command line (`:`): `:e about.md`, `:e setup.md`, `:e experience/skills.md`,
  `:e projects/localtether`, `:e projects/smaller-projects/musicapp.md`, `:Telescope`,
  `:Telescope live_grep`, `:bn`, `:bp`, `:bd`, `:colorscheme melange`, `:help`
- Keyboard navigation: `j/k`, `gg/G`, `Space e` / `Space l`, `Esc`, `/` for Grep, `Space Space` for
  Files, `]b/[b`, `Space b d`, `?`. In the Explorer, use `j/k` to move, `h/l` to collapse or expand,
  and `Enter` to open a file.
- tmux-style split panes: `:vsplit filename` opens a side-by-side file, `:split filename` stacks
  panes, `Space t h/l` switches panes, `Space t o` swaps focus, `Space t x` closes the active pane,
  and `:only` keeps the focused pane. `Space t v/s` makes a split of the current file. These use a
  `Space t` leader rather than browser-reserved Ctrl combinations.
- Landing-page **Make it boring** switches to a conventional Melange-styled navigation layout;
  **Back to fun** restores the editor layout
- Melange light/dark palettes; theme selection is saved locally and initially follows the OS
  preference
- Project pages use conversational walkthroughs, technical notes, click-to-load video demos (where
  available), and screenshot slots

## Add project screenshots

The pages already contain visible placeholders. Add your screenshots under `assets/screenshots/`
using the exact filenames shown inside each placeholder, then refresh the page. The placeholders
automatically disappear when the matching image loads.

Examples:

- `privateconvert-file-operations.png`
- `privateconvert-pdf-editor.png`
- `versatile-training-pack-editor.png`
- `localtether-session-dashboard.png`
- `musicapp-library.png`
- `353-project-correlation-heatmap.png`

The complete filename list is also in `assets/screenshots/README.md`.

## YouTube embeds and Error 153

Videos start as thumbnail previews so a failed embed does not leave an empty black player. Selecting
**Load video** injects the privacy-enhanced YouTube iframe on demand, and a direct YouTube link
remains visible underneath as a fallback. Error 153 means YouTube did not receive an HTTP referrer
or equivalent client identification. Test through an HTTP(S) server (not a `file://` URL). If it
still occurs after deployment, check the hosting provider's response headers and make sure it is not
overriding the policy with `no-referrer` or `same-origin`; set the response header to
`Referrer-Policy: strict-origin-when-cross-origin`.

## Personalize before publishing

Update home/contact details in `content/index.js`, biography in `content/about.js`, experience and
skills in `content/experience/`, project details in their individual files under
`content/projects/`, and articles in their individual files under `content/blog/`. Edit `resume.tex`
for the resume, then run `./build-resume.sh` to regenerate `assets/resume.pdf` and
`assets/resume-preview.png`. The resume page displays the generated PNG inside the Melange theme;
the PDF is kept as a correctly titled, downloadable ATS-friendly file. Rebuilding requires a LaTeX
installation (`pdflatex`) and Poppler (`pdftocairo`); use `build-resume.sh` on Linux/macOS or
`build-resume.bat` on Windows. The source supplied for this checkpoint still contains sample
identity, school, contact and employer details, so replace those in `resume.tex` before publishing
your real resume.

The colorscheme page reads the configured dotfiles repository from `content/colorscheme.js`. It has
independent scroll containers for the file list and source preview: scroll the file list to browse
dotfiles, and scroll the code pane vertically or horizontally to inspect long files.
