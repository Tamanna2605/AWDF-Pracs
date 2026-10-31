
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks from the backend
  async function fetchTasks() {
    try {
      setError("");
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError("Cannot connect to the server. Please check the backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  async function addTask(e) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          completed: false
        })
      });

      if (!response.ok) throw new Error("Task could not be added");

      setTitle("");
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  // Update task title or completion status
  async function updateTask(task, newTitle = task.title, completed = task.completed) {
    try {
      const response = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          completed: completed
        })
      });

      if (!response.ok) throw new Error("Task could not be updated");

      setEditingId(null);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete a task
  async function deleteTask(id) {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Task could not be deleted");

      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">Task Manager</div>
        <span className="api-status">REST API Connected</span>
      </header>

      <main className="container">
        <section className="hero">
          <p className="eyebrow">ORGANIZE YOUR DAY</p>
          <h1>Manage your tasks.</h1>
          <p className="subtitle">
            Create, update, complete and organize your work in one place.
          </p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <h2>{tasks.length}</h2>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <h2>{completedCount}</h2>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <h2>{tasks.length - completedCount}</h2>
          </div>
        </section>

        <section className="task-panel">
          <h2>Add a New Task</h2>

          <form className="add-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter your task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">+ Add Task</button>
          </form>
        </section>

        <section className="task-section">
          <div className="section-heading">
            <h2>Your Tasks</h2>
            <span>{tasks.length} tasks</span>
          </div>

          {error && <p className="error">{error}</p>}

          {loading ? (
            <p className="empty">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <div className="empty">
              <h3>No tasks yet</h3>
              <p>Add your first task to get started.</p>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map(task => (
                <div className="task-card" key={task.id}>
                  <div className="task-info">
                    <span className="task-id">TASK #{task.id}</span>

                    {editingId === task.id ? (
                      <input
                        className="edit-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    ) : (
                      <h3 className={task.completed ? "completed" : ""}>
                        {task.title}
                      </h3>
                    )}

                    <span className={task.completed ? "status done" : "status pending"}>
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <div className="actions">
                    {editingId === task.id ? (
                      <>
                        <button
                          className="save-btn"
                          onClick={() => updateTask(task, editTitle)}
                        >
                          Save
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="complete-btn"
                          onClick={() =>
                            updateTask(task, task.title, !task.completed)
                          }
                        >
                          {task.completed ? "Undo" : "Complete"}
                        </button>

                        <button
                          className="edit-btn"
                          onClick={() => {
                            setEditingId(task.id);
                            setEditTitle(task.title);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        Task Manager · React + Vite + Express REST API
      </footer>
    </div>
  );
}

export default App;
