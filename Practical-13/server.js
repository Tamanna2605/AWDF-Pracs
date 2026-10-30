const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const NodeCache = require("node-cache");
const { GoogleGenAI } = require("@google/genai");
const taskEvents = require("./events");
require("./listeners");

const app = express();
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

// Stores recent AI requests to limit repeated calls.
const aiRequestCache = new NodeCache({
  stdTTL: 60,
  checkperiod: 120,
});
const taskCache = new NodeCache({ stdTTL: 60 });
app.use(cors());
app.use(express.json());


 // MongoDB connection
// Connect to MongoDB only when running the server directly
if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.log("MongoDB connection error:", error);
    });
}

// Task Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    assignedUser: {
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

 // Generate a task description using Gemini
 app.post("/ai/generate-description", async (req, res) => {
  const title = req.body.title;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      message: "Please provide a task title.",
    });
  }

  if (title.length > 150) {
    return res.status(400).json({
      message: "Task title must be 150 characters or fewer.",
    });
  }

  const cleanTitle = title.trim();
  const cacheKey = cleanTitle.toLowerCase();

  // Prevent repeated requests for the same title within 60 seconds.
  if (aiRequestCache.has(cacheKey)) {
    return res.status(429).json({
      message: "Please wait 60 seconds before generating again for this title.",
    });
  }

  // Provide a fallback if the AI service is unavailable.
  const fallbackDescription =
    `Complete "${cleanTitle}" by identifying the required steps, ` +
    "working through them, and reviewing the result.";

  if (!ai) {
    return res.status(200).json({
      description: fallbackDescription,
      source: "fallback",
      message: "AI is unavailable. You can edit this suggested description.",
    });
  }

  // Set the limit before calling the external service.
  aiRequestCache.set(cacheKey, true);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents:
        `Write a clear, useful task description in 2 to 3 sentences ` +
        `for this task title: "${cleanTitle}". ` +
        "Describe the goal and practical steps. Do not invent deadlines, " +
        "people, or facts. Return only the description.",
      config: {
        maxOutputTokens: 150,
      },
    });

    const description = response.text?.trim();

    if (!description) {
      throw new Error("Gemini returned an empty response.");
    }

    return res.json({
      description,
      source: "gemini",
      message: "AI-generated suggestion. Please review and edit before saving.",
    });
  } catch (error) {
    console.error("Gemini description generation failed:", error.message);

    return res.status(200).json({
      description: fallbackDescription,
      source: "fallback",
      message: "AI generation failed. A fallback suggestion is provided for editing.",
    });
  }
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
      description: req.body.description || "",
      assignedUser: req.body.assignedUser || "Unassigned",
    });

    const savedTask = await task.save();

    taskCache.del("tasks");

    console.log(`[API] Response sent at ${new Date().toISOString()}`);

    res.status(201).json(savedTask);

    taskEvents.emit("task-created", savedTask);

  } catch (error) {
    console.log(error);

    // Only send an error response if a response has not already been sent
    if (!res.headersSent) {
      res.status(400).json({ message: error.message });
    }
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

taskEvents.emit("task-deleted", task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server only when this file is run directly
if (require.main === module) {
  const PORT = 5001;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app for automated testing
module.exports = app;