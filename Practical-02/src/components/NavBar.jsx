import { NavLink } from "react-router-dom";

function NavBar({ darkMode, onToggleTheme }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">TB<span>.</span></NavLink>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>

      <button className="theme-button" onClick={onToggleTheme} type="button">
        {darkMode ? "☀ Light mode" : "☾ Dark mode"}
      </button>
    </nav>
  );
}

export default NavBar;
