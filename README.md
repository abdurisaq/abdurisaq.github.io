# abdurisaq — portfolio.nvim

A static software portfolio presented as a Neovim-inspired editor. It uses plain HTML, CSS and
JavaScript—no framework, bundler, package manager, build step or backend.

## Run locally

Serve the project directory over HTTP:

```sh
python -m http.server 8000
```

Open <http://localhost:8000>. Serving the site instead of opening `index.html` directly is important
for external embeds such as YouTube, which rely on the page's HTTP referrer.

## Project layout

```text
portfolio/
├── index.html                 # Document shell and explicit asset loading order
├── content/                   # One JavaScript file per page or content entry
│   ├── data.js                # Shared DATA object and addPage() helper
│   ├── index.js               # Homepage identity and introduction
│   ├── about.js
│   ├── setup.js
│   ├── experience/            # Work, skills and resume metadata
│   ├── projects/               # Individual project data
│   │   └── smaller-projects/
│   ├── blog/                   # Individual articles
│   │   └── deep-dives/
│   ├── vim/                    # Tutorial pages
│   ├── colorscheme.js
│   └── community.js
├── scripts/                    # Rendering and application behavior
├── styles/                     # Theme and component styles, in cascade order
├── assets/                     # Images, resume files and screenshots
├── docs/                       # Architecture notes
├── resume.tex                  # Resume source
├── build-resume.sh
└── build-resume.bat
```

## Where to make changes

- Home page identity and contact links: `content/index.js`
- Biography and quick facts: `content/about.js`
- Workstation and workflow: `content/setup.js`
- Employment: `content/experience/work.js`
- Skills: `content/experience/skills.js`
- Resume metadata: `content/experience/resume.js`; the document itself is `resume.tex`
- Projects: the matching file under `content/projects/`
- Blog articles: the matching file under `content/blog/`
- Vim tutorial content: `content/vim/`
- Page templates and shared HTML: `scripts/00-page-renderers.js`
- Editor state and routing: `scripts/20-editor-state.js`
- Explorer and buffer rendering: `scripts/30-editor-rendering.js`
- Search: `scripts/60-search.js`
- Keyboard commands: `scripts/70-commands-and-keyboard.js`
- Visual styling: the relevant file under `styles/`

## How page content is wired

Each page file contains two things: its `addPage({...})` entry and the data used to render it. The
entry describes the explorer path, route, display order and any page-specific search or folder
settings. The page's actual content stays directly below it.

`content/data.js` creates the shared `DATA` object and the small in-memory `CONTENT_PAGES` list used
by routing, search and the file explorer. It fills in values that can be derived from the filename
and page type, such as the file label, route parts and default search profile.

There is no generated manifest and no directory-scanning step. `index.html` lists the content
scripts explicitly. This is deliberate: a plain static page cannot enumerate files on the web
server, and a short script list is easier to inspect than a custom build system. Keep the content
scripts before the application scripts, and preserve their current order because project and article
collections are populated as those files load.

### Adding a project

Create a file under `content/projects/`, then add a page entry and append its data to the
appropriate collection:

```js
addPage({
    type: "project",
    path: "projects/my-project.md",
    treeOrder: 60,
    searchOrder: 250,
});

DATA.projects.push({
    id: "my-project",
    name: "My Project",
    summary: "A short description.",
    stack: [],
    sections: [],
});
```

The project route and search profile are derived from its type and filename. For a smaller project,
set `collection: "smallerProjects"`; for a community project, use `collection: "communityProjects"`.

Add its script to the content section of `index.html`. The explorer creates any nested folders from
the `path` value, so no separate folder registration is needed.

### Adding a blog post

Create a file under `content/blog/` and use the same pattern:

```js
addPage({
    type: "blog",
    path: "blog/my-article.md",
    treeOrder: 60,
    searchOrder: 180,
});

DATA.blogPosts.push({
    id: "my-article",
    type: "story",
    title: "My article",
    subtitle: "A short introduction.",
    sections: [],
});
```

Blog routes and search behavior are derived from the page type. Deep dives live under
`content/blog/deep-dives/`; their folder styling is declared on the relevant page entry through
`folderPresentation`.

### Adding a regular page

For a static page, specify its route and the fields that should be searchable:

```js
addPage({
    path: "about.md",
    route: "#/about",
    kind: "PAGE",
    detail: "About me",
    treeOrder: 20,
    searchOrder: 20,
    searchPaths: ["about"],
});
```

`treeOrder` controls the file's position within its folder. `folderOrder` controls where a folder
appears beside files. `searchOrder` controls the order used by Grep and search results. Existing
page files show the available options, including `searchTerms`, `folderSearch` and
`folderPresentation`.

## Loading order

The site deliberately uses classic scripts rather than ES modules. Files share top-level bindings,
and initialization order is part of the existing application behavior.

In `index.html`, load `content/data.js` first, then all content files, then `scripts/` in the
existing order. Keep the numbered stylesheet order too: later stylesheets contain component-specific
and responsive overrides.
