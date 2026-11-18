addPage({
    type: "project",
    path: "projects/versatiletraining.md",
    treeOrder: 20,
    searchOrder: 190,
});

// projects/versatiletraining.md
DATA.projects.push({
    id: "versatiletraining",
    name: "VersatileTraining",
    repo: "https://github.com/abdurisaq/VersatileTraining",
    summary:
        "A Rocket League training plugin that lets me build drills around live game " +
        "state—not just replay a fixed shot. I worked with car and ball physics, boost, " +
        "goal detection and input recording to make training packs behave like configurable " +
        "scenarios.",
    stack: ["C++", "BakkesMod SDK", "Dear ImGui", "vcpkg", "Visual Studio"],
    about:
        "VersatileTraining is where I got closest to the game itself. I wanted training " +
        "packs to respond to the situation on the field, so I built a BakkesMod plugin " +
        "around live car and ball state, boost, goal blockers and recorded inputs. The " +
        "interesting part was not adding another menu; it was making the game state usable " +
        "enough that a drill could be configured, replayed and inspected instead of simply " +
        "repeated.",
    sections: [
        {
            title: "Build the situation you want to practise",
            paragraphs: [
                "Custom packs let you set the starting position and rotation of the car and ball, " +
                    "their velocities, boost amount and initial jump state. The Snapshot Gallery is the " +
                    "other way into this workflow: save a state from a live session or replay, then " +
                    "load it again as a repeatable shot.",
                "That makes the plugin useful both for creating a scenario from scratch and for " +
                    "turning an interesting moment from a match or replay into a drill.",
            ],
        },
        {
            title: "Shape the challenge",
            bullets: [
                "Add goal blockers with custom size and position to practise hitting specific targets.",
                "Override and adjust existing training packs, including packs created by other people.",
                "Use variance settings to introduce controlled changes to shot parameters, such as " +
                    "ball speed or the starting position.",
            ],
        },
        {
            title: "Make attempts repeatable",
            paragraphs: [
                "The experimental recording feature captures controller input during an attempt and " +
                    "can spawn a bot to replay the recorded movement. It is an experiment rather than a " +
                    "finished headline feature, but it explores a useful question: how can a player " +
                    "compare a new attempt against a known reference run?",
            ],
        },
        {
            title: "Connect the plugin to the Hub",
            paragraphs: [
                "VersatileTraining is paired with the Versatile Training Hub. The plugin can upload " +
                    "packs created in-game, and players can download community packs from the website. " +
                    "The Hub handles discovery and pack management; the plugin brings those packs back " +
                    "into Rocket League.",
            ],
        },
    ],
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
            src: "assets/projects/versatiletraining/versatile-training-pack-editor.png",
            alt: "VersatileTraining custom training pack editor",
            caption: "Custom pack editor",
        },
        {
            src: "assets/projects/versatiletraining/versatile-training-snapshot-gallery.png",
            alt: "VersatileTraining snapshot gallery",
            caption: "Snapshot gallery and saved game states",
        },
        {
            src: "assets/projects/versatiletraining/versatile-training-goal-blockers.png",
            alt: "VersatileTraining goal blocker configuration",
            caption: "Goal blocker configuration",
        },
        {
            src: "assets/projects/versatiletraining/versatile-training-settings.png",
            alt: "VersatileTraining settings page",
            caption: "Settings page",
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
            title: "VersatileTraining walkthrough",
            id: "9eDVzMzTQ7c",
        },
    ],
    links: [
        ["Source", "https://github.com/abdurisaq/VersatileTraining"],
        ["Download on BakkesPlugins", "https://bakkesplugins.com/plugin/559"],
    ],
    storyPostId: "versatiletraining-story",
    technicalPostId: "versatiletraining-ue3-notes",
});
