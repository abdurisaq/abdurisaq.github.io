// projects/versatiletraininghub.md
DATA.projects.push({
    id: "versatiletraininghub",
    name: "Versatile Training Hub",
    repo: "https://github.com/abdurisaq/VersatileTrainingHub",
    summary:
        "A full-stack home for Rocket League training packs: publish a pack, browse what other players have made, inspect the details and load it straight into the game. It connects the editor-side work to a place the wider community can actually use.",
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
    about: "The Training Hub grew out of a simple limitation: making a useful training pack is only half the job if it stays on the machine where it was created. I built the web side so players could publish packs, discover other people's work, inspect ratings and details, then bring a pack back into Rocket League. It turns a local tool into a workflow that can be shared.",
    sections: [
        {
            title: "A library for community training packs",
            paragraphs: [
                "The Hub gives each pack a detail page with its creator, difficulty, in-game code, shot count, tags and visibility. Players can browse and download pack data as JSON, while ratings, comments with replies and favorites add a layer of feedback around shared packs.",
            ],
        },
        {
            title: "Turn compressed pack data into something readable",
            paragraphs: [
                "Training pack metadata is stored in a compressed form. The site decodes that metadata and presents useful per-shot information—such as boost, starting linear and angular velocity, freeze and jump state, and goal-blocker settings—instead of leaving it as an opaque blob.",
            ],
        },
        {
            title: "Bridge the browser and the running game",
            paragraphs: [
                "When the BakkesMod plugin is installed and running, the Hub can request the local pack list, upload packs from the game, update an existing submission, and load a selected pack directly into Rocket League. The plugin is required for those in-game actions; browsing and downloading packs can be done from the site itself.",
            ],
        },
        {
            title: "Keep the web application modular",
            bullets: [
                "Next.js App Router renders the site and its pages.",
                "tRPC handles typed application queries and mutations.",
                "Prisma provides the data layer over PostgreSQL, with Supabase used for the live deployment.",
                "NextAuth.js handles accounts so creators can manage their own submissions.",
            ],
        },
    ],
    screenshots: [
        {
            src: "assets/screenshots/versatile-hub-browse.png",
            alt: "Versatile Training Hub community pack browser",
            caption: "Browsing community packs",
        },
        {
            src: "assets/screenshots/versatile-hub-pack-details.png",
            alt: "Versatile Training Hub pack detail and shot metadata",
            caption: "Pack details and decoded shot data",
        },
        {
            src: "assets/screenshots/versatile-hub-upload.png",
            alt: "Versatile Training Hub upload workflow",
            caption: "Uploading a pack from the companion plugin",
        },
    ],
    highlights: [
        "Next.js App Router and tRPC API with a Prisma/PostgreSQL data layer (Supabase in production).",
        "Decodes compressed pack metadata to display per-shot boost, velocity, freeze, jump and goal-blocker data.",
        "Upload, update and load-in-game flows that talk to the local plugin.",
        "Accounts via NextAuth, with ratings, threaded comments and favorites.",
        "Downloadable pack JSON and an in-app guide; deployed on Vercel.",
    ],
    videos: [
        {
            title: "Hub + plugin demo",
            id: "9eDVzMzTQ7c",
        },
    ],
    links: [
        ["Live site", "https://versatile-training-hub.vercel.app/"],
        ["Source", "https://github.com/abdurisaq/VersatileTrainingHub"],
    ],
    storyPostId: null,
    technicalPostId: null,
});
