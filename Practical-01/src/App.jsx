import Header from "./components/Header.jsx";
import NavBar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const skills = ["HTML", "CSS", "JavaScript", "React", "C++", "Oracle SQL"];

  return (
    <div className="app">
      <Header name="Tamanna Bhura" themeColor="#5b5bd6" />
      <NavBar />
      <main className="container">
        <About description="I am an Information Technology student interested in web development, software engineering, and cybersecurity. I enjoy learning new technologies and building practical projects." />
        <Skills skillList={skills} />
        <Projects />
      </main>
      <Footer email="bhuratamanna7@gmail.com" />
    </div>
  );
}

export default App;
