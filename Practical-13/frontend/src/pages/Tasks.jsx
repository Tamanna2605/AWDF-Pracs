import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/tasks";
const AI_API_URL = "http://localhost:5001/ai/generate-description";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      setTasks(data.tasks || data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Generate AI task description
  const generateDescription = async () => {
    if (!newTask.trim()) {
      setAiMessage("Please enter a task title first.");
      return;
    }

    setAiLoading(true);
    setAiMessage("");

    try {
      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask,
          description: description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "AI request failed");
      }

      setDescription(data.description || "");
      setAiMessage(data.message || "Description generated.");
    } catch (error) {
      console.error("AI description error:", error);
      setAiMessage(
        "AI service is unavailable. Please try again later."
      );
    } finally {
      setAiLoading(false);
    }
  };

  // Add task
  const addTask = async () => {
    if (newTask.trim() === "") {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add task");
      }

      setTasks((previousTasks) => [data, ...previousTasks]);
      setNewTask("");
      setDescription("");
      setAiMessage("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task
  const toggleTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          completed: !task.completed,
        }),
      });

      const updatedTask = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item._id === updatedTask._id ? updatedTask : item
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="page">
      <h1>Tasks</h1>


<div className="add-task">
  <label>Task Title</label>

  <input
    type="text"
    placeholder="What needs to be done?"
    value={newTask}
    onChange={(e) => setNewTask(e.target.value)}
  />

  <button
    className="generate-btn"
    onClick={generateDescription}
    disabled={aiLoading}
  >
    {aiLoading ? "Generating..." : "✨ Generate Description"}
  </button>

  <label>Task Description</label>

  <textarea
    className="description-box"
    placeholder="Your AI-generated description will appear here..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <p className="ai-disclaimer">
    AI-generated content. Review and edit before saving.
  </p>

  {aiMessage && (
    <p className="ai-message">{aiMessage}</p>
  )}

  <button className="add-btn" onClick={addTask}>
    Add Task
  </button>
</div>


      <div className="task-list">
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks available. Add a new task!</p>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <h3
                style={{
                  textDecoration: task.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {task.title}
              </h3>

              <button onClick={() => toggleTask(task)}>
                {task.completed
                  ? "Mark Incomplete"
                  : "Mark Complete"}
              </button>

              <button onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;
