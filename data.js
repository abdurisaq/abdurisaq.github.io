/* ===== ALL CONTENT LIVES HERE. Lines starting with "TODO" render greyed-out so you can spot them. ===== */
const DATA = {
    profile: {
        name: "Abdurisaq",
        handle: "abdurisaq",
        tagline:
            "Computer science student building networked tools, game plugins and full-stack web apps.",
        email: "YOUR_EMAIL@example.com",
        github: "https://github.com/abdurisaq",
        linkedin: "https://www.linkedin.com/in/YOUR-HANDLE",
        resume: "assets/resume.pdf",
    },
    dotfiles: {
        user: "abdurisaq",
        repo: ".dotfiles",
    },
    setup: {
        intro: "My laptop and desktop have different operating-system setups, but both are part of the same development workflow. Linux is where I prefer to work; Windows stays installed for the games that still refuse to cooperate with it.",
        machines: [
            {
                device: "Laptop",
                system: "Fedora Linux",
                detail: "My portable Linux environment for development and day-to-day work.",
            },
            {
                device: "Desktop · dual boot",
                system: "Windows + Arch Linux (Omarchy)",
                detail: "My desktop dual-boots Windows and Arch Linux. I spend most of my time on the Arch/Omarchy side, but keep Windows around for games that do not run properly on Linux yet.",
            },
        ],
        workflow: [
            "Neovim as my primary editor",
            "Git and GitHub for version control and collaboration",
            "CMake and vcpkg for native C++ projects",
            "Arch/Omarchy for my preferred desktop workflow, with Windows available when game compatibility requires it",
        ],
    },
    about: [
        "TODO: Paragraph 1. Who you are, school, year, what you study.",
        "TODO: Paragraph 2. What you enjoy building and why (the projects here lean toward C++, networking, and tools people actually use).",
        "TODO: Paragraph 3. What you're looking for: internship focus, interests, what you want to learn.",
    ],
    facts: [
        ["school", "TODO"],
        ["year", "TODO"],
        ["focus", "Systems, networking, full-stack"],
        ["editor", "Neovim"],
    ],
    experience: [
        {
            role: "TODO: Job title",
            org: "TODO: Company",
            dates: "TODO: Mon YYYY - Mon YYYY",
            place: "TODO: City / Remote",
            bullets: [
                "TODO: What you did, with a result or number if you have one.",
                "TODO: A tool or technology you used.",
                "TODO: Something you learned or were trusted with.",
            ],
        },
    ],
    skills: {
        Languages: ["C++", "Python", "Kotlin", "TypeScript", "JavaScript", "SQL", "C", "Java"],
        Frameworks: [
            "React",
            "Next.js",
            "FastAPI",
            "Flask",
            "tRPC",
            "Prisma",
            "SQLModel",
            "Ktor",
            "Jetpack Compose",
            "Dear ImGui",
            "Cereal",
        ],
        "Databases & Tools": [
            "PostgreSQL",
            "SQLite",
            "Supabase",
            "Room",
            "Docker",
            "Git",
            "CMake",
            "vcpkg",
            "pytest",
        ],
        "Systems & Networking": [
            "Linux",
            "Windows APIs",
            "SDL2",
            "standalone Asio",
            "OpenSSL",
            "libevdev",
            "TCP/IP",
            "REST APIs",
        ],
    },
    projects: [
        {
            id: "localtether",
            name: "LocalTether",
            repo: "https://github.com/abdurisaq/LocalTether",
            summary:
                "Cross-platform, TLS-encrypted client/server app for sharing keyboard and mouse input, files and sessions in real time.",
            stack: ["C++", "ASIO", "OpenSSL", "SDL2", "ImGui", "CMake", "vcpkg"],
            about: "I built LocalTether as a software KVM-style tool: instead of moving between machines or passing around files manually, I can start a session and let other computers join it. The same session handles remote keyboard and mouse input, shared files and host-side controls.",
            sections: [
                {
                    title: "Start with a shared session",
                    paragraphs: [
                        "One machine starts a session as the Host. Other instances discover it on the local network or connect using an address, then join as a Broadcaster or Receiver. The Host can protect the session with a password and decides whether it should accept internet connections or stay LAN-only.",
                        "The first Host client starts the server and connects to it locally, so the host machine can participate in the same session it manages.",
                    ],
                },
                {
                    title: "Separate input from file sharing",
                    paragraphs: [
                        "A Host or designated Broadcaster can stream keyboard and mouse input to Receiver clients. Input reception is controlled per receiver, so the Host can decide which connected machine is currently allowed to receive it.",
                        "File sharing uses a central server-side storage directory. Clients upload and download files there, while the built-in explorer gives everyone a synchronized view. File operations also include path-traversal protection.",
                    ],
                },
                {
                    title: "Keep the host in control",
                    bullets: [
                        "See who is connected and rename or remove clients.",
                        "Enable or disable input reception for individual receivers.",
                        "Shut down the server remotely from the Host controls.",
                        "Use the console, shared file explorer and connection controls from the ImGui dashboard.",
                    ],
                },
                {
                    title: "Build for both platforms",
                    paragraphs: [
                        "The application targets Windows and Linux. The repository includes platform-specific build and run scripts that bootstrap the CMake/compiler/vcpkg dependency workflow, rather than requiring every dependency to be installed by hand first.",
                    ],
                },
            ],
            screenshots: [
                {
                    src: "assets/screenshots/localtether-session-dashboard.png",
                    alt: "LocalTether session dashboard showing connected clients and session controls",
                    caption: "Session dashboard and host controls",
                },
                {
                    src: "assets/screenshots/localtether-shared-files.png",
                    alt: "LocalTether synchronized shared file explorer",
                    caption: "Shared file explorer",
                },
            ],
            highlights: [
                "Encrypted client-server networking with ASIO and OpenSSL; the server can generate its own certificates.",
                "Three roles (Host, Broadcaster, Receiver) with optional password-protected sessions.",
                "LAN server discovery, plus optional WAN access when you forward a port.",
                "Real-time keyboard and mouse input streaming, toggled per receiver by the host.",
                "Shared file storage with a synced file explorer and path-traversal protection.",
                "Host controls: kick, rename, toggle input, remote shutdown.",
                "ImGui dashboard with console, file explorer and controls panels; one-command build scripts for Windows and Linux.",
            ],
            videos: [
                {
                    title: "LocalTether walkthrough",
                    id: "0U6Gs4i0kbI",
                },
            ],
            links: [["Source", "https://github.com/abdurisaq/LocalTether"]],
            storyPostId: "localtether-story",
            technicalPostId: "localtether-implementation-notes",
        },
        {
            id: "versatiletraining",
            name: "VersatileTraining",
            repo: "https://github.com/abdurisaq/VersatileTraining",
            summary:
                "BakkesMod plugin for Rocket League with custom training packs, game-state snapshots, goal blockers and input recording.",
            stack: ["C++", "BakkesMod SDK", "Dear ImGui", "vcpkg", "Visual Studio"],
            about: "VersatileTraining is my largest project: a BakkesMod plugin that turns Rocket League training into something you can configure instead of just repeat. I wanted to work with the actual game state—car and ball physics, boost, and the exact moment a shot begins—so a training pack can be built around a situation rather than a fixed preset.",
            sections: [
                {
                    title: "Build the situation you want to practise",
                    paragraphs: [
                        "Custom packs let you set the starting position and rotation of the car and ball, their velocities, boost amount and initial jump state. The Snapshot Gallery is the other way into this workflow: save a state from a live session or replay, then load it again as a repeatable shot.",
                        "That makes the plugin useful both for creating a scenario from scratch and for turning an interesting moment from a match or replay into a drill.",
                    ],
                },
                {
                    title: "Shape the challenge",
                    bullets: [
                        "Add goal blockers with custom size and position to practise hitting specific targets.",
                        "Override and adjust existing training packs, including packs created by other people.",
                        "Use variance settings to introduce controlled changes to shot parameters, such as ball speed or the starting position.",
                    ],
                },
                {
                    title: "Make attempts repeatable",
                    paragraphs: [
                        "The experimental recording feature captures controller input during an attempt and can spawn a bot to replay the recorded movement. It is an experiment rather than a finished headline feature, but it explores a useful question: how can a player compare a new attempt against a known reference run?",
                    ],
                },
                {
                    title: "Connect the plugin to the Hub",
                    paragraphs: [
                        "VersatileTraining is paired with the Versatile Training Hub. The plugin can upload packs created in-game, and players can download community packs from the website. The Hub handles discovery and pack management; the plugin brings those packs back into Rocket League.",
                    ],
                },
            ],
            metricsLabel: "BakkesPlugins listing · figures provided",
            metrics: [
                {
                    value: "10.6K",
                    label: "views",
                },
                {
                    value: "3.1K",
                    label: "downloads",
                },
            ],
            screenshots: [
                {
                    src: "assets/screenshots/versatile-training-pack-editor.png",
                    alt: "VersatileTraining custom training pack editor",
                    caption: "Custom pack editor",
                },
                {
                    src: "assets/screenshots/versatile-training-snapshot-gallery.png",
                    alt: "VersatileTraining snapshot gallery",
                    caption: "Snapshot gallery and saved game states",
                },
                {
                    src: "assets/screenshots/versatile-training-goal-blockers.png",
                    alt: "VersatileTraining goal blocker configuration",
                    caption: "Goal blocker configuration",
                },
            ],
            highlights: [
                "Custom training packs with control over position, rotation, velocity, boost and jump state.",
                "Snapshot system: save and reload full game states from replays or live sessions.",
                "Custom goal blockers and pack overrides, including packs made by other creators.",
                "Variance settings for controlled randomization of shots.",
                "Experimental input recording with a bot that replays your run.",
                "Integrates with the Versatile Training Hub to upload and download community packs.",
            ],
            videos: [
                {
                    title: "VersatileTraining walkthrough",
                    id: "9eDVzMzTQ7c",
                },
            ],
            links: [
                ["Source", "https://github.com/abdurisaq/VersatileTraining"],
                ["Download on BakkesPlugins", "https://bakkesplugins.com/plugins/view/559"],
            ],
            storyPostId: "versatiletraining-story",
            technicalPostId: "versatiletraining-ue3-notes",
        },
        {
            id: "privateconvert",
            name: "PrivateConvert",
            repo: "https://github.com/abdurisaq/PrivateConvert",
            summary:
                "Local-first file converter and editor for images, PDFs and video, with reusable operation pipelines and job history.",
            stack: [
                "Python",
                "FastAPI",
                "SQLModel",
                "React",
                "Vite",
                "Tailwind",
                "Docker",
                "ffmpeg",
            ],
            about: "PrivateConvert is a local-first converter and editor for the jobs where I would rather not send a file to a third-party website. It brings image, PDF and video operations into one interface, with reusable pipelines and a job history instead of a collection of one-off conversion buttons.",
            sections: [
                {
                    title: "Build a pipeline instead of repeating clicks",
                    paragraphs: [
                        "The File Operations page lets me assemble a sequence of operations, validate it, save it for reuse and queue it as a job. The same idea works across image, PDF and video tasks, so a workflow can be reused when a similar batch comes up later.",
                    ],
                },
                {
                    title: "Use the right tool for each format",
                    bullets: [
                        "Image and PDF operations are handled through the local backend pipeline.",
                        "Video processing uses ffmpeg; ffprobe is used for metadata inspection and size-target compression.",
                        "The PDF Editor exposes page-level editing separately from the general operation builder.",
                    ],
                },
                {
                    title: "Treat conversions as jobs",
                    paragraphs: [
                        "The Jobs page is where queued work becomes manageable. Active work can be cancelled, completed jobs and their files can be deleted, and terminal-job retention can be configured. The default retention is 30 days, temporary files are cleaned at startup, and expired jobs are checked hourly.",
                    ],
                },
                {
                    title: "One local application at runtime",
                    paragraphs: [
                        "The FastAPI backend serves the built React interface, so Node.js is needed to build the frontend but not to run the finished app. I can start it through the Python launcher or Docker Compose. Both modes bind to localhost; the Docker setup stores application data in a local ./data directory. This is intentionally a single-user local tool, not a service to expose to an untrusted network.",
                    ],
                },
            ],
            screenshots: [
                {
                    src: "assets/screenshots/privateconvert-file-operations.png",
                    alt: "PrivateConvert file operations interface with an image conversion pipeline",
                    caption: "Pipeline builder and file operations",
                },
                {
                    src: "assets/screenshots/privateconvert-pdf-editor.png",
                    alt: "PrivateConvert PDF editor interface",
                    caption: "PDF page editor",
                },
                {
                    src: "assets/screenshots/privateconvert-jobs.png",
                    alt: "PrivateConvert job history and queue interface",
                    caption: "Job queue and history",
                },
            ],
            highlights: [
                "File Operations page for building, validating, saving and queuing pipelines for images, PDFs and video.",
                "Video operations and size-target compression powered by ffmpeg and ffprobe.",
                "PDF editor for page-level changes.",
                "Jobs page to cancel work, delete finished jobs, and set retention (30 days by default); hourly cleanup of expired jobs.",
                "One-command local run or docker compose; bound to localhost by design.",
            ],
            videos: [],
            links: [["Source", "https://github.com/abdurisaq/PrivateConvert"]],
            storyPostId: "privateconvert",
            technicalPostId: null,
        },
        {
            id: "versatiletraininghub",
            name: "Versatile Training Hub",
            repo: "https://github.com/abdurisaq/VersatileTrainingHub",
            summary:
                "Full-stack web platform where Rocket League players share, browse, rate and load training packs straight into the game.",
            stack: [
                "Next.js",
                "TypeScript",
                "tRPC",
                "Prisma",
                "PostgreSQL",
                "NextAuth",
                "Tailwind",
                "Vercel",
            ],
            about: "The Versatile Training Hub is the web half of the training workflow. I built it so packs made in Rocket League do not stay trapped on one machine: players can publish them, browse what other people have made, inspect the shot data, and bring a pack back into the game through the companion plugin.",
            sections: [
                {
                    title: "A library for community training packs",
                    paragraphs: [
                        "The Hub gives each pack a detail page with its creator, difficulty, in-game code, shot count, tags and visibility. Players can browse and download pack data as JSON, while ratings, comments with replies and favorites add a layer of feedback around shared packs.",
                    ],
                },
                {
                    title: "Turn compressed pack data into something readable",
                    paragraphs: [
                        "Training pack metadata is stored in a compressed form. The site decodes that metadata and presents useful per-shot information—such as boost, starting linear and angular velocity, freeze and jump state, and goal-blocker settings—instead of leaving it as an opaque blob.",
                    ],
                },
                {
                    title: "Bridge the browser and the running game",
                    paragraphs: [
                        "When the BakkesMod plugin is installed and running, the Hub can request the local pack list, upload packs from the game, update an existing submission, and load a selected pack directly into Rocket League. The plugin is required for those in-game actions; browsing and downloading packs can be done from the site itself.",
                    ],
                },
                {
                    title: "Keep the web application modular",
                    bullets: [
                        "Next.js App Router renders the site and its pages.",
                        "tRPC handles typed application queries and mutations.",
                        "Prisma provides the data layer over PostgreSQL, with Supabase used for the live deployment.",
                        "NextAuth.js handles accounts so creators can manage their own submissions.",
                    ],
                },
            ],
            screenshots: [
                {
                    src: "assets/screenshots/versatile-hub-browse.png",
                    alt: "Versatile Training Hub community pack browser",
                    caption: "Browsing community packs",
                },
                {
                    src: "assets/screenshots/versatile-hub-pack-details.png",
                    alt: "Versatile Training Hub pack detail and shot metadata",
                    caption: "Pack details and decoded shot data",
                },
                {
                    src: "assets/screenshots/versatile-hub-upload.png",
                    alt: "Versatile Training Hub upload workflow",
                    caption: "Uploading a pack from the companion plugin",
                },
            ],
            highlights: [
                "Next.js App Router and tRPC API with a Prisma/PostgreSQL data layer (Supabase in production).",
                "Decodes compressed pack metadata to display per-shot boost, velocity, freeze, jump and goal-blocker data.",
                "Upload, update and load-in-game flows that talk to the local plugin.",
                "Accounts via NextAuth, with ratings, threaded comments and favorites.",
                "Downloadable pack JSON and an in-app guide; deployed on Vercel.",
            ],
            videos: [
                {
                    title: "Hub + plugin demo",
                    id: "9eDVzMzTQ7c",
                },
            ],
            links: [
                ["Live site", "https://versatile-training-hub.vercel.app/"],
                ["Source", "https://github.com/abdurisaq/VersatileTrainingHub"],
            ],
            storyPostId: null,
            technicalPostId: null,
        },
    ],
    communityProjects: [
        {
            id: "organize-my-bakkesmod-garage",
            name: "OrganizeMyBakkesModGarage",
            repo: "https://github.com/abdurisaq/OrganizeMyBakkesModGarage",
            summary:
                "A BakkesMod plugin for organizing Rocket League presets into groups, sorting loadouts and managing in-game garage setups.",
            stack: ["C++", "BakkesMod SDK", "Dear ImGui", "Windows APIs"],
            image: "assets/organize-my-bakkesmod-garage.png",
            imageAlt:
                "OrganizeMyBakkesModGarage group and preset management interface shown over Rocket League gameplay.",
            about: "OrganizeMyBakkesModGarage started as a quality-of-life tool for my own Rocket League garage: once you have a lot of presets, finding and rotating through the ones you actually want becomes its own little chore. The plugin adds named groups and in-game controls around those groups, so a garage can be organized around how you play rather than one long list.",
            sections: [
                {
                    title: "Give presets a structure",
                    paragraphs: [
                        "Create named groups, add presets from the garage, remove entries later and edit a group's name or contents. The UI includes group and preset search fields, so the list stays manageable as the collection grows.",
                        "Groups can be sorted by name, modification date or number of presets, in either ascending or descending order. A selected group can also be marked as the main group for the in-game shuffle features.",
                    ],
                },
                {
                    title: "Use the groups while playing",
                    bullets: [
                        "Equip a preset directly from its group.",
                        "Swap a preset's car body with a car body already available in the garage.",
                        "Shuffle the selected main group in Freeplay or, when enabled, during online matches.",
                        "Copy a player's preset from an imported replay into your own collection.",
                    ],
                },
                {
                    title: "Keep the workflow inside Rocket League",
                    paragraphs: [
                        "The plugin is built around BakkesMod game events and an ImGui interface. It tracks replay and loadout events to collect preset information, then exposes group editing and selection through its own window. The project is Windows-focused and its README notes that Linux is not supported.",
                    ],
                },
            ],
            screenshots: [
                {
                    src: "assets/screenshots/organize-groups.png",
                    alt: "OrganizeMyBakkesModGarage groups and preset management screen",
                    caption: "Preset groups and editing",
                },
                {
                    src: "assets/screenshots/organize-shuffle.png",
                    alt: "OrganizeMyBakkesModGarage preset shuffle controls",
                    caption: "Main group and shuffle settings",
                },
            ],
            highlights: [
                "Create and edit named preset groups for easier garage organization.",
                "Sort groups by name, modification date or size, in ascending or descending order.",
                "Equip presets, swap car bodies and shuffle a selected group in supported game modes.",
                "Copy presets from replays and persist group data locally.",
            ],
            metricsLabel: "Community adoption · figures provided",
            metrics: [
                {
                    value: "36.2K",
                    label: "views",
                },
                {
                    value: "13K",
                    label: "downloads",
                },
            ],
            videos: [],
            links: [["Source", "https://github.com/abdurisaq/OrganizeMyBakkesModGarage"]],
        },
    ],
    smallerProjects: [
        {
            id: "musicapp",
            name: "MusicApp",
            repo: "https://github.com/abdurisaq/MusicApp",
            summary:
                "An Android music app with media downloads, playlists, background playback and Bluetooth controls.",
            stack: ["Kotlin", "Android", "Media Playback"],
            about: "MusicApp is an Android music player built around a simple loop: find or download media, keep it in a local library, organize it into playlists, and keep listening when the app is no longer on screen. The project combines a Compose interface with Android's playback and download services.",
            sections: [
                {
                    title: "Keep a local music library",
                    paragraphs: [
                        "Room stores song records, playlists and the relationship between them. DAO interfaces expose playlist and song queries as flows, so the UI can observe library changes without having to manage raw SQL in the screens.",
                    ],
                },
                {
                    title: "Download and organize media",
                    paragraphs: [
                        "The app includes YouTube search and a direct-download flow. Search requires a user-provided YouTube API key, which is kept in local.properties for the build rather than checked into the repository. Downloaded items can then be organized into playlists.",
                    ],
                },
                {
                    title: "Keep playback running",
                    paragraphs: [
                        "Playback is built around Media3 ExoPlayer. An Android service owns the media session and publishes a system notification with previous, play/pause and next actions, allowing playback controls to remain available outside the app. The player also supports background playback and shuffle.",
                    ],
                },
            ],
            screenshots: [
                {
                    src: "assets/screenshots/musicapp-library.png",
                    alt: "MusicApp local music library screen",
                    caption: "Music library",
                },
                {
                    src: "assets/screenshots/musicapp-playlists.png",
                    alt: "MusicApp playlist screen",
                    caption: "Playlist organization and playback",
                },
            ],
            highlights: [
                "Jetpack Compose interface with separate song and playlist screens.",
                "Room database for song, playlist and playlist-membership records.",
                "Media3 ExoPlayer and a MediaSession-backed Android service for background playback.",
                "Previous, play/pause and skip controls surfaced through the Android media notification.",
                "YouTube search and downloading require a user-provided API key.",
            ],
            links: [["Source", "https://github.com/abdurisaq/MusicApp"]],
        },
        {
            id: "353-project",
            name: "353-Project",
            repo: "https://github.com/abdurisaq/353-Project",
            summary:
                "A collaborative data-analysis project exploring relationships between political freedom measures, terrorist attacks and US defense-company spending.",
            stack: [
                "Python",
                "pandas",
                "NumPy",
                "scikit-learn",
                "statsmodels",
                "Matplotlib",
                "Seaborn",
            ],
            about: "353-Project is a university group data-analysis project. We brought together country-level datasets to explore how measures such as trade freedom, government integrity and judicial effectiveness relate to terrorist attacks, oil reserves and US defence-company spending. The goal was to build a reproducible analysis pipeline and compare several ways of looking at the data, rather than present one chart as a definitive answer.",
            sections: [
                {
                    title: "Prepare a common dataset",
                    paragraphs: [
                        "The preprocessing notebook cleans and combines the source tables into a shared dataset. A separate mapping step assigns countries to broad regions, producing a region-enriched dataset that the analysis scripts can reuse. Keeping that preparation separate means the plots and models start from consistent inputs.",
                    ],
                },
                {
                    title: "Look at the data from several angles",
                    bullets: [
                        "Regional summaries compare the distribution of terrorist attacks across mapped regions.",
                        "Correlation heatmaps compare selected freedom indicators with regional categories.",
                        "Spending-trend plots follow Lockheed Martin and General Dynamics spending over time.",
                        "Country-level plots compare defence-company spending shares among countries with recorded attacks.",
                    ],
                },
                {
                    title: "Try statistical models",
                    paragraphs: [
                        "The project includes OLS regressions for the two defence-company spending targets and a Random Forest regression workflow with feature-importance output. These are exploratory analyses: the scripts test associations and predictive signals, not causal effects.",
                    ],
                },
            ],
            screenshots: [
                {
                    src: "assets/screenshots/353-project-correlation-heatmap.png",
                    alt: "353 Project correlation heatmap for freedom indicators and regions",
                    caption: "Correlation heatmap",
                },
                {
                    src: "assets/screenshots/353-project-feature-importance.png",
                    alt: "353 Project random forest feature importance chart",
                    caption: "Random Forest feature importance",
                },
            ],
            highlights: [
                "Pandas preprocessing notebook combines country-level source datasets.",
                "Region mapping step generates a reusable region-enriched dataset.",
                "Matplotlib and Seaborn visualizations explore regional patterns and spending trends.",
                "Statsmodels OLS regressions examine company-spending targets.",
                "Scikit-learn Random Forest analysis produces test/training error and feature-importance output.",
            ],
            links: [["Source", "https://github.com/abdurisaq/353-Project"]],
        },
    ],
    community: {
        mihon: {
            name: "Mihon",
            repo: "https://github.com/abdurisaq/mihon-fork",
            summary:
                "An ongoing personal fork of the Mihon Android manga reader, focused on tablet and hardware-keyboard workflows.",
            stack: ["Kotlin", "Android", "Jetpack Compose"],
            contributions: [
                {
                    title: "Fix SliderItem off-by-one error",
                    status: "Merged upstream",
                    detail: "Corrected the slider step calculation so the configured number of intervals matches the selectable range.",
                    url: "https://github.com/mihonapp/mihon/pull/1356",
                },
                {
                    title: "Extension filtering",
                    status: "Open pull request",
                    detail: "Added filtering for the extensions list; the upstream pull request is open for review.",
                    url: "https://github.com/mihonapp/mihon/pull/4153",
                },
                {
                    title: "Keyboard-driven reader navigation",
                    status: "Fork work",
                    detail: "Prototyped adjustable step scrolling for the up/down arrow keys in long-strip reading mode, making it easier to control panel movement from a tablet keyboard. I kept this implementation in my fork after a separate upstream solution addressed the broader request before my version could be merged.",
                    branchUrl:
                        "https://github.com/abdurisaq/mihon-fork/tree/webpage-like-navigation-with-keyboard",
                    issueUrl: "https://github.com/mihonapp/mihon/issues/1232",
                },
                {
                    title: "Configurable keybinding system",
                    status: "Fork work",
                    detail: "Experimented with a configurable keybinding system. The upstream proposal was not accepted because the implementation went beyond the scope of the original change; the work remains part of the fork's ongoing exploration.",
                },
            ],
        },
    },
    blogPosts: [
        {
            id: "privateconvert",
            type: "story",
            projectId: "privateconvert",
            title: "Why the Hell Is File Conversion Still a Website?",
            subtitle:
                "I wanted to resize an image or compress a video without uploading it to whichever site won Google that day.",
            category: "PrivateConvert · local-first software",
            date: "November 16, 2026",
            readTime: "6–8 min read",
            intro: "I hate online converters with a passion. Converting a file is basically a solved problem, but the accepted workflow is still: Google it, click whichever result won the SEO fight, upload your document, and hope you did not just hand something sensitive to a stranger. I wanted the handful of conversions I actually use to happen on my own machine.",
            sections: [
                {
                    title: "I hate uploading files to random websites",
                    paragraphs: [
                        "The conversion itself is usually dead simple. Shrink an image, compress a video, change a format, move a few PDF pages around. For some reason, when I want to do one of those things, I end up looking for a random website that wants the file first. I kept wondering why Windows and the other operating systems I use do not make these basic jobs easier to do out of the box.",
                        "And the file might not be disposable. It could be a work document, a scan of an ID, a signed form, or something I would rather not send to a service I found thirty seconds ago. I have no idea who is running that site, how long it keeps my upload, or what it does with the output. Clicking the first Google result is a pretty weak security review.",
                    ],
                },
                {
                    title: "Then the FBI warning showed up",
                    paragraphs: [
                        "In March 2025, the FBI’s Denver office warned about a campaign using fake online document converters and downloader tools. The sites advertised ordinary file conversion, but the FBI said the tools could also deliver malware or steal information. Malwarebytes covered the same campaign, and Forbes wrote about the warning a few days later.",
                        "To be clear, this was a specific campaign. It does not mean every converter on the internet is malicious. It does mean the risk is not theoretical: somebody looking for a tiny utility can end up downloading something nasty along with the converted file. I already hated the upload-first workflow. That warning gave me a very concrete reason to stop using it.",
                    ],
                    callout:
                        "The FBI warning was about a specific campaign, not every converter site. My preference is simpler: when I can do the job locally, I do not need to upload the file at all.",
                },
                {
                    title: "I only needed the conversions I actually do",
                    paragraphs: [
                        "PrivateConvert started as a tool for my own routine jobs: convert an image, resize it, compress a video to a specific size, or do something basic to a PDF. The video size thing comes up constantly. Discord, why is the upload limit still 10 MB? Sometimes I just need to get a clip under a limit without playing twenty questions with a website.",
                        "I was not trying to rebuild Photoshop, Premiere, or Acrobat. I wanted the operations I actually reach for, with the controls I need and no giant pile of features I will never open. It is a pretty selfish feature list. That is also why it is useful to me.",
                    ],
                },
                {
                    title: "I got tired of doing the same steps by hand",
                    paragraphs: [
                        "The File Operations page lets me chain operations together, validate the pipeline, save it, and run it again. One job I care about is getting a video under an upload limit. I can set a target size and let the app work through the compression instead of exporting, checking the size, guessing again, and repeating the whole thing.",
                        "Video compression uses ffmpeg, and ffprobe gives the app the metadata it needs to inspect the input and work toward a target size. PDF page editing has its own editor because squeezing page operations into one generic conversion button would be miserable. The Jobs page lets me cancel active work, remove completed jobs and their files, and choose retention. The default for finished jobs is 30 days; temporary files are cleaned at startup and expired jobs are removed hourly.",
                    ],
                },
                {
                    title: "I wanted it to run on my own machine",
                    paragraphs: [
                        "The backend is one FastAPI application that serves the built frontend. Node is needed to create the frontend bundle; it is not part of the running application. Both documented launch options bind to localhost, and Docker keeps application data in a local ./data directory. There is no login or access control because it is a single-user application.",
                        "That last part matters. I would not expose the port to an untrusted network. Local does not automatically mean perfectly secure, and I still have to trust the code I run and the tools it invokes. What it removes is the random third-party converter in the middle of a job. For the files I use, that is already a much better default.",
                    ],
                },
                {
                    title: "Running it",
                    paragraphs: [
                        "The README has a Windows PowerShell setup and a Docker Compose option. The Python launcher builds the static UI if it is missing or out of date. Once it starts, the app is at 127.0.0.1:8000. Video operations need ffmpeg; metadata and size-target compression also need ffprobe.",
                        "The README does not publish a full operating-system support matrix, so I am not going to invent one. These are the launch options the repository documents.",
                    ],
                    code: "# Local Python launch (PowerShell)\npython -m venv .venv\n.\\.venv\\Scripts\\python -m pip install -r backend\\requirements.txt\n.\\.venv\\Scripts\\python run_dev_stack.py\n\n# Or use Docker Compose\ndocker compose up --build\n\n# Open http://127.0.0.1:8000/",
                },
                {
                    title: "I just want my files to stay on my computer",
                    paragraphs: [
                        "That is why I made it. I want to shrink a video, resize an image, or shuffle PDF pages around without finding a new website and deciding whether I trust it. PrivateConvert handles the boring operations I actually need.",
                    ],
                },
            ],
            resources: [
                {
                    title: "PrivateConvert source code and README",
                    note: "Local Python launch, Docker Compose setup, localhost binding, file operations and job history.",
                    url: "https://github.com/abdurisaq/PrivateConvert",
                },
                {
                    title: "FBI Denver: Online File Converter Scam (March 7, 2025)",
                    note: "The original warning about fake converter/downloader tools.",
                    url: "https://www.fbi.gov/contact-us/field-offices/denver/news/fbi-denver-warns-of-online-file-converter-scam",
                },
                {
                    title: "Malwarebytes: Warning over free online file converters (March 17, 2025)",
                    note: "A technical write-up of the same campaign.",
                    url: "https://www.malwarebytes.com/blog/news/2025/03/warning-over-free-online-file-converters-that-actually-install-malware",
                },
                {
                    title: "Forbes: FBI issues document-converter warning (March 18, 2025)",
                    note: "Coverage of the FBI warning.",
                    url: "https://www.forbes.com/sites/zakdoffman/2025/03/18/fbi-warns-chrome-safari-and-edge-users-do-not-use-these-websites/",
                },
            ],
        },
        {
            id: "musicapp",
            type: "story",
            projectId: "musicapp",
            title: "Fighting the Demon That Is Android Studio",
            subtitle: "I only wanted a music player that did the handful of things I actually use.",
            category: "MusicApp · Android · Kotlin",
            date: "November 16, 2026",
            readTime: "5–7 min read",
            intro: "I’m a cheapskate. I looked at Spotify Premium, looked at the $14 a month, and thought: how hard can it be to make the little music app I actually need? I wanted to search for music, download it, keep it in a local library, make playlists, and play it. I was not asking for Spotify 2.",
            sections: [
                {
                    title: "My requirements were embarrassingly specific",
                    paragraphs: [
                        "I wanted to search for a track, download it, keep it in my library, put it into a playlist, and listen with the app in the background. That was pretty much the list. I did not need recommendations, podcasts, social features, or a year-end slideshow telling me what I listened to.",
                        "I know there are existing players. I still wanted to build this one because I had a very particular idea of the workflow I wanted, and I wanted to learn Android development along the way.",
                    ],
                },
                {
                    title: "Android Studio got in the way before Kotlin did",
                    paragraphs: [
                        "I expected learning Kotlin to be the hard part. It was an afterthought. Before I could get to the app itself, I had to deal with Android Studio, Gradle, SDK versions, dependencies, and a build system that seemed to find a new way to complain every day.",
                        "There were stretches where getting a clean build was the project. A dependency or version change could send me back through Gradle files and SDK settings, trying to work out which part Android Studio was unhappy with this time. I was spending more time getting the build to behave than writing the app. Once I got past that, Kotlin and the actual UI work were much less painful.",
                    ],
                },
                {
                    title: "I wanted the music to keep playing after I left the app",
                    paragraphs: [
                        "I used Room for the local library and playlists, and Jetpack Compose for the screens. The bit I cared about most was playback: I put Media3 ExoPlayer behind an Android foreground service and a media session so Android could keep the music playing when the app was no longer on screen.",
                        "The notification gets previous, play/pause, and next controls, and the README also lists Bluetooth controls. I wanted to be able to put the phone away and keep listening without having to keep the app open. There is YouTube search and a direct download flow too. The search API key goes in local.properties because YouTube search calls are rate-limited; it is not committed to the repository.",
                    ],
                },
                {
                    title: "The subscription is still cancelled",
                    paragraphs: [
                        "The app covers the things I wanted: search, download, playlists, background playback, shuffle and Bluetooth controls. I use my own tool for those limited needs, and I am happy with it. I also learned Kotlin, Compose, Room, Android services, Media3, and far more Gradle than I planned.",
                        "The subscription is still cancelled. Worth it. Probably.",
                    ],
                },
            ],
            resources: [
                {
                    title: "MusicApp source code and README",
                    note: "Features, YouTube API key setup and command-line build instructions.",
                    url: "https://github.com/abdurisaq/MusicApp",
                },
                {
                    title: "Android Media3 documentation",
                    note: "The Android playback and media-session APIs used by the app.",
                    url: "https://developer.android.com/media/media3",
                },
            ],
        },
        {
            id: "versatiletraining-story",
            type: "story",
            projectId: "versatiletraining",
            title: "The Epitome of Type 2 Fun: Staring at Data Dumps for One Training Shot",
            subtitle:
                "A training pack started as a personal annoyance and somehow reached people I watched on YouTube.",
            category: "VersatileTraining · Rocket League · BakkesMod",
            date: "November 16, 2026",
            readTime: "6–8 min read",
            intro: "It still astonishes me that a game can be out for a decade, add a feature in year two, and leave that feature barely updated for almost half of my lifetime. I play competitive Rocket League, and I have always liked making training packs. The standard cookie-cutter options in the archaic editor stopped being useful for the shots I wanted to practise.",
            videos: [
                {
                    title: "VersatileTraining walkthrough",
                    id: "9eDVzMzTQ7c",
                },
            ],
            sections: [
                {
                    title: "The editor had not kept up with the game I was playing",
                    paragraphs: [
                        "The better I got and the higher the skill ceiling went, the less useful the standard editor became. Every scenario I could make felt almost completely inapplicable to the game as it was being played now. I wanted to port a genuine situation from the match I had just played, turn it into an isolated shot, and practise it over and over.",
                        "I wanted to control the car and ball state closely enough that the setup actually felt like the match: positions, rotations, velocities, boost, jump state and the rest of the situation. The tool was made for me and me alone to begin with.",
                    ],
                },
                {
                    title: "The UI was familiar. Getting the game state was the hard part.",
                    paragraphs: [
                        "Building the editor panels was not what held me up. I needed to figure out where the game kept the values I wanted and which functions ran when I performed a particular action. That is where I started staring at data dumps and using the BakkesMod tools to narrow down what was happening.",
                        "I spent a lot of time repeating the same action, filtering function names, inspecting callbacks, and checking whether a value actually changed when I thought it should. I have put the UE3 and BakkesMod details in a separate technical write-up so this post can stay about the project and how it grew.",
                    ],
                },
                {
                    title: "I asked a friend to playtest it, then made an unlisted video",
                    paragraphs: [
                        "The project only started getting attention when I asked a friend to playtest it. I was excited about what it could do, so I made an unlisted video to walk them through it. I sent the link around to the people I expected to care about it. Then I checked the view count and it was around 600. (I guess to a lot of people that is trivial, but to me that was kind of crazy that 600 people were sent the link and watched it.)",
                    ],
                },
                {
                    title: "Two creators I watched found the video",
                    paragraphs: [
                        "Two creators from the Rocket League scene found the video and commented. One had a channel around 300,000 subscribers and the other around 50,000. One of them privately contacted me about early access because they were interested in making a video on it. That video never ended up being published, but even having that conversation was surreal. I was talking to people whose channels I had watched about a tool I had originally made for my friend group.",
                    ],
                },
                {
                    title: "I started checking the download count every morning",
                    paragraphs: [
                        "For about a month, watching the download counts became a morning ritual. I would wake up, check whether anybody else had downloaded it, and see the number move again. I never expected this project to get outside my friend group. It was kinda cool for the month it rapidly grew.",
                    ],
                },
            ],
            relatedId: "versatiletraining-ue3-notes",
            relatedLabel: "Okay, so how did I figure out what Rocket League was doing?",
            projectLink: "versatiletraining",
        },
        {
            id: "versatiletraining-ue3-notes",
            title: "Okay, so how did I figure out what Rocket League was doing?",
            subtitle:
                "The UE3, BakkesMod, Function Scanner and callback notes behind VersatileTraining.",
            category: "VersatileTraining · technical notes",
            date: "November 16, 2026",
            readTime: "12–15 min read",
            intro: "This is not a polished modding guide, and I am not pretending I know every corner of Rocket League's internals. It is a dump of what I learned after spending months banging my head against a wall, piecing together scattered docs, trying things in-game, and figuring out why an event I thought I understood was not the event I actually needed. I wrote it because I could not find one place that connected the pieces in a way that made sense to me. If you found this while trying to understand Rocket League modding, hopefully it saves you some of the same trial and error.",
            sections: [
                {
                    title: "First: what do people mean by Rocket League modding?",
                    paragraphs: [
                        "There is not one single thing called a Rocket League mod. The community has built several kinds of tools around the game: BakkesMod plugins that extend the running game, training and Freeplay utilities, replay and broadcast tools, cosmetic customization, and tools that inspect or work with the game's packaged content. They solve different problems and use different techniques. A replay tool does not need to work like a plugin that changes a training scenario, and a package browser is doing a different job again.",
                        "A big part of the scene is practical rather than academic. People want to recreate a shot, inspect a replay, try a different camera, organize a garage, build a training aid, or get information the normal interface does not show. BakkesMod became a shared foundation for a lot of that work. It gives plugin authors a common runtime and SDK, so every project does not have to solve loading, drawing UI and talking to the game from scratch.",
                        "The community has been building around the game since launch. By the time of BakkesMod's April 28, 2026 EAC announcement, Bakkes described the ecosystem as having more than 800 published community-submitted plugins, over 750,000 daily users and over 1.5 million weekly users. Those are the project's own figures from that announcement, not a current post-EAC user count, but they give a sense of how much community tooling had grown around one game.",
                        "That is the context for VersatileTraining. I was not trying to build an anti-cheat bypass or modify competitive matches. I wanted to make offline training more configurable: save a situation, set up the car and ball, repeat a shot, and build practice around a state that the normal training editor did not expose in the way I needed.",
                    ],
                },
                {
                    title: "Why Unreal Engine 3 gives the community something to work with",
                    paragraphs: [
                        "Rocket League is built on Unreal Engine 3. The fact that UE3 is old is not, by itself, what makes a game moddable. What matters for this particular scene is the combination of an object-oriented engine, reflected metadata, UnrealScript, native engine/game code, and a community that has spent years building tools around the way those pieces are represented.",
                        "The useful mental model is that the game is not just a giant anonymous block of machine code. Unreal has objects, classes, properties and functions. UnrealScript declares a lot of the game-side structure and behavior; native C++ functions can sit behind that script-facing interface. The engine's reflection system keeps metadata about many of those things, which is why tools can sometimes display a readable class or function name instead of only an address.",
                        "You will see two names come up a lot in Rocket League reverse-engineering material: GObjects and GNames. At a high level, GObjects is the runtime object collection and GNames is the name table used by the engine. They are useful because they help researchers relate live objects and function metadata to names. They do not magically reveal every native function's implementation, and the exact structures and offsets are tied to a particular game build. They are a way into the problem, not a complete map of it.",
                    ],
                },
                {
                    title: "There are two different views of the game: packages and runtime",
                    paragraphs: [
                        "One view is static: inspect the files the game ships. Unreal packages such as .upk and .u files are structured serialized containers. They include tables and references for names, imports, exports and object data. A package tool can turn those structures into something browsable: classes, dependencies, properties, script functions and, where the format and tool support it, reconstructed UnrealScript bytecode.",
                        "UE Explorer is one of the tools people use for this. The Rocket League-focused build adds support for game-specific UE3 tokens and reversed native-function information. UELib and related package tooling are useful background too. This kind of inspection answers questions like 'does this class exist?', 'what is this function called?', or 'what properties does the script-visible type declare?'. It does not tell you which function fires when you click a particular button in the live game, and it does not turn native C++ implementation into clean source code.",
                        "The other view is runtime: observe the game while it is doing the exact thing you care about. That is where I spent most of my time. Static inspection gives you names and possible places to look. Runtime investigation helps connect one repeatable action to the function, caller and data that actually matter. I found it much less confusing once I stopped expecting either view to answer every question on its own.",
                    ],
                },
                {
                    title: "Where BakkesMod fits",
                    paragraphs: [
                        "BakkesMod is the bridge between the running game and plugin code. In broad strokes, the injector loads the BakkesMod runtime into Rocket League, and BakkesMod provides a plugin environment that native C++ DLLs can use through its SDK. A plugin can register console commands, draw UI, respond to game events and use wrapper classes for familiar game objects. The SDK gives names and helper methods around parts of the game that would otherwise be awkward to work with directly.",
                        "That changes the starting point for a plugin author. You do not have to build your own loader just to run code in the game process, or reverse-engineer every common object from zero. You build against the SDK, load the plugin through BakkesMod, and use the wrapper/event layer where it is available. When the SDK does not expose the value or event you need, that is when the more investigative part begins.",
                        "BakkesMod is also more than the loader. It is the ecosystem around it: the SDK, documentation, plugin listings, examples, and people who have already found useful hooks. Looking through existing plugins is often as valuable as reading the formal API because it shows how other developers solved a real game-specific problem.",
                    ],
                },
                {
                    title: "Finding the function: make the game tell you what it is doing",
                    paragraphs: [
                        "My main discovery tool was the BakkesMod Function Scanner. The documented workflow is to launch Rocket League with the -dev option, restart with BakkesMod injected, open the console with F6, and run togglemenu devtools. The scanner lets you include and exclude words from function names; matching functions appear as they fire. That turns a vague question—'what gets called when I save this training setup?'—into something I could test.",
                        "I would set up one repeatable action, perform it once, watch what appeared, then narrow the filters and repeat. If I changed several things at once, the results became noise. If I changed one thing and repeated the same action, it became easier to tell which function was related and whether it happened before or after the state I cared about had changed. It is still trial and error, but at least the trial is controlled.",
                        "You will also find lower-level reverse-engineering write-ups that locate GObjects and GNames or trace ProcessEvent, a central Unreal object-function dispatch path. Those are useful examples of how people investigate the engine from closer to the runtime internals. I am mentioning them as part of the wider scene; my own day-to-day route for this project was the BakkesMod Function Scanner and SDK hooks, not a claim that I built a custom ProcessEvent tracer.",
                    ],
                },
                {
                    title: "A scanner result is only the start: turning it into a hook",
                    paragraphs: [
                        "Once I had a candidate function name, the BakkesMod SDK gave me a way to subscribe to it. HookEvent runs my callback when the target function is called; HookEventPost runs after it returns. The caller-aware variants also pass a wrapper for the object that invoked the function, along with a void* parameter pointer and the event name. That is a useful amount of context: the function name tells me what path I am looking at, the caller tells me which object is involved, and params points to the arguments supplied to that call.",
                        "The event name often contains a class path, for example a function under a Rocket League class ending in _TA. The SDK documentation describes how that naming convention can map to wrapper types such as CarWrapper. The important thing is to confirm that mapping rather than guess. A caller-aware hook is not a type-discovery system; if the wrapper type does not match the object, the cast can be invalid.",
                        "The same goes for params. A void* is just an address. It does not arrive with a C++ struct attached, and the SDK cannot infer a parameter schema that nobody has documented. A hook gives you a reliable point to observe a call. It does not automatically tell you how to interpret every byte passed to it.",
                    ],
                },
                {
                    title: "The frustrating part: figuring out what the bytes mean",
                    paragraphs: [
                        "This is where the hours went. I would find an event that looked promising, hook it, and compare the caller and parameter memory while repeating the same action with one value changed. A hex dump is useful here because it gives you a stable view of a memory region: offsets down the side, bytes in hexadecimal, and an ASCII column where printable characters happen to exist. It is not a decoded structure. It is just a way to compare captures without guessing from a single integer printed to the log.",
                        "The trick was to look for relationships. If I changed the ball's starting speed and the same four bytes changed in a consistent way, that was a lead. If a pointer-sized region stayed stable while the data behind it changed, that was another lead. If the same event fired for unrelated actions, it might not be specific enough. I kept going back to the game, repeating the action, and trying to eliminate assumptions one at a time.",
                        "I also had to separate three things that are easy to blur together: the function's parameter block, the caller object, and an object reached through a pointer inside one of those regions. They are different memory bases. An offset only means something when you can say exactly what address it is measured from.",
                    ],
                },
                {
                    title: "When a pattern emerged, I sketched a provisional struct",
                    paragraphs: [
                        "Once I had enough repeated captures to suspect a layout, I would make an intentionally boring C++ struct: a byte array for the unknown gap, then a field at the offset I had evidence for. It is not elegant, and it is not me claiming I reconstructed the entire Unreal type. It is a temporary way to express a specific observation so I can test it against the same callback again.",
                        "In one path, the pointer I wanted appeared 0xE8 bytes into an RPC parameter block. I represented the preceding bytes as padding, read a uintptr_t at that position, and treated it as a pointer to the training-data object. Passing that address into TrainingEditorSaveDataWrapper let me use the wrapper's GetCode() and GetTM_Name() methods to obtain the in-game code and map name as readable strings. The wrapper did the higher-level interpretation; the offset was how I reached the object in the first place.",
                        "In another investigation, I was looking at a GameEditor ball caller. The fields I was interested in—start location, start rotation, velocity start speed and velocity start rotation—appeared after 0xB10 bytes of padding from caller->memory_address. This was not +0xB10 from params. It was a different base address and a different structure. Keeping that distinction explicit prevented me from treating two unrelated memory regions as if they shared one layout.",
                        "These padded structs are hypotheses, not public engine APIs. The padding says 'I have not identified this region yet'. The field says 'this location appears to behave like this value in the captures I tested'. Offsets can move between game builds, object layouts can change, and an incorrect type or alignment assumption can turn a plausible value into a crash. I would only keep an inferred field after checking it with multiple captures and, ideally, different values.",
                    ],
                },
                {
                    title: "How that investigation fed back into VersatileTraining",
                    paragraphs: [
                        "The reason I went down this rabbit hole was not to collect offsets. I wanted the plugin to save and restore useful training states. That means the editor needs real values: where the ball starts, how it is rotated, how fast it moves, what training data is associated with a setup, and which event marks the point where those values are available. The UI is the part people see, but the reliability of the feature depends on understanding the game's state well enough to populate it correctly.",
                        "Once I could connect a repeatable in-game action to a function and then to a value I could read through a wrapper or a validated layout, I could stop treating the data as a mystery and build an actual feature around it. That is the step that matters: investigation becomes a named concept in the plugin, not a pile of addresses and debug output spread across the codebase.",
                    ],
                },
                {
                    title: "A quick reality check about EAC and BakkesMod",
                    paragraphs: [
                        "EAC changed where community mods can run, but the first announcement was not the final word on BakkesMod's future. Psyonix announced on April 28, 2026 that Easy Anti-Cheat would be required for online play on PC and that community mods would not run while EAC is enabled. The same announcement explicitly kept a non-EAC path for training, offline matches, LAN matches and replay work.",
                        "There was an initial BakkesMod post on April 28 saying active updates would stop. Then the story changed: on May 12, BakkesMod announced that it had been updated for the newest Rocket League build in non-EAC mode and that Psyonix had offered support so the team could continue providing updates sustainably. Rocket League's own account confirmed that BakkesMod was available on the latest version in non-EAC mode and would continue to be supported in future updates.",
                        "So the accurate summary is: BakkesMod is continuing, but the supported modded workflow is non-EAC mode. EAC-enabled online play and non-EAC modded training are separate launch paths. I normally use the plugin while training offline anyway, so this does not change the way I use VersatileTraining. This describes the public May 12 confirmation; it is not a promise that a third-party mod can run in EAC-enabled online matches.",
                    ],
                },
                {
                    title: "If you found this while trying to do something similar",
                    paragraphs: [
                        "Start by getting one small question answered. Do not begin by trying to reconstruct all of Rocket League. Find the object or action you care about, learn its vocabulary from package inspection or existing plugin code, then reproduce it in-game with one variable changed at a time. Use the scanner to find a candidate event, confirm whether you need a pre- or post-hook, record the caller and parameter context, and keep notes about which offsets are relative to which base address.",
                        "Be suspicious of the first result that looks right. Try another value. Repeat the same action. Check whether the function also fires in a different context. Prefer a BakkesMod wrapper when it gives you the value you need, and keep raw offsets contained behind a small helper when you genuinely need them. Do not assume an undocumented layout is stable just because it worked on one build.",
                        "Most importantly, look through other people's plugins, SDK examples and community tools. A lot of the scene's knowledge is scattered across docs, repositories, forum posts and old experiments. This page is not a definitive reference. It is the set of notes I wish I had found when I started pulling at this particular thread. If it helps somebody else spend fewer evenings staring at a memory window, it has done its job.",
                    ],
                },
            ],
            workflow: [
                "Choose one repeatable action in offline training and change one thing at a time",
                "Use package tools and existing plugins to learn the names and types that might matter",
                "Use the BakkesMod Function Scanner to find candidate functions as they fire",
                "Register a hook and record the event name, caller, timing and parameter pointer",
                "Compare wrapper values and memory captures to identify relationships",
                "Sketch a padded struct only after a pattern repeats, then validate it against more captures",
                "Wrap the verified access in a named helper and use it to implement the training feature",
            ],
            resources: [
                {
                    title: "BakkesMod Function Scanner",
                    note: "How to launch the DevTools scanner, filter function names and find candidate events as they fire.",
                    url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/function-scanner",
                },
                {
                    title: "Using BakkesMod function hooks",
                    note: "HookEvent, HookEventPost, caller-aware hooks and the meaning of the params pointer.",
                    url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/using-function-hooks",
                },
                {
                    title: "Hook Event With Any Caller",
                    note: "Important warning: this helper uses a blind cast, so the caller type must be correct.",
                    url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/hook-event-with-any-caller",
                },
                {
                    title: "BakkesMod SDK",
                    note: "The SDK source, wrappers and plugin development interface.",
                    url: "https://github.com/bakkesmodorg/BakkesModSDK",
                },
                {
                    title: "RocketLeague-Data-Dumper",
                    note: "A community write-up on UE3 object structures, GObjects/GNames and runtime data discovery. This is a separate, lower-level approach from my own scanner workflow.",
                    url: "https://github.com/DRKn1ght/RocketLeague-Data-Dumper",
                },
                {
                    title: "UE Explorer — Rocket League edition",
                    note: "A package browser/decompiler with support for Rocket League's customized UE3 tokens and UnrealScript data.",
                    url: "https://github.com/lauralex/ue-explorer",
                },
                {
                    title: "BakkesMod plugins",
                    note: "Browse the wider ecosystem of community-built tools and plugins.",
                    url: "https://bakkesplugins.com/",
                },
                {
                    title: "Bakkes' April 28, 2026 ecosystem update",
                    note: "The original EAC announcement also gives BakkesMod's own historical figures for community plugins and usage; treat them as a dated snapshot, not current analytics.",
                    url: "https://updater2.bakkesmod.com/articles/bakkesmod-eac.html",
                },
                {
                    title: "Rocket League: Easy Anti-Cheat on PC",
                    note: "Psyonix's April 28, 2026 announcement describing EAC-enabled online play and the non-EAC offline mod path.",
                    url: "https://www.rocketleague.com/news/easy-anti-cheat-comes-to-rocket-league-on-pc-today",
                },
                {
                    title: "BakkesMod: May 12 update",
                    note: "BakkesMod's confirmation that it was updated for the latest build in non-EAC mode, with Psyonix support for sustainable future updates.",
                    url: "https://x.com/BakkesMod/status/2054249895448461494",
                },
                {
                    title: "Rocket League: May 12 confirmation",
                    note: "Psyonix/Rocket League's confirmation that BakkesMod would continue to be supported in future updates (non-EAC mode only).",
                    url: "https://x.com/RocketLeague/status/2054253085094994064",
                },
            ],
            offsetNotes: [
                {
                    title: "Training-data RPC payload",
                    base: "RPC parameter block (params)",
                    offset: "+0xE8",
                    detail: "A uintptr_t at this observed offset pointed to the training-data object. I passed that pointer into TrainingEditorSaveDataWrapper and used GetCode() and GetTM_Name() to read the in-game code and map name.",
                    fields: [
                        "uintptr_t TrainingData",
                        "TrainingEditorSaveDataWrapper",
                        "GetCode()",
                        "GetTM_Name()",
                    ],
                },
                {
                    title: "GameEditor ball caller",
                    base: "caller->memory_address (not params)",
                    offset: "+0xB10",
                    detail: "This offset was measured from the caller object's memory. The values I was mapping after that gap were the ball's start location, start rotation, initial velocity speed and velocity rotation.",
                    fields: [
                        "Vector StartLocation",
                        "Rotator StartRotation",
                        "float VelocityStartSpeed",
                        "Rotator VelocityStartRotation",
                    ],
                },
            ],
            screenshots: [],
            statusNote:
                "These notes describe the public EAC/BakkesMod announcements referenced above. Modded training uses the non-EAC launch path; EAC-enabled online play is a separate mode.",
            type: "technical",
            projectId: "versatiletraining",
            parentId: "versatiletraining-story",
            parentLabel: "Back to the training-shot story",
            relatedId: null,
        },
        {
            id: "organize-my-bakkesmod-garage",
            type: "story",
            projectId: "organize-my-bakkesmod-garage",
            title: "Wasted Success: 13,000 Downloads for a Garage Menu",
            subtitle: "By far and away my most downloaded project started as a small annoyance.",
            category: "OrganizeMyBakkesModGarage · Rocket League · BakkesMod",
            date: "November 16, 2026",
            readTime: "5–7 min read",
            intro: "This one is hilarious and kind of infuriating. It is by far and away the most successful thing I have made, at 13,000+ downloads, and the first pass just wasn’t hard. It was another “hey, how hard can this be?” moment. I was annoyed with the built-in garage workflow, so I made another layer over it and kept adding the things I wanted.",
            sections: [
                {
                    title: "BakkesMod already had a garage modification. It was still annoying.",
                    paragraphs: [
                        "The built-in garage modification had not been updated in years and was just kind of annoying to deal with once I had a lot of presets. I wanted groups, search, and a way to get to the presets I actually used without scrolling through one enormous list.",
                        "So I built a second abstraction layer over it. Hey, how hard can it be. The first pass really was small: make the existing workflow less annoying for me. Then I kept thinking of little things I wanted it to do.",
                    ],
                },
                {
                    title: "Groups, sorting, and shuffling through presets",
                    paragraphs: [
                        "You can organize presets into groups, edit existing groups, and sort by name, date and size in either ascending or descending order. I can pick a main group and shuffle through those presets in Freeplay or toggle shuffling in online games. I wanted to get through a match and cycle to another preset without opening the garage and doing the whole thing manually.",
                    ],
                },
                {
                    title: "Taking presets out of other people’s replays",
                    paragraphs: [
                        "The plugin can equip a preset from a group, swap its car body to one of my existing in-game presets, and copy a preset from a replay. That last one is probably my favourite: I see a car setup in somebody else’s replay, save the replay, and take the preset out of it.",
                        "The original GIFs are from the README. They show adding and editing groups, sorting, swapping car bodies, shuffling the main group, and copying a preset from a replay. They explain the clicks much faster than I can.",
                    ],
                },
                {
                    title: "Most of the work was decoding and encoding Base64",
                    paragraphs: [
                        "Most of the work was decoding and encoding Base64 strings holding the car information that could be found in the game. I had to figure out what the strings represented, change the data I wanted to change, and encode it again without breaking the rest of the preset. The UI was the easy part.",
                    ],
                },
                {
                    title: "The README has a few caveats",
                    paragraphs: [
                        "The plugin works with both Epic and Steam. It does not currently work with Linux and will probably crash when opened there. It is not compatible with AlphaConsole custom decals. If you want to swap car bodies, you need at least one in-game preset with that body. Also, updating a BakkesMod preset does not automatically update the copy saved in a group; you need to remove it and add it again.",
                    ],
                },
                {
                    title: "The plugin got 13,000 downloads. The website did not.",
                    paragraphs: [
                        "I also built a website version of this, which was a miss. By the time it went up, the first wave of plugin users had already come and gone, and the plugin was self-sufficient anyway — you could do everything from inside the game. The website solved a problem that did not exist. So the plugin has 13,000 downloads and the website has roughly none, which I think is the funniest possible outcome for a project I started because a menu annoyed me.",
                        "Somehow this little quality-of-life plugin is the one that crossed 13,000 downloads. I have spent more time on other projects that were much more complicated. This one is hilarious and kind of infuriating.",
                    ],
                },
            ],
            media: [
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/adding.gif",
                    alt: "Adding a preset to a garage group",
                    caption: "Adding a preset to a group",
                },
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/editing.gif",
                    alt: "Editing an existing garage group",
                    caption: "Editing groups",
                },
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/sort.png",
                    alt: "Preset group sorting options",
                    caption: "Sorting groups by name, date and size",
                },
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/swapWithCarBody.gif",
                    alt: "Swapping a preset to an existing car body",
                    caption: "Swapping a car body",
                },
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/shufflePresets.gif",
                    alt: "Shuffling the main group presets",
                    caption: "Shuffling the main group",
                },
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/copyPreset.png",
                    alt: "Copying a preset from a replay",
                    caption: "Copying a preset from a replay",
                },
            ],
            resources: [
                {
                    title: "OrganizeMyBakkesModGarage source and README",
                    note: "Original feature list, demonstrations and compatibility notes.",
                    url: "https://github.com/abdurisaq/OrganizeMyBakkesModGarage",
                },
            ],
        },
        {
            id: "localtether-story",
            type: "story",
            projectId: "localtether",
            title: "In This Next Episode of How the Hell This Came to Be: a Software KVM",
            subtitle:
                "A cramped desk, a laptop with a worse keyboard, and a question that caused a shit ton of problems.",
            category: "LocalTether · C++ · Windows + Linux",
            date: "November 16, 2026",
            readTime: "7–9 min read",
            intro: "I’m notoriously cluttered, my desk is too small for two monitors, and I normally work with my laptop sitting beside my desktop. Every time I wanted to do something on the laptop, I had to reach over and use its inferior keyboard and crappy touchpad. I already had a perfectly good keyboard and mouse plugged into my desktop. I wanted those to work on both machines.",
            videos: [
                {
                    title: "LocalTether walkthrough",
                    id: "0U6Gs4i0kbI",
                },
            ],
            sections: [
                {
                    title: "I did not want to buy a $100 KVM switch",
                    paragraphs: [
                        "I had heard of things like Mouse Without Borders, but I specifically needed something that worked between my Windows desktop and Linux laptop. The Windows options I found were not going to work for that setup, and the Linux options I found tended to assume the other machine was Linux too. Then I looked at a physical KVM switch. Who has $100 lying around for a desk that barely fits one monitor?",
                        "I asked myself the usual question: how hard can this be? That question has caused me a shit ton of problems across my projects.",
                    ],
                },
                {
                    title: "I had to learn what connecting two computers actually meant",
                    paragraphs: [
                        "I knew I wanted the machines to find each other on my home network, but I did not really understand what I was looking at when I saw an address like 192.168.1.20, or why that was different from the WAN IP on my router. I had to learn what a local address was, what the router was doing, and how to keep the connection between the machines on the LAN.",
                        "Keeping the connection local was one of the original requirements. I did not want keyboard and mouse events going through some remote service when the two computers were sitting on the same desk.",
                    ],
                },
                {
                    title: "This was my first project that had to work on Windows and Linux",
                    paragraphs: [
                        "I needed the rest of the app to stop caring which OS was underneath it. Windows and Linux expose input through different APIs, so I ended up putting a shared InputManager in front of separate implementations. That let the rest of the app ask for input without having to know which machine it was running on.",
                        "The build setup split too. I made a Bash script for Linux and a PowerShell script for Windows, with CMake and vcpkg underneath. This was my first project where both operating systems were actual targets, and I had to learn how much the build process changes between them.",
                    ],
                },
                {
                    title: "The trackpad was sending me finger positions, not mouse positions",
                    paragraphs: [
                        "I was sending mouse data raw and hoping it would mean the same thing on the other machine. It did not. libevdev gave me the finger’s position on the trackpad, not the cursor position on the screen. I had to remember an anchor, compare the movement from one finger position to the next, and apply that difference to the simulated cursor.",
                        "When the finger jumped too far, I reset the anchor instead of teleporting the mouse across the screen. That whole chunk of math came from me making the wrong assumption about what libevdev was giving me.",
                    ],
                },
                {
                    title: "Then I had to make keyboard presses arrive properly",
                    paragraphs: [
                        "I needed to distinguish a short press, a long press, and a key release. I also needed multiple keys pressed at the same time to arrive as the same combination on the other machine. If I held Shift and another key on the desktop, the laptop had to see both, in the right order, and the release could not disappear because another event arrived first.",
                        "That meant learning about debounce, press/release state, and how to package events so the receiver could reconstruct what I was actually doing.",
                    ],
                },
                {
                    title: "My first queue was where I gave up for a while",
                    paragraphs: [
                        "I tried writing my own queue for the input stream. I got stuck on throughput, atomic operations, and what happens when events arrive faster than the other side can consume them. I wanted it to be reliable and fast, but my understanding of atomic queues was not good enough to trust the design I was building, so I parked LocalTether for a while.",
                        "When I came back, I stopped trying to invent a lock-free queue and used the write queue the networking library already gave me. Messages go through the Asio executor and get written in order. It was less clever than what I was trying to build. It also actually worked.",
                    ],
                },
                {
                    title: "A bunch of old class notes suddenly became useful",
                    paragraphs: [
                        "By the end I was pulling in bits from old projects and information from previous classes. It felt like my own Slumdog Millionaire moment: some detail I had learned ages ago would suddenly come back while I was trying to solve an unrelated problem.",
                    ],
                },
                {
                    title: "I started with keyboard and mouse sharing. It kept growing.",
                    paragraphs: [
                        "I ended up with Host, Broadcaster and Receiver roles, host controls, client management and shared file browsing. The HTTP Server From Scratch repository came from an earlier attempt to understand the networking side. It is not a full project, so I removed it from the project list, but it belongs in the story of how I got here.",
                    ],
                },
                {
                    title: "I wanted it on the LAN, but I still had to think about security",
                    paragraphs: [
                        "LocalTether uses TLS and password-protected sessions, and LAN-only use is the default described in the README. WAN access requires deliberate port forwarding. There is a security caveat in the source snapshot I reviewed: the TLS client sets verify_none, so the connection is encrypted but the client is not validating the server certificate in the normal way.",
                        "I am spelling that out because “TLS is enabled” and “the client knows who it connected to” are different things. I do not want to pretend I solved a security problem that is still sitting there.",
                    ],
                },
                {
                    title: "At least I can stop reaching for the laptop",
                    paragraphs: [
                        "It solved the problem I was complaining about, which is all I wanted from it.",
                    ],
                },
            ],
            relatedId: "localtether-implementation-notes",
            relatedLabel: "LocalTether implementation notes",
            projectLink: "localtether",
        },
        {
            id: "localtether-implementation-notes",
            type: "technical",
            projectId: "localtether",
            title: "LocalTether: the LAN, input and queue notes",
            subtitle: "The implementation details behind the software KVM story.",
            category: "LocalTether · technical notes",
            date: "November 16, 2026",
            readTime: "8–10 min read",
            intro: "The story post is about why I built LocalTether. This is the implementation side: how the LAN scan works, what I had to hide behind the InputManager interface, why trackpad coordinates needed special handling, and how I replaced the queue I had abandoned the project over.",
            sections: [
                {
                    title: "Finding other machines on the LAN",
                    paragraphs: [
                        "The discovery scripts look for an IPv4 interface with a /24 prefix. They take the first three octets, then ping addresses 1 through 254 in that subnet. The Windows script uses PowerShell and ping.exe; the Linux script uses ping with a one-second timeout and caps the number of concurrent jobs. The application then probes the discovered addresses for the LocalTether service on port 8080.",
                        "That is a practical first pass for the home network I was targeting. It can miss machines that ignore ping, use a different subnet size, or sit behind a more complicated layout. I had to understand the assumptions in the scan before treating it as a reliable discovery mechanism.",
                    ],
                },
                {
                    title: "Keeping the operating-system code behind one interface",
                    paragraphs: [
                        "InputManager is the shared interface. At build time the project creates WindowsInput or LinuxInput. The Windows side uses Windows input hooks and simulation; the Linux side works through evdev/libevdev and a helper process for lower-level input access.",
                        "That meant I did not have to put Windows and Linux branches throughout the networking and session code. The differences stayed close to the code that actually talks to each operating system.",
                    ],
                },
                {
                    title: "The trackpad coordinate conversion",
                    paragraphs: [
                        "The TRACKPAD_ABSOLUTE path reports a finger position on the pad. The simulated mouse needs a screen-relative cursor position. I keep an anchor for the last device position and remember the last simulated cursor position. Normal finger movement becomes a delta applied to the cursor; a jump beyond the threshold re-anchors without moving the cursor. The result is clamped to normalized screen bounds.",
                        "The threshold is currently 0.02 in normalized coordinates. It is a heuristic for separating a continuous drag from a finger reposition, not a universal property of every trackpad.",
                    ],
                },
                {
                    title: "Keyboard events need both edges",
                    paragraphs: [
                        "The input payload carries a vector of KeyEvent entries. Each entry has a keyCode and an isPressed flag, so the receiver can distinguish a press from a release. The payload also includes the source device type, mouse-event flag, normalized coordinates, mouse-button state, and horizontal and vertical scroll deltas.",
                        "The Windows polling path has debounce handling. The Linux helper reads input events from the evdev subsystem. Several keys can be held together, so the event order matters: Shift plus another key must arrive as a combination, and the release must not get lost behind the next press.",
                    ],
                },
                {
                    title: "The write queue I ended up keeping",
                    paragraphs: [
                        "The old attempt was a custom queue I did not understand well enough to trust under bursts. In the supplied source, the session serializes each message, posts the write work through the Asio executor, protects the queue with a mutex, and sends one queued message at a time with async_write. When a write completes, it pops the queue and continues with the next item.",
                        "That is the version I was comfortable leaving in the project. I stopped trying to make my own lock-free queue and used the asynchronous write pattern Asio already provides.",
                    ],
                },
                {
                    title: "The build scripts are different for a reason",
                    paragraphs: [
                        "Linux has a Bash build script and Windows has a PowerShell build script. Both bootstrap dependencies and build with CMake and vcpkg, but they need different commands and environment handling. I also had to account for platform-specific process and input APIs, not just the compiler.",
                    ],
                },
                {
                    title: "The HTTP server experiment",
                    paragraphs: [
                        "HTTP Server From Scratch is an earlier repository from the same learning path. I removed it as a standalone portfolio project because it was not a complete project in its own right. It is still part of the LocalTether story: I was learning how clients connect and how messages move before I could build the input stream I wanted.",
                    ],
                },
                {
                    title: "The TLS caveat",
                    paragraphs: [
                        "The supplied client source sets its TLS verification mode to verify_none. The network traffic is encrypted, but the client is not validating the server certificate in the normal way. I would address that before presenting this source snapshot as protected against an active man-in-the-middle attacker.",
                    ],
                },
            ],
            resources: [
                {
                    title: "LocalTether source and README",
                    note: "Input managers, scan scripts, Asio sessions, build scripts and usage.",
                    url: "https://github.com/abdurisaq/LocalTether",
                },
                {
                    title: "HTTP Server From Scratch",
                    note: "An earlier networking experiment, linked as part of the development path.",
                    url: "https://github.com/abdurisaq/HTTP-Server-From-Scratch",
                },
                {
                    title: "Linux input subsystem documentation",
                    note: "Background on event devices and event codes.",
                    url: "https://docs.kernel.org/input/input.html",
                },
                {
                    title: "Standalone Asio",
                    note: "The asynchronous networking library used for the client/server sessions.",
                    url: "https://think-async.com/Asio/",
                },
            ],
            parentId: "localtether-story",
            parentLabel: "Back to the LocalTether story",
        },
    ],
};
