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

    /* icon = devicon slug (https://devicon.dev). If an icon doesn't exist the label still shows. */
    skills: {
        Languages: [
            ["C++", "cplusplus"],
            ["Python", "python"],
            ["TypeScript", "typescript"],
            ["JavaScript", "javascript"],
            ["CMake", "cmake"],
        ],
        Web: [
            ["React", "react"],
            ["Next.js", "nextjs"],
            ["Tailwind", "tailwindcss"],
            ["Vite", "vitejs"],
            ["FastAPI", "fastapi"],
        ],
        "Data & Infra": [
            ["PostgreSQL", "postgresql"],
            ["Prisma", "prisma"],
            ["Docker", "docker"],
            ["Vercel", "vercel"],
            ["Supabase", "supabase"],
        ],
        Tools: [
            ["Git", "git"],
            ["GitHub", "github"],
            ["Linux", "linux"],
            ["Neovim", "neovim"],
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
            about: "LocalTether lets one machine host a session and others join as a Broadcaster or Receiver. The host can stream keyboard and mouse input to receivers for remote control or presentations, share files through a synchronized explorer, and manage everyone connected. Everything runs over SSL/TLS, and the build scripts set up all dependencies on Windows and Linux.",
            highlights: [
                "Encrypted client-server networking with ASIO and OpenSSL; the server can generate its own certificates.",
                "Three roles (Host, Broadcaster, Receiver) with optional password-protected sessions.",
                "LAN server discovery, plus optional WAN access when you forward a port.",
                "Real-time keyboard and mouse input streaming, toggled per receiver by the host.",
                "Shared file storage with a synced file explorer and path-traversal protection.",
                "Host controls: kick, rename, toggle input, remote shutdown.",
                "ImGui dashboard with console, file explorer and controls panels; one-command build scripts for Windows and Linux.",
            ],
            videos: [{ title: "LocalTether demo", id: "0U6Gs4i0kbI" }], // CHECK: confirm this video is LocalTether
            links: [["Source", "https://github.com/abdurisaq/LocalTether"]],
        },

        {
            id: "versatiletraining",
            name: "VersatileTraining",
            repo: "https://github.com/abdurisaq/VersatileTraining",
            summary:
                "BakkesMod plugin for Rocket League with custom training packs, game-state snapshots, goal blockers and input recording.",
            stack: ["C++", "BakkesMod SDK", "Dear ImGui", "vcpkg", "Visual Studio"],
            about: "My largest project: a plugin that gives Rocket League players precise control over training. You can build custom packs with exact car and ball positions, velocities and boost, capture snapshots from replays, and override existing packs. It connects to a companion website so players can upload and download packs.",
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
            about: "The community side of VersatileTraining. Users sign in, upload packs from the plugin, and others browse, rate, comment and download them. A one-click button can load a pack from the site directly into a running game through the plugin.",
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
            about: "A single-user app that runs entirely on your machine, so files are never uploaded anywhere. A FastAPI backend serves the built React frontend, and you can run it with a Python launcher or Docker.",
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
};
