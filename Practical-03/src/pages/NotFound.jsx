import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container not-found">
      <span className="section-number">ERROR / 404</span>
      <h1>Lost your <span>way?</span></h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="submit-button back-home" to="/">Back to home ↗</Link>
    </main>
  );
}

export default NotFound;
