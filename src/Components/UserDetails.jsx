import React from "react";
import axios from "axios";
import { useState } from "react";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";

function UserDetails() {
  const [details, setDetails] = useState([]);

  const fetchDetails = async () => {
    try {
      const user = await axios.get("/api/v1/users/current-user");

      ToastSuccess("Details fetched");

      setDetails(user.data.message);
    } catch (error) {
      ToastError(`${error?.message}`);
    }
  };

  return (
    <>
      <button onClick={fetchDetails}>Get User Details</button>
      <p>User: {details.username}</p>
    </>
  );
}

export default UserDetails;
