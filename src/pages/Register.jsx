import React from "react";
import axios from "axios";
import { useState } from "react";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";
function Register() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [files, setFiles] = useState({
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    //Store the first selected file
    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userData.fullName.trim() ||
      !userData.email.trim() ||
      !userData.username.trim() ||
      !userData.password.trim()
    ) {
      ToastError("All feilds are required");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      ToastError("Passwords do not match!!");
      return;
    }
    if (!files.avatar || !files.coverImage) {
      ToastError("Avatar and CoverImage are required");
      return;
    }

    //Create a FormData object
    const data = new FormData();
    //Append text fields
    data.append("username", userData.username);
    data.append("fullName", userData.fullName);
    data.append("email", userData.email);
    data.append("password", userData.password);
    //Append file fields
    //Ensure these keys ('avatar', 'coverImage') match your backend's req.files expectations
    data.append("avatar", files.avatar);
    data.append("coverImage", files.coverImage);
    try {
      //Send request
      //not manually setting 'Content-Type': 'multipart/form-data'
      //The browser sets it automatically with the correct boundary when using FormData
      const response = await axios.post("/api/v1/users/register", data);

      if (response.status < 400) {
        ToastSuccess("User registered successfully!");
      } else {
        ToastError(`Error: ${response.message || "Registration failed"}`);
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
      <h1>User registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fullname:</label>
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
            placeholder="Enter fullName"
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
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="text"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-Enter password"
          />
        </div>
        <div>
          <label>Avatar Image:</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
