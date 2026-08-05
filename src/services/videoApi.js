import axiosInstance from "./axiosInstance.js";

export const getAllVideos = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/api/v1/videos/", { params });
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const getSuggestedVideos = async (videoId) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/videos/suggested/${videoId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const publishAVideo = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/v1/videos/", formData);
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const getVideoById = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const deleteVideo = async (videoId) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const updateVideo = async (videoId, formData) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/videos/${videoId}`,
      formData,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const toggleVideoPublishStatus = async (videoId) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/videos/toggle/publish/${videoId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};
