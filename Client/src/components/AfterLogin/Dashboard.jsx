import React, { useEffect, useState } from "react";
import NavbarAfterLogin from "./NavbarAfterLogin";
import TaskModal from "./TaskModal";
import CalendarView from "./CalendarView";
import Home from "./Home";
import FriendsList from "./FriendList";
import axios from "axios";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [activeComponent, setActiveComponent] = useState("home");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [friends, setFriends] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/auth/user/${userId}`
          );
          setUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      };
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/tasks/${userId}`
          );
          setTasks(response.data);
        } catch (error) {
          console.error("Error fetching tasks", error);
        }
      };
      fetchTasks();
    }
  }, [userId]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/friends/${userId}`
        );
        setFriends(res.data);
      } catch (err) {
        console.error("Error fetching friends:", err.message);
      }
    };

    if (userId) fetchFriends();
  }, [userId]);

  const addTask = async (task) => {
    try {
      if (taskToEdit) {
        const response = await axios.put(
          `http://localhost:5000/api/tasks/${taskToEdit._id}`,
          {
            taskName: task.taskName,
            tag: task.tag,
            dueDate: task.dueDate,
          }
        );

        const updatedTasks = tasks.map((t) =>
          t._id === taskToEdit._id ? response.data.updatedTask : t
        );
        setTasks(updatedTasks);
        setTaskToEdit(null);
      } else {
        const response = await axios.post("http://localhost:5000/api/tasks", {
          createdBy: userId,
          assignedTo: task.assignedTo || userId, // fallback to self if not assigned
          taskName: task.taskName,
          tag: task.tag,
          dueDate: task.dueDate,
        });
        setTasks([...tasks, response.data.task]);
      }

      setShowTaskModal(false);
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const editTask = (task) => {
    setTaskToEdit(task);
    setShowTaskModal(true);
  };

  const undoTaskComplete = async (taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/incomplete/${taskId}`
      );
      const updatedTask = response.data.updatedTask;
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error marking task as incomplete", error);
    }
  };
  
  const markTaskComplete = async (taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/complete/${taskId}`
      );
      const updatedTask = response.data.updatedTask;
      console.log("Updated task from backend:", updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error marking task complete", error);
    }
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "calendar":
        return <CalendarView tasks={tasks} onMarkComplete={markTaskComplete} onUndoComplete={undoTaskComplete}/>;
      case "friends":
        return (
          <FriendsList
            userId={userId}
            onClose={() => setActiveComponent("home")}
          />
        );
      case "home":
      default:
        return (
          <Home
            username={username}
            tasks={tasks}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
            userId={userId}
            onMarkComplete={markTaskComplete}
            onUndoComplete={undoTaskComplete}
          />
        );
    }
  };

  return (
    <div className="dashboard">
      <NavbarAfterLogin
        openTaskModal={() => {
          setTaskToEdit(null);
          setShowTaskModal(true);
        }}
        openCalendar={() => setActiveComponent("calendar")}
        openHome={() => setActiveComponent("home")}
        openFriends={() => setActiveComponent("friends")}
        username={username}
      />

      <div className="main-content">{renderContent()}</div>

      {showTaskModal && (
        <div className="modal-backdrop" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <TaskModal
              onClose={() => setShowTaskModal(false)}
              onSave={addTask}
              taskToEdit={taskToEdit}
              userId={userId}
              friends={friends}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
