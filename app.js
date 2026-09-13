// The first renderer keeps the page deliberately small and data-driven.
const app = document.querySelector("main");
const { profile, projects } = DATA;

app.innerHTML = `
  <section class="hero">
    <h1>${profile.name}</h1>
    <p>${profile.tagline}</p>
  </section>
  <section>
    <h2>Projects</h2>
    <div class="projects">
      ${projects
          .map(
              (project) => `
        <article>
          <h3>${project.name}</h3>
          <p>${project.summary}</p>
        </article>
      `,
          )
          .join("")}
    </div>
  </section>
`;
