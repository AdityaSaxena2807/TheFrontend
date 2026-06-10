import axiosInstance from "./axiosInstance.js";

export const getChannelStats = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/dashboard/stats");
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const getChannelVideos = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/dashboard/videos");
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};
