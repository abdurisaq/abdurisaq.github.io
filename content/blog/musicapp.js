addPage({
    type: "blog",
    path: "blog/musicapp.md",
    treeOrder: 20,
    searchOrder: 120,
});

// blog/musicapp.md
DATA.blogPosts.push({
    id: "musicapp",
    type: "story",
    projectId: "musicapp",
    title: "Fighting the Demon That Is Android Studio",
    subtitle: "I only wanted a music player that did the handful of things I actually use.",
    category: "MusicApp · Android · Kotlin",
    date: "November 16, 2026",
    readTime: "5–7 min read",
    intro:
        "I’m a cheapskate. I looked at Spotify Premium, looked at the $14 a month, and " +
        "thought: how hard can it be to make the little music app I actually need? I wanted " +
        "to search for music, download it, keep it in a local library, make playlists, and " +
        "play it. I was not asking for Spotify 2.",
    sections: [
        {
            title: "My requirements were embarrassingly specific",
            paragraphs: [
                "I wanted to search for a track, download it, keep it in my library, put it into a " +
                    "playlist, and listen with the app in the background. That was pretty much the " +
                    "list. I did not need recommendations, podcasts, social features, or a year-end " +
                    "slideshow telling me what I listened to.",
                "I know there are existing players. I still wanted to build this one because I had " +
                    "a very particular idea of the workflow I wanted, and I wanted to learn Android " +
                    "development along the way.",
            ],
        },
        {
            title: "Android Studio got in the way before Kotlin did",
            paragraphs: [
                "I expected learning Kotlin to be the hard part. It was an afterthought. Before I " +
                    "could get to the app itself, I had to deal with Android Studio, Gradle, SDK " +
                    "versions, dependencies, and a build system that seemed to find a new way to " +
                    "complain every day.",
                "There were stretches where getting a clean build was the project. A dependency or " +
                    "version change could send me back through Gradle files and SDK settings, trying to " +
                    "work out which part Android Studio was unhappy with this time. I was spending more " +
                    "time getting the build to behave than writing the app. Once I got past that, " +
                    "Kotlin and the actual UI work were much less painful.",
            ],
        },
        {
            title: "I wanted the music to keep playing after I left the app",
            paragraphs: [
                "I used Room for the local library and playlists, and Jetpack Compose for the " +
                    "screens. The bit I cared about most was playback: I put Media3 ExoPlayer behind an " +
                    "Android foreground service and a media session so Android could keep the music " +
                    "playing when the app was no longer on screen.",
                "The notification gets previous, play/pause, and next controls, and the README also " +
                    "lists Bluetooth controls. I wanted to be able to put the phone away and keep " +
                    "listening without having to keep the app open. There is YouTube search and a " +
                    "direct download flow too. The search API key goes in local.properties because " +
                    "YouTube search calls are rate-limited; it is not committed to the repository.",
            ],
        },
        {
            title: "The subscription is still cancelled",
            paragraphs: [
                "The app covers the things I wanted: search, download, playlists, background " +
                    "playback, shuffle and Bluetooth controls. I use my own tool for those limited " +
                    "needs, and I am happy with it. I also learned Kotlin, Compose, Room, Android " +
                    "services, Media3, and far more Gradle than I planned.",
                "The subscription is still cancelled. Worth it. Probably.",
            ],
        },
    ],
    resources: [
        {
            title: "MusicApp source code and README",
            note: "Features, YouTube API key setup and command-line build instructions.",
            url: "https://github.com/abdurisaq/MusicApp",
        },
        {
            title: "Android Media3 documentation",
            note: "The Android playback and media-session APIs used by the app.",
            url: "https://developer.android.com/media/media3",
        },
    ],
});
