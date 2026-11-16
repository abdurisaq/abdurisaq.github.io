addPage({
    path: "index.lua",
    route: "#/",
    kind: "PAGE",
    detail: "Home · introduction",
    treeOrder: 10,
    searchOrder: 10,
    searchPaths: ["profile.tagline", "about", "facts"],
});

// Home page identity and introductory metadata.
DATA.profile = {
    name: "Abdurisaq",
    handle: "abdurisaq",
    tagline:
        "Computer science student building networked tools, game plugins and full-stack web apps.",
    email: "YOUR_EMAIL@example.com",
    github: "https://github.com/abdurisaq",
    linkedin: "https://www.linkedin.com/in/YOUR-HANDLE",
    resume: "assets/resume.pdf",
};
