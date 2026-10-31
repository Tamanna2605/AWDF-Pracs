import ProjectCard from "../components/ProjectCard.jsx";

const projects = [
  {
    number: "01",
    category: "FRONTEND",
    title: "Student Portfolio",
    description: "A personal portfolio built with reusable React components, props, and client-side navigation.",
    technologies: "React · Vite · CSS"
  },
  {
    number: "02",
    category: "FULL STACK",
    title: "Task Management App",
    description: "A task organiser for creating, updating, and tracking everyday work.",
    technologies: "React · Node.js · MongoDB"
  },
  {
    number: "03",
    category: "CYBERSECURITY",
    title: "Cybersecurity Log Analyzer",
    description: "A learning project focused on reviewing log events and identifying suspicious activity.",
    technologies: "Python · Security"
  }
];

function Projects() {
  return (
    <main className="container page-container">
      <section className="section">
        <span className="section-number">PROJECTS / SELECTED WORK</span>
        <h1 className="page-title">Things I’ve <span>built.</span></h1>
        <p className="section-intro">A few projects and ideas from my learning journey.</p>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.number} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Projects;
