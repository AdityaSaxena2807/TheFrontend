import { useState } from "react";
import axios from "axios";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import UserDetails from "./Components/UserDetails.jsx";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      {/* <Register/> */}
      <Login/>
      <UserDetails />
    </>
  );
}

export default App;
