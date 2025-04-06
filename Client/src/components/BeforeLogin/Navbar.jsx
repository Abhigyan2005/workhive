import React from "react";
import logo from "/logo.svg";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav">
      <div className="nav1">
        <img src={logo} alt="" />

        <Link to="/">
          <div>WorkHive</div>
        </Link>
      </div>
      <div className="nav2">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
