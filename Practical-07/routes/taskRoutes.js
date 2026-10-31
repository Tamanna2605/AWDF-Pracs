const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const { validateTask } = require("../middleware/validate");
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// Every task route requires a valid JWT.
router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", validateTask, createTask);
router.get("/:id", getTaskById);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
