# abdurisaq — portfolio.nvim

A lightweight, static portfolio presented as a Neovim-inspired editor. The site uses vanilla HTML,
CSS and JavaScript; it does not require a framework, package manager or application build step.

## Run locally

Serve the folder over HTTP rather than opening `index.html` directly. This matters for external
embeds such as YouTube, which require the hosting page to send an HTTP referrer.

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
├── content/                          # Page data mirrors the website explorer
│   ├── 00-data-root.js                # Shared DATA namespace
│   ├── index.js                       # index.lua: home/profile data
│   ├── about.js                       # about.md
│   ├── setup.js                       # setup.md
│   ├── experience/
│   │   ├── work.js                    # experience/work.md
│   │   └── skills.js                  # experience/skills.md
│   ├── colorscheme.js                 # colorscheme.md: dotfiles configuration
│   ├── community.js                   # community.md
│   ├── projects/
│   │   ├── index.js                   # projects/index.lua: collection setup
│   │   ├── localtether.js             # projects/localtether.md
│   │   ├── versatiletraining.js       # projects/versatiletraining.md
│   │   ├── privateconvert.js          # projects/privateconvert.md
│   │   ├── versatiletraininghub.js    # projects/versatiletraininghub.md
│   │   ├── organize-my-bakkesmod-garage.js # community project page data
│   │   └── smaller-projects/
│   │       ├── musicapp.js            # projects/smaller-projects/musicapp.md
│   │       └── 353-project.js         # projects/smaller-projects/353-project.md
│   └── blog/
│       ├── index.js                   # blog/index.md: article collection setup
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
- Keep `content/projects/index.js` and `content/blog/index.js` as collection initializers; their
  contents are intentionally small.
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
