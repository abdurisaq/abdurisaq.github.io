// blog/versatiletraining-story.md
DATA.blogPosts.push({
    id: "versatiletraining-story",
    type: "story",
    projectId: "versatiletraining",
    title: "The Epitome of Type 2 Fun: Staring at Data Dumps for One Training Shot",
    subtitle:
        "A training pack started as a personal annoyance and somehow reached people I watched on YouTube.",
    category: "VersatileTraining · Rocket League · BakkesMod",
    date: "November 16, 2026",
    readTime: "6–8 min read",
    intro: "It still astonishes me that a game can be out for a decade, add a feature in year two, and leave that feature barely updated for almost half of my lifetime. I play competitive Rocket League, and I have always liked making training packs. The standard cookie-cutter options in the archaic editor stopped being useful for the shots I wanted to practise.",
    videos: [
        {
            title: "VersatileTraining walkthrough",
            id: "9eDVzMzTQ7c",
        },
    ],
    sections: [
        {
            title: "The editor had not kept up with the game I was playing",
            paragraphs: [
                "The better I got and the higher the skill ceiling went, the less useful the standard editor became. Every scenario I could make felt almost completely inapplicable to the game as it was being played now. I wanted to port a genuine situation from the match I had just played, turn it into an isolated shot, and practise it over and over.",
                "I wanted to control the car and ball state closely enough that the setup actually felt like the match: positions, rotations, velocities, boost, jump state and the rest of the situation. The tool was made for me and me alone to begin with.",
            ],
        },
        {
            title: "The UI was familiar. Getting the game state was the hard part.",
            paragraphs: [
                "Building the editor panels was not what held me up. I needed to figure out where the game kept the values I wanted and which functions ran when I performed a particular action. That is where I started staring at data dumps and using the BakkesMod tools to narrow down what was happening.",
                "I spent a lot of time repeating the same action, filtering function names, inspecting callbacks, and checking whether a value actually changed when I thought it should. I have put the UE3 and BakkesMod details in a separate technical write-up so this post can stay about the project and how it grew.",
            ],
        },
        {
            title: "I asked a friend to playtest it, then made an unlisted video",
            paragraphs: [
                "The project only started getting attention when I asked a friend to playtest it. I was excited about what it could do, so I made an unlisted video to walk them through it. I sent the link around to the people I expected to care about it. Then I checked the view count and it was around 600. (I guess to a lot of people that is trivial, but to me that was kind of crazy that 600 people were sent the link and watched it.)",
            ],
        },
        {
            title: "Two creators I watched found the video",
            paragraphs: [
                "Two creators from the Rocket League scene found the video and commented. One had a channel around 300,000 subscribers and the other around 50,000. One of them privately contacted me about early access because they were interested in making a video on it. That video never ended up being published, but even having that conversation was surreal. I was talking to people whose channels I had watched about a tool I had originally made for my friend group.",
            ],
        },
        {
            title: "I started checking the download count every morning",
            paragraphs: [
                "For about a month, watching the download counts became a morning ritual. I would wake up, check whether anybody else had downloaded it, and see the number move again. I never expected this project to get outside my friend group. It was kinda cool for the month it rapidly grew.",
            ],
        },
    ],
    relatedId: "versatiletraining-ue3-notes",
    relatedLabel: "Okay, so how did I figure out what Rocket League was doing?",
    projectLink: "versatiletraining",
});
