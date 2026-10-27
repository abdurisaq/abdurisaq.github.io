// Site profile, setup, experience and skill content.
const DATA = {};
Object.assign(DATA, {
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
});
