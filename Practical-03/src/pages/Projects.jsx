import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import RepoList from "../components/RepoList.jsx";

const GITHUB_USERNAME = "Tamanna2605";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRepositories() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "The GitHub username was not found. Check GITHUB_USERNAME in Projects.jsx."
              : `GitHub API returned ${response.status}. Please try again later.`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(data.message || "Unexpected response received from GitHub.");
        }

        setRepos(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong while fetching repositories.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRepositories();

    return () => controller.abort();
  }, [retryCount]);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) =>
      repo.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [repos, search]);

  function retryFetch() {
    setRetryCount((count) => count + 1);
  }

  return (
    <main className="container page-container">
      <section className="section">
        <span className="section-number">PROJECTS / LIVE API DATA</span>
        <h1 className="page-title">My GitHub <span>repositories.</span></h1>
        <p className="section-intro">
          Repository data is fetched live from the GitHub REST API for <strong>@{GITHUB_USERNAME}</strong>.
        </p>

        {!loading && !error && (
          <div className="repo-toolbar">
            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search repositories by name..."
              />
            </label>
            <span className="repo-total">{filteredRepos.length} of {repos.length} repositories</span>
          </div>
        )}

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} onRetry={retryFetch} />}
        {!loading && !error && <RepoList repos={filteredRepos} />}
      </section>
    </main>
  );
}

export default Projects;
