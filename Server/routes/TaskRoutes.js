const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

//Create a new task
router.post("/", async (req, res) => {
  const { taskName, tag, dueDate, createdBy, assignedTo } = req.body;

  try {
    const newTask = new Task({ taskName, tag, dueDate, createdBy, assignedTo });
    await newTask.save();

    const populatedTask = await Task.findById(newTask._id)
      .populate("createdBy", "username")
      .populate("assignedTo", "username");

    res.status(201).json({ task: populatedTask });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ error: "Failed to create task" });
  }
});

//Get all tasks where user is either assignedTo or createdBy
router.get("/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.params.userId },
        { assignedTo: req.params.userId },
      ],
    })
      .populate("createdBy", "username")
      .populate("assignedTo", "username");

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

//Update a task
router.put("/:taskId", async (req, res) => {
  const { taskName, tag, dueDate } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { taskName, tag, dueDate },
      { new: true }
    );
    res.json({ updatedTask });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ error: "Failed to update task" });
  }
});

//Mark a task as completed
router.put("/complete/:taskId", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { completed: true },
      { new: true }
    )
      .populate("createdBy", "username")
      .populate("assignedTo", "username");

    res.json({ updatedTask });
  } catch (error) {
    console.error("Error marking task complete:", error.message);
    res.status(500).json({ error: "Failed to mark task as completed" });
  }
});

// Mark a task as incomplete
router.put("/incomplete/:taskId", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { completed: false },
      { new: true }
    )
      .populate("createdBy", "username")
      .populate("assignedTo", "username");

    res.json({ updatedTask });
  } catch (error) {
    console.error("Error marking task incomplete:", error.message);
    res.status(500).json({ error: "Failed to mark task as incomplete" });
  }
});

// Delete a task
router.delete("/:taskId", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Get tasks between two users (assigned by and assigned to)
router.get("/between/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const assignedByYou = await Task.find({
      createdBy: userId,
      assignedTo: friendId,
    }).populate("assignedTo", "username");

    const assignedToYou = await Task.find({
      createdBy: friendId,
      assignedTo: userId,
    }).populate("createdBy", "username");

    res.json({ assignedByYou, assignedToYou });
  } catch (err) {
    console.error("Error fetching tasks between users:", err.message);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

module.exports = router;
