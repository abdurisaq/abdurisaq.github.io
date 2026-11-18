addPage({
    path: "about.md",
    route: "#/about",
    kind: "PAGE",
    detail: "About me",
    treeOrder: 20,
    searchOrder: 20,
    searchPaths: ["about"],
});

DATA.about = {
    introductionHtml:
        `I'm a fifth-year Bachelor of Science in Computer Science student at ` +
        `<strong>Simon Fraser University</strong>, currently looking for my first software ` +
        `engineering internship. I'm particularly interested in systems programming, networking, ` +
        `and developer tooling, although I'm also open to full-stack opportunities. I enjoy building ` +
        `practical software, understanding the systems underneath it, and following problems far ` +
        `enough down the rabbit hole to make something useful out of them.`,
    facts: [
        ["Education", "BSc Computer Science, Simon Fraser University"],
        ["Year", "Fifth year"],
        ["Interests", "Systems programming, networking, developer tooling, full-stack"],
        ["Looking for", "First software engineering internship"],
        ["Editors / IDEs", "Neovim, VS Code, Android Studio"],
    ],
    greeting: "Oh wow, you actually clicked!",
    profileIntroduction: "Well, now that I have you here, let me introduce you to the story of me!",
    sections: [
        {
            title: "How the hell I even ended up here",
            blocks: [
                {
                    type: "html",
                    html: `
                        <p>Before I ever really got into programming, I spent an unreasonable amount of time in my
                        high school's trades room.</p>
                        <p>We had classes for woodworking, robotics, and electrical engineering, and they were
                        easily my favourite classes throughout high school. I never really found a reason to
                        skip them. There was something incredibly satisfying about being able to take an idea,
                        work with your hands, and eventually end up with something that actually existed because
                        of your effort.</p>
                        <p>Electrical engineering was probably my favourite. I was absolutely terrified of
                        soldering irons when I first started, and with good reason. I've managed to burn myself
                        more times than I'd like to admit. Despite that, I kept coming back.</p>
                        <p>I actually took the electrical engineering courses a whole year ahead of schedule. By
                        the time I'd finished the last available course, I enjoyed it so much that I ended up
                        taking it again in Grade 12, purely because I wanted another year in that room.</p>
                        <p>Looking back, those are probably some of the fondest memories I'll have of high school.
                        They were also where I first started developing the interest in building things that
                        eventually led me to programming.</p>
                        <p>My first experience with programming came through Arduino projects, and I eventually
                        combined my interest in electronics and programming into what was probably my proudest
                        achievement back then: an all-in-one digital D&amp;D dice set.</p>
                        <p>I designed the circuit board, manually etched the PCB, soldered all the components, and
                        programmed the microcontroller myself. The code is a complete abomination of hellish
                        proportions, but considering I literally knew nothing, I don't think I did too badly.</p>
                        <p>I actually recorded myself presenting the project. Feel free to watch, although I will
                        absolutely not be clicking these myself. Listening to my younger self present with
                        braces and a lisp is an experience I would rather avoid.</p>
                    `,
                },
                {
                    type: "videos",
                    videos: [
                        {
                            id: "Wm55BWKkH3o",
                            title: "D&D dice project presentation — Part 1",
                        },
                        {
                            id: "rHRNwKZCfRo",
                            title: "D&D dice project presentation — Part 2",
                        },
                    ],
                },
                {
                    type: "html",
                    html: `
                        <p>When I eventually started branching out into what I considered “real” programming
                        languages, moving from Arduino to C and eventually C++ felt like a natural progression.
                        C++ has remained my language of choice ever since.</p>
                    `,
                },
            ],
        },
        {
            title: "What drives me to build",
            blocks: [
                {
                    type: "html",
                    html: `
                        <p>Nothing is a bigger motivator to me than spite and pettiness.</p>
                        <p>Whenever I run into a problem in my life, and I know I'm capable of solving it, at least
                        to my own standards, I have a hard time resisting the urge to give it a shot. What
                        starts as a token effort has a habit of turning into a rabbit hole I never intended to
                        fall into.</p>
                        <p>As a result, a lot of what I've built and learned revolves around tooling, systems, and
                        networking. I tend to gravitate towards problems where I can make something useful for
                        myself, understand how it works, and hopefully make it a little less annoying for
                        everyone else.</p>
                        <p>I also really like C and C++ because they let me get closer to what's actually happening
                        underneath. I like being able to understand what a program is doing without having to
                        rely on layers upon layers of abstractions. There's something satisfying about being
                        able to follow the chain of events yourself, understand the underlying mechanisms, and
                        know why something behaves the way it does instead of accepting that it just works like
                        that.</p>
                        <p>One frustration I've had throughout university is encountering languages and ecosystems
                        where the underlying implementation feels deliberately hidden away. You're often given
                        an abstraction, told how to use it, and expected to accept the behavior without ever
                        really exploring why it works.</p>
                        <p>Web development is where I feel this most strongly. Sometimes it feels like being a
                        second-class citizen in my own work, with layer upon layer of tooling standing between
                        me and the mechanisms I'm actually trying to understand. Even something as mundane as
                        managing dependencies through npm can introduce an ecosystem of its own, with
                        conventions and quirks that seem to multiply endlessly.</p>
                        <p>I don't dislike abstraction itself. I just want to understand the layers I'm relying on,
                        rather than being forced to treat them as magic.</p>
                        <p>Something else that probably makes this pretty obvious is the fact that I use
                        <strong>Neovim</strong>.</p>
                        <p>I originally got into it through
                        <a href="https://www.youtube.com/@ThePrimeagen" target="_blank" rel="noopener noreferrer">
                        ThePrimeagen</a>. His story and enthusiasm for Vim made me curious enough to give it a
                        proper shot. I learned the editor through his passionate talks about it, and eventually
                        learned how to configure my own environment through his videos. Somewhere along the way,
                        it stuck.</p>
                        <p>Since then, Neovim has become one of those tools I always enjoy reaching for. A big part
                        of the appeal is that it feels like a game in itself. You're not just installing an
                        editor and accepting whatever environment someone else decided you should have. You're
                        building your own, tweaking keybindings, configuring plugins, changing the appearance,
                        and gradually shaping something that feels personal.</p>
                        <p>I enjoy that process almost as much as using the editor itself. There are certainly more
                        conventional editors that are perfectly capable of getting the job done, and there's
                        nothing wrong with that. I just like having the freedom to make my tools feel like mine.
                        </p>
                        <p>That philosophy is also a big part of why this portfolio looks the way it does. I wanted
                        to build something that reflected the environment I enjoy working in, rather than
                        reaching for an off-the-shelf portfolio template. It's written in plain HTML, CSS, and
                        JavaScript, without React or another framework. Not because those tools are inherently
                        bad, but because I wanted to build this myself, understand the pieces, and have control
                        over how they fit together.</p>
                    `,
                },
            ],
        },
        {
            title: "People whose work I admire",
            blocks: [
                {
                    type: "html",
                    html: `
                        <p>A couple of people whose work has had a significant influence on how I think about
                        programming are <strong>Jonathan Blow</strong> and <strong>Casey Muratori</strong>.</p>
                        <p>I particularly enjoy their talks about programming, software development, and the
                        importance of understanding the systems we're building. A couple of my favourites:</p>
                    `,
                },
                {
                    type: "videos",
                    videos: [
                        {
                            id: "ZSRHeXYDLko",
                            title: "Jonathan Blow — a favourite talk",
                        },
                        {
                            id: "kZRE7HIO3vk",
                            title: "Casey Muratori — a favourite talk",
                        },
                    ],
                },
                {
                    type: "html",
                    html: `
                        <p>I've also tried, and failed, to follow the
                        <a href="https://guide.handmadehero.org/" target="_blank" rel="noopener noreferrer">
                        Handmade Hero series</a>. It's an enormous undertaking, but I still think it's one of
                        the more valuable resources for anyone interested in understanding how software comes
                        together from the ground up.</p>
                        <p>Outside of programming, <strong>
                        <a href="https://www.youtube.com/@rossmanngroup" target="_blank" rel="noopener noreferrer">
                        Louis Rossmann</a></strong> is probably the person I look up to most. I've rarely
                        encountered someone whose opinions align so closely with thoughts I've independently
                        had, and who so consistently backs those opinions up with action.</p>
                        <p>Whether it's advocating for repairability, calling out companies for malpractice, or
                        supporting alternatives to the services and platforms we take for granted, I admire that
                        he doesn't stop at complaining about problems. He actually tries to do something about
                        them. His work through
                        <a href="https://futo.org/" target="_blank" rel="noopener noreferrer">FUTO</a>, his
                        involvement with
                        <a href="https://grayjay.app/" target="_blank" rel="noopener noreferrer">Grayjay</a>,
                        which I use daily, and his more recent work with the
                        <a href="https://www.fulu.org/" target="_blank" rel="noopener noreferrer">FULU
                        Foundation</a> are all things I've followed with interest.</p>
                        <p>I appreciate people who are willing to challenge the status quo and put their money,
                        time, and effort behind the things they believe in.</p>
                    `,
                },
            ],
        },
        {
            title: "Outside of programming",
            blocks: [
                {
                    type: "html",
                    html: `
                        <h3>Reading</h3>
                        <p>I've been a voracious reader of fantasy for as long as I can remember. Nothing quite
                        beats disconnecting from the world, picking up something to read, and getting
                        transported somewhere completely different.</p>
                        <p>I'm not particularly picky about the medium, either. I'll read just about anything, from
                        traditionally published novels to manga, manhwa, light novels, web novels, and even some
                        of the longer-running web serializations. If there's an interesting world or a good
                        story to get lost in, there's a pretty good chance I'll give it a shot.</p>
                        <p>A couple of books that have stuck with me are <strong>The Lies of Locke Lamora</strong>,
                        the first book in the Gentleman Bastard series, and the <strong>Six of Crows duology
                        </strong>, which holds a particularly special place in my heart.
                        </p>
                    `,
                },
                {
                    type: "media-grid",
                    items: [
                        {
                            title: "The Lies of Locke Lamora",
                            category: "Fantasy novel",
                            image: "assets/about/the-lies-of-locke-lamora.jpg",
                            alt: "Cover of The Lies of Locke Lamora by Scott Lynch",
                            description: "I'm a sucker for thieves",
                        },
                        {
                            title: "Six of Crows duology",
                            category: "Fantasy novels",
                            image: "assets/about/six-of-crows.jpg",
                            alt: "Six of Crows duology boxed set cover",
                            description: "Thieve sucker part 2",
                        },
                    ],
                },
                {
                    type: "html",
                    html: `<p>Some other favourites across different mediums:</p>`,
                },
                {
                    type: "media-grid",
                    items: [
                        {
                            title: "Arcane",
                            category: "TV",
                            image: "assets/about/arcane.jpg",
                            alt: "Arcane series poster",
                            description: "Yes, I know it's a fairly recent favourite.",
                        },
                        {
                            title: "Orb: On the Movements of the Earth",
                            category: "Anime",
                            image: "assets/about/orb-jpg.jpg",
                            alt: "Key visual for Orb: On the Movements of the Earth",
                            description: "This is probably what I'd recommend to anyone",
                        },
                        {
                            title: "Omniscient Reader's Viewpoint",
                            category: "Web novel",
                            image: "assets/about/org-cover.jpg",
                            alt: "Omniscient Reader's Viewpoint novel cover",
                            description: "Its amazing I promise, ignore that its absurdly long",
                        },
                        {
                            title: "Your Name.",
                            category: "Movie",
                            image: "assets/about/your-name.jpg",
                            alt: "Your Name. movie poster",
                            description: "I'm a boring shinkai enjoyer",
                        },
                    ],
                },
                {
                    type: "html",
                    html: `
                        <p>I'm always a sucker for a good story, regardless of the medium.</p>
                        <h3>Tabletop RPGs</h3>
                        <p>I've been playing Dungeons &amp; Dragons since I was introduced to it in eighth grade.
                        I've been incredibly fortunate to have friends who are just as passionate about being
                        Dungeon Masters as I am about playing, and I've spent years getting to be a part of the
                        worlds they've created.</p>
                        <p>Since then, I've branched out into other tabletop RPG systems, but D&amp;D has always
                        remained a pretty integral part of my life. There's something special about sitting
                        around a table with friends, collectively building a story, and having no idea where
                        things are going to end up.</p>
                        <p>Something I didn't expect when I first started playing was just how much it would help
                        me socially. I've always been a fairly introverted and shy person, and roleplaying has
                        given me an unexpected outlet to express myself and interact with people in ways I
                        normally wouldn't. Getting to step into someone else's shoes, make decisions as that
                        character, and contribute to a shared story has helped me come out of my shell in ways I
                        probably wouldn't have anticipated.</p>
                        <p>It's become much more than just a game to me. Some of my fondest memories and
                        friendships have come out of the countless hours spent playing these campaigns, and I'm
                        incredibly grateful to have had those experiences.</p>
                        <h3>Rocket League</h3>
                        <p>I'm also a competitive gamer, which has left me with something of a mind virus for
                        multiplayer games.</p>
                        <p>Most notably, I've played Rocket League competitively for years. I've reached the
                        highest rank multiple times, won multiple tournaments, occasionally found myself among
                        the top 100 players in Canada, and accumulated approximately $1,500 in tournament prize
                        winnings.</p>
                        <p>For most of my time at university, I've also played on Simon Fraser University's
                        competitive Rocket League team. One of my proudest accomplishments was being part of the
                        team that won the <strong>NECC Division 3 National Championship</strong>.</p>
                        <p>Not to nerd out too much, but Rocket League has always been something special to me. I
                        grew up with it, found a community through it, and ironically learned a lot about how I
                        learn best through playing it.</p>
                        <p>It's taught me a lot about understanding my own weaknesses, deliberate practice,
                        improving through constant feedback, and expressing myself in a team environment. I'm
                        also endlessly fascinated by the physics underneath what looks like a deceptively simple
                        game. It's one of the most mechanically expressive games I've ever had the pleasure of
                        playing.</p>
                    `,
                },
            ],
        },
        {
            title: "What I'm looking for",
            blocks: [
                {
                    type: "html",
                    html: `
                        <p>I took a less conventional path through university. Instead of spending much of my time
                        mass-applying for internships early on, I spent it building projects for myself,
                        following problems that interested me, and learning whatever I needed along the way.</p>
                        <p>That taught me a lot, but it also means I'm now actively looking for my first internship
                        and my first opportunity to bring that experience into a professional environment. I'm
                        aware I'm entering the internship race from a different angle, and I'm okay with that.
                        The projects are what made me want to pursue software engineering seriously in the first
                        place, and I don't regret spending that time building things for myself.</p>
                        <p>It still feels a little surreal that something I've spent so much time doing simply
                        because I enjoy it could become a full career. But if my small spite projects can turn
                        into real work, that's a pretty good way to prove my younger self wrong.</p>
                    `,
                },
            ],
        },
    ],
};
