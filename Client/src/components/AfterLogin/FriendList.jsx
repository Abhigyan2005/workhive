import React, { useEffect, useState } from "react";
import TaskExchangeModal from "./TaskExchangeModal";
import axios from "axios";

function FriendsList({ userId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [exchangeTasks, setExchangeTasks] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const usersRes = await axios.get(
          `http://localhost:5000/api/users/all/${userId}`
        );
        setUsers(usersRes.data);

        const friendsRes = await axios.get(
          `http://localhost:5000/api/friends/${userId}`
        );
        setFriends(friendsRes.data);
      } catch (err) {
        console.error("Error fetching users or friends:", err.message);
      }
    };

    fetchInitialData();
  }, [userId]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await axios.get("http://localhost:5000/api/users/search", {
        params: { username: searchQuery },
      });

      if (res.data.length > 0) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Search failed:", err.message);
      setUsers([]);
    }
  };

  const addFriend = async (friendId) => {
    try {
      await axios.post("http://localhost:5000/api/friends/add-friend", {
        userId,
        friendId,
      });

      const addedFriend = users.find((u) => u._id === friendId);
      if (addedFriend) setFriends((prev) => [...prev, addedFriend]);
    } catch (err) {
      console.error("Error adding friend:", err.message);
    }
  };

  const fetchTaskExchange = async (friend) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/between/${userId}/${friend._id}`
      );
      setExchangeTasks(res.data);
      setSelectedFriend(friend);
    } catch (err) {
      console.error("Failed to fetch tasks between users:", err.message);
    }
  };

  const closeModal = () => {
    setSelectedFriend(null);
    setExchangeTasks(null);
  };
  console.log("Selected Friend:", selectedFriend);
  console.log("Exchange Tasks:", exchangeTasks);

  return (
    <>
      <div className="box">
        <div className="friends-container">
          <h2>Find Colleagues</h2>
          <input
            type="text"
            placeholder="Search username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          <h3>Users</h3>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user._id}>
                  {user.username}
                  {!friends.find((f) => f._id === user._id) && (
                    <button onClick={() => addFriend(user._id)}>Add</button>
                  )}
                </li>
              ))}
            </ul>
          )}

          <h3>Your Colleagues</h3>
          <ul>
            {friends.map((friend) => (
              <li
                key={friend._id}
                onClick={() => fetchTaskExchange(friend)}
                style={{ cursor: "pointer" }}
              >
                {friend.username}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedFriend && exchangeTasks && (
        <TaskExchangeModal
          friend={selectedFriend}
          onClose={closeModal}
          data={exchangeTasks}
        />
      )}
    </>
  );
}

export default FriendsList;
