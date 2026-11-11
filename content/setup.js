/* @content
{
    "type": "page",
    "loadOrder": 30,
    "route": "#/setup",
    "kind": "PAGE",
    "detail": "Fedora laptop · Windows and Arch Linux (Omarchy) desktop dual boot · Neovim",
    "treeOrder": 30,
    "searchOrder": 30,
    "searchPaths": [
        "setup"
    ]
}
*/
// setup.md: workstation and development workflow.
DATA.setup = {
    intro: "My laptop and desktop have different operating-system setups, but both are part of the same development workflow. Linux is where I prefer to work; Windows stays installed for the games that still refuse to cooperate with it.",
    machines: [
        {
            device: "Laptop",
            system: "Fedora Linux",
            detail: "My portable Linux environment for development and day-to-day work.",
        },
        {
            device: "Desktop · dual boot",
            system: "Windows + Arch Linux (Omarchy)",
            detail: "My desktop dual-boots Windows and Arch Linux. I spend most of my time on the Arch/Omarchy side, but keep Windows around for games that do not run properly on Linux yet.",
        },
    ],
    workflow: [
        "Neovim as my primary editor",
        "Git and GitHub for version control and collaboration",
        "CMake and vcpkg for native C++ projects",
        "Arch/Omarchy for my preferred desktop workflow, with Windows available when game compatibility requires it",
    ],
};
