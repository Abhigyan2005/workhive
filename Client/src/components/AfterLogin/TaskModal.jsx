import React, { useState } from "react";

function TaskModal({ onClose, onSave, taskToEdit, userId, friends }) {
  const [taskName, setTaskName] = useState(taskToEdit?.taskName || "");
  const [tag, setTag] = useState(taskToEdit?.tag || "Work");
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate?.slice(0, 10) || "");

  const initialAssignedTo =
    typeof taskToEdit?.assignedTo === "string"
      ? taskToEdit.assignedTo
      : taskToEdit?.assignedTo?._id || userId;

  const [assignedTo, setAssignedTo] = useState(initialAssignedTo);

  const handleSubmit = () => {
    if (!taskName || !dueDate) return;
    onSave({ taskName, tag, dueDate, assignedTo });
  };

  return (
    <div className="task-modal">
      <h2>{taskToEdit ? "Edit Task" : "Add Task"}</h2>

      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Fitness">Fitness</option>
        <option value="Personal">Personal</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
        <option value={userId}>Assign to Yourself</option>
        {friends.map((f) => (
          <option key={f._id} value={f._id}>
            {f.username}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>{taskToEdit ? "Update" : "Create"}</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default TaskModal;
