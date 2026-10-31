function validateRegister(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required."
    });
  }

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 60) {
    return res.status(400).json({ message: "Name must be between 2 and 60 characters." });
  }

  if (typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ message: "Please provide a valid email address." });
  }

  if (typeof password !== "string" || password.length < 8 || password.length > 72) {
    return res.status(400).json({ message: "Password must be between 8 and 72 characters." });
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  if (typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof password !== "string") {
    return res.status(400).json({ message: "Invalid email or password format." });
  }

  req.body.email = email.trim().toLowerCase();
  next();
}

function validateTask(req, res, next) {
  const { title, description, priority, completed } = req.body;

  if (req.method === "POST" && (typeof title !== "string" || !title.trim())) {
    return res.status(400).json({ message: "Task title is required." });
  }

  if (title !== undefined &&
      (typeof title !== "string" || !title.trim() || title.trim().length > 120)) {
    return res.status(400).json({ message: "Title must contain 1 to 120 characters." });
  }

  if (description !== undefined &&
      (typeof description !== "string" || description.length > 1000)) {
    return res.status(400).json({ message: "Description must be 1000 characters or fewer." });
  }

  if (priority !== undefined && !["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ message: "Priority must be low, medium or high." });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ message: "Completed must be true or false." });
  }

  if (title !== undefined) req.body.title = title.trim();
  if (description !== undefined) req.body.description = description.trim();
  next();
}

module.exports = { validateRegister, validateLogin, validateTask };
