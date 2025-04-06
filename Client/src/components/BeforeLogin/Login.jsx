import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:5000/api/auth";

    if (action === "Sign Up") {
      try {
        const response = await axios.post(`${apiUrl}/signup`, {
          username,
          email,
          password,
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error during sign-up:", error.response?.data);
      }
    } else if (action === "Log In") {
      try {
        const response = await axios.post(`${apiUrl}/login`, {
          email,
          password,
        });
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error during login:", error.response?.data);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="login-container">
          <div className="header">
            <div>{action}</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              {action === "Sign Up" && (
                <div className="input">
                  <i className="ri-user-line"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              )}
              <div className="input">
                <i className="ri-mail-line"></i>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <i className="ri-lock-fill"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {action === "Log In" && (
              <div className="forgot-pass">Forgot Password?</div>
            )}
            <div className="submit">
              <button
                className={
                  action === "Log In" ? "submit-btn gray" : "submit-btn"
                }
                onClick={() => setAction("Sign Up")}
              >
                Sign Up
              </button>
              <button
                className={
                  action === "Sign Up" ? "submit-btn gray" : "submit-btn"
                }
                onClick={() => setAction("Log In")}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
