const taskEvents = require("./events");
const sendNotification = require("./notificationService");

taskEvents.on("task-created", (task) => {
  sendNotification(task);
});
taskEvents.on("task-deleted", (task) => {
  console.log(
    `[Notification] Task "${task.title}" was deleted at ${new Date().toISOString()}`
  );
});
taskEvents.on("error", (error) => {
  console.error(`[Event Error] ${error.message}`);
});