import axios from "axios";
import { useAuthStore } from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  //! withCredentials is crucial for sending cookies (like refresh tokens) with requests
  withCredentials: true,
});

// REQUEST INTERCEPTOR — attach access token to every request
//! This interceptor runs before every request is sent. It retrieves the current access token from the auth store
//!and, if a token exists, it adds an Authorization header to the request with the format Bearer <token>.
//!This ensures that all API requests include the necessary authentication token for protected routes.
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
//!An interceptor is like a middleman that runs automatically before every request or after every response.This request interceptor runs
//!before every single API call you make. It reads your access token from the store and staples it onto the request header.
//!So you never have to manually write Authorization: Bearer ... anywhere — it just happens automatically every time.

// RESPONSE INTERCEPTOR — handle token expiry
let isRefreshing = false; //!its used to track whether a token refresh is already in progress
let failedQueue = []; //!it queues requests that fail during the refresh.

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

//!This response interceptor has two functions — the first handles successful responses (just passes them through unchanged),
//!the second handles errors. Every failed request lands in that second function.
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      //!401 means "unauthorized" — your access token expired. _retry is a flag we set ourselves —
      //!it means "have we already tried to refresh for this request?" if yes then we just reject, if no then we go through the refresh process.

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      } //! If a refresh is already happening (another request triggered it first), instead of firing another refresh, this request just adds
      //!itself to the queue and waits. When the refresh finishes, the queue gets processed and this request retries with the new token.

      originalRequest._retry = true;
      isRefreshing = true;
      //! We set _retry to true to avoid infinite loops, and isRefreshing to true to signal that a refresh is in progress.
      try {
        //! call refresh endpoint — cookie carries the refresh token automatically
        const response = await axiosInstance.post(
          "/api/v1/users/refresh-token",
        );
        const newToken = response.data.data.accessToken;
        useAuthStore.getState().setAuth(null, newToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
        // ! This is the actual refresh — call the refresh endpoint (your backend reads the httpOnly cookie automatically),
        // ! get the new access token back, save it to the store, tell all the queued requests "here's the new token,
        // ! you can go now", then retry the original request that failed.
      } catch (refreshError) {
        //! refresh failed — log the user out
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
        //!If the refresh itself fails (refresh token expired or invalid), there's no recovery
        //! log the user out completely and send them to the login page.
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
    //! its a way to pass the error down the chain to whoever called the function, instead of handling it immediately
    //! Without it: the error would be considered handled, and the caller of axios.get/post might think the request succeeded.
    //! With it: the catch block where you called Axios will receive the error:
  },
);

export default axiosInstance;
