import React, { useState } from "react";

function NavAfterLogin({ openTaskModal, openCalendar, openHome, openFriends, username }) {
  const [activeItem, setActiveItem] = useState("home");

  const handleClick = (item) => {
    setActiveItem(item);
    if (item === "home") openHome();
    if (item === "add") openTaskModal();
    if (item === "calendar") openCalendar();
    if (item === "friends") openFriends();
  };

  return (
    <div className="afterlogin-nav">
      <div className="lk">
        <div className="name">{username}</div>
        <div>
          <i className="ham ri-menu-2-line"></i>
        </div>
      </div>
      <div>
        <div
          className={`nav-item ${activeItem === "home" ? "active" : ""}`}
          onClick={() => handleClick("home")}
        >
          <i className="ri-home-3-fill"></i>
          Home
        </div>
        <div
          className={`nav-item ${activeItem === "add" ? "active" : ""}`}
          onClick={() => handleClick("add")}
        >
          <i className="ri-add-circle-fill"></i>
          Add task
        </div>
        <div
          className={`nav-item ${activeItem === "calendar" ? "active" : ""}`}
          onClick={() => handleClick("calendar")}
        >
          <i className="ri-calendar-line"></i>
          Calendar
        </div>
        <div
          className={`nav-item ${activeItem === "friends" ? "active" : ""}`}
          onClick={() => handleClick("friends")}
        >
          <i className="ri-user-fill"></i>
          Colleagues
        </div>
      </div>
      <div>
        <h1>Groups</h1>
        <div className="nav-item">
          <i className="ri-inbox-2-line"></i>
          Inbox
        </div>
      </div>
    </div>
  );
}

export default NavAfterLogin;
