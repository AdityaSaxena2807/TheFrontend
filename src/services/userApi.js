import axiosInstance from "./axiosInstance.js";

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/users/register",
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

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/v1/users/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/api/v1/users/logout");
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const changePassword = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/users/change-password",
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

export const currentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/users/current-user");
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const updateAccount = async (userData) => {
  try {
    const response = await axiosInstance.patch(
      "/api/v1/users/update-account",
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

export const updateAvatar = async (formData) => {
  try {
    const response = await axiosInstance.patch(
      "/api/v1/users/avatar",
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

export const updateCoverImage = async (formData) => {
  try {
    const response = await axiosInstance.patch(
      "/api/v1/users/coverImage",
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

export const getUserChannelProfile = async (username) => {
  try {
    const response = await axiosInstance.get(`/api/v1/users/c/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

export const watchHistory = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/users/watch-history");
    return response.data;
  } catch (error) {
    console.error("Error message: ", error?.message);
    console.error("Error status: ", error?.response?.status);
    console.error("Error data: ", error?.response?.data);
    throw error;
  }
};

/*Quick Reference — What Goes Where in Axios
//!| Data type                     | Where it goes                       | Example
//?| URL param (:id, :username)    | In the URL string                   | `/api/v1/users/c/${username}
//?| `Query param (?page=1)        | params config object                | axiosInstance.get(url, { params: { page: 1 } })
//?| Request body                  | Second arg of POST/PATCH            | axiosInstance.post(url, userData)
//?| File upload                   | FormData as body                    | axiosInstance.patch(url, formData)*/
