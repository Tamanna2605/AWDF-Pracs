function LoadingSpinner() {
  return (
    <div className="state-panel" role="status" aria-live="polite">
      <span className="spinner" />
      <p>Fetching GitHub repositories...</p>
    </div>
  );
}

export default LoadingSpinner;
