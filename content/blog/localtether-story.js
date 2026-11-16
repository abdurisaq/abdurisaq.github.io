addPage({
    type: "blog",
    path: "blog/localtether-story.md",
    treeOrder: 50,
    searchOrder: 160,
});

// blog/localtether-story.md
DATA.blogPosts.push({
    id: "localtether-story",
    type: "story",
    projectId: "localtether",
    title: "In This Next Episode of How the Hell This Came to Be: a Software KVM",
    subtitle:
        "A cramped desk, a laptop with a worse keyboard, and a question that caused a shit ton of problems.",
    category: "LocalTether · C++ · Windows + Linux",
    date: "November 16, 2026",
    readTime: "7–9 min read",
    intro:
        "I’m notoriously cluttered, my desk is too small for two monitors, and I normally " +
        "work with my laptop sitting beside my desktop. Every time I wanted to do something " +
        "on the laptop, I had to reach over and use its inferior keyboard and crappy " +
        "touchpad. I already had a perfectly good keyboard and mouse plugged into my " +
        "desktop. I wanted those to work on both machines.",
    videos: [
        {
            title: "LocalTether walkthrough",
            id: "0U6Gs4i0kbI",
        },
    ],
    sections: [
        {
            title: "I did not want to buy a $100 KVM switch",
            paragraphs: [
                "I had heard of things like Mouse Without Borders, but I specifically needed " +
                    "something that worked between my Windows desktop and Linux laptop. The Windows " +
                    "options I found were not going to work for that setup, and the Linux options I " +
                    "found tended to assume the other machine was Linux too. Then I looked at a " +
                    "physical KVM switch. Who has $100 lying around for a desk that barely fits one " +
                    "monitor?",
                "I asked myself the usual question: how hard can this be? That question has caused " +
                    "me a shit ton of problems across my projects.",
            ],
        },
        {
            title: "I had to learn what connecting two computers actually meant",
            paragraphs: [
                "I knew I wanted the machines to find each other on my home network, but I did not " +
                    "really understand what I was looking at when I saw an address like 192.168.1.20, " +
                    "or why that was different from the WAN IP on my router. I had to learn what a " +
                    "local address was, what the router was doing, and how to keep the connection " +
                    "between the machines on the LAN.",
                "Keeping the connection local was one of the original requirements. I did not want " +
                    "keyboard and mouse events going through some remote service when the two computers " +
                    "were sitting on the same desk.",
            ],
        },
        {
            title: "This was my first project that had to work on Windows and Linux",
            paragraphs: [
                "I needed the rest of the app to stop caring which OS was underneath it. Windows " +
                    "and Linux expose input through different APIs, so I ended up putting a shared " +
                    "InputManager in front of separate implementations. That let the rest of the app " +
                    "ask for input without having to know which machine it was running on.",
                "The build setup split too. I made a Bash script for Linux and a PowerShell script " +
                    "for Windows, with CMake and vcpkg underneath. This was my first project where both " +
                    "operating systems were actual targets, and I had to learn how much the build " +
                    "process changes between them.",
            ],
        },
        {
            title: "The trackpad was sending me finger positions, not mouse positions",
            paragraphs: [
                "I was sending mouse data raw and hoping it would mean the same thing on the other " +
                    "machine. It did not. libevdev gave me the finger’s position on the trackpad, not " +
                    "the cursor position on the screen. I had to remember an anchor, compare the " +
                    "movement from one finger position to the next, and apply that difference to the " +
                    "simulated cursor.",
                "When the finger jumped too far, I reset the anchor instead of teleporting the " +
                    "mouse across the screen. That whole chunk of math came from me making the wrong " +
                    "assumption about what libevdev was giving me.",
            ],
        },
        {
            title: "Then I had to make keyboard presses arrive properly",
            paragraphs: [
                "I needed to distinguish a short press, a long press, and a key release. I also " +
                    "needed multiple keys pressed at the same time to arrive as the same combination on " +
                    "the other machine. If I held Shift and another key on the desktop, the laptop had " +
                    "to see both, in the right order, and the release could not disappear because " +
                    "another event arrived first.",
                "That meant learning about debounce, press/release state, and how to package events " +
                    "so the receiver could reconstruct what I was actually doing.",
            ],
        },
        {
            title: "My first queue was where I gave up for a while",
            paragraphs: [
                "I tried writing my own queue for the input stream. I got stuck on throughput, " +
                    "atomic operations, and what happens when events arrive faster than the other side " +
                    "can consume them. I wanted it to be reliable and fast, but my understanding of " +
                    "atomic queues was not good enough to trust the design I was building, so I parked " +
                    "LocalTether for a while.",
                "When I came back, I stopped trying to invent a lock-free queue and used the write " +
                    "queue the networking library already gave me. Messages go through the Asio " +
                    "executor and get written in order. It was less clever than what I was trying to " +
                    "build. It also actually worked.",
            ],
        },
        {
            title: "A bunch of old class notes suddenly became useful",
            paragraphs: [
                "By the end I was pulling in bits from old projects and information from previous " +
                    "classes. It felt like my own Slumdog Millionaire moment: some detail I had learned " +
                    "ages ago would suddenly come back while I was trying to solve an unrelated " +
                    "problem.",
            ],
        },
        {
            title: "I started with keyboard and mouse sharing. It kept growing.",
            paragraphs: [
                "I ended up with Host, Broadcaster and Receiver roles, host controls, client " +
                    "management and shared file browsing. The HTTP Server From Scratch repository came " +
                    "from an earlier attempt to understand the networking side. It is not a full " +
                    "project, so I removed it from the project list, but it belongs in the story of how " +
                    "I got here.",
            ],
        },
        {
            title: "I wanted it on the LAN, but I still had to think about security",
            paragraphs: [
                "LocalTether uses TLS and password-protected sessions, and LAN-only use is the " +
                    "default described in the README. WAN access requires deliberate port forwarding. " +
                    "There is a security caveat in the source snapshot I reviewed: the TLS client sets " +
                    "verify_none, so the connection is encrypted but the client is not validating the " +
                    "server certificate in the normal way.",
                "I am spelling that out because “TLS is enabled” and “the client knows who it " +
                    "connected to” are different things. I do not want to pretend I solved a security " +
                    "problem that is still sitting there.",
            ],
        },
        {
            title: "At least I can stop reaching for the laptop",
            paragraphs: [
                "It solved the problem I was complaining about, which is all I wanted from it.",
            ],
        },
    ],
    relatedId: "localtether-implementation-notes",
    relatedLabel: "LocalTether implementation notes",
    projectLink: "localtether",
});
