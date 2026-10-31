const mongoose = require("mongoose");
const Task = require("../models/Task");

async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ count: tasks.length, tasks });
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description, priority } = req.body;
    const task = await Task.create({
      title,
      description,
      priority,
      user: req.user.id
    });
    res.status(201).json({ message: "Task created successfully.", task });
  } catch (error) {
    next(error);
  }
}

async function getTaskById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found." });

    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const allowedFields = ["title", "description", "completed", "priority"];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Provide at least one valid field to update." });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found." });

    res.status(200).json({ message: "Task updated successfully.", task });
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) return res.status(404).json({ message: "Task not found." });

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    next(error);
  }
}

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
