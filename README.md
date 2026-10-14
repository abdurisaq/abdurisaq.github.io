# abdurisaq — portfolio.nvim

A lightweight, static resume portfolio presented as a Neovim-inspired editor. It uses vanilla HTML,
CSS and JavaScript; no build step is required.

## Run locally

Serve the folder over HTTP rather than opening `index.html` directly. This matters for external
embeds such as YouTube, which require the hosting page to send an HTTP referrer.

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Interface

- File explorer navigation with readable file-type badges and collapsible project, smaller-project
  and experience folders; blog deep dives are grouped in a clearly separated folder at the bottom of
  `blog/`
- Blog table-of-contents links preserve the current post route and scroll the editor pane to the
  selected section, including on refresh and browser back/forward navigation
- Skills are grouped under `experience/skills.md`; smaller projects live in
  `projects/smaller-projects/`, with one page per project
- `blog/` contains longer technical field notes; `blog/rocket-league-modding.md` is the standalone
  UE3/BakkesMod reverse-engineering deep dive
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
  **Back to fun** restores the editor layout.
- Melange light/dark palettes; theme selection is saved locally and initially follows the OS
  preference
- Project pages use conversational walkthroughs, technical notes, click-to-load video demos (where
  available), and screenshot slots; the Rocket League UE3/BakkesMod reverse-engineering deep dive
  lives separately under `blog/`

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

Update the TODO values and contact details in `data.js`, edit `resume.tex` for the resume, run
`./build-resume.sh` to regenerate `assets/resume.pdf` and `assets/resume-preview.png`, and verify
project demo links. The resume page displays the generated PNG inside the Melange theme; the PDF is
kept as a correctly titled, downloadable ATS-friendly file. The PDF metadata title is set to
`Resume`, so file managers have a meaningful document title. Rebuilding requires a LaTeX
installation (`pdflatex`) and Poppler (`pdftocairo`); use `build-resume.sh` on Linux/macOS or
`build-resume.bat` on Windows. The source supplied for this checkpoint still contains sample
identity, school, contact and employer details, so replace those in `resume.tex` before publishing
your real resume. The colorscheme page reads the configured dotfiles repository from GitHub. The
colorscheme page has independent scroll containers for the file list and source preview: scroll the
file list to browse dotfiles, and scroll the code pane vertically or horizontally to inspect long
files.

All portfolio content is kept in `data.js`; the presentation and interactions are in `app.js`,
`style.css` and `index.html`.
