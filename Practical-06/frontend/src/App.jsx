import { useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "./api";

import "./App.css";

function App() {

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [actionLoading, setActionLoading] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const [message, setMessage] = useState("");


    // ============================
    // LOAD TASKS
    // ============================

    const loadTasks = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getTasks();

            setTasks(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadTasks();
    }, []);


    // ============================
    // CREATE TASK
    // ============================

    const handleCreate = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            setError("Task title is required");
            return;
        }

        try {

            setActionLoading(true);
            setError("");

            const newTask = await createTask({
                title,
                description
            });

            setTasks((previousTasks) => [
                newTask,
                ...previousTasks
            ]);

            setTitle("");
            setDescription("");

            setMessage("✅ Task created successfully!");

        } catch (error) {

            setError(error.message);

        } finally {

            setActionLoading(false);
        }
    };


    // ============================
    // START EDIT
    // ============================

    const startEdit = (task) => {

        setEditingId(task._id);
        setEditTitle(task.title);
        setEditDescription(task.description);

    };


    // ============================
    // UPDATE TASK
    // ============================

    const handleUpdate = async (id) => {

        try {

            setActionLoading(true);
            setError("");

            const updatedTask = await updateTask(id, {
                title: editTitle,
                description: editDescription
            });

            setTasks((previousTasks) =>
                previousTasks.map((task) =>
                    task._id === id ? updatedTask : task
                )
            );

            setEditingId(null);

            setMessage("✅ Task updated successfully!");

        } catch (error) {

            setError(error.message);

        } finally {

            setActionLoading(false);
        }
    };


    // ============================
    // DELETE TASK
    // ============================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setActionLoading(true);
            setError("");

            await deleteTask(id);

            setTasks((previousTasks) =>
                previousTasks.filter(
                    (task) => task._id !== id
                )
            );

            setMessage("✅ Task deleted successfully!");

        } catch (error) {

            setError(error.message);

        } finally {

            setActionLoading(false);
        }
    };


    return (
        <div className="app">

            <h1>Task Management System</h1>

            {/* SUCCESS MESSAGE */}

            {message && (
                <div className="success">
                    {message}
                </div>
            )}


            {/* ERROR MESSAGE */}

            {error && (
                <div className="error">
                    ❌ {error}
                </div>
            )}


            {/* CREATE TASK */}

            <div className="card">

                <h2>Create New Task</h2>

                <form onSubmit={handleCreate}>

                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <textarea
                        placeholder="Task description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        disabled={actionLoading}
                    >
                        {actionLoading
                            ? "Creating..."
                            : "Add Task"}
                    </button>

                </form>

            </div>


            {/* TASK LIST */}

            <div className="card">

                <h2>My Tasks</h2>

                {loading ? (

                    <p>Loading tasks...</p>

                ) : tasks.length === 0 ? (

                    <p>No tasks found.</p>

                ) : (

                    tasks.map((task) => (

                        <div
                            className="task"
                            key={task._id}
                        >

                            {editingId === task._id ? (

                                <>
                                    <input
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <textarea
                                        value={editDescription}
                                        onChange={(e) =>
                                            setEditDescription(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        onClick={() =>
                                            handleUpdate(task._id)
                                        }
                                        disabled={actionLoading}
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() =>
                                            setEditingId(null)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </>

                            ) : (

                                <>
                                    <h3>{task.title}</h3>

                                    <p>
                                        {task.description}
                                    </p>

                                    <button
                                        onClick={() =>
                                            startEdit(task)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(task._id)
                                        }
                                        disabled={actionLoading}
                                    >
                                        Delete
                                    </button>
                                </>

                            )}

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default App;