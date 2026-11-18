addPage({
    type: "project",
    collection: "communityProjects",
    path: "projects/organize-my-bakkesmod-garage.md",
    treeOrder: 50,
    searchOrder: 220,
});

// projects/organize-my-bakkesmod-garage.md: community project
DATA.communityProjects.push({
    id: "organize-my-bakkesmod-garage",
    name: "OrganizeMyBakkesModGarage",
    repo: "https://github.com/abdurisaq/OrganizeMyBakkesModGarage",
    summary:
        "A BakkesMod plugin that makes a crowded Rocket League garage manageable: group " +
        "presets, sort loadouts and switch between setups in-game. A small quality-of-life " +
        "fix that found an audience well beyond my own setup.",
    stack: ["C++", "BakkesMod SDK", "Dear ImGui", "Windows APIs"],
    about:
        "OrganizeMyBakkesModGarage began as a tiny irritation: once a garage fills up, " +
        "finding the preset you actually want becomes its own task. I built the " +
        "organization tools directly into the game, so grouping, sorting and managing " +
        "loadouts did not require a separate website or workflow. It is one of my less " +
        "complicated projects—and, with around 13,000 downloads, easily one of the most " +
        "widely used.",
    sections: [
        {
            title: "Give presets a structure",
            paragraphs: [
                "Create named groups, add presets from the garage, remove entries later and edit a " +
                    "group's name or contents. The UI includes group and preset search fields, so the " +
                    "list stays manageable as the collection grows.",
                "Groups can be sorted by name, modification date or number of presets, in either " +
                    "ascending or descending order. A selected group can also be marked as the main " +
                    "group for the in-game shuffle features.",
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
                "The plugin is built around BakkesMod game events and an ImGui interface. It tracks " +
                    "replay and loadout events to collect preset information, then exposes group " +
                    "editing and selection through its own window. The project is Windows-focused and " +
                    "its README notes that Linux is not supported.",
            ],
        },
    ],
    screenshots: [
        {
            src: "assets/projects/organize-my-bakkesmod-garage/organize-groups.gif",
            alt: "OrganizeMyBakkesModGarage groups and preset management screen",
            caption: "Preset groups and editing",
        },
        {
            src: "assets/projects/organize-my-bakkesmod-garage/swap-car-bodies.gif",
            alt: "OrganizeMyBakkesModGarage preset swapping",
            caption: "Main group car swapping",
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
        {
            value: "36.2K",
            label: "views",
        },
        {
            value: "13K",
            label: "downloads",
        },
    ],
    videos: [],
    links: [["Source", "https://github.com/abdurisaq/OrganizeMyBakkesModGarage"],
            ["Download on BakkesPlugins", "https://bakkesplugins.com/plugin/534"],
    ],
});
