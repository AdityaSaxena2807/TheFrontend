import React from "react";
import { useState } from "react";
import { loginUser } from "../services/userApi.js";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";
function Login() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  //here setAuth is a function from the auth store that updates the authentication state with the user information and access token after a successful login.
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
    const payload = {
      password: userData.password,
      ...(userData.email.trim() && { email: userData.email.trim() }),
      ...(userData.username.trim() && { username: userData.username.trim() }),
    };
    try {
      const data = await loginUser(payload);
      // After a successful login, the setAuth function is called with the user information and access token to update the authentication
      // state in the application. This allows other parts of the app to recognize that the user is logged in and have access to their information.
      setAuth(data.data.user, data.data.accessToken);
      ToastSuccess("Logged in successfully!");
      navigate("/");
    } catch (error) {
      ToastError(error?.response?.data?.message || "Login failed");
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
            type="password"
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
