const express = require("express");
const User = require("../models/User");

const router = express.Router();

//Get friend list
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("friends", "username");
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ error: "Error fetching friends" });
  }
});

router.post("/add-friend", async (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ message: "User ID and Friend ID are required" });
  }

  if (userId === friendId) {
    return res.status(400).json({ message: "You can't add yourself" });
  }

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user) {
      console.error(`User not found with ID: ${userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    if (!friend) {
      console.error(`Friend not found with ID: ${friendId}`);
      return res.status(404).json({ message: "Friend not found" });
    }

    if (!user.friends.includes(friendId)) user.friends.push(friendId);
    if (!friend.friends.includes(userId)) friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend added successfully" });
  } catch (err) {
    console.error("Add friend error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
