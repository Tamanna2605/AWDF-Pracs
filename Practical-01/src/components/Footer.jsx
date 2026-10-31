function Footer({ email }) {
  return (
    <footer className="footer" id="contact">
      <p>Contact: <a href={`mailto:${email}`}>{email}</a></p>
      <p>© {new Date().getFullYear()} Student Portfolio</p>
    </footer>
  );
}

export default Footer;
