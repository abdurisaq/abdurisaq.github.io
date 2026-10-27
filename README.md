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
├── index.html                 # Document shell and ordered asset loading
├── content/                   # Portfolio content and configuration data
│   ├── 00-site-data.js         # Profile, setup, about, experience and skills
│   ├── 10-project-data.js      # Featured, community and smaller projects
│   ├── 20-community-data.js    # Open-source contribution details
│   └── 30-blog-posts.js        # Stories and project-specific deep dives
├── scripts/                   # Rendering and interactive behavior
│   ├── vim-engine.js           # Standalone Vim-motion state engine
│   ├── 00-page-renderers.js    # Shared render helpers and page templates
│   ├── 10-vim-tutorial.js      # Tutorial stages and practice behavior
│   ├── 20-editor-state.js      # Routes, buffers, split-pane and editor state
│   ├── 30-editor-rendering.js # Editor rendering and project/blog tree data
│   ├── 40-router-startup.js    # Initial route synchronization
│   ├── 50-explorer-and-theme.js# Explorer controls, keyboard focus and themes
│   ├── 60-search.js            # Telescope-style file search and Grep
│   ├── 70-commands-and-keyboard.js # Ex commands, help and global key mappings
│   ├── 80-layout-mode.js       # Conventional-layout toggle
│   └── 90-dotfiles-panel.js    # GitHub-backed dotfiles browser
├── styles/                    # The original stylesheet split into ordered layers
│   ├── 00-theme-and-editor-shell.css
│   ├── 10-foundation-and-overlays.css
│   ├── 20-projects-and-components.css
│   ├── 30-reverse-engineering-deep-dives.css
│   ├── 40-dotfiles-browser.css
│   ├── 50-blog-and-article.css
│   ├── 60-vim-tutorial.css
│   ├── 70-blog-toc.css
│   ├── 80-editor-layout-and-search.css
│   ├── 90-conventional-layout.css
│   └── 95-resume-and-explorer.css
├── assets/                    # Images, generated resume files and screenshots
├── resume.tex                 # LaTeX source for the resume
├── build-resume.sh            # Linux/macOS resume build script
├── build-resume.bat           # Windows resume build script
└── docs/                      # Code map and maintenance notes
```

See [`docs/architecture.md`](docs/architecture.md) for the responsibilities and load-order contract
in more detail.

## Where to make changes

- Update name, contact details, about text, experience, skills or setup in
  `content/00-site-data.js`.
- Update featured projects, community projects or smaller projects in `content/10-project-data.js`.
- Update upstream contribution information in `content/20-community-data.js`.
- Write or edit a project story or deep dive in `content/30-blog-posts.js`.
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

Update TODO values and contact details in `content/00-site-data.js`, edit project details in
`content/10-project-data.js`, and update blog articles in `content/30-blog-posts.js`. Edit
`resume.tex` for the resume, then run `./build-resume.sh` to regenerate `assets/resume.pdf` and
`assets/resume-preview.png`. The resume page displays the generated PNG inside the Melange theme;
the PDF is kept as a correctly titled, downloadable ATS-friendly file. Rebuilding requires a LaTeX
installation (`pdflatex`) and Poppler (`pdftocairo`); use `build-resume.sh` on Linux/macOS or
`build-resume.bat` on Windows. The source supplied for this checkpoint still contains sample
identity, school, contact and employer details, so replace those in `resume.tex` before publishing
your real resume.

The colorscheme page reads the configured dotfiles repository from `content/00-site-data.js`. It has
independent scroll containers for the file list and source preview: scroll the file list to browse
dotfiles, and scroll the code pane vertically or horizontally to inspect long files.
