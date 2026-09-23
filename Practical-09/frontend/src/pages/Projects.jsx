function Projects() {
    return (
      <div className="page">
        <h1>Projects</h1>
  
        <div className="card">
          <h2>Task Management Project</h2>
  
          <p>
            A full-stack task management application built
            using React and Node.js.
          </p>
  
          <p>
            This project uses lazy loading and code splitting
            to improve frontend performance.
          </p>
        </div>
  
        <div className="card">
          <h2>Performance Optimization</h2>
  
          <p>
            Projects and Contact pages are loaded only when
            their routes are visited.
          </p>
        </div>
      </div>
    );
  }
  
  export default Projects;