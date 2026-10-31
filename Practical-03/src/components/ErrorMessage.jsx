function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-panel error-panel" role="alert">
      <div className="error-icon">!</div>
      <h3>Could not load repositories</h3>
      <p>{message}</p>
      <button className="action-button" type="button" onClick={onRetry}>Try again ↻</button>
    </div>
  );
}

export default ErrorMessage;
