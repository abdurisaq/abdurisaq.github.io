addPage({
    type: "project",
    collection: "smallerProjects",
    path: "projects/smaller-projects/musicapp.md",
    treeOrder: 110,
    searchOrder: 230,
    folderSearch: {
        detail: "Independent projects and coursework",
        route: "#/projects",
        kind: "DIR",
        searchOrder: 225,
        profile: "project-folder",
    },
});

// projects/smaller-projects/musicapp.md
DATA.smallerProjects.push({
    id: "musicapp",
    name: "MusicApp",
    repo: "https://github.com/abdurisaq/MusicApp",
    summary:
        "An Android music player built around the whole listening loop: download media, " +
        "keep it in a local library, organize playlists and keep playback going in the " +
        "background with Bluetooth controls.",
    stack: ["Kotlin", "Android", "Media Playback"],
    about:
        "MusicApp was an exercise in making the everyday path feel complete. Finding or " +
        "downloading a track is only the start; the app also needs to keep a local library " +
        "organized, manage playlists and continue playing after the screen goes off. I " +
        "built it with Kotlin and Compose, then worked through Android's playback and " +
        "download services to make those pieces behave together.",
    sections: [
        {
            title: "Keep a local music library",
            paragraphs: [
                "Room stores song records, playlists and the relationship between them. DAO " +
                    "interfaces expose playlist and song queries as flows, so the UI can observe " +
                    "library changes without having to manage raw SQL in the screens.",
            ],
        },
        {
            title: "Download and organize media",
            paragraphs: [
                "The app includes YouTube search and a direct-download flow. Search requires a " +
                    "user-provided YouTube API key, which is kept in local.properties for the build " +
                    "rather than checked into the repository. Downloaded items can then be organized " +
                    "into playlists.",
            ],
        },
        {
            title: "Keep playback running",
            paragraphs: [
                "Playback is built around Media3 ExoPlayer. An Android service owns the media " +
                    "session and publishes a system notification with previous, play/pause and next " +
                    "actions, allowing playback controls to remain available outside the app. The " +
                    "player also supports background playback and shuffle.",
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
});
