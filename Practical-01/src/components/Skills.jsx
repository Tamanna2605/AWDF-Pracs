function Skills({ skillList }) {
  return (
    <section className="section-card" id="skills">
      <h2>My Skills</h2>
      <ul className="skills-list">
        {skillList.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
