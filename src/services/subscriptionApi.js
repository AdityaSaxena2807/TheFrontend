import axiosInstance from "./axiosInstance.js";

export const getUserChannelSubscribers = async (channelId) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/subscriptions/c/${channelId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const toggleSubscription = async (channelId) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/subscriptions/c/${channelId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const getSubscribedChannels = async (subscriberId) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/subscriptions/u/${subscriberId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};
