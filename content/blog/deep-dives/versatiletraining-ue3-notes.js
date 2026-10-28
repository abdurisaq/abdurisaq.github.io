// blog/deep-dives/versatiletraining-ue3-notes.md
DATA.blogPosts.push({
    id: "versatiletraining-ue3-notes",
    title: "Okay, so how did I figure out what Rocket League was doing?",
    subtitle: "The UE3, BakkesMod, Function Scanner and callback notes behind VersatileTraining.",
    category: "VersatileTraining · technical notes",
    date: "November 16, 2026",
    readTime: "12–15 min read",
    intro: "This is not a polished modding guide, and I am not pretending I know every corner of Rocket League's internals. It is a dump of what I learned after spending months banging my head against a wall, piecing together scattered docs, trying things in-game, and figuring out why an event I thought I understood was not the event I actually needed. I wrote it because I could not find one place that connected the pieces in a way that made sense to me. If you found this while trying to understand Rocket League modding, hopefully it saves you some of the same trial and error.",
    sections: [
        {
            title: "First: what do people mean by Rocket League modding?",
            paragraphs: [
                "There is not one single thing called a Rocket League mod. The community has built several kinds of tools around the game: BakkesMod plugins that extend the running game, training and Freeplay utilities, replay and broadcast tools, cosmetic customization, and tools that inspect or work with the game's packaged content. They solve different problems and use different techniques. A replay tool does not need to work like a plugin that changes a training scenario, and a package browser is doing a different job again.",
                "A big part of the scene is practical rather than academic. People want to recreate a shot, inspect a replay, try a different camera, organize a garage, build a training aid, or get information the normal interface does not show. BakkesMod became a shared foundation for a lot of that work. It gives plugin authors a common runtime and SDK, so every project does not have to solve loading, drawing UI and talking to the game from scratch.",
                "The community has been building around the game since launch. By the time of BakkesMod's April 28, 2026 EAC announcement, Bakkes described the ecosystem as having more than 800 published community-submitted plugins, over 750,000 daily users and over 1.5 million weekly users. Those are the project's own figures from that announcement, not a current post-EAC user count, but they give a sense of how much community tooling had grown around one game.",
                "That is the context for VersatileTraining. I was not trying to build an anti-cheat bypass or modify competitive matches. I wanted to make offline training more configurable: save a situation, set up the car and ball, repeat a shot, and build practice around a state that the normal training editor did not expose in the way I needed.",
            ],
        },
        {
            title: "Why Unreal Engine 3 gives the community something to work with",
            paragraphs: [
                "Rocket League is built on Unreal Engine 3. The fact that UE3 is old is not, by itself, what makes a game moddable. What matters for this particular scene is the combination of an object-oriented engine, reflected metadata, UnrealScript, native engine/game code, and a community that has spent years building tools around the way those pieces are represented.",
                "The useful mental model is that the game is not just a giant anonymous block of machine code. Unreal has objects, classes, properties and functions. UnrealScript declares a lot of the game-side structure and behavior; native C++ functions can sit behind that script-facing interface. The engine's reflection system keeps metadata about many of those things, which is why tools can sometimes display a readable class or function name instead of only an address.",
                "You will see two names come up a lot in Rocket League reverse-engineering material: GObjects and GNames. At a high level, GObjects is the runtime object collection and GNames is the name table used by the engine. They are useful because they help researchers relate live objects and function metadata to names. They do not magically reveal every native function's implementation, and the exact structures and offsets are tied to a particular game build. They are a way into the problem, not a complete map of it.",
            ],
        },
        {
            title: "There are two different views of the game: packages and runtime",
            paragraphs: [
                "One view is static: inspect the files the game ships. Unreal packages such as .upk and .u files are structured serialized containers. They include tables and references for names, imports, exports and object data. A package tool can turn those structures into something browsable: classes, dependencies, properties, script functions and, where the format and tool support it, reconstructed UnrealScript bytecode.",
                "UE Explorer is one of the tools people use for this. The Rocket League-focused build adds support for game-specific UE3 tokens and reversed native-function information. UELib and related package tooling are useful background too. This kind of inspection answers questions like 'does this class exist?', 'what is this function called?', or 'what properties does the script-visible type declare?'. It does not tell you which function fires when you click a particular button in the live game, and it does not turn native C++ implementation into clean source code.",
                "The other view is runtime: observe the game while it is doing the exact thing you care about. That is where I spent most of my time. Static inspection gives you names and possible places to look. Runtime investigation helps connect one repeatable action to the function, caller and data that actually matter. I found it much less confusing once I stopped expecting either view to answer every question on its own.",
            ],
        },
        {
            title: "Where BakkesMod fits",
            paragraphs: [
                "BakkesMod is the bridge between the running game and plugin code. In broad strokes, the injector loads the BakkesMod runtime into Rocket League, and BakkesMod provides a plugin environment that native C++ DLLs can use through its SDK. A plugin can register console commands, draw UI, respond to game events and use wrapper classes for familiar game objects. The SDK gives names and helper methods around parts of the game that would otherwise be awkward to work with directly.",
                "That changes the starting point for a plugin author. You do not have to build your own loader just to run code in the game process, or reverse-engineer every common object from zero. You build against the SDK, load the plugin through BakkesMod, and use the wrapper/event layer where it is available. When the SDK does not expose the value or event you need, that is when the more investigative part begins.",
                "BakkesMod is also more than the loader. It is the ecosystem around it: the SDK, documentation, plugin listings, examples, and people who have already found useful hooks. Looking through existing plugins is often as valuable as reading the formal API because it shows how other developers solved a real game-specific problem.",
            ],
        },
        {
            title: "Finding the function: make the game tell you what it is doing",
            paragraphs: [
                "My main discovery tool was the BakkesMod Function Scanner. The documented workflow is to launch Rocket League with the -dev option, restart with BakkesMod injected, open the console with F6, and run togglemenu devtools. The scanner lets you include and exclude words from function names; matching functions appear as they fire. That turns a vague question—'what gets called when I save this training setup?'—into something I could test.",
                "I would set up one repeatable action, perform it once, watch what appeared, then narrow the filters and repeat. If I changed several things at once, the results became noise. If I changed one thing and repeated the same action, it became easier to tell which function was related and whether it happened before or after the state I cared about had changed. It is still trial and error, but at least the trial is controlled.",
                "You will also find lower-level reverse-engineering write-ups that locate GObjects and GNames or trace ProcessEvent, a central Unreal object-function dispatch path. Those are useful examples of how people investigate the engine from closer to the runtime internals. I am mentioning them as part of the wider scene; my own day-to-day route for this project was the BakkesMod Function Scanner and SDK hooks, not a claim that I built a custom ProcessEvent tracer.",
            ],
        },
        {
            title: "A scanner result is only the start: turning it into a hook",
            paragraphs: [
                "Once I had a candidate function name, the BakkesMod SDK gave me a way to subscribe to it. HookEvent runs my callback when the target function is called; HookEventPost runs after it returns. The caller-aware variants also pass a wrapper for the object that invoked the function, along with a void* parameter pointer and the event name. That is a useful amount of context: the function name tells me what path I am looking at, the caller tells me which object is involved, and params points to the arguments supplied to that call.",
                "The event name often contains a class path, for example a function under a Rocket League class ending in _TA. The SDK documentation describes how that naming convention can map to wrapper types such as CarWrapper. The important thing is to confirm that mapping rather than guess. A caller-aware hook is not a type-discovery system; if the wrapper type does not match the object, the cast can be invalid.",
                "The same goes for params. A void* is just an address. It does not arrive with a C++ struct attached, and the SDK cannot infer a parameter schema that nobody has documented. A hook gives you a reliable point to observe a call. It does not automatically tell you how to interpret every byte passed to it.",
            ],
        },
        {
            title: "The frustrating part: figuring out what the bytes mean",
            paragraphs: [
                "This is where the hours went. I would find an event that looked promising, hook it, and compare the caller and parameter memory while repeating the same action with one value changed. A hex dump is useful here because it gives you a stable view of a memory region: offsets down the side, bytes in hexadecimal, and an ASCII column where printable characters happen to exist. It is not a decoded structure. It is just a way to compare captures without guessing from a single integer printed to the log.",
                "The trick was to look for relationships. If I changed the ball's starting speed and the same four bytes changed in a consistent way, that was a lead. If a pointer-sized region stayed stable while the data behind it changed, that was another lead. If the same event fired for unrelated actions, it might not be specific enough. I kept going back to the game, repeating the action, and trying to eliminate assumptions one at a time.",
                "I also had to separate three things that are easy to blur together: the function's parameter block, the caller object, and an object reached through a pointer inside one of those regions. They are different memory bases. An offset only means something when you can say exactly what address it is measured from.",
            ],
        },
        {
            title: "When a pattern emerged, I sketched a provisional struct",
            paragraphs: [
                "Once I had enough repeated captures to suspect a layout, I would make an intentionally boring C++ struct: a byte array for the unknown gap, then a field at the offset I had evidence for. It is not elegant, and it is not me claiming I reconstructed the entire Unreal type. It is a temporary way to express a specific observation so I can test it against the same callback again.",
                "In one path, the pointer I wanted appeared 0xE8 bytes into an RPC parameter block. I represented the preceding bytes as padding, read a uintptr_t at that position, and treated it as a pointer to the training-data object. Passing that address into TrainingEditorSaveDataWrapper let me use the wrapper's GetCode() and GetTM_Name() methods to obtain the in-game code and map name as readable strings. The wrapper did the higher-level interpretation; the offset was how I reached the object in the first place.",
                "In another investigation, I was looking at a GameEditor ball caller. The fields I was interested in—start location, start rotation, velocity start speed and velocity start rotation—appeared after 0xB10 bytes of padding from caller->memory_address. This was not +0xB10 from params. It was a different base address and a different structure. Keeping that distinction explicit prevented me from treating two unrelated memory regions as if they shared one layout.",
                "These padded structs are hypotheses, not public engine APIs. The padding says 'I have not identified this region yet'. The field says 'this location appears to behave like this value in the captures I tested'. Offsets can move between game builds, object layouts can change, and an incorrect type or alignment assumption can turn a plausible value into a crash. I would only keep an inferred field after checking it with multiple captures and, ideally, different values.",
            ],
        },
        {
            title: "How that investigation fed back into VersatileTraining",
            paragraphs: [
                "The reason I went down this rabbit hole was not to collect offsets. I wanted the plugin to save and restore useful training states. That means the editor needs real values: where the ball starts, how it is rotated, how fast it moves, what training data is associated with a setup, and which event marks the point where those values are available. The UI is the part people see, but the reliability of the feature depends on understanding the game's state well enough to populate it correctly.",
                "Once I could connect a repeatable in-game action to a function and then to a value I could read through a wrapper or a validated layout, I could stop treating the data as a mystery and build an actual feature around it. That is the step that matters: investigation becomes a named concept in the plugin, not a pile of addresses and debug output spread across the codebase.",
            ],
        },
        {
            title: "A quick reality check about EAC and BakkesMod",
            paragraphs: [
                "EAC changed where community mods can run, but the first announcement was not the final word on BakkesMod's future. Psyonix announced on April 28, 2026 that Easy Anti-Cheat would be required for online play on PC and that community mods would not run while EAC is enabled. The same announcement explicitly kept a non-EAC path for training, offline matches, LAN matches and replay work.",
                "There was an initial BakkesMod post on April 28 saying active updates would stop. Then the story changed: on May 12, BakkesMod announced that it had been updated for the newest Rocket League build in non-EAC mode and that Psyonix had offered support so the team could continue providing updates sustainably. Rocket League's own account confirmed that BakkesMod was available on the latest version in non-EAC mode and would continue to be supported in future updates.",
                "So the accurate summary is: BakkesMod is continuing, but the supported modded workflow is non-EAC mode. EAC-enabled online play and non-EAC modded training are separate launch paths. I normally use the plugin while training offline anyway, so this does not change the way I use VersatileTraining. This describes the public May 12 confirmation; it is not a promise that a third-party mod can run in EAC-enabled online matches.",
            ],
        },
        {
            title: "If you found this while trying to do something similar",
            paragraphs: [
                "Start by getting one small question answered. Do not begin by trying to reconstruct all of Rocket League. Find the object or action you care about, learn its vocabulary from package inspection or existing plugin code, then reproduce it in-game with one variable changed at a time. Use the scanner to find a candidate event, confirm whether you need a pre- or post-hook, record the caller and parameter context, and keep notes about which offsets are relative to which base address.",
                "Be suspicious of the first result that looks right. Try another value. Repeat the same action. Check whether the function also fires in a different context. Prefer a BakkesMod wrapper when it gives you the value you need, and keep raw offsets contained behind a small helper when you genuinely need them. Do not assume an undocumented layout is stable just because it worked on one build.",
                "Most importantly, look through other people's plugins, SDK examples and community tools. A lot of the scene's knowledge is scattered across docs, repositories, forum posts and old experiments. This page is not a definitive reference. It is the set of notes I wish I had found when I started pulling at this particular thread. If it helps somebody else spend fewer evenings staring at a memory window, it has done its job.",
            ],
        },
    ],
    workflow: [
        "Choose one repeatable action in offline training and change one thing at a time",
        "Use package tools and existing plugins to learn the names and types that might matter",
        "Use the BakkesMod Function Scanner to find candidate functions as they fire",
        "Register a hook and record the event name, caller, timing and parameter pointer",
        "Compare wrapper values and memory captures to identify relationships",
        "Sketch a padded struct only after a pattern repeats, then validate it against more captures",
        "Wrap the verified access in a named helper and use it to implement the training feature",
    ],
    resources: [
        {
            title: "BakkesMod Function Scanner",
            note: "How to launch the DevTools scanner, filter function names and find candidate events as they fire.",
            url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/function-scanner",
        },
        {
            title: "Using BakkesMod function hooks",
            note: "HookEvent, HookEventPost, caller-aware hooks and the meaning of the params pointer.",
            url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/using-function-hooks",
        },
        {
            title: "Hook Event With Any Caller",
            note: "Important warning: this helper uses a blind cast, so the caller type must be correct.",
            url: "https://bakkesplugins.com/wiki/bakkesmod-sdk/functions/hook-event-with-any-caller",
        },
        {
            title: "BakkesMod SDK",
            note: "The SDK source, wrappers and plugin development interface.",
            url: "https://github.com/bakkesmodorg/BakkesModSDK",
        },
        {
            title: "RocketLeague-Data-Dumper",
            note: "A community write-up on UE3 object structures, GObjects/GNames and runtime data discovery. This is a separate, lower-level approach from my own scanner workflow.",
            url: "https://github.com/DRKn1ght/RocketLeague-Data-Dumper",
        },
        {
            title: "UE Explorer — Rocket League edition",
            note: "A package browser/decompiler with support for Rocket League's customized UE3 tokens and UnrealScript data.",
            url: "https://github.com/lauralex/ue-explorer",
        },
        {
            title: "BakkesMod plugins",
            note: "Browse the wider ecosystem of community-built tools and plugins.",
            url: "https://bakkesplugins.com/",
        },
        {
            title: "Bakkes' April 28, 2026 ecosystem update",
            note: "The original EAC announcement also gives BakkesMod's own historical figures for community plugins and usage; treat them as a dated snapshot, not current analytics.",
            url: "https://updater2.bakkesmod.com/articles/bakkesmod-eac.html",
        },
        {
            title: "Rocket League: Easy Anti-Cheat on PC",
            note: "Psyonix's April 28, 2026 announcement describing EAC-enabled online play and the non-EAC offline mod path.",
            url: "https://www.rocketleague.com/news/easy-anti-cheat-comes-to-rocket-league-on-pc-today",
        },
        {
            title: "BakkesMod: May 12 update",
            note: "BakkesMod's confirmation that it was updated for the latest build in non-EAC mode, with Psyonix support for sustainable future updates.",
            url: "https://x.com/BakkesMod/status/2054249895448461494",
        },
        {
            title: "Rocket League: May 12 confirmation",
            note: "Psyonix/Rocket League's confirmation that BakkesMod would continue to be supported in future updates (non-EAC mode only).",
            url: "https://x.com/RocketLeague/status/2054253085094994064",
        },
    ],
    offsetNotes: [
        {
            title: "Training-data RPC payload",
            base: "RPC parameter block (params)",
            offset: "+0xE8",
            detail: "A uintptr_t at this observed offset pointed to the training-data object. I passed that pointer into TrainingEditorSaveDataWrapper and used GetCode() and GetTM_Name() to read the in-game code and map name.",
            fields: [
                "uintptr_t TrainingData",
                "TrainingEditorSaveDataWrapper",
                "GetCode()",
                "GetTM_Name()",
            ],
        },
        {
            title: "GameEditor ball caller",
            base: "caller->memory_address (not params)",
            offset: "+0xB10",
            detail: "This offset was measured from the caller object's memory. The values I was mapping after that gap were the ball's start location, start rotation, initial velocity speed and velocity rotation.",
            fields: [
                "Vector StartLocation",
                "Rotator StartRotation",
                "float VelocityStartSpeed",
                "Rotator VelocityStartRotation",
            ],
        },
    ],
    screenshots: [],
    statusNote:
        "These notes describe the public EAC/BakkesMod announcements referenced above. Modded training uses the non-EAC launch path; EAC-enabled online play is a separate mode.",
    type: "technical",
    projectId: "versatiletraining",
    parentId: "versatiletraining-story",
    parentLabel: "Back to the training-shot story",
    relatedId: null,
});
