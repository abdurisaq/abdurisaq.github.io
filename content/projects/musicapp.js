addPage({
    type: "project",
    path: "projects/musicapp.md",
    treeOrder: 60,
    searchOrder: 230,
});

// projects/musicapp.md
DATA.projects.push({
    id: "musicapp",
    name: "MusicApp",
    repo: "https://github.com/abdurisaq/MusicApp",
    summary:
        "An Android music player built around a simple listening workflow: search for " +
        "music, download tracks, organize a local library and playlists, and keep " +
        "playback running in the background.",
    image: "assets/projects/musicapp/music-logo.png",
    imageAlt: "MusicApp logo",
    imageVariant: "logo",
    stack: ["Kotlin", "Jetpack Compose", "Room", "Android Media3"],
    about:
        "I looked at Spotify Premium, looked at the monthly subscription, and decided " +
        "I'd rather build the little music player I actually needed. I wasn't trying " +
        "to build Spotify 2. I wanted to search for music, download it, keep everything " +
        "in a local library, make playlists and listen without having to keep the app " +
        "open. That was pretty much the entire idea behind MusicApp. It also gave me " +
        "an excuse to learn Android development and figure out how all the pieces " +
        "needed to make that workflow possible fit together.",
    sections: [
        {
            title: "The listening workflow",
            paragraphs: [
                "MusicApp brings together the parts of listening I wanted in one place. " +
                    "It includes YouTube search and a direct-download flow, allowing me to " +
                    "find music and add it to my local collection. YouTube search requires " +
                    "a user-provided API key, which is configured through local.properties " +
                    "rather than committed to the repository.",
                "Downloaded music is organized into a local library with support for " +
                    "creating and managing playlists. Room handles the underlying data, " +
                    "storing song records, playlists and the relationships between them. " +
                    "DAO interfaces expose song and playlist queries as flows, allowing " +
                    "the UI to observe library changes without handling raw SQL directly.",
            ],
        },
        {
            title: "Playback beyond the app",
            paragraphs: [
                "I wanted playback to continue after leaving the app or turning off " +
                    "the screen. MusicApp uses Media3 ExoPlayer for audio playback, with " +
                    "an Android foreground service managing the media session.",
                "The service publishes a system media notification with previous, " +
                    "play/pause and next controls. This keeps playback controls available " +
                    "outside the application, alongside Bluetooth controls. The player " +
                    "also supports background playback and shuffle.",
            ],
        },
        {
            title: "Putting the pieces together",
            paragraphs: [
                "The interface is built with Jetpack Compose, while Room handles local " +
                    "persistence and Media3 handles playback. Android's service and " +
                    "media-session APIs tie the playback experience into the rest of " +
                    "the operating system.",
                "The interesting part was getting these pieces to work together as " +
                    "one listening workflow. Searching for music, organizing a library " +
                    "and playing it are fairly separate concerns, but the application " +
                    "needed to make moving between them feel straightforward.",
            ],
        },
        {
            title: "Fighting the demon that is Android Studio",
            paragraphs: [
                "I expected Kotlin to be the hard part. It wasn't. Before I could get " +
                    "very far with the application itself, I had to deal with Android " +
                    "Studio, Gradle, SDK versions, dependencies and build configuration.",
                "There were stretches where getting a clean build felt like the project " +
                    "itself. A dependency or version change could send me back through " +
                    "Gradle files and SDK settings, trying to work out which part of the " +
                    "toolchain was unhappy this time. I was spending more time getting " +
                    "the development environment to cooperate than actually writing " +
                    "the application.",
                "Once I got past that, Kotlin and the actual UI work were much less " +
                    "painful. The project gave me a practical introduction to Android " +
                    "development, along with considerably more Gradle experience than " +
                    "I originally intended to get.",
                "The subscription is still cancelled. Worth it. Probably.",
            ],
        },
    ],
    highlights: [
        "YouTube search and a direct-download workflow for building a local music collection.",
        "Room database for song records, playlists and playlist membership.",
        "Jetpack Compose interface for browsing songs and managing playlists.",
        "Media3 ExoPlayer managed through an Android service and media session.",
        "Background playback with system notification and Bluetooth controls.",
        "Shuffle and playback controls without keeping the application on screen.",
    ],
    links: [
        ["Source", "https://github.com/abdurisaq/MusicApp"],
    ],
});
