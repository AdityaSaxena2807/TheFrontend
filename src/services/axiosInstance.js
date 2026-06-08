import axios from "axios";
import { useAuthStore } from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

//! REQUEST INTERCEPTOR — attach access token to every request
// This interceptor runs before every request is sent. It retrieves the current access token from the auth store
// and, if a token exists, it adds an Authorization header to the request with the format Bearer <token>.
// This ensures that all API requests include the necessary authentication token for protected routes.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//! RESPONSE INTERCEPTOR — handle token expiry
let isRefreshing = false;
let failedQueue = [];

//* The response interceptor checks for 401 Unauthorized errors, which typically indicate that the access token has expired.

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,

  //*This response interceptor has two functions — the first handles successful responses (just passes them through unchanged),
  //*the second handles errors. Every failed request lands in that second function.

  async (error) => {
    const originalRequest = error.config;
    // if 401 and we haven't already tried to refresh for this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // another request already triggered a refresh — queue this one
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        // call refresh endpoint — cookie carries the refresh token automatically
        const response = await axiosInstance.post("/users/refresh-token");
        const newToken = response.data.data.accessToken;
        useAuthStore.getState().setAuth(null, newToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // refresh failed — log the user out
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
