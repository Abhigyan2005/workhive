const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/TaskRoutes');
const userRoutes = require("./routes/UserRoutes");
const friendRoutes = require("./routes/FriendRoutes");

const app = express();

app.use(cors());
app.use(express.json()); 


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB Connection Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});