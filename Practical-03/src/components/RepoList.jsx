function RepoList({ repos }) {
  if (repos.length === 0) {
    return <div className="empty-state">No repositories match your search.</div>;
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <article className="repo-card" key={repo.id}>
          <div className="repo-card-top">
            <span className="repo-label">GITHUB REPOSITORY</span>
            <span className="star-count">★ {repo.stargazers_count}</span>
          </div>
          <h3>{repo.name}</h3>
          <p>{repo.description || "No description has been added to this repository yet."}</p>
          <div className="repo-card-bottom">
            <span>{repo.language || "Code repository"}</span>
            <a href={repo.html_url} target="_blank" rel="noreferrer">View on GitHub ↗</a>
          </div>
        </article>
      ))}
    </div>
  );
}

export default RepoList;
