import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarView({
  tasks = [],
  onDeleteTask,
  onEditTask,
  onMarkComplete,
  onUndoComplete,
}) {
  return (
    <div className="calendar-container">
      <div className="calendarrr">
        <h2>Task Calendar</h2>
        <Calendar />
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet. Click “Add Task” to get started!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="task-card"
              style={{
                backgroundColor: task.completed ? "#2C5F2D" : undefined,
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
                  👤 <strong>Assigned To:</strong> {task.assignedTo?.username || "You"}
                </p>
                <p>
                  📝 <strong>Assigned By:</strong> {task.createdBy?.username || "You"}
                </p>
              </div>

              <div className="task-actions">
                {!task.completed && (
                  <button onClick={() => onMarkComplete(task._id)}>✅ Mark Completed</button>
                )}

                {task.completed && (
                  <button onClick={() => onUndoComplete(task._id)}>↩️ Mark as Incomplete</button>
                )}

                <button onClick={() => onEditTask(task)}>✏️ Edit</button>
                <button onClick={() => onDeleteTask(task._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarView;
