const express = require("express");
const app = express();

const PORT = 5002;

// Middleware to parse JSON
app.use(express.json());

// In-memory array
let tasks = [
    {
        id: 1,
        title: "Complete Practical",
        completed: false
    }
];

/////////////////////////////////////////////////
// Global Logging Middleware
/////////////////////////////////////////////////

app.use((req, res, next) => {

    console.log(
        `${req.method} ${req.url} - ${new Date().toISOString()}`
    );

    next();

});

/////////////////////////////////////////////////
// Content-Type Middleware
/////////////////////////////////////////////////

app.use((req, res, next) => {

    if (
        (req.method === "POST" || req.method === "PUT") &&
        !req.is("application/json")
    ) {
        return res.status(400).json({
            message: "Content-Type must be application/json"
        });
    }

    next();

});

/////////////////////////////////////////////////
// Route-specific Middleware
/////////////////////////////////////////////////

function validateTaskId(req, res, next) {

    const id = Number(req.params.id);

    if (isNaN(id)) {

        return res.status(400).json({
            message: "Invalid Task ID"
        });

    }

    next();

}

/////////////////////////////////////////////////
// GET All Tasks
/////////////////////////////////////////////////

app.get("/tasks", (req, res) => {

    res.status(200).json(tasks);

});

/////////////////////////////////////////////////
// GET Single Task
/////////////////////////////////////////////////

app.get("/tasks/:id", validateTaskId, (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {

        return res.status(404).json({
            message: "Task not found"
        });

    }

    res.status(200).json(task);

});

/////////////////////////////////////////////////
// POST Create Task
/////////////////////////////////////////////////

app.post("/tasks", (req, res) => {

    const { title, completed } = req.body;

    const newTask = {

        id: tasks.length + 1,
        title,
        completed

    };

    tasks.push(newTask);

    res.status(201).json(newTask);

});

/////////////////////////////////////////////////
// PUT Update Task
/////////////////////////////////////////////////

app.put("/tasks/:id", validateTaskId, (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {

        return res.status(404).json({
            message: "Task not found"
        });

    }

    task.title = req.body.title;
    task.completed = req.body.completed;

    res.status(200).json(task);

});

/////////////////////////////////////////////////
// DELETE Task
/////////////////////////////////////////////////

app.delete("/tasks/:id", validateTaskId, (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: "Task not found"
        });

    }

    tasks.splice(index, 1);

    res.status(200).json({
        message: "Task deleted successfully"
    });

});

/////////////////////////////////////////////////
// 404 Handler
/////////////////////////////////////////////////

app.use((req, res) => {

    res.status(404).json({

        success: false,
        message: "Route Not Found"

    });

});

/////////////////////////////////////////////////
// Global Error Handler
/////////////////////////////////////////////////

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({

        success: false,
        message: "Something went wrong"

    });

});

/////////////////////////////////////////////////

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});