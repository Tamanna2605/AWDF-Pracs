import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Tamanna Bhura</p>
      <p>Built with React, Vite and the GitHub REST API</p>
      <Link to="/contact">Get in touch ↗</Link>
    </footer>
  );
}

export default Footer;
