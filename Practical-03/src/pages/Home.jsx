import Header from "../components/Header.jsx";

const skills = ["HTML", "CSS", "JavaScript", "React", "C++", "Oracle SQL", "Git", "Cybersecurity"];

function Home() {
  return (
    <>
      <Header name="Tamanna Bhura" />
      <main className="container">
        <section className="section">
          <span className="section-number">01 / ABOUT</span>
          <h2>A little about <span>me.</span></h2>
          <div className="about-panel">
            <div className="monogram">TB<span>✳</span></div>
            <div>
              <p className="lead">I’m an Information Technology student who enjoys turning ideas into useful digital experiences.</p>
              <p className="muted">I’m exploring frontend development, software engineering, and cybersecurity. I believe the best way to learn technology is to build with it, make mistakes, and improve with every iteration.</p>
            </div>
          </div>
        </section>
        <section className="section">
          <span className="section-number">02 / TOOLKIT</span>
          <h2>Things I’m learning <span>& using.</span></h2>
          <p className="section-intro">A growing set of tools and technologies I use to bring ideas to life.</p>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <div className="skill-chip" key={skill}>
                <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
                {skill}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
