addPage({
    type: "project",
    collection: "smallerProjects",
    path: "projects/smaller-projects/353-project.md",
    treeOrder: 120,
    searchOrder: 240,
});

// projects/smaller-projects/353-project.md
DATA.smallerProjects.push({
    id: "353-project",
    name: "353-Project",
    repo: "https://github.com/abdurisaq/353-Project",
    summary:
        "A collaborative data-analysis project combining country-level indicators to " +
        "explore how political freedom measures relate to terrorist attacks and US " +
        "defence-company spending, using regression and Random Forest workflows.",
    stack: ["Python", "pandas", "NumPy", "scikit-learn", "statsmodels", "Matplotlib", "Seaborn"],
    about:
        "This was a group project built around a messy question and several datasets that " +
        "did not naturally belong together. We combined country-level measures of trade " +
        "freedom, government integrity and judicial effectiveness with data on terrorist " +
        "attacks, oil reserves and US defence-company spending. The aim was to build a " +
        "reproducible analysis and compare statistical approaches—not to pretend a " +
        "correlation chart could settle a causal question.",
    sections: [
        {
            title: "Prepare a common dataset",
            paragraphs: [
                "The preprocessing notebook cleans and combines the source tables into a shared " +
                    "dataset. A separate mapping step assigns countries to broad regions, producing a " +
                    "region-enriched dataset that the analysis scripts can reuse. Keeping that " +
                    "preparation separate means the plots and models start from consistent inputs.",
            ],
        },
        {
            title: "Look at the data from several angles",
            bullets: [
                "Regional summaries compare the distribution of terrorist attacks across mapped regions.",
                "Correlation heatmaps compare selected freedom indicators with regional categories.",
                "Spending-trend plots follow Lockheed Martin and General Dynamics spending over time.",
                "Country-level plots compare defence-company spending shares among countries with recorded attacks.",
            ],
        },
        {
            title: "Try statistical models",
            paragraphs: [
                "The project includes OLS regressions for the two defence-company spending targets " +
                    "and a Random Forest regression workflow with feature-importance output. These are " +
                    "exploratory analyses: the scripts test associations and predictive signals, not " +
                    "causal effects.",
            ],
        },
    ],
    screenshots: [
        {
            src: "assets/screenshots/353-project-correlation-heatmap.png",
            alt: "353 Project correlation heatmap for freedom indicators and regions",
            caption: "Correlation heatmap",
        },
        {
            src: "assets/screenshots/353-project-feature-importance.png",
            alt: "353 Project random forest feature importance chart",
            caption: "Random Forest feature importance",
        },
    ],
    highlights: [
        "Pandas preprocessing notebook combines country-level source datasets.",
        "Region mapping step generates a reusable region-enriched dataset.",
        "Matplotlib and Seaborn visualizations explore regional patterns and spending trends.",
        "Statsmodels OLS regressions examine company-spending targets.",
        "Scikit-learn Random Forest analysis produces test/training error and feature-importance output.",
    ],
    links: [["Source", "https://github.com/abdurisaq/353-Project"]],
});
