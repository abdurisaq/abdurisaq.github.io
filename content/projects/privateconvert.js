/* @content
{
    "type": "project",
    "collection": "projects",
    "loadOrder": 100,
    "treeOrder": 30,
    "searchOrder": 200,
    "searchProfile": "project"
}
*/
// projects/privateconvert.md
registerContentData("project", {
    id: "privateconvert",
    name: "PrivateConvert",
    repo: "https://github.com/abdurisaq/PrivateConvert",
    summary:
        "A local-first desktop tool for converting and editing images, PDFs and video without sending files to a random website. It turns one-off chores into reusable operation pipelines, queued jobs and a proper PDF page editor.",
    stack: ["Python", "FastAPI", "SQLModel", "React", "Vite", "Tailwind", "Docker", "ffmpeg"],
    about: "PrivateConvert started with a familiar annoyance: needing to shrink a video, resize an image or move a few PDF pages, then having to hand the file to whichever converter Google put first. I built the tool I wanted instead—a local-first app with reusable operation pipelines, queued jobs and a separate PDF editor. The goal was to make the boring jobs feel straightforward without making the file leave my machine.",
    sections: [
        {
            title: "Build a pipeline instead of repeating clicks",
            paragraphs: [
                "The File Operations page lets me assemble a sequence of operations, validate it, save it for reuse and queue it as a job. The same idea works across image, PDF and video tasks, so a workflow can be reused when a similar batch comes up later.",
            ],
        },
        {
            title: "Use the right tool for each format",
            bullets: [
                "Image and PDF operations are handled through the local backend pipeline.",
                "Video processing uses ffmpeg; ffprobe is used for metadata inspection and size-target compression.",
                "The PDF Editor exposes page-level editing separately from the general operation builder.",
            ],
        },
        {
            title: "Treat conversions as jobs",
            paragraphs: [
                "The Jobs page is where queued work becomes manageable. Active work can be cancelled, completed jobs and their files can be deleted, and terminal-job retention can be configured. The default retention is 30 days, temporary files are cleaned at startup, and expired jobs are checked hourly.",
            ],
        },
        {
            title: "One local application at runtime",
            paragraphs: [
                "The FastAPI backend serves the built React interface, so Node.js is needed to build the frontend but not to run the finished app. I can start it through the Python launcher or Docker Compose. Both modes bind to localhost; the Docker setup stores application data in a local ./data directory. This is intentionally a single-user local tool, not a service to expose to an untrusted network.",
            ],
        },
    ],
    screenshots: [
        {
            src: "assets/screenshots/privateconvert-file-operations.png",
            alt: "PrivateConvert file operations interface with an image conversion pipeline",
            caption: "Pipeline builder and file operations",
        },
        {
            src: "assets/screenshots/privateconvert-pdf-editor.png",
            alt: "PrivateConvert PDF editor interface",
            caption: "PDF page editor",
        },
        {
            src: "assets/screenshots/privateconvert-jobs.png",
            alt: "PrivateConvert job history and queue interface",
            caption: "Job queue and history",
        },
    ],
    highlights: [
        "File Operations page for building, validating, saving and queuing pipelines for images, PDFs and video.",
        "Video operations and size-target compression powered by ffmpeg and ffprobe.",
        "PDF editor for page-level changes.",
        "Jobs page to cancel work, delete finished jobs, and set retention (30 days by default); hourly cleanup of expired jobs.",
        "One-command local run or docker compose; bound to localhost by design.",
    ],
    videos: [],
    links: [["Source", "https://github.com/abdurisaq/PrivateConvert"]],
    storyPostId: "privateconvert",
    technicalPostId: null,
});
