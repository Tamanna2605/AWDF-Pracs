const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose
    .connect("mongodb://127.0.0.1:27017/taskmanager")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Task Management API is running"
    });
});


// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});