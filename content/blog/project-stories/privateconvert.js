addPage({
    type: "blog",
    path: "blog/project-stories/privateconvert.md",
    treeOrder: 10,
    folderOrder: 20,
    searchOrder: 110,
    folderPresentation: {
        className: "project-stories-folder",
        contentsClassName: "project-stories-contents",
        separator: true,
    },
});

// blog/project-stories/privateconvert.md
DATA.blogPosts.push({
    id: "privateconvert",
    type: "story",
    projectId: "privateconvert",
    title: "Why the Hell Is File Conversion Still a Website?",
    subtitle:
        "I wanted to resize an image or compress a video without uploading it to whichever " +
        "site won Google that day.",
    category: "PrivateConvert · local-first software",
    date: "November 16, 2026",
    readTime: "6–8 min read",
    intro:
        "I hate online converters with a passion. Converting a file is basically a solved " +
        "problem, but the accepted workflow is still: Google it, click whichever result won " +
        "the SEO fight, upload your document, and hope you did not just hand something " +
        "sensitive to a stranger. I wanted the handful of conversions I actually use to " +
        "happen on my own machine.",
    sections: [
        {
            title: "I hate uploading files to random websites",
            paragraphs: [
                "The conversion itself is usually dead simple. Shrink an image, compress a video, " +
                    "change a format, move a few PDF pages around. For some reason, when I want to do " +
                    "one of those things, I end up looking for a random website that wants the file " +
                    "first. I kept wondering why Windows and the other operating systems I use do not " +
                    "make these basic jobs easier to do out of the box.",
                "And the file might not be disposable. It could be a work document, a scan of an " +
                    "ID, a signed form, or something I would rather not send to a service I found " +
                    "thirty seconds ago. I have no idea who is running that site, how long it keeps my " +
                    "upload, or what it does with the output. Clicking the first Google result is a " +
                    "pretty weak security review.",
            ],
        },
        {
            title: "Then the FBI warning showed up",
            paragraphs: [
                "In March 2025, the FBI’s Denver office warned about a campaign using fake online " +
                    "document converters and downloader tools. The sites advertised ordinary file " +
                    "conversion, but the FBI said the tools could also deliver malware or steal " +
                    "information. Malwarebytes covered the same campaign, and Forbes wrote about the " +
                    "warning a few days later.",
                "To be clear, this was a specific campaign. It does not mean every converter on the " +
                    "internet is malicious. It does mean the risk is not theoretical: somebody looking " +
                    "for a tiny utility can end up downloading something nasty along with the converted " +
                    "file. I already hated the upload-first workflow. That warning gave me a very " +
                    "concrete reason to stop using it.",
            ],
            callout:
                "The FBI warning was about a specific campaign, not every converter site. My " +
                "preference is simpler: when I can do the job locally, I do not need to upload the " +
                "file at all.",
        },
        {
            title: "I only needed the conversions I actually do",
            paragraphs: [
                "PrivateConvert started as a tool for my own routine jobs: convert an image, resize " +
                    "it, compress a video to a specific size, or do something basic to a PDF. The video " +
                    "size thing comes up constantly. Discord, why is the upload limit still 10 MB? " +
                    "Sometimes I just need to get a clip under a limit without playing twenty questions " +
                    "with a website.",
                "I was not trying to rebuild Photoshop, Premiere, or Acrobat. I wanted the " +
                    "operations I actually reach for, with the controls I need and no giant pile of " +
                    "features I will never open. It is a pretty selfish feature list. That is also why " +
                    "it is useful to me.",
            ],
        },
        {
            title: "I got tired of doing the same steps by hand",
            paragraphs: [
                "The File Operations page lets me chain operations together, validate the pipeline, " +
                    "save it, and run it again. One job I care about is getting a video under an upload " +
                    "limit. I can set a target size and let the app work through the compression " +
                    "instead of exporting, checking the size, guessing again, and repeating the whole " +
                    "thing.",
                "Video compression uses ffmpeg, and ffprobe gives the app the metadata it needs to " +
                    "inspect the input and work toward a target size. PDF page editing has its own " +
                    "editor because squeezing page operations into one generic conversion button would " +
                    "be miserable. The Jobs page lets me cancel active work, remove completed jobs and " +
                    "their files, and choose retention. The default for finished jobs is 30 days; " +
                    "temporary files are cleaned at startup and expired jobs are removed hourly.",
            ],
        },
        {
            title: "I wanted it to run on my own machine",
            paragraphs: [
                "The backend is one FastAPI application that serves the built frontend. Node is " +
                    "needed to create the frontend bundle; it is not part of the running application. " +
                    "Both documented launch options bind to localhost, and Docker keeps application " +
                    "data in a local ./data directory. There is no login or access control because it " +
                    "is a single-user application.",
                "That last part matters. I would not expose the port to an untrusted network. Local " +
                    "does not automatically mean perfectly secure, and I still have to trust the code I " +
                    "run and the tools it invokes. What it removes is the random third-party converter " +
                    "in the middle of a job. For the files I use, that is already a much better " +
                    "default.",
            ],
        },
        {
            title: "Running it",
            paragraphs: [
                "The README has a Windows PowerShell setup and a Docker Compose option. The Python " +
                    "launcher builds the static UI if it is missing or out of date. Once it starts, the " +
                    "app is at 127.0.0.1:8000. Video operations need ffmpeg; metadata and size-target " +
                    "compression also need ffprobe.",
                "The README does not publish a full operating-system support matrix, so I am not " +
                    "going to invent one. These are the launch options the repository documents.",
            ],
            code:
                "# Local Python launch (PowerShell)\npython -m venv .venv\n.\\.venv\\Scripts\\python -m " +
                "pip install -r backend\\requirements.txt\n.\\.venv\\Scripts\\python run_dev_stack.py\n\n# " +
                "Or use Docker Compose\ndocker compose up --build\n\n# Open http://127.0.0.1:8000/",
        },
        {
            title: "I just want my files to stay on my computer",
            paragraphs: [
                "That is why I made it. I want to shrink a video, resize an image, or shuffle PDF " +
                    "pages around without finding a new website and deciding whether I trust it. " +
                    "PrivateConvert handles the boring operations I actually need.",
            ],
        },
    ],
    resources: [
        {
            title: "PrivateConvert source code and README",
            note: "Local Python launch, Docker Compose setup, localhost binding, file operations and job history.",
            url: "https://github.com/abdurisaq/PrivateConvert",
        },
        {
            title: "FBI Denver: Online File Converter Scam (March 7, 2025)",
            note: "The original warning about fake converter/downloader tools.",
            url:
                "https://www.fbi.gov/contact-us/field-offices/denver/news/fbi-denver-warns-of-onlin" +
                "e-file-converter-scam",
        },
        {
            title: "Malwarebytes: Warning over free online file converters (March 17, 2025)",
            note: "A technical write-up of the same campaign.",
            url:
                "https://www.malwarebytes.com/blog/news/2025/03/warning-over-free-online-file-conve" +
                "rters-that-actually-install-malware",
        },
        {
            title: "Forbes: FBI issues document-converter warning (March 18, 2025)",
            note: "Coverage of the FBI warning.",
            url:
                "https://www.forbes.com/sites/zakdoffman/2025/03/18/fbi-warns-chrome-safari-and-edg" +
                "e-users-do-not-use-these-websites/",
        },
    ],
});
