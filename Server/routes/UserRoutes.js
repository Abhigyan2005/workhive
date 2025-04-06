const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/all/:userId", async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.userId } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.get("/search", async (req, res) => {
  const { username } = req.query;

  try {
    const users = await User.find({
      username: { $regex: new RegExp(username, "i") },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error searching users" });
  }
});

module.exports = router;
