import React from "react";

function Home({
  username,
  tasks,
  onDeleteTask,
  onEditTask,
  onMarkComplete,
  userId,
  onUndoComplete,
}) {
  const assignedToOthers = tasks.filter(
    (task) => task.createdBy._id === userId && task.assignedTo._id !== userId
  );

  const yourTasks = tasks.filter((task) => task.assignedTo._id === userId);

  const renderTaskCard = (task) => {
    const isCreator = task.createdBy._id === userId;
    const isCompleted = task.completed;

    return (
      <div
        key={task._id}
        className="task-card"
        style={{
          backgroundColor: isCompleted ? "#2C5F2D" : undefined,
        }}
      >
        <h3>{task.taskName}</h3>
        <p>
          <strong>Tag:</strong> {task.tag}
        </p>
        <p>
          <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </p>

        <div className="task-meta">
          <p>
            👤 <strong>Assigned To:</strong> {task.assignedTo.username}
          </p>
          <p>
            📝 <strong>Assigned By:</strong> {task.createdBy.username}
          </p>
        </div>

        <div className="task-actions">
          {!isCompleted && (
            <button onClick={() => onMarkComplete(task._id)}>
              ✅ Mark Completed
            </button>
          )}

          {isCompleted && (
            <button onClick={() => onUndoComplete(task._id)}>
              ↩️ Mark as Incomplete
            </button>
          )}

          {isCreator && (
            <>
              {!isCompleted && (
                <button onClick={() => onEditTask(task)}>✏️ Edit</button>
              )}
              <button onClick={() => onDeleteTask(task._id)}>🗑️ Delete</button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="home-container">
      <h1>Hello, {username} 👋</h1>

      <h2>Your Tasks 📋</h2>
      <div className="task-list-one">
        {yourTasks.length === 0 ? (
          <p>No tasks yet. Click “Add Task” to get started!</p>
        ) : (
          yourTasks.map(renderTaskCard)
        )}
      </div>

      <h2>Tasks You Assigned to Others 📋</h2>
      <div className="task-list-one">
        {assignedToOthers.length === 0 ? (
          <p>No tasks assigned to others yet</p>
        ) : (
          assignedToOthers.map(renderTaskCard)
        )}
      </div>
    </div>
  );
}

export default Home;
