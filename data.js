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
            metricsLabel: "Community adoption · figures provided",
            metrics: [
                { value: "36.2K", label: "views" },
                { value: "13K", label: "downloads" },
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
            id: "http-server-from-scratch",
            name: "HTTP Server From Scratch",
            repo: "https://github.com/abdurisaq/HTTP-Server-From-Scratch",
            summary:
                "A C++ socket-based HTTP server implementing request handling, file endpoints and gzip response compression.",
            stack: ["C++23", "TCP/IP", "Sockets", "CMake", "zlib"],
            about: "This is a from-scratch networking exercise: instead of relying on an HTTP framework, the server opens a TCP socket, accepts a connection and builds the HTTP response itself. I used it to get closer to the mechanics underneath a request—parsing the request line, reading headers, selecting a route and writing a response back over the socket.",
            sections: [
                {
                    title: "Start below the HTTP abstraction",
                    paragraphs: [
                        "The server creates a listening TCP socket on port 4221, binds it, listens for incoming connections and accepts clients in a loop. Each accepted connection is handed to a detached worker thread that reads the request and handles the response.",
                    ],
                },
                {
                    title: "Route and build responses manually",
                    bullets: [
                        "The echo route returns text from the request target.",
                        "The User-Agent route reads the corresponding request header and returns it as plain text.",
                        "The /files endpoint supports GET to read a file and POST to create or write one in the configured directory.",
                        "Unknown paths return a basic 404 response.",
                    ],
                },
                {
                    title: "Add content negotiation",
                    paragraphs: [
                        "The server checks the Accept-Encoding header. When the client advertises gzip, it compresses the response body with zlib and adds a Content-Encoding header. This makes the project a useful exercise in how HTTP headers affect the bytes sent over an otherwise ordinary TCP connection.",
                    ],
                },
                {
                    title: "Explore platform-specific networking",
                    paragraphs: [
                        "The repository also contains Windows and Linux client/server variants, discovery experiments and CMake targets for the different builds. The main POSIX server is intentionally small; this is a learning implementation, not a claim of full HTTP/1.1 compliance or production hardening.",
                    ],
                },
            ],
            screenshots: [
                {
                    src: "assets/screenshots/http-server-terminal.png",
                    alt: "HTTP server terminal showing a request and response",
                    caption: "Server output and raw HTTP requests",
                },
                {
                    src: "assets/screenshots/http-server-client-test.png",
                    alt: "HTTP server client test showing returned endpoint data",
                    caption: "Client request and endpoint response",
                },
            ],
            highlights: [
                "Raw TCP socket lifecycle: socket, bind, listen and accept.",
                "Per-connection worker threads for request handling.",
                "Hand-built response handling for echo, User-Agent and file GET/POST routes.",
                "Gzip response compression negotiated through Accept-Encoding and implemented with zlib.",
                "CMake targets for Linux and Windows variants in the wider repository.",
            ],
            links: [["Source", "https://github.com/abdurisaq/HTTP-Server-From-Scratch"]],
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
};
