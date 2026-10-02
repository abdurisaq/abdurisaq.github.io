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
                    id: "0U6Gs4i0kbI",
                    title: "LocalTether walkthrough",
                },
            ],
            links: [["Source", "https://github.com/abdurisaq/LocalTether"]],
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
            deepDive: {
                intro: "This is the part where I stopped drawing editor panels and started trying to figure out what Rocket League was doing internally. The plugin needed actual game events and real state data. Rocket League runs on UE3, and there is a lot of community work around inspecting that engine. I used a mix of package inspection, runtime observation, the BakkesMod SDK, and a frankly unhealthy amount of testing the same action over and over.",
                sections: [
                    {
                        title: "UE3 gives you names to work with, once you find them",
                        paragraphs: [
                            "UE3 has reflected objects, classes, properties, and functions. In Rocket League reverse-engineering discussions, GObjects and GNames come up constantly. GObjects is the live object collection; GNames is the name table. When you can connect a live object to its class and name, you can start describing what you found instead of keeping a notebook full of addresses.",
                            "UnrealScript class and function metadata is part of that picture, alongside native C++ engine code. The important warning is that addresses and offsets move between builds. A structure layout from one version of Rocket League is not a promise about the next update.",
                        ],
                    },
                    {
                        title: "Package files help answer what might exist",
                        paragraphs: [
                            "I also had to learn about Unreal package files such as .upk and .u. They contain tables for names, imports, and exports, along with serialized object data. Tools like UELib can parse a lot of that structure, while UE Explorer has Rocket League-focused support for some of the game's UE3 changes.",
                            "Static inspection helps me find class and function names and understand the relationships the package metadata exposes. It does not tell me which function fires when I take one particular shot in freeplay. For that, I need to watch the running game. I think of the package data as a map of what could be there, and runtime tracing as a way to see which route the game actually takes.",
                        ],
                    },
                    {
                        title: "Then I started watching functions fire in-game",
                        paragraphs: [
                            "RocketLeague-Data-Dumper documents a lower-level route through GObjects, GNames, and ProcessEvent. That is useful background for understanding what happens when reflected functions are dispatched. It is community reverse-engineering work, and it is separate from the workflow I used day to day inside BakkesMod.",
                            "For my own discovery, the BakkesMod Function Scanner was the practical tool. I launched Rocket League with -dev, opened the console with F6, and used togglemenu devtools. From there I could whitelist terms and blacklist noise. I performed one action, watched which function names appeared, changed the filters, and repeated. It still took a while, but at least I was narrowing things down using what the game was doing rather than picking names at random.",
                        ],
                    },
                    {
                        title: "BakkesMod handled the plugin side",
                        paragraphs: [
                            "BakkesMod's injector loads its runtime into the Rocket League process, and the SDK gives plugin authors a C++ interface with wrappers like GameWrapper and CVarManager. I could compile my plugin as a DLL, put it in the plugin folder, and load it from the in-game console. That meant I could spend my time on the training feature instead of implementing a whole loader myself.",
                            "After I had a likely function, I could hook it. HookEvent runs my callback when the target function is called; HookEventPost runs after it returns. A caller-aware hook can also give me the caller wrapper and a void pointer to the parameters. The scanner helps me find a candidate. The hook is how I respond to it from my plugin. Those are two different jobs.",
                        ],
                    },
                    {
                        title: "A pointer is not documentation",
                        paragraphs: [
                            "When I was looking at one of the callbacks, I used an SDK wrapper to resolve a product ID into a readable finish label and associated it with a player ID when I had one. When I did not have the owner yet, I kept the finish in an unclaimed collection and reconciled it later. I also dumped a 128-byte window from the raw parameter pointer as offset, hex, and printable ASCII so I could compare repeated captures.",
                            "That dump was a debugging aid. A void pointer does not tell me what type the data is, how long it is, or what the fields mean. I needed to identify the correct event and compare multiple captures before trusting any inferred layout. The BakkesMod documentation also warns that the generic caller helper performs a blind cast; give it the wrong wrapper type and the game can crash. I kept the distinction between an exploratory dump and a verified structure very clear.",
                        ],
                    },
                ],
                workflow: [
                    "Recreate one specific in-game action",
                    "Watch the Function Scanner for candidate events",
                    "Hook a candidate and log the caller and parameters",
                    "Compare wrapper values and repeatable byte dumps",
                    "Check the layout again before using it in the feature",
                ],
                snippetTitle: "A small part of the diagnostic approach",
                snippetNote:
                    "Adapted from my temporary callback logger: first resolve the finish label and associate it with a player, then inspect a fixed 128-byte window as offset + hex + ASCII. This is an investigation excerpt, not a generic safe parser; the event and readable parameter length must be verified first.",
                snippet:
                    "const std::string finishName = gameWrapper->GetItemsWrapper()\n    .GetProduct(id).GetLabel().ToString();\nLOG(\"name is {}\", finishName);\n\nif (currentPlayerId == 0) {\n    if (playerIdString.empty()) {\n        unclaimedPaintFinishes.push_back(currentPaintFinish);\n    } else {\n        paintFinishMap[playerIdString] = currentPaintFinish;\n    }\n} else {\n    paintFinishMap[std::to_string(currentPlayerId)] = currentPaintFinish;\n}\n\nconstexpr std::size_t length = 128;\nconst auto* bytes = static_cast<const std::uint8_t*>(params);\nstd::stringstream dump;\nfor (std::size_t offset = 0; offset < length; offset += 16) {\n    dump << std::hex << std::setw(4) << std::setfill('0') << offset << \": \";\n    for (std::size_t j = 0; j < 16; ++j) {\n        dump << std::setw(2) << std::setfill('0')\n             << static_cast<int>(bytes[offset + j]) << ' ';\n    }\n    dump << \" | \";\n    for (std::size_t j = 0; j < 16; ++j) {\n        const auto c = static_cast<unsigned char>(bytes[offset + j]);\n        dump << (std::isprint(c) ? static_cast<char>(c) : '.');\n    }\n    dump << '\\n';\n}\nLOG(\"Hex dump of params:\\n{}\", dump.str());",
                resources: [
                    {
                        title: "BakkesMod Function Scanner",
                        note: "Filtering runtime function names and finding events as they fire.",
                        url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/function-scanner",
                    },
                    {
                        title: "Using Function Hooks",
                        note: "The SDK's HookEvent and HookEventPost callback model.",
                        url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/using-function-hooks",
                    },
                    {
                        title: "Hook Event With Any Caller",
                        note: "Caller-aware hooks, raw parameters and the documented blind-cast warning.",
                        url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/hook-event-with-any-caller",
                    },
                    {
                        title: "Rocket League Data Dumper",
                        note: "A community walkthrough of GObjects, GNames, IDA/ReClass inspection and ProcessEvent-based runtime tracing.",
                        url: "https://github.com/DRKn1ght/RocketLeague-Data-Dumper",
                    },
                    {
                        title: "RLSDK-Generator",
                        note: "A community C++20 UE3 SDK generator; the repository describes its CodeRed Generator lineage, generated headers and global initialization options.",
                        url: "https://github.com/matix2/RLSDK-Generator",
                    },
                    {
                        title: "Unreal package file format",
                        note: "Explains the package header and name, import and export tables behind serialized object references.",
                        url: "https://wiki.beyondunreal.com/Unreal_package",
                    },
                    {
                        title: "UE Explorer · Rocket League edition",
                        note: "A package browser/decompiler with Rocket League-specific UE3 token support.",
                        url: "https://github.com/lauralex/ue-explorer",
                    },
                    {
                        title: "UELib",
                        note: "A parser/deserializer for Unreal packages and UnrealScript bytecode decompilation.",
                        url: "https://github.com/EliotVU/Unreal-Library",
                    },
                    {
                        title: "BakkesMod SDK",
                        note: "Plugin lifecycle, SDK wrappers and loading compiled plugin DLLs.",
                        url: "https://github.com/bakkesmodorg/BakkesModSDK",
                    },
                    {
                        title: "BakkesMod Injector",
                        note: "The public injector project that loads bakkesmod.dll into Rocket League.",
                        url: "https://github.com/bakkesmodorg/BakkesModInjector",
                    },
                ],
            },
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
                {
                    src: "assets/screenshots/versatile-training-function-scanner.png",
                    alt: "BakkesMod function scanner showing candidate Rocket League events",
                    caption: "Function scanner during a controlled in-game action",
                },
                {
                    src: "assets/screenshots/versatile-training-ue3-object-inspection.png",
                    alt: "UE3 object, class or function metadata inspected during Rocket League reverse engineering",
                    caption: "Inspecting UE3 object and function metadata",
                },
                {
                    src: "assets/screenshots/versatile-training-parameter-dump.png",
                    alt: "Hexadecimal and ASCII parameter dump from an event callback",
                    caption:
                        "Inspecting callback parameters while validating an undocumented event",
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
                    id: "9eDVzMzTQ7c",
                    title: "VersatileTraining walkthrough",
                },
            ],
            links: [
                ["Source", "https://github.com/abdurisaq/VersatileTraining"],
                ["Download on BakkesPlugins", "https://bakkesplugins.com/plugins/view/559"],
            ],
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
            metricsLabel: "Community adoption · author-reported total",
            metrics: [
                {
                    value: "36.2K",
                    label: "views",
                },
                {
                    value: "13K+",
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
    articles: [
        {
            id: "privateconvert-local-first-conversion",
            projectId: "privateconvert",
            filename: "privateconvert-deep-dive.md",
            title: "Why the hell is file conversion still a website?",
            kicker: "PrivateConvert · local files · FastAPI",
            lede: "I hate online converters with a passion. Converting a file is basically a solved problem, but the accepted workflow for the average person is still: Google it, click whichever result won the SEO fight, upload your document, and hope you did not just hand something sensitive to a stranger. I wanted the handful of conversions I actually use to happen on my own machine.",
            sections: [
                {
                    title: "Google it, click the first result, cross your fingers",
                    paragraphs: [
                        "The conversion itself is usually dead simple. Shrink an image, compress a video, change a format, move a few PDF pages around. For some reason, when I want to do one of those things, I end up looking for a random website that wants me to upload the file first. I kept wondering why Windows and the other operating systems I use do not make these basic jobs easier to do out of the box.",
                        "And the file might not be disposable. It could be a work document, a scan of an ID, a signed form, or something I would rather not send to a service I found thirty seconds ago. I have no idea who is running that site, how long it keeps my upload, or what it does with the output. Clicking the first Google result is a pretty weak security review.",
                    ],
                },
                {
                    title: "Then the FBI warning showed up",
                    paragraphs: [
                        "In March 2025, the FBI's Denver office warned about a campaign using fake online document converters and downloader tools. The sites advertised ordinary file conversion, but the FBI said the tools could also deliver malware or steal information. Malwarebytes covered the same campaign, and Forbes wrote about the warning a few days later.",
                        "To be clear, this was a specific campaign. It does not mean every converter on the internet is malicious. It does mean the risk is not theoretical: somebody looking for a tiny utility can end up downloading something nasty along with the converted file. I already hated the upload-first workflow. That warning gave me a very concrete reason to stop using it.",
                    ],
                    callout:
                        "The FBI warning describes a specific scam campaign, not every online converter. My preference is simpler: when I can do the job locally, I do not need to upload the file at all.",
                },
                {
                    title: "I only needed the conversions I actually do",
                    paragraphs: [
                        "PrivateConvert started as a tool for my own routine jobs: convert an image, resize it, compress a video to a specific size, or do something basic to a PDF. The video size thing comes up constantly. Discord, why is the upload limit still 10 MB? Sometimes I just need to get a clip under a limit without playing twenty questions with a website.",
                        "I was not trying to rebuild Photoshop, Premiere, or Acrobat. I wanted the operations I actually reach for, with the controls I need and no giant pile of features I will never open. It is a pretty selfish feature list. That is also why it is useful to me.",
                    ],
                },
                {
                    title: "I kept repeating the same steps, so I added pipelines",
                    paragraphs: [
                        "The File Operations page lets me chain operations together, validate the pipeline, save it, and run it again. If I regularly resize something and then convert it, I do not have to rebuild those steps every time. Image, PDF, and video jobs use the same general workflow, even though the underlying processing tools differ.",
                        "Video compression uses ffmpeg, and ffprobe provides the metadata needed to inspect the input and work toward a target size. PDF page editing has its own editor because trying to cram page operations into one generic conversion button would be miserable. There is also a job queue where I can see active work, cancel or remove jobs, and manage output retention. Completed terminal jobs default to 30 days; temporary files are cleaned at startup and expired jobs are checked periodically.",
                    ],
                },
                {
                    title: "Running locally is the point, but it is not a magic security badge",
                    paragraphs: [
                        "The FastAPI backend serves the built React interface. Node is part of the frontend build, but I do not need Node just to launch the finished app. The local launcher and Docker Compose bind the service to localhost, and Docker stores the app data in a local directory. I built this as a single-user tool for my own computer, not another public upload service.",
                        "Local does not automatically mean perfectly secure. I still have to trust the code I run and the tools it invokes. What it does remove is one unnecessary third party from the middle of a file conversion. For the jobs I use, that is already a much better default.",
                    ],
                },
                {
                    title: "Anyway, I just want my files to stay on my computer",
                    paragraphs: [
                        "That is the whole motivation. I want to shrink a video, resize an image, or shuffle PDF pages around without finding a new website and deciding whether I trust it. PrivateConvert handles the boring operations I actually need. It started because I was annoyed, and I still use it for exactly that reason.",
                    ],
                },
            ],
            resources: [
                {
                    title: "FBI Denver: Online File Converter Scam (March 7, 2025)",
                    note: "The original warning describes fake converter/downloader tools, malicious downloads, and possible data theft.",
                    url: "https://www.fbi.gov/contact-us/field-offices/denver/news/fbi-denver-warns-of-online-file-converter-scam",
                },
                {
                    title: "Malwarebytes: Warning over free online file converters (March 17, 2025)",
                    note: "A security write-up of the same campaign and the ways the tools can deliver malware or steal information.",
                    url: "https://www.malwarebytes.com/blog/news/2025/03/warning-over-free-online-file-converters-that-actually-install-malware",
                },
                {
                    title: "Forbes: FBI Issues Document Converter Warning (March 18, 2025)",
                    note: "Additional coverage of the FBI warning and the case for local conversion where practical.",
                    url: "https://www.forbes.com/sites/zakdoffman/2025/03/18/fbi-warns-chrome-safari-and-edge-users-do-not-use-these-websites/",
                },
            ],
        },
        {
            id: "musicapp-own-music-player",
            projectId: "musicapp",
            filename: "musicapp-deep-dive.md",
            title: "How hard can it be? I only wanted to stop paying Spotify.",
            kicker: "MusicApp · Android · Kotlin",
            lede: "I'm a cheapskate. I looked at Spotify Premium, looked at the $14 a month, and thought: how hard can it be to make the little music app I actually need? I wanted to search for music, download it, keep it in a local library, make playlists, and play it. I was not asking for Spotify 2.",
            sections: [
                {
                    title: "My requirements were embarrassingly specific",
                    paragraphs: [
                        "I wanted to search for a track, download it, keep it in my library, put it into a playlist, and listen with the app in the background. That was pretty much the list. I did not need recommendations, podcasts, social features, or a year-end slideshow telling me what I listened to.",
                        "The maths was the motivating factor: if I used my own app for the way I listen to music, I would be $14 a month richer. Whether that makes the project financially sensible after the time I spent on it is a separate discussion. I had already decided I was doing it.",
                    ],
                },
                {
                    title: "Android Studio got in the way before Kotlin did",
                    paragraphs: [
                        "I expected learning Kotlin to be the hard part. It was an afterthought. Before I could get to the app itself, I had to deal with Android Studio, Gradle, SDK versions, dependencies, and a build system that seemed to find a new way to complain every day.",
                        "There were stretches where getting a clean build was the project. I was spending more time figuring out why the build would not behave than writing the thing I opened Android Studio to make. Once I got past that, Kotlin and the actual UI work were much less painful.",
                    ],
                },
                {
                    title: "Once it built, the app had a pretty short job description",
                    paragraphs: [
                        "Room stores the local library, playlists, and the relationship between songs and playlists. The DAO exposes the data as flows, so the Compose screens update when the library changes instead of me manually refreshing everything.",
                        "Playback uses Media3 ExoPlayer. An Android service owns the media session and exposes previous, play/pause, and next controls through the system notification, so I can leave the app and keep listening. There is also YouTube search and a direct-download flow. The search API key is supplied locally in the build configuration rather than committed to the repository.",
                    ],
                },
                {
                    title: "The subscription is still cancelled",
                    paragraphs: [
                        "I can search for music, download it, organize it, make playlists, and play it in the background. I also ended up learning Kotlin, Compose, Room, Android services, and Media3 because apparently a small music player needed to become an Android build-system endurance test first.",
                        "But the original reason is still the best one: I did not want another subscription. I get to keep the $14 a month, and I have an app that does the things I personally use. Cheapskate engineering worked out this time.",
                    ],
                },
            ],
            resources: [
                {
                    title: "MusicApp source code",
                    note: "The project repository and implementation.",
                    url: "https://github.com/abdurisaq/MusicApp",
                },
                {
                    title: "Android Media3 documentation",
                    note: "The official AndroidX media stack used for playback and media sessions.",
                    url: "https://developer.android.com/media/media3",
                },
            ],
        },
        {
            id: "versatiletraining-reverse-engineering",
            projectId: "versatiletraining",
            filename: "versatiletraining-deep-dive.md",
            title: "I wanted one Rocket League training shot. Then UE3 got involved.",
            kicker: "VersatileTraining · BakkesMod · UE3 · C++",
            lede: "I've played competitive Rocket League for years, and making training packs has always been one of the parts of the game I enjoy. The editor just stopped keeping up with the shots I wanted to practise. I wanted to take a real situation from a match, save that exact state, and turn it into one repeatable shot. I did not expect that to send me digging around inside a decade-old UE3 game.",
            sections: [
                {
                    title: "I was tired of making training packs that did not feel like my games",
                    paragraphs: [
                        "The better I got, the less useful the standard editor options became. I could make a shot from a preset position, but real games do not politely put the ball and car where the editor expects. I wanted to reproduce the situation I had just played: car position and rotation, ball position and velocity, boost, jump state, and whatever else made that shot possible.",
                        "The idea was to isolate one moment from a real game and practise it over and over. If I had just missed a difficult touch in a match, I wanted to turn that exact situation into a drill. The existing editor was not giving me enough control to do that.",
                    ],
                },
                {
                    title: "The UI was the easy part. Finding the data was not.",
                    paragraphs: [
                        "I could make configuration panels. That was familiar work. The awkward part was finding where the game stored the information I needed and figuring out which functions ran when I clicked something in the editor. I kept bouncing between the game's metadata and the live game: what objects and functions exist, and which ones actually run when I perform a particular action?",
                        "That is where a training-pack project turned into a reverse-engineering project. Before I could save a game state, I had to figure out what the game considered a game state and how to get at it without relying on a guess that happened to work once.",
                    ],
                },
                {
                    title: "BakkesMod got me through the door",
                    paragraphs: [
                        "Rocket League has a big BakkesMod plugin scene, and its SDK gave me a starting point. I could build a C++ plugin DLL and use the SDK's wrappers and game-facing helpers instead of writing my own loader and recreating all of the integration from scratch. That let me spend more time on the feature I actually wanted.",
                        "The Function Scanner became part of my routine. I would launch Rocket League with the development option, open the BakkesMod console and DevTools, filter function names with terms that looked relevant, and then perform one repeatable action in-game. If the list was full of noise, I changed the filters and tried again. It was still a lot of trial and error, but at least I had a way to narrow the search using what the game was doing.",
                    ],
                },
                {
                    title: "UE3 names, objects, and a lot of staring at metadata",
                    paragraphs: [
                        "The Rocket League modding scene has people who have spent years working out the engine internals. UE3 keeps reflected information about objects, classes, functions, and properties. GObjects points into the live object collection, while GNames is the engine's name table. Once you can connect an object to a class and a name, you can stop writing down mystery addresses and start reasoning about what you found.",
                        "RocketLeague-Data-Dumper documents parts of the GObjects/GNames and ProcessEvent side of the puzzle. RLSDK-Generator takes a different route and generates C++ headers and structure metadata from the game. Those projects were useful research material, but their docs also make the important caveat clear: offsets and layouts can move when Rocket League updates. I did not want to copy a structure from an old build and assume it was still gospel.",
                    ],
                },
                {
                    title: "Finding the function was one headache. Understanding its arguments was another.",
                    paragraphs: [
                        "Once I had a candidate, I could hook it through BakkesMod. HookEvent runs my callback when the function is called; HookEventPost runs after it returns. Some caller-aware variants also pass the caller and a pointer to the parameter data. That pointer is an address. It does not explain what the bytes mean, which is where the fun starts.",
                        "I compared repeatable actions by dumping a fixed range of bytes as hex and ASCII, then triggering the same action again to see what changed. When the SDK already had a wrapper that resolved a value, I used that rather than guessing. The generic caller helper uses a blind cast, so giving it the wrong wrapper type can crash the game. A pointer is useful, but it is not documentation.",
                    ],
                },
                {
                    title: "Two snippets from two very different levels of certainty",
                    paragraphs: [
                        "The first example uses TrainingEditorSaveDataWrapper to get the training code and name. I like this version because the intent is obvious from the code: ask the wrapper for the value and use it.",
                        "The second example defines a structure at an offset inside a callback's memory and casts the address to that structure. That can work when the layout has been verified for the build being used. The cast itself does not verify anything. Padding, alignment, field order, the event contract, and the game version all matter. One is a typed wrapper doing work for me; the other is me taking responsibility for every byte in that structure.",
                    ],
                },
                {
                    title: "Then the unlisted walkthrough got around 600 views",
                    paragraphs: [
                        "I made the plugin for myself to begin with. I asked a friend to playtest it, got carried away explaining how it worked, and recorded an unlisted walkthrough so I could send them the link. I was expecting my friend and maybe a couple of people to watch it. Then I checked the view count and it was around 600. For a video that was only shared by link, I thought that was pretty crazy.",
                        "Two creators I had watched in the Rocket League scene found the video and commented. Their channels were around 300,000 and 50,000 subscribers, and one of them privately asked about early access because they were interested in making a video. That video never ended up coming out, but even having that conversation was surreal. I was talking to people whose videos I already watched, about a tool I had originally made for my friend group.",
                        "For about a month, the download count became part of my morning routine. I would wake up, check whether anybody else had downloaded it, and be a little surprised when the number had moved again. I never expected the project to leave my group of friends, so that was a pretty fun problem to have.",
                    ],
                },
            ],
            technicalDive: true,
            resources: [
                {
                    title: "BakkesMod SDK documentation",
                    note: "The broader community documentation for plugin development, wrappers, and API usage.",
                    url: "https://bakkesplugins.com/wiki/bakkesmod-sdk",
                },
                {
                    title: "Function Scanner guide",
                    note: "How to discover functions by filtering names as they fire in-game.",
                    url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/function-scanner",
                },
                {
                    title: "Using Function Hooks",
                    note: "Explains HookEvent, HookEventPost, and caller-aware hook variants.",
                    url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/using-function-hooks",
                },
                {
                    title: "Hook Event With Any Caller",
                    note: "Documents the blind-cast caveat for generic caller wrappers.",
                    url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/hook-event-with-any-caller",
                },
                {
                    title: "RocketLeague-Data-Dumper",
                    note: "Community tutorial for understanding UE3 object/name structures and runtime inspection.",
                    url: "https://github.com/DRKn1ght/RocketLeague-Data-Dumper",
                },
                {
                    title: "RLSDK-Generator",
                    note: "Community C++20 SDK generator for Rocket League, forked from the CodeRed Generator project.",
                    url: "https://github.com/matix2/RLSDK-Generator",
                },
                {
                    title: "BakkesMod SDK source",
                    note: "The public SDK repository and wrapper interfaces.",
                    url: "https://github.com/bakkesmodorg/BakkesModSDK",
                },
            ],
            videos: [
                {
                    id: "9eDVzMzTQ7c",
                    title: "VersatileTraining walkthrough",
                },
            ],
        },
        {
            id: "organize-my-bakkesmod-garage-story",
            projectId: "organize-my-bakkesmod-garage",
            filename: "organize-my-bakkesmod-garage-deep-dive.md",
            title: "How hard can it be? Part 2: a garage plugin and 13,000 downloads",
            kicker: "OrganizeMyBakkesModGarage · Rocket League · BakkesMod",
            lede: "This one is still funny to me. It is by far the most downloaded thing I've made, at 13,000+ downloads, and the first pass really was not that complicated. I was annoyed with the built-in BakkesMod garage workflow, so I put another abstraction layer on top of it. Then I kept adding the little things I wanted until people started using it too.",
            sections: [
                {
                    title: "An abstraction layer on top of an abstraction layer",
                    paragraphs: [
                        "BakkesMod already had a way to modify the garage, but managing a growing pile of presets through it was a pain. I wanted groups, search, and a way to get to the presets I actually use without scrolling through one long list. So I built a second layer over the existing garage modification.",
                        "The first version was genuinely small. It made the built-in flow less annoying, and that was enough. Then I kept catching myself thinking 'it would be nice if it could also do this', and the plugin slowly collected all the conveniences I wanted for my own garage.",
                    ],
                },
                {
                    title: "Groups, sorting, and the shuffle button",
                    paragraphs: [
                        "You can make named groups, add presets, edit groups later, and sort by name, date, or size in either direction. Search means I do not have to remember which group I filed something under. I can also pick a main group and shuffle through its presets in Freeplay or, when enabled, in online games.",
                        "That last bit is one of the reasons I kept using it. I liked being able to cycle through the main group after games instead of manually changing my car every time. It is a small thing, but it made the garage feel less like an inventory screen I had to babysit.",
                    ],
                },
                {
                    title: "Then I wanted to steal presets from replays",
                    paragraphs: [
                        "The plugin can equip a preset from a group, swap its car body with one I already have in my garage, and copy a preset out of a replay. That replay feature is probably my favourite: somebody has a car setup I like, I save the replay, and I can pull the preset from their car instead of trying to recreate it by hand.",
                        "I kept the original GIF walkthroughs because they are a much better explanation than a paragraph of me saying 'click this, then click that'. They show adding and editing groups, sorting, swapping bodies, shuffling the main group, and copying a preset from a replay.",
                    ],
                },
                {
                    title: "Base64 ate most of the time",
                    paragraphs: [
                        "The UI was not the hard part. A lot of the car information is stored in Base64-encoded strings. I had to decode those strings, figure out what the data represented, change the parts I wanted, and encode it again without breaking everything else in the preset. That was where most of the actual work went.",
                        "From the outside it looks like groups and a few buttons. Underneath, I was trying to understand enough of the game's serialized car data to manipulate it without throwing away information I did not mean to touch.",
                    ],
                },
                {
                    title: "A few things worth knowing before installing it",
                    paragraphs: [
                        "The README has a few caveats: it works on Steam and Epic, but Linux is not supported and may crash when the plugin opens. It is also not compatible with AlphaConsole custom decals. For body swapping, you need at least one in-game preset with the body you want to use.",
                        "One other gotcha: if you change a preset after adding it to a group, the saved copy in that group does not update by itself. You need to remove it and add it again. It is a little annoying, but at least you know where to look if a preset seems out of date.",
                    ],
                },
                {
                    title: "13,000 downloads still makes me laugh",
                    paragraphs: [
                        "I have spent more time on other projects, and some of them are a lot more complicated. Somehow this little quality-of-life plugin is the one that crossed 13,000 downloads. I made it because the existing garage workflow annoyed me; I did not sit down thinking I was about to build my most-used Rocket League project.",
                    ],
                },
            ],
            media: [
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/adding.gif",
                    alt: "Adding a Rocket League preset to a named garage group",
                    caption: "Adding presets to a group",
                },
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/editing.gif",
                    alt: "Editing a preset group",
                    caption: "Editing an existing group",
                },
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/sort.png",
                    alt: "Sorting groups by name, date, and size",
                    caption: "Sorting groups by name, date, and size",
                },
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/swapWithCarBody.gif",
                    alt: "Swapping a preset to another owned car body",
                    caption: "Swapping the car body",
                },
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/shufflePresets.gif",
                    alt: "Shuffling presets from the selected main group",
                    caption: "Shuffling the main group",
                },
                {
                    src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/copyPreset.png",
                    alt: "Copying a preset from a Rocket League replay",
                    caption: "Copying a preset from a replay",
                },
            ],
            resources: [
                {
                    title: "OrganizeMyBakkesModGarage source and README",
                    note: "Original project, feature list, limitations, and walkthrough assets.",
                    url: "https://github.com/abdurisaq/OrganizeMyBakkesModGarage",
                },
                {
                    title: "BakkesPlugins listing",
                    note: "The plugin's community listing.",
                    url: "https://bakkesplugins.com/plugins/view/534",
                },
            ],
        },
        {
            id: "localtether-cross-platform-kvm",
            projectId: "localtether",
            filename: "localtether-deep-dive.md",
            title: "In this next episode of how the hell this came to be: I built a software KVM",
            kicker: "LocalTether · C++ · Windows + Linux · networking",
            lede: "My desk is too small for two monitors, so my laptop usually sits next to my desktop and handles whatever I do not want on the main screen. The catch is that every time I need to use it, I have to reach over and deal with its keyboard and crappy touchpad. I already have a perfectly good keyboard and mouse plugged into my desktop. I wanted those to control both machines.",
            sections: [
                {
                    title: "I tried to solve it by buying something. That got expensive.",
                    paragraphs: [
                        "I had heard of Mouse Without Borders and tools in that general category, but I needed something that worked between my Windows desktop and Linux laptop. The Windows options I found were not going to work for that setup, and the Linux options I came across tended to assume the other computer was Linux too. Then I looked at a physical KVM switch and saw the price. Who has $100 lying around for a desk that barely fits one monitor? Apparently not me.",
                        "So I did the sensible thing and asked how hard it could be to build one. That question has caused me a shit ton of problems across my projects. This time I ended up with LocalTether.",
                    ],
                },
                {
                    title: "Okay, but what does it mean for two computers to connect?",
                    paragraphs: [
                        "I knew I wanted the machines to find each other on my home network. I did not really understand what I was looking at when I saw addresses like 192.168.1.20, or why that was different from the WAN IP my router used on the internet-facing side. I had to get my head around private LAN addresses, the router sitting between the local network and the internet, and why I wanted the machines talking over their local addresses instead of sending input traffic out to some remote service.",
                        "The discovery code in the source looks for IPv4 interfaces using a /24 prefix, pings candidate addresses in that subnet, and then checks whether the LocalTether service is listening on port 8080. That is fine for the kind of home network I was targeting. It can miss machines that ignore ping, use a different subnet size, or sit in a more complicated layout. I had to learn what the scan was actually doing before I could trust the results.",
                    ],
                },
                {
                    title: "How do I make Windows and Linux look like the same machine?",
                    paragraphs: [
                        "The next question was how to make the rest of the app stop caring which operating system it was running on. Windows and Linux do not hand you input through the same APIs, so I ended up with a shared InputManager interface and separate WindowsInput and LinuxInput implementations. The Windows side uses Windows input hooks and simulation; the Linux side uses evdev/libevdev and a helper process for the lower-level access.",
                        "The build system also needed two sets of instructions. Linux gets a Bash script; Windows gets PowerShell. Both use CMake and vcpkg, but compiler setup, packages, SDK paths, and process handling have enough differences that I stopped trying to force them into one script. This was my first project where Windows and Linux were both actual targets, and I learned pretty quickly that 'cross-platform' applies to more than the source files.",
                    ],
                },
                {
                    title: "The trackpad was sending me finger positions, not mouse positions",
                    paragraphs: [
                        "At first I was just sending mouse data raw and hoping it would mean the same thing on the other machine. It did not. With the libevdev path, the trackpad reports where your finger is on the pad. Windows-style mouse movement expects something closer to where the cursor should end up on the screen. I was treating two completely different kinds of coordinates as if they were interchangeable.",
                        "I ended up keeping an anchor for the finger position and remembering the last simulated cursor position. From there I could calculate the finger's movement relative to the anchor and apply that delta to the cursor. If the finger jumped too far, I reset the anchor and kept the cursor still instead of teleporting it. Then I clamped the normalized output to the screen bounds. That whole chunk of math came from me making the wrong assumption about what libevdev was giving me.",
                    ],
                    code: "// Simplified from InputManager::processSimulatedMouseCoordinates\nconst float dx = payloadX - anchorDeviceX;\nconst float dy = payloadY - anchorDeviceY;\nconst float distanceSq = dx * dx + dy * dy;\n\nif (distanceSq > jumpThresholdSq) {\n    // Re-anchor after a discontinuity; keep the cursor stable.\n} else {\n    outX = lastSimulatedX + dx;\n    outY = lastSimulatedY + dy;\n}",
                },
                {
                    title: "Keyboard input turned into another rabbit hole",
                    paragraphs: [
                        "Mouse movement was only half of the problem. I also needed the other machine to know whether a key had just gone down, was still being held, or had been released. Short presses and long presses have different timing, and multiple keys can be held at once. If I press Shift and another key together on the desktop, the laptop needs to see that same combination, not some half-remembered list of keys that arrived in the wrong order.",
                        "The input payload carries key codes with pressed/released state, mouse buttons, coordinates, and scroll deltas. There is debounce handling on the Windows polling path, and the Linux helper reads events from the input subsystem. I had to think about how events get packaged, what happens when several arrive together, and how to stop a release from getting lost behind another press.",
                    ],
                },
                {
                    title: "My first queue was where I gave up for a while",
                    paragraphs: [
                        "I tried writing my own queue for the input stream. I got stuck on throughput, atomic operations, what happens when events arrive faster than the other side can consume them, and what to do when a bunch of keys are pressed at almost the same time. I wanted the queue to be reliable and fast, but my understanding of atomic queues was not good enough to trust the design I was trying to build. So I parked LocalTether for a while.",
                        "The HTTP Server From Scratch repository came out of that same period. It is not a full project, so I removed it from the project list. I am leaving the link here because it was one of the places I went while trying to figure out networking and message flow. It was part of the detour, not a separate finished product.",
                        "The current LocalTether source uses a per-session write queue instead. Messages are serialized, posted through the Asio executor, protected by a mutex, and written asynchronously one at a time. I stopped trying to invent my own lock-free queue and used the asynchronous model the networking library already gave me. That got me moving again.",
                    ],
                },
                {
                    title: "Somehow all the old class notes became relevant",
                    paragraphs: [
                        "By then I had input capture, input simulation, discovery, networking, shared files, client roles, and two build paths all needing to cooperate. I was pulling in random bits of things I had learned from previous projects and classes. It felt like a Slumdog Millionaire moment where some completely unrelated detail comes back years later and suddenly makes sense.",
                        "The app has Host, Broadcaster, and Receiver roles. The host controls which receivers can accept input, can remove or rename clients, and can manage the shared session. The file explorer uses a central server-side directory, and the source includes path-traversal checks for file operations. I had started out wanting one keyboard and mouse to work on two computers. Somehow I also ended up with a session manager and file sharing.",
                    ],
                },
                {
                    title: "One security detail: TLS is on, certificate checks are not",
                    paragraphs: [
                        "The app wraps client/server traffic in TLS and supports password-protected sessions. LAN-only use is the default described in the README, and WAN access requires deliberate port forwarding. But in the source snapshot I reviewed, the TLS client sets its verification mode to verify_none. The connection is encrypted, but the client is not validating the server certificate in the normal way. I would fix that before claiming the current build protects against an active man-in-the-middle attacker.",
                        "I am spelling that out because 'TLS is enabled' and 'the client knows who it connected to' are different things. I do not want to pretend I solved a security problem that is still sitting there.",
                    ],
                    callout:
                        "Source review note: this source snapshot disables TLS certificate verification on the client. The traffic is encrypted, but the server identity is not being checked.",
                },
                {
                    title: "At least I can stop reaching for the laptop",
                    paragraphs: [
                        "LocalTether is the software KVM I wanted: I can use my desktop keyboard and mouse on the laptop beside it, and share files through the same session. There are a lot of moving parts because Windows, Linux, trackpads, keyboards, and the network all have their own ideas about how input should work.",
                        "I started because I was lazy, my desk was cramped, and I was too cheap to buy a decent hardware switch. I ended up reusing bits from old projects and classes, learning a pile of networking and input details, and making this slightly ridiculous machine-to-machine monstrosity. It solved the problem I was complaining about, which is all I wanted from it.",
                    ],
                },
            ],
            resources: [
                {
                    title: "LocalTether source code",
                    note: "The source archive used to verify the input, networking, discovery, and build-system details described here.",
                    url: "https://github.com/abdurisaq/LocalTether",
                },
                {
                    title: "HTTP Server From Scratch",
                    note: "An earlier networking experiment referenced as part of the learning path, not as a separate portfolio project.",
                    url: "https://github.com/abdurisaq/HTTP-Server-From-Scratch",
                },
                {
                    title: "Linux input subsystem documentation",
                    note: "Background on the event devices and event codes used by the Linux input path.",
                    url: "https://docs.kernel.org/input/input.html",
                },
                {
                    title: "Standalone Asio",
                    note: "The asynchronous networking library used for the client/server sessions.",
                    url: "https://think-async.com/Asio/",
                },
            ],
            videos: [
                {
                    id: "0U6Gs4i0kbI",
                    title: "LocalTether walkthrough",
                },
            ],
        },
    ],
};
