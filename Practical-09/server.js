const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const NodeCache = require("node-cache");

const app = express();
const taskCache = new NodeCache({ stdTTL: 60 });
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://24it005_db_user:12345@cluster0.y9fm8vc.mongodb.net/taskmanager")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Task Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Task Management API is running",
  });
});

// GET all tasks
app.get("/tasks", async (req, res) => {
  const startTime = Date.now();

  const cachedTasks = taskCache.get("tasks");

  if (cachedTasks) {
    const responseTime = Date.now() - startTime;

    return res.json({
      source: "cache",
      responseTime: `${responseTime} ms`,
      tasks: cachedTasks,
    });
  }

  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    taskCache.set("tasks", tasks);

    const responseTime = Date.now() - startTime;

    res.json({
      source: "database",
      responseTime: `${responseTime} ms`,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single task
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new task
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
    });

   const savedTask = await task.save();

taskCache.del("tasks");

res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update task
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        completed: req.body.completed,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    taskCache.del("tasks");

res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

   taskCache.del("tasks");

res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});