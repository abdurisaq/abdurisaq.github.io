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
        resume: "assets/resume.pdf", // drop your PDF here
    },
    dotfiles: { user: "abdurisaq", repo: ".dotfiles" },

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
            videos: [],
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
                intro: "The hardest part of VersatileTraining was not drawing the editor. It was finding the game events and data needed to make the editor affect Rocket League reliably. Rocket League is a UE3 game with a long-running modding community. I approached the undocumented parts as a reverse-engineering problem: use the engine's metadata and package files to learn what exists, observe the running game to learn what actually happens, then use BakkesMod's SDK to turn a confirmed event into plugin code.",
                sections: [
                    {
                        title: "Why Unreal Engine 3 is inspectable",
                        paragraphs: [
                            "UE3 is built around reflected objects, classes, properties and functions. At runtime, UObject instances are associated with class and name metadata; structures commonly discussed in Rocket League research include GObjects, the global collection of UObject pointers, and GNames, the engine's name table. By locating and validating those structures, researchers can enumerate live objects and reconstruct readable paths such as a class-qualified function name. That is much more useful than staring at anonymous addresses: it gives you names and relationships to search for.",
                            "This metadata is also why the engine's scripting layer matters. UnrealScript declares classes, properties and functions that appear in the reflected object model, while native C++ functions provide engine or game behavior behind many of those calls. The reflection system gives tools a way to describe and address those functions and objects at runtime. The important caveat is that addresses, offsets and layouts are build-specific; an offset found for one Rocket League version is not a permanent engine constant.",
                        ],
                    },
                    {
                        title: "Use package files to understand what the game contains",
                        paragraphs: [
                            "Runtime inspection is only half of the picture. Unreal package files (for example, .upk and .u packages) are structured containers, not arbitrary blobs: a header points to name, import and export tables, followed by serialized data. The name table stores indexed names; import and export entries describe references to external and in-package objects, including class, outer and serialized-data relationships. Tools such as UELib parse and deserialize Unreal package structures, including UObject, UClass, UFunction and UProperty data, and can reconstruct UnrealScript source from bytecode. UE Explorer's Rocket League-focused edition adds support for game-specific UE3 tokens and reversed native functions, which matters because shipped games can modify or extend the engine format.",
                            "Static package inspection helps answer questions such as which classes or function names exist and what script-side relationships are visible. It cannot, by itself, tell me which function fires during a particular shot setup or what an undocumented callback's live parameter memory contains. For that I needed to observe the running game. A useful way to think about the two approaches is: package analysis gives me a map of possible code paths; runtime tracing helps identify the path taken by the action I am testing.",
                        ],
                    },
                    {
                        title: "Trace behavior in the running game",
                        paragraphs: [
                            "There are several levels of runtime investigation. A community Rocket League data-dumper walkthrough describes inspecting GObjects and GNames, and discusses ProcessEvent as a high-traffic observation point for reflected UObject function calls. Watching that dispatch path can help correlate a controlled in-game action with the functions being invoked. That is a lower-level reverse-engineering technique; it is useful context, but it is not the same thing as the BakkesMod workflow I used for this project.",
                            "For my day-to-day discovery, I used BakkesMod's Function Scanner. I launch Rocket League with the -dev option, open the BakkesMod console with F6, and use togglemenu devtools to bring up the scanner. The DevTools scanner can filter function names with include and exclude terms. Matching functions appear as they fire. I would perform one action in-game, watch which names appeared at that moment, narrow the filters, and repeat until I had a likely event and understood when it ran. It turns trial and error into a controlled experiment instead of guessing function names. ",
                        ],
                    },
                    {
                        title: "Where BakkesMod fits",
                        paragraphs: [
                            "BakkesMod is the bridge between Rocket League and third-party plugin code. Its injector loads the BakkesMod runtime DLL into the RocketLeague process. The BakkesMod SDK then exposes a C++ plugin interface, including GameWrapper and CVarManager wrappers; a plugin is built as a DLL, placed in BakkesMod's plugins directory and loaded from the in-game console with plugin load. That means my plugin can use the supported wrapper layer for common game objects and events instead of rebuilding the loader and every game-facing interface itself.",
                            "Once the scanner identifies a candidate, the SDK lets me register a named hook. HookEvent runs my callback when the target function is called; HookEventPost runs after it returns. For example, a path such as Function TAGame.Car_TA.SetVehicleInput identifies a reflected game function. The caller-aware hook variants also provide the caller wrapper and a void* parameter pointer, which is where inspecting an undocumented argument block becomes possible. The division of work is important: the scanner helps me discover a function, and the SDK hook lets my plugin react to it. The scanner does not magically provide a correct C++ struct for every callback.",
                        ],
                    },
                    {
                        title: "Inspect the payload, but do not mistake bytes for a schema",
                        paragraphs: [
                            "In one investigation, I used an SDK wrapper to resolve a product ID to a readable finish label, then associated the finish with a player ID when I had one. If the owner was not known yet, I kept it in an unclaimed collection to reconcile later. In the same callback, I treated params as a byte pointer and printed a 128-byte window as 16-byte rows: an offset, hexadecimal values and the printable ASCII view. Comparing captures from repeatable actions helped me spot which bytes changed with the state I was investigating.",
                            "That dump was a diagnostic aid, not a decoded structure. A void* has no schema attached to it. I still had to identify the correct event, understand the expected parameter layout and validate any inferred fields across multiple captures before using them in plugin logic. The SDK's generic HookEventWithAnyCaller helper also documents that it performs a blind cast with no type checks; using an incorrect wrapper type can crash the game. Once I have confirmed what a callback represents, I prefer a correctly typed wrapper or a verified parameter structure over leaving exploratory byte-reading in the finished feature.",
                        ],
                    },
                ],
                workflow: [
                    "Reproduce one specific in-game action",
                    "Filter the live function scanner to find candidate events",
                    "Hook the candidate and log its name and caller",
                    "Compare readable wrapper values and parameter dumps",
                    "Validate the structure across repeated tests, then implement the feature",
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
                { value: "10.6K", label: "views" },
                { value: "3.1K", label: "downloads" },
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
            videos: [{ title: "Plugin demo", id: "9eDVzMzTQ7c" }],
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
            videos: [{ title: "Hub + plugin demo", id: "9eDVzMzTQ7c" }],
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
            videos: [], // add { title, id } here when you record a demo
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
                { value: "36.2K", label: "views" },
                { value: "13K+", label: "downloads" },
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
            title: "I got tired of trusting random file-converter websites",
            kicker: "local-first software · privacy · FastAPI",
            lede: "I hate online converters with a passion. The task is usually tiny: shrink an image, compress a video, combine a few pages, or change a file into a format someone asked for. Yet the normal advice is to search the web, click whichever result has the best SEO, upload the file, and hope the website is behaving itself.",
            sections: [
                {
                    title: "A solved problem with a ridiculous trust requirement",
                    paragraphs: [
                        "What bothers me is the mismatch. The conversion itself is not mysterious, but the user is asked to hand a document to a service they may have found thirty seconds ago. That file might be a harmless meme, or it might contain a passport scan, a signed form, a work document, or information that should never have left the machine in the first place.",
                        "I am not claiming every online converter is malicious. The point is that uploading a file creates a trust boundary, and most people are not in a position to evaluate the operator, retention policy, download flow, or the file they get back. For a one-off utility, the amount of trust being requested feels wildly out of proportion to the job.",
                    ],
                },
                {
                    title: "Then the warnings stopped sounding hypothetical",
                    paragraphs: [
                        "In March 2025, the FBI Denver Field Office warned about scams using free document-converter and downloader tools. The warning describes tools that can appear to perform the advertised conversion while also delivering malware or collecting sensitive information. Malwarebytes expanded on the same campaign, describing lures that included downloaded utilities, browser extensions, and even converted files carrying malicious code. Forbes covered the warning a few days later.",
                        "That reporting did not create my dislike of online converters; it put a concrete example behind it. The risk is not limited to whether a website stores the uploaded original. The download step can be part of the attack too. A converter can give someone the result they expected and still leave them with something they absolutely did not ask for.",
                    ],
                    callout:
                        "The FBI warning is about a specific converter-scam campaign, not proof that every online converter is malicious. My design choice is simpler: when the operation can run on my own machine, I would rather keep the file there.",
                },
                {
                    title: "I did not need another giant editing suite",
                    paragraphs: [
                        "I made PrivateConvert for my own use case. I repeatedly needed a small set of file operations: convert an image, adjust it, work with a PDF, or compress a video to a specific size so it would fit an upload limit. Discord's file-size limit was one of those recurring annoyances — why am I still manually fighting a 10 MB ceiling?",
                        "I was not trying to recreate Photoshop, Premiere, or Acrobat. I wanted a practical toolbox for the operations I actually reach for, with enough flexibility to chain steps together instead of visiting a different website for every tiny task.",
                    ],
                },
                {
                    title: "Pipelines made the repeated work less repetitive",
                    paragraphs: [
                        "The File Operations page lets me assemble operations into a pipeline, validate it, save it, and run it again later. Image, PDF, and video tasks share the same broad workflow even though the underlying tools differ. Video processing uses ffmpeg, with ffprobe for metadata inspection and size-target compression; PDF page editing has its own editor rather than being squeezed into a generic button.",
                        "I also wanted conversions to behave like jobs rather than a spinner that disappears. The queue gives me a place to see what is active, cancel work, remove completed output, and configure retention. In the current project setup, terminal jobs default to a 30-day retention period, temporary files are cleaned at startup, and expired jobs are checked periodically.",
                    ],
                },
                {
                    title: "Local-first is a boundary, not a magic security word",
                    paragraphs: [
                        "The finished FastAPI backend serves the built React interface, so Node is needed for the frontend build but not for the normal runtime. The local launcher and Docker Compose both bind the app to localhost, and Docker stores its application data in a local directory. That is deliberate: this is a single-user desktop-style utility, not a file-conversion service I intend to expose to the internet.",
                        "I still do not want to oversell the word private. Local processing reduces the need to upload originals to a third party, but users should still run software they trust, keep their machine secure, and understand what tools the application invokes. The goal is control over my own conversion workflow, not a claim that local software is automatically flawless.",
                    ],
                },
                {
                    title: "The point was to stop making a tiny task someone else's problem",
                    paragraphs: [
                        "PrivateConvert is intentionally opinionated. It covers the conversions and operations I personally use, keeps the work on the machine, and gives those operations a reusable interface. It is less about building the world's most complete converter and more about refusing to make a random website the default place my files go.",
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
            title: "I wanted my own music player. Then Android Studio got involved.",
            kicker: "Android · Kotlin · learning by building",
            lede: "The motivation was not especially profound: I'm a cheapskate. I caught myself thinking, 'How hard could it be to make the music app I actually want?' The answer, it turns out, included a surprising amount of arguing with Android Studio and the build system before I got to the fun part.",
            sections: [
                {
                    title: "The scope was deliberately selfish",
                    paragraphs: [
                        "I was not setting out to replace every music service or build a social platform. I wanted a small tool that could find and keep the music I use, play it reliably, make playlists, and cover my very limited list of needs. The personal scoreboard was simple: I joked that every month I could avoid paying for Spotify Premium was another $14 in my pocket.",
                        "That constraint was useful. I could make decisions based on the workflow I actually cared about instead of inventing features just because a commercial streaming app has them.",
                    ],
                },
                {
                    title: "The build system was the first boss fight",
                    paragraphs: [
                        "I expected learning Kotlin to be the main learning curve. Instead, getting Android Studio and the project build to behave consistently was a hurdle on its own. Kotlin almost became the afterthought after all the time spent getting the project to build and run the way I expected.",
                        "That experience changed how I think about Android projects. The app code is only one part of the product; the IDE, Gradle configuration, SDK versions, and platform lifecycle are all part of the thing you are building.",
                    ],
                },
                {
                    title: "Once the plumbing worked, the app had three jobs",
                    paragraphs: [
                        "First, it needed a local library. Room stores the song records, playlists, and membership between them. The UI can observe database changes through flows, which keeps the screens from having to become a pile of manual refresh calls.",
                        "Second, it needed a player that survives the screen. Media3 ExoPlayer handles playback, while an Android service owns the media session and exposes previous, play/pause, and next actions through the system notification. That gives Android and connected devices a way to control playback without keeping the app in the foreground.",
                        "Third, it needed a way to get music into the library. The app includes YouTube search and a direct-download flow, with the search API key supplied by the user rather than hard-coded into the project. After that, playlists organize the downloads; background playback and shuffle cover the parts I actually use day to day.",
                    ],
                },
                {
                    title: "What I got out of it",
                    paragraphs: [
                        "The useful result was not just that I had a music player. I had to learn how the Android app lifecycle, persistent local data, playback services, and system media controls fit together. That was much more educational than making another screen that only works while it is open.",
                        "And yes, the cheapskate motivation still counts. The app exists because I wanted a modest tool for myself, and I got a better understanding of Android development along the way.",
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
            title: "I wanted Rocket League training to feel like Rocket League",
            kicker: "Rocket League · BakkesMod · UE3 · C++",
            lede: "Rocket League had been out for years, and a training feature introduced early in its life could still feel frozen in time. I was making training packs long before VersatileTraining existed, but as I got better and the skill ceiling kept rising, the editor's standard options stopped describing the situations I actually wanted to practise. I wanted to build a shot that felt like a real match, save it, and repeat it until I could do it consistently.",
            sections: [
                {
                    title: "It started with a very specific kind of frustration",
                    paragraphs: [
                        "I'm a competitive Rocket League player, and making training packs has always been one of the parts of the game I enjoy. The problem was that the built-in editor's options felt increasingly disconnected from the game I was actually playing. I could make the usual setups, but the more precise situations I wanted to isolate were difficult or impossible to express with the stock controls.",
                        "The idea behind VersatileTraining was to make the training setup as customizable as I needed it to be: take the state of a real play, turn it into an isolated shot, and then practise that exact situation over and over. Car and ball positions, rotations, velocities, boost, jump state, and blockers all mattered because the starting state is the exercise.",
                    ],
                },
                {
                    title: "The interface was the visible part; the game state was the hard part",
                    paragraphs: [
                        "A custom editor is straightforward to imagine. The harder question was how to get the right information out of Rocket League and know when the game had reached the moment I wanted to capture. This is where the project turned into an investigation of the game rather than just a UI project.",
                        "I needed two kinds of evidence. Static inspection helps answer what classes, properties, and functions exist. Runtime observation helps answer which one actually fires when I perform a particular action. I spent a lot of time narrowing those two worlds together instead of choosing a function name because it sounded plausible.",
                    ],
                },
                {
                    title: "The BakkesMod ecosystem gave me a practical entry point",
                    paragraphs: [
                        "Rocket League has a long-running modding community built around BakkesMod. The SDK exposes a C++ plugin interface and wrappers for common game-facing objects, while the plugin workflow turns a compiled DLL into something you can load inside the game. That meant I could focus on the feature I wanted instead of building the whole integration layer myself.",
                        "The BakkesMod Function Scanner became one of my most useful discovery tools. The documented workflow is to launch Rocket League with the development option enabled, open the BakkesMod console, and bring up DevTools. You can whitelist relevant words and blacklist noise; matching function names appear as the game calls them. I would perform one controlled action, watch what appeared, adjust the filters, and repeat. It made the investigation feel like an experiment instead of guesswork.",
                    ],
                },
                {
                    title: "UE3 metadata: turning addresses into names and relationships",
                    paragraphs: [
                        "The lower-level Rocket League research community gave me a way to understand what the engine was doing underneath the wrappers. Unreal Engine 3 uses reflected objects, classes, functions, and properties. Two names that show up repeatedly in community research are GObjects and GNames: one is associated with the live object collection, and the other with the engine's name table. Once an object can be connected to its class and name metadata, it becomes much easier to reason about what an address represents.",
                        "The RocketLeague-Data-Dumper project is a useful educational walkthrough of that process. It describes inspecting UE3 object and name structures and explains how runtime dispatch through ProcessEvent can help observe reflected function calls. It also explicitly warns that the offsets in its examples are tied to the game build at the time of writing. That warning matters: a remembered offset is not a permanent property of Rocket League.",
                        "RLSDK-Generator approaches the same ecosystem from the SDK-generation side. The repository describes a C++20 generator based on the CodeRed Generator lineage, with generated headers, configuration for global initialization, and member-registration macros used to calculate structure layout. These projects are community research tools, not an official promise that every layout will remain stable after an update.",
                    ],
                },
                {
                    title: "Finding a function and understanding its parameters are two different jobs",
                    paragraphs: [
                        "Once I had a candidate function name, BakkesMod hooks let my plugin react to it. HookEvent runs the callback as a function is called; HookEventPost runs after it returns. Caller-aware variants can also provide a wrapper for the calling object and a void pointer to the parameter block.",
                        "That void pointer is where it becomes easy to fool yourself. A cast can make bytes look like a C++ struct, but it does not prove that the struct is correct. The BakkesMod documentation is unusually direct about this: the generic caller helper performs a blind cast without type checks, and the wrong wrapper type can crash the game. I treated raw parameter dumps as clues, not as a finished schema.",
                    ],
                },
                {
                    title: "Two examples of the abstraction trade-off",
                    paragraphs: [
                        "When a named SDK wrapper exists, I much prefer it. It says what I am asking for and leaves the layout details inside the wrapper. There are situations where an event gives me a raw block and I need a known layout, but that is a different level of confidence: I need the event contract, alignment, offsets, and field order to be checked against the exact build before I rely on it.",
                        "The two C++ examples below show that contrast. The first asks the wrapper for values by name. The second describes a structure sitting after a padding region. The second is not inherently better because it looks more powerful; it is simply lower-level, and the burden of validation moves onto me.",
                    ],
                },
                {
                    title: "Then it escaped the friend group",
                    paragraphs: [
                        "The plugin was initially made for me. I asked a friend to playtest it, and because I was excited about what it could do, I made an unlisted walkthrough video and sent the link around. I did not expect much from an unlisted video shared directly with people I knew.",
                        "Then I noticed it had around 600 views. That number might be ordinary to someone with an audience, but seeing hundreds of people find and watch something I had made for myself was surreal. Two Rocket League creators whose content I already watched also found it: one with a channel around 300,000 subscribers and another around 50,000. They commented, and one reached out privately about early access for a potential video. That video never ended up being published, but even having that conversation was a strange, very cool moment.",
                        "For a passion project I thought would stay inside my friend group, the month where the community started picking it up was memorable. I got into the habit of checking download counts in the morning. It was a small reminder that a tool made to solve one person's very specific problem can turn out to be useful to other people too.",
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
        },
        {
            id: "organize-my-bakkesmod-garage-story",
            projectId: "organize-my-bakkesmod-garage",
            filename: "organize-my-bakkesmod-garage-deep-dive.md",
            title: "The project with 13,000 downloads that started as a tiny annoyance",
            kicker: "Rocket League · BakkesMod · C++",
            lede: "This one is funny because it is by far the most successful thing I've made, and it started with the same question as half my other projects: 'How hard can this be?' The first pass really was not that hard. The annoying part was turning a basic garage modification into something I actually wanted to use every day.",
            sections: [
                {
                    title: "An abstraction layer on top of an abstraction layer",
                    paragraphs: [
                        "BakkesMod already made it possible to modify the Rocket League garage, but the built-in workflow felt awkward once I had a lot of presets. I did not want to keep navigating one long collection and manually doing the same little management tasks. So I made another layer over the garage modification: something that treated presets as a library I could organize, search, and rotate through.",
                        "The first version was mostly about making the built-in functionality less annoying. Then I kept finding small things I wanted to do that were not exposed as a comfortable workflow, and the plugin grew from there.",
                    ],
                },
                {
                    title: "Groups made the garage feel like a library",
                    paragraphs: [
                        "I could create named groups, add presets, edit the groups later, and sort them by name, date, or size in either direction. Search meant I did not have to remember exactly where a preset lived. The small convenience of having a structure became much more useful once the collection started to grow.",
                        "A group could also become the main group. From there, the plugin could shuffle through its presets in Freeplay or, when enabled, in online matches. Instead of treating the garage as a static list, I could let the game cycle through a collection I had already curated.",
                    ],
                },
                {
                    title: "The features that made it more than organization",
                    paragraphs: [
                        "You can equip a preset from a group, swap its car body with one you already have saved in-game, and copy a preset out of a replay. That last one is especially satisfying: someone else's replay can become a source for a preset you want to keep in your own garage.",
                        "The README walkthroughs show the flow better than a wall of screenshots, so I kept the original short demonstrations below: creating and editing groups, sorting, swapping a body, shuffling the main group, and copying from a replay.",
                    ],
                },
                {
                    title: "The less glamorous part: understanding the car data",
                    paragraphs: [
                        "Most of the real work was not the group UI. It was figuring out the car information the game stores in Base64-encoded strings, decoding it into something I could inspect, changing the pieces I wanted to change, and encoding it back without corrupting the preset. The plugin is effectively taking opaque serialized game data and giving it a workflow that makes sense to a player.",
                        "That kind of work is easy to underestimate from the outside. The interface can look like a simple list with buttons, but every action depends on understanding what data represents a car body, its cosmetics, and the rest of the loadout well enough to preserve the parts that should not change.",
                    ],
                },
                {
                    title: "A useful tool still has boundaries",
                    paragraphs: [
                        "The current README says the plugin works with Steam and Epic, but is not supported on Linux and may crash there. It also notes an incompatibility with AlphaConsole custom decals. For car-body swapping, the target body needs to exist in one of the player's in-game presets. And if a preset is edited after it has been added to a group, the stored group copy does not automatically refresh; it has to be removed and added again.",
                        "Those are not footnotes I want to hide. They are part of the real story of a utility plugin: what it makes easier, and what still depends on the game or the underlying modding environment.",
                    ],
                },
                {
                    title: "The numbers still make me laugh",
                    paragraphs: [
                        "At the time I wrote this, I was reporting more than 13,000 downloads. It is oddly satisfying that this relatively straightforward quality-of-life plugin ended up reaching more people than projects that took much longer to build. It is a good reminder that a small fix for a common annoyance can be more useful than a technically ambitious project nobody asked for.",
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
            title: "I wanted my laptop to stop feeling like a second-class computer",
            kicker: "C++ · networking · Windows + Linux · input systems",
            lede: "My desk is too small for two proper monitors, so I usually keep my laptop beside my desktop and use it as a second machine. The problem was that every time I needed to interact with the laptop, I had to reach for its worse keyboard and touchpad. I had a perfectly good keyboard and mouse on my desktop and wanted them to work across both machines.",
            sections: [
                {
                    title: "A software KVM sounded cheaper than a hardware KVM",
                    paragraphs: [
                        "I had heard of software tools that share a mouse and keyboard between computers, but I specifically needed Windows and Linux to work together. The solutions I found tended to assume both machines used the same operating system, or they did not fit the way I wanted to work. I also did not feel like spending around $100 on a physical KVM switch for a desk that was already too small.",
                        "So I asked the usual question: how hard could this be? It became a project that pulled together pieces of networking, input handling, operating-system APIs, and build-system knowledge I had picked up in other projects and classes.",
                    ],
                },
                {
                    title: "First I had to understand what 'connect two computers' actually means",
                    paragraphs: [
                        "A computer on my home network has a local address, often something like 192.168.1.x. That is an address used inside the local network; it is not the same thing as the public-facing address my router uses on the wider internet. The router sits between those two worlds. A private LAN address lets LocalTether find and talk to machines on the same network without turning every local connection into an internet service.",
                        "I wanted LAN to be the normal path. The app can scan a local subnet, find candidate addresses, and then check which ones actually have a LocalTether server listening on its port. The scripts in this source snapshot look for IPv4 interfaces with a /24 prefix, ping addresses in that subnet, and then the app probes port 8080. That is useful for a simple home network, but it is not universal discovery: devices that do not answer ping, networks with a different subnet size, or more complicated routing can be missed.",
                    ],
                },
                {
                    title: "The operating systems do not hand you the same mouse",
                    paragraphs: [
                        "The next problem was input. I wanted one interface in the app, but Windows and Linux expose input through very different APIs. The project uses a common InputManager interface and chooses a WindowsInput or LinuxInput implementation at compile time. That gave the rest of the app one set of operations to ask for — start, stop, poll events, and simulate input — while each platform handled its own details.",
                        "The Linux side uses evdev/libevdev and a helper process for low-level input access. The Windows side uses Windows hooks and input simulation. That division was the first real lesson in cross-platform development: the abstraction is not that the operating systems behave identically; it is that I have to decide which differences the common interface can hide and which differences need to remain explicit.",
                    ],
                },
                {
                    title: "Trackpads forced me to rethink what a coordinate means",
                    paragraphs: [
                        "I initially treated mouse data as if every device told me where the cursor was. That assumption broke on the Linux laptop. With the trackpad path, libevdev can report absolute positions for the finger on the device surface, not the cursor's current position on the display. Those are two different coordinate systems. Sending the raw numbers to another machine does not magically make them equivalent.",
                        "I had to track an anchor position on the touch surface, remember the last simulated cursor position, convert small finger movements into cursor deltas, and treat large jumps as a reset rather than a giant cursor teleport. The actual code has a threshold comparison and clamps the final normalized coordinates to the screen bounds. The important part was not the arithmetic itself; it was finally recognizing which physical thing each number described.",
                    ],
                    code: "// Simplified from InputManager::processSimulatedMouseCoordinates\nconst float dx = payloadX - anchorDeviceX;\nconst float dy = payloadY - anchorDeviceY;\nconst float distanceSq = dx * dx + dy * dy;\n\nif (distanceSq > jumpThresholdSq) {\n    // Re-anchor after a discontinuity; keep the cursor stable.\n} else {\n    outX = lastSimulatedX + dx;\n    outY = lastSimulatedY + dy;\n}",
                },
                {
                    title: "Keyboard events had to arrive as events, not vague intentions",
                    paragraphs: [
                        "The same kind of mismatch showed up with keyboards. I needed to distinguish key-down from key-up, avoid treating a long press as a stream of unrelated new presses, and preserve combinations when multiple keys were held together. The input payload therefore carries a list of key events, each with a key code and a pressed/released flag, alongside mouse state, coordinates, and scroll deltas.",
                        "Windows has both hook-driven and polling paths, with a small debounce window in the polling code. The Linux helper reads key events through the input subsystem. When a machine sends multiple key changes, the payload can carry those changes together rather than flattening everything into one current-key value. That is what makes modifier combinations and simultaneous input representable at the protocol level.",
                    ],
                },
                {
                    title: "My first queue idea was becoming its own research project",
                    paragraphs: [
                        "At first I tried to solve the streaming problem with my own queue. I got too deep into throughput, ordering, atomic operations, and what happens when events arrive faster than the other side can consume them. I did not have enough confidence in the queue design to make it reliable, so I put that version aside for a while. The earlier HTTP Server From Scratch repository is the side trail from that period; it is no longer presented as a standalone portfolio project, but it is part of how I arrived here.",
                        "The LocalTether source uses a much more straightforward per-session write queue: serialized messages are posted onto the Asio executor, protected by a mutex, and written asynchronously one at a time. The queue is not a custom lock-free structure. That was a useful change in mindset — use the concurrency model the networking library already gives me, and make message ordering explicit instead of trying to win an optimization contest I did not need.",
                    ],
                },
                {
                    title: "The cross-platform build was a project inside the project",
                    paragraphs: [
                        "The code was not the only thing that needed an operating-system branch. The build process did too. The repository has a Bash build script for Linux and a PowerShell build script for Windows, because package installation, compiler setup, SDK paths, and dependency bootstrapping are not identical. Both paths use CMake and vcpkg, but the scripts have to speak the language of their host environment.",
                        "That was my first project where Windows and Linux were both real targets instead of one being an afterthought. It taught me that 'cross-platform' is not a compiler flag. It is a commitment that reaches into input capture, permissions, dependencies, process management, build scripts, and the assumptions you make about the machine.",
                    ],
                },
                {
                    title: "A security note I do not want to gloss over",
                    paragraphs: [
                        "The project wraps its client/server traffic in TLS and supports password-protected sessions. The README describes LAN-only access as the default, with an optional WAN mode that requires deliberate router port forwarding. However, in the supplied source snapshot the client sets its TLS verification mode to verify_none. That means the connection is encrypted, but the client does not authenticate the server certificate in the usual way. I would address that before describing this version as fully hardened against an active man-in-the-middle attacker.",
                        "I am including this because a networking project should be honest about its trust model. 'TLS is enabled' and 'the peer is authenticated' are not interchangeable statements.",
                    ],
                    callout:
                        "Source review note: TLS is enabled, but this snapshot disables certificate verification on the client. Treat that as a known limitation, not as a security guarantee.",
                },
                {
                    title: "The result is a little monster, but it solves my desk problem",
                    paragraphs: [
                        "LocalTether is not the smallest project I have made, and the first version was definitely not the cleanest route from idea to working software. But it now does the thing I wanted: my desktop can be the machine whose keyboard and mouse I use, while the laptop beside it stays useful without becoming a second set of peripherals I have to reach for.",
                        "The project is a mix of lessons from previous attempts, operating-system quirks, network basics, and a few moments where I had to stop trying to be clever and choose a simpler design. That is why I like it as a portfolio project: the feature is easy to explain, but the path to making it behave across two operating systems was anything but one button.",
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
        },
    ],
};
