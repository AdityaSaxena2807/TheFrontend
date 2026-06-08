import axiosInstance from "./axiosInstance.js";

export const loginUser = async (userData) => {
  try {
    response = await axiosInstance.post("/api/v1/users/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
  }
};
