// Featured, community and smaller project catalogue.
Object.assign(DATA, {
    projects: [
        {
            id: "localtether",
            name: "LocalTether",
            repo: "https://github.com/abdurisaq/LocalTether",
            summary:
                "A cross-platform software KVM for sharing keyboard, mouse and files across machines on a LAN. I built the Windows and Linux input paths, session roles and encrypted client/server workflow—and learned exactly where the platforms disagree.",
            stack: ["C++", "ASIO", "OpenSSL", "SDL2", "ImGui", "CMake", "vcpkg"],
            about: "LocalTether began with a practical question: why should moving between two computers mean reaching for another keyboard or copying files by hand? I built a LAN-based software KVM with host, broadcaster and receiver roles, shared input and file browsing. Making it work across Windows and Linux pushed me into platform-specific input handling, session design and the less glamorous parts of getting two machines to agree.",
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
                "A Rocket League training plugin that lets me build drills around live game state—not just replay a fixed shot. I worked with car and ball physics, boost, goal detection and input recording to make training packs behave like configurable scenarios.",
            stack: ["C++", "BakkesMod SDK", "Dear ImGui", "vcpkg", "Visual Studio"],
            about: "VersatileTraining is where I got closest to the game itself. I wanted training packs to respond to the situation on the field, so I built a BakkesMod plugin around live car and ball state, boost, goal blockers and recorded inputs. The interesting part was not adding another menu; it was making the game state usable enough that a drill could be configured, replayed and inspected instead of simply repeated.",
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
                "A local-first desktop tool for converting and editing images, PDFs and video without sending files to a random website. It turns one-off chores into reusable operation pipelines, queued jobs and a proper PDF page editor.",
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
            about: "PrivateConvert started with a familiar annoyance: needing to shrink a video, resize an image or move a few PDF pages, then having to hand the file to whichever converter Google put first. I built the tool I wanted instead—a local-first app with reusable operation pipelines, queued jobs and a separate PDF editor. The goal was to make the boring jobs feel straightforward without making the file leave my machine.",
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
                "A full-stack home for Rocket League training packs: publish a pack, browse what other players have made, inspect the details and load it straight into the game. It connects the editor-side work to a place the wider community can actually use.",
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
            about: "The Training Hub grew out of a simple limitation: making a useful training pack is only half the job if it stays on the machine where it was created. I built the web side so players could publish packs, discover other people's work, inspect ratings and details, then bring a pack back into Rocket League. It turns a local tool into a workflow that can be shared.",
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
                "A BakkesMod plugin that makes a crowded Rocket League garage manageable: group presets, sort loadouts and switch between setups in-game. A small quality-of-life fix that found an audience well beyond my own setup.",
            stack: ["C++", "BakkesMod SDK", "Dear ImGui", "Windows APIs"],
            image: "assets/organize-my-bakkesmod-garage.png",
            imageAlt:
                "OrganizeMyBakkesModGarage group and preset management interface shown over Rocket League gameplay.",
            about: "OrganizeMyBakkesModGarage began as a tiny irritation: once a garage fills up, finding the preset you actually want becomes its own task. I built the organization tools directly into the game, so grouping, sorting and managing loadouts did not require a separate website or workflow. It is one of my less complicated projects—and, with around 13,000 downloads, easily one of the most widely used.",
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
                "An Android music player built around the whole listening loop: download media, keep it in a local library, organize playlists and keep playback going in the background with Bluetooth controls.",
            stack: ["Kotlin", "Android", "Media Playback"],
            about: "MusicApp was an exercise in making the everyday path feel complete. Finding or downloading a track is only the start; the app also needs to keep a local library organized, manage playlists and continue playing after the screen goes off. I built it with Kotlin and Compose, then worked through Android's playback and download services to make those pieces behave together.",
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
                "A collaborative data-analysis project combining country-level indicators to explore how political freedom measures relate to terrorist attacks and US defence-company spending, using regression and Random Forest workflows.",
            stack: [
                "Python",
                "pandas",
                "NumPy",
                "scikit-learn",
                "statsmodels",
                "Matplotlib",
                "Seaborn",
            ],
            about: "This was a group project built around a messy question and several datasets that did not naturally belong together. We combined country-level measures of trade freedom, government integrity and judicial effectiveness with data on terrorist attacks, oil reserves and US defence-company spending. The aim was to build a reproducible analysis and compare statistical approaches—not to pretend a correlation chart could settle a causal question.",
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
});
