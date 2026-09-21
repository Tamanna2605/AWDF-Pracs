import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

// Lazy-loaded pages
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

function LoadingPage() {
  return (
    <div className="loading">
      <div className="loader"></div>

      <h2>Loading page...</h2>

      <p>
        Please wait while the page is being loaded.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <h2>Task Manager</h2>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/tasks">
            Tasks
          </Link>

          <Link to="/projects">
            Projects
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>

      </nav>

      <Suspense fallback={<LoadingPage />}>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default App;