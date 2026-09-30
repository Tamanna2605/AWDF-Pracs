function sendNotification(task) {
  console.log(
    `[Notification] Processing started for task: ${task.title}`
  );
  console.log(
    `[Notification] Assigned user: ${task.assignedUser}`
  );

  setTimeout(() => {
    console.log(
      `[Notification] Completed at ${new Date().toISOString()}`
    );
    console.log(
      `[Notification] Task "${task.title}" assigned to ${task.assignedUser}`
    );
  }, 2000);
}

module.exports = sendNotification;