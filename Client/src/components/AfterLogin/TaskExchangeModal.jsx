const TaskExchangeModal = ({ friend, onClose, data }) => {
    const tasksAssignedByMe = data?.assignedByYou || [];
    const tasksAssignedToMe = data?.assignedToYou || [];
  
    return (
      <div className="task-modal-backdrop">
        <div className="task-modal-box">
          <button className="task-modal-close" onClick={onClose}>
            ❌
          </button>
          <h2 className="task-modal-heading">Tasks with {friend.username}</h2>
  
          <div className="task-section-by-me">
            <h3 className="task-subheading">
              Tasks You Assigned to {friend.username}
            </h3>
            {tasksAssignedByMe.length === 0 ? (
              <p className="task-empty-msg">No tasks assigned by you ❌</p>
            ) : (
              <ul className="task-ul-by-me">
                {tasksAssignedByMe.map((task) => (
                  <li key={task._id} className="task-item">
                    {task.taskName} - {new Date(task.dueDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
  
          <div className="task-section-to-me">
            <h3 className="task-subheading">
              Tasks Assigned to You by {friend.username}
            </h3>
            {tasksAssignedToMe.length === 0 ? (
              <p className="task-empty-msg">
                No tasks assigned by {friend.username} ❌
              </p>
            ) : (
              <ul className="task-ul-to-me">
                {tasksAssignedToMe.map((task) => (
                  <li key={task._id} className="task-item">
                    {task.taskName} - {new Date(task.dueDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
};

export default TaskExchangeModal;
