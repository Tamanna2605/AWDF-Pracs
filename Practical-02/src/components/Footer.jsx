import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Tamanna Bhura</p>
      <p>Built with React and React Router</p>
      <Link to="/contact">Get in touch ↗</Link>
    </footer>
  );
}

export default Footer;
