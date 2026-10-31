const projects = [
  {
    title: "Student Portfolio",
    description: "A personal portfolio page created using React components."
  },
  {
    title: "Task Management App",
    description: "A simple application concept for organizing daily tasks."
  },
  {
    title: "Cybersecurity Log Analyzer",
    description: "A beginner project idea for identifying suspicious log activity."
  }
];

function Projects() {
  return (
    <section className="section-card" id="projects">
      <h2>My Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
