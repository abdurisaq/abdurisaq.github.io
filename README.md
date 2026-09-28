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
  and experience folders
- Skills are grouped under `experience/skills.md`; smaller projects live in
  `projects/smaller-projects/`, with one page per project
- `setup.md` describes a Fedora Linux laptop and a Windows + Arch Linux (Omarchy) dual-boot desktop
- Persistent open-buffer tabs with close and cycle behavior
- Telescope-style search with **Files** and **Grep** modes (`Ctrl+K`, `Ctrl+P`, or `Space Space`);
  Grep searches project descriptions, technical walkthroughs, skills and setup details
- Ex command line (`:`): `:e about.md`, `:e setup.md`, `:e experience/skills.md`,
  `:e projects/localtether`, `:e projects/smaller-projects/musicapp.md`, `:Telescope`,
  `:Telescope live_grep`, `:bn`, `:bp`, `:bd`, `:colorscheme melange`, `:help`
- Keyboard navigation: `j/k`, `gg/G`, `Ctrl+D/Ctrl+U`, `Space e`, `Space Space`, `]b/[b`,
  `Space b d`, `?`
- Melange light/dark palettes; theme selection is saved locally and initially follows the OS
  preference
- Project pages use conversational walkthroughs, video demos (where available), and screenshot
  slots. The longer VersatileTraining UE3/BakkesMod investigation is a separate article under
  `writing/`
- `vim-motions.md` opens a seven-stage, keyboard-driven Vim motions tutorial with progress checks, a
  completion key list, and share support

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

The page includes `strict-origin-when-cross-origin` in the document referrer policy and on each
privacy-enhanced YouTube iframe. Error 153 means YouTube did not receive an HTTP referrer or
equivalent client identification. Test through an HTTP(S) server (not a `file://` URL). If it still
occurs after deployment, check the hosting provider's response headers and make sure it is not
overriding the policy with `no-referrer` or `same-origin`; set the response header to
`Referrer-Policy: strict-origin-when-cross-origin`. A direct YouTube link is included below each
embed as a fallback.

## Personalize before publishing

Update the TODO values and contact details in `data.js`, add your resume PDF at `assets/resume.pdf`,
and verify project demo links. The colorscheme page reads the configured dotfiles repository from
GitHub. The writing section contains the VersatileTraining reverse-engineering deep dive and the two
C++ data-access examples. The project page links to it instead of embedding the full article.

The colorscheme page has independent scroll containers for the file list and source preview: scroll
the file list to browse dotfiles, and scroll the code pane vertically or horizontally to inspect
long files.

All portfolio content is kept in `data.js`; the presentation and interactions are in `app.js`,
`style.css` and `index.html`.
