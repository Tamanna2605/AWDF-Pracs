function ProjectCard({ number, category, title, description, technologies }) {
  return (
    <article className="project-card">
      <div className="project-top">
        <span>{number}</span>
        <span className="project-type">{category}</span>
      </div>
      <div className="project-symbol">{number === "01" ? "⌘" : number === "02" ? "▤" : "⌁"}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-bottom">{technologies}</div>
    </article>
  );
}

export default ProjectCard;
