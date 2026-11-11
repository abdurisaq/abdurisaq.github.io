/* @content
{
    "type": "blog",
    "collection": "blogPosts",
    "loadOrder": 230,
    "treeOrder": 120,
    "searchOrder": 170,
    "searchProfile": "blog"
}
*/
// blog/deep-dives/localtether-implementation-notes.md
registerContentData("blog", {
    id: "localtether-implementation-notes",
    type: "technical",
    projectId: "localtether",
    title: "LocalTether: the LAN, input and queue notes",
    subtitle: "The implementation details behind the software KVM story.",
    category: "LocalTether · technical notes",
    date: "November 16, 2026",
    readTime: "8–10 min read",
    intro: "The story post is about why I built LocalTether. This is the implementation side: how the LAN scan works, what I had to hide behind the InputManager interface, why trackpad coordinates needed special handling, and how I replaced the queue I had abandoned the project over.",
    sections: [
        {
            title: "Finding other machines on the LAN",
            paragraphs: [
                "The discovery scripts look for an IPv4 interface with a /24 prefix. They take the first three octets, then ping addresses 1 through 254 in that subnet. The Windows script uses PowerShell and ping.exe; the Linux script uses ping with a one-second timeout and caps the number of concurrent jobs. The application then probes the discovered addresses for the LocalTether service on port 8080.",
                "That is a practical first pass for the home network I was targeting. It can miss machines that ignore ping, use a different subnet size, or sit behind a more complicated layout. I had to understand the assumptions in the scan before treating it as a reliable discovery mechanism.",
            ],
        },
        {
            title: "Keeping the operating-system code behind one interface",
            paragraphs: [
                "InputManager is the shared interface. At build time the project creates WindowsInput or LinuxInput. The Windows side uses Windows input hooks and simulation; the Linux side works through evdev/libevdev and a helper process for lower-level input access.",
                "That meant I did not have to put Windows and Linux branches throughout the networking and session code. The differences stayed close to the code that actually talks to each operating system.",
            ],
        },
        {
            title: "The trackpad coordinate conversion",
            paragraphs: [
                "The TRACKPAD_ABSOLUTE path reports a finger position on the pad. The simulated mouse needs a screen-relative cursor position. I keep an anchor for the last device position and remember the last simulated cursor position. Normal finger movement becomes a delta applied to the cursor; a jump beyond the threshold re-anchors without moving the cursor. The result is clamped to normalized screen bounds.",
                "The threshold is currently 0.02 in normalized coordinates. It is a heuristic for separating a continuous drag from a finger reposition, not a universal property of every trackpad.",
            ],
        },
        {
            title: "Keyboard events need both edges",
            paragraphs: [
                "The input payload carries a vector of KeyEvent entries. Each entry has a keyCode and an isPressed flag, so the receiver can distinguish a press from a release. The payload also includes the source device type, mouse-event flag, normalized coordinates, mouse-button state, and horizontal and vertical scroll deltas.",
                "The Windows polling path has debounce handling. The Linux helper reads input events from the evdev subsystem. Several keys can be held together, so the event order matters: Shift plus another key must arrive as a combination, and the release must not get lost behind the next press.",
            ],
        },
        {
            title: "The write queue I ended up keeping",
            paragraphs: [
                "The old attempt was a custom queue I did not understand well enough to trust under bursts. In the supplied source, the session serializes each message, posts the write work through the Asio executor, protects the queue with a mutex, and sends one queued message at a time with async_write. When a write completes, it pops the queue and continues with the next item.",
                "That is the version I was comfortable leaving in the project. I stopped trying to make my own lock-free queue and used the asynchronous write pattern Asio already provides.",
            ],
        },
        {
            title: "The build scripts are different for a reason",
            paragraphs: [
                "Linux has a Bash build script and Windows has a PowerShell build script. Both bootstrap dependencies and build with CMake and vcpkg, but they need different commands and environment handling. I also had to account for platform-specific process and input APIs, not just the compiler.",
            ],
        },
        {
            title: "The HTTP server experiment",
            paragraphs: [
                "HTTP Server From Scratch is an earlier repository from the same learning path. I removed it as a standalone portfolio project because it was not a complete project in its own right. It is still part of the LocalTether story: I was learning how clients connect and how messages move before I could build the input stream I wanted.",
            ],
        },
        {
            title: "The TLS caveat",
            paragraphs: [
                "The supplied client source sets its TLS verification mode to verify_none. The network traffic is encrypted, but the client is not validating the server certificate in the normal way. I would address that before presenting this source snapshot as protected against an active man-in-the-middle attacker.",
            ],
        },
    ],
    resources: [
        {
            title: "LocalTether source and README",
            note: "Input managers, scan scripts, Asio sessions, build scripts and usage.",
            url: "https://github.com/abdurisaq/LocalTether",
        },
        {
            title: "HTTP Server From Scratch",
            note: "An earlier networking experiment, linked as part of the development path.",
            url: "https://github.com/abdurisaq/HTTP-Server-From-Scratch",
        },
        {
            title: "Linux input subsystem documentation",
            note: "Background on event devices and event codes.",
            url: "https://docs.kernel.org/input/input.html",
        },
        {
            title: "Standalone Asio",
            note: "The asynchronous networking library used for the client/server sessions.",
            url: "https://think-async.com/Asio/",
        },
    ],
    parentId: "localtether-story",
    parentLabel: "Back to the LocalTether story",
});
