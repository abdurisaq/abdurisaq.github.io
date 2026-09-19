# abdurisaq — portfolio.nvim

A lightweight, static resume portfolio presented as a Neovim-inspired editor. It uses vanilla HTML,
CSS and JavaScript; no build step is required.

## Run locally

Open `index.html` in a browser, or serve the folder with any static file server:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Interface

- File explorer navigation with readable file-type badges and collapsible project/experience folders
- Skills are grouped under `experience/skills.md`; the project folder also includes
  `more-projects.md`
- Community page distinguishes merged/open Mihon pull requests from fork-only experiments
- Featured community project includes OrganizeMyBakkesModGarage adoption figures and a repository
  screenshot
- Persistent open-buffer tabs with close and cycle behavior
- Telescope-style search (`Ctrl+K`)
- Ex command line (`:`): `:e about.md`, `:e experience/skills.md`, `:e projects/localtether`, `:bn`,
  `:bp`, `:bd`, `:colorscheme melange`, `:help`
- Keyboard navigation: `j/k`, `gg/G`, `Ctrl+D/Ctrl+U`, `Space e`, `]b/[b`, `Space b d`, `?`
- Melange light/dark palettes; theme selection is saved locally and initially follows the OS
  preference

All primary actions also have mouse-accessible controls. The site keeps portfolio content in
`data.js`.

## Personalize before publishing

Update the TODO values and contact details in `data.js`, add your resume PDF at `assets/resume.pdf`,
and verify project demo links. The colorscheme page reads the configured dotfiles repository from
GitHub. Source previews keep horizontal scrolling inside the code panel so long lines do not expand
the full page.
