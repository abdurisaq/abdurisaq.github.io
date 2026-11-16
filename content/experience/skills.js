addPage({
    path: "experience/skills.md",
    route: "#/skills",
    kind: "PAGE",
    detail: "Languages, frameworks and tools",
    treeOrder: 20,
    searchOrder: 50,
    searchPaths: ["skills"],
    searchObjectKeys: true,
});

// experience/skills.md: grouped technical skills.
DATA.skills = {
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
};
