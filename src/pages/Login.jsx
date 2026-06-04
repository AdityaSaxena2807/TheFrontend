import React from "react";
import axios from "axios";
import { useState } from "react";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";
function Login() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.email.trim() && !userData.username.trim()) {
      ToastError("Username or email is required");
      return;
    }
    if (!userData.password) {
      ToastError("Password is required");
      return;
    }
    try {
      const response = await axios.post("/api/v1/users/login", userData);
      if (response.status < 400) {
        ToastSuccess("Logged in successfully!!");
      } else {
        ToastError(`Error: ${response.message || "Login failed"}`);
      }
    } catch (error) {
      console.error("Error message: ", error?.message);
      console.error("Error status: ", error?.response?.status);
      console.error("Error data: ", error?.response?.data);
      ToastError(`${error?.message}`);
    }
  };
  return (
    <>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
