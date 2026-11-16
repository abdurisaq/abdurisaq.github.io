addPage({
    path: "community.md",
    route: "#/community",
    kind: "PAGE",
    detail: "Mihon open-source contributions",
    treeOrder: 80,
    searchOrder: 70,
    searchProfile: "community",
});

// community.md: open-source contribution details.
DATA.community = {
    mihon: {
        name: "Mihon",
        repo: "https://github.com/abdurisaq/mihon-fork",
        summary:
            "An ongoing personal fork of the Mihon Android manga reader, focused on tablet and " +
            "hardware-keyboard workflows.",
        stack: ["Kotlin", "Android", "Jetpack Compose"],
        contributions: [
            {
                title: "Fix SliderItem off-by-one error",
                status: "Merged upstream",
                detail:
                    "Corrected the slider step calculation so the configured number of intervals " +
                    "matches the selectable range.",
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
                detail:
                    "Prototyped adjustable step scrolling for the up/down arrow keys in long-strip " +
                    "reading mode, making it easier to control panel movement from a tablet keyboard. I " +
                    "kept this implementation in my fork after a separate upstream solution addressed " +
                    "the broader request before my version could be merged.",
                branchUrl:
                    "https://github.com/abdurisaq/mihon-fork/tree/webpage-like-navigation-with-keyboard",
                issueUrl: "https://github.com/mihonapp/mihon/issues/1232",
            },
            {
                title: "Configurable keybinding system",
                status: "Fork work",
                detail:
                    "Experimented with a configurable keybinding system. The upstream proposal was not " +
                    "accepted because the implementation went beyond the scope of the original change; " +
                    "the work remains part of the fork's ongoing exploration.",
            },
        ],
    },
};
