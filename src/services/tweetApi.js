import axiosInstance from "./axiosInstance.js";

export const createTweet = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/v1/tweets/", userData);
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const getAllTweets = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortType = "desc",
} = {}) => {
  try {
    const response = await axiosInstance.get("/api/v1/tweets", {
      params: { page, limit, sortBy, sortType },
    });
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const getUserTweets = async (
  userId,
  { sortBy = "createdAt", sortType = "desc" } = {},
) => {
  try {
    const response = await axiosInstance.get(`/api/v1/tweets/user/${userId}`, {
      params: { sortBy, sortType },
    });
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const updateTweet = async (tweetId, userData) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/tweets/${tweetId}`,
      userData,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const deleteTweet = async (tweetId) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/tweets/${tweetId}`);
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};
