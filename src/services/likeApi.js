import axiosInstance from "./axiosInstance.js";

export const toggleVideoLike = async (videoId) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/likes/toggle/v/${videoId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const toggleCommentLike = async (commentId) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/likes/toggle/c/${commentId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const toggleTweetLike = async (tweetId) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/likes/toggle/t/${tweetId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const getLikedVideos = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/likes/videos");
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};
