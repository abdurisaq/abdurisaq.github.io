// projects/localtether.md
DATA.projects.push({
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
});
