function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === 11000) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid resource ID." });
  }

  res.status(500).json({ message: "Internal server error." });
}

module.exports = errorHandler;
