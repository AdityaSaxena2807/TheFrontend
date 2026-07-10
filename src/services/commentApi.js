import axiosInstance from "./axiosInstance.js";

export const getVideoComments = async (videoId, params = {}) => {
  try {
    const response = await axiosInstance.get(`/api/v1/comments/${videoId}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const addComment = async (videoId, userData) => {
  try {
    const response = await axiosInstance.post(`/api/v1/comments/${videoId}`, {
      content: userData,
    });
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/comments/c/${commentId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const updateComment = async (commentId, newcontent) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/comments/c/${commentId}`,
      {
        content: newcontent,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};
