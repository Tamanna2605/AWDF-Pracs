
import { useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete React Practical",
      completed: false,
    },
    {
      id: 2,
      title: "Study Code Splitting",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") {
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Mark task complete/incomplete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="page">
      <h1>Tasks</h1>

      {/* Add Task */}
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available. Add a new task!</p>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <h3
                style={{
                  textDecoration: task.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {task.title}
              </h3>

              <button onClick={() => toggleTask(task.id)}>
                {task.completed
                  ? "Mark Incomplete"
                  : "Mark Complete"}
              </button>

              <button onClick={() => deleteTask(task.id)}>
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

