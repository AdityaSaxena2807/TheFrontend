import axiosInstance from "./axiosInstance.js";

export const createPlaylist = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/v1/playlists/", userData);
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const getPlaylistById = async (playlistId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/playlists/${playlistId}`);
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const updatePlaylist = async (playlistId, userData) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/playlists/${playlistId}`,
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

export const deletePlaylist = async (playlistId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/playlists/${playlistId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const addVideoToPlaylist = async (videoId, playlistId) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/playlists/add/${videoId}/${playlistId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const removeVideoFromPlaylist = async (videoId, playlistId) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/playlists/remove/${videoId}/${playlistId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const getUserPlaylists = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/playlists/user/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};
