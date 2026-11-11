/* @content
{
    "type": "blog",
    "collection": "blogPosts",
    "loadOrder": 210,
    "treeOrder": 40,
    "searchOrder": 150,
    "searchProfile": "blog"
}
*/
// blog/organize-my-bakkesmod-garage.md
registerContentData("blog", {
    id: "organize-my-bakkesmod-garage",
    type: "story",
    projectId: "organize-my-bakkesmod-garage",
    title: "Wasted Success: 13,000 Downloads for a Garage Menu",
    subtitle: "By far and away my most downloaded project started as a small annoyance.",
    category: "OrganizeMyBakkesModGarage · Rocket League · BakkesMod",
    date: "November 16, 2026",
    readTime: "5–7 min read",
    intro: "This one is hilarious and kind of infuriating. It is by far and away the most successful thing I have made, at 13,000+ downloads, and the first pass just wasn’t hard. It was another “hey, how hard can this be?” moment. I was annoyed with the built-in garage workflow, so I made another layer over it and kept adding the things I wanted.",
    sections: [
        {
            title: "BakkesMod already had a garage modification. It was still annoying.",
            paragraphs: [
                "The built-in garage modification had not been updated in years and was just kind of annoying to deal with once I had a lot of presets. I wanted groups, search, and a way to get to the presets I actually used without scrolling through one enormous list.",
                "So I built a second abstraction layer over it. Hey, how hard can it be. The first pass really was small: make the existing workflow less annoying for me. Then I kept thinking of little things I wanted it to do.",
            ],
        },
        {
            title: "Groups, sorting, and shuffling through presets",
            paragraphs: [
                "You can organize presets into groups, edit existing groups, and sort by name, date and size in either ascending or descending order. I can pick a main group and shuffle through those presets in Freeplay or toggle shuffling in online games. I wanted to get through a match and cycle to another preset without opening the garage and doing the whole thing manually.",
            ],
        },
        {
            title: "Taking presets out of other people’s replays",
            paragraphs: [
                "The plugin can equip a preset from a group, swap its car body to one of my existing in-game presets, and copy a preset from a replay. That last one is probably my favourite: I see a car setup in somebody else’s replay, save the replay, and take the preset out of it.",
                "The original GIFs are from the README. They show adding and editing groups, sorting, swapping car bodies, shuffling the main group, and copying a preset from a replay. They explain the clicks much faster than I can.",
            ],
        },
        {
            title: "Most of the work was decoding and encoding Base64",
            paragraphs: [
                "Most of the work was decoding and encoding Base64 strings holding the car information that could be found in the game. I had to figure out what the strings represented, change the data I wanted to change, and encode it again without breaking the rest of the preset. The UI was the easy part.",
            ],
        },
        {
            title: "The README has a few caveats",
            paragraphs: [
                "The plugin works with both Epic and Steam. It does not currently work with Linux and will probably crash when opened there. It is not compatible with AlphaConsole custom decals. If you want to swap car bodies, you need at least one in-game preset with that body. Also, updating a BakkesMod preset does not automatically update the copy saved in a group; you need to remove it and add it again.",
            ],
        },
        {
            title: "The plugin got 13,000 downloads. The website did not.",
            paragraphs: [
                "I also built a website version of this, which was a miss. By the time it went up, the first wave of plugin users had already come and gone, and the plugin was self-sufficient anyway — you could do everything from inside the game. The website solved a problem that did not exist. So the plugin has 13,000 downloads and the website has roughly none, which I think is the funniest possible outcome for a project I started because a menu annoyed me.",
                "Somehow this little quality-of-life plugin is the one that crossed 13,000 downloads. I have spent more time on other projects that were much more complicated. This one is hilarious and kind of infuriating.",
            ],
        },
    ],
    media: [
        {
            src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/adding.gif",
            alt: "Adding a preset to a garage group",
            caption: "Adding a preset to a group",
        },
        {
            src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/editing.gif",
            alt: "Editing an existing garage group",
            caption: "Editing groups",
        },
        {
            src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/sort.png",
            alt: "Preset group sorting options",
            caption: "Sorting groups by name, date and size",
        },
        {
            src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/swapWithCarBody.gif",
            alt: "Swapping a preset to an existing car body",
            caption: "Swapping a car body",
        },
        {
            src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/shufflePresets.gif",
            alt: "Shuffling the main group presets",
            caption: "Shuffling the main group",
        },
        {
            src: "https://raw.githubusercontent.com/abdurisaq/OrganizeMyBakkesModGarage/master/assets/copyPreset.png",
            alt: "Copying a preset from a replay",
            caption: "Copying a preset from a replay",
        },
    ],
    resources: [
        {
            title: "OrganizeMyBakkesModGarage source and README",
            note: "Original feature list, demonstrations and compatibility notes.",
            url: "https://github.com/abdurisaq/OrganizeMyBakkesModGarage",
        },
    ],
});
