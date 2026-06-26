import { create } from "zustand";
import axios from "axios";

const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let authInitialization;
// The useAuthStore is a Zustand store that manages the authentication state of the application. It provides functions to set, clear, and initialize 
// authentication, as well as update user information. The store maintains the user object, access token, login status, and loading state for authentication.
const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,
  isAuthLoading: true,
  // The setAuth function is responsible for updating the authentication state in the store. It takes two parameters:
  // user and accessToken. When called, it updates the user information, access token, and sets isLoggedIn to true.
  // This allows the application to recognize that the user is authenticated and has access to their information.
  setAuth: (user, accessToken) =>
    set((state) => ({
      user: user ?? state.user,
      accessToken: accessToken ?? state.accessToken,
      isLoggedIn: true,
    })),
  // The clearAuth function resets the authentication state by setting the user and access token to null and isLoggedIn to false.
  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isLoggedIn: false,
    }),
  initializeAuth: () => {
    if (authInitialization) return authInitialization;

    authInitialization = (async () => {
      try {
        const refreshResponse = await authClient.post(
          "/api/v1/users/refresh-token",
        );
        const accessToken = refreshResponse.data.data.accessToken;

        const userResponse = await authClient.get(
          "/api/v1/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        set({
          user: userResponse.data.data.user ?? userResponse.data.data,
          accessToken,
          isLoggedIn: true,
        });
      } catch {
        set({
          user: null,
          accessToken: null,
          isLoggedIn: false,
        });
      } finally {
        set({ isAuthLoading: false });
      }
    })();

    return authInitialization;
  },
  //The updateUser function allows for updating the user information in the store. It takes a data object as a parameter and merges it with
  //the existing user information in the state. This is useful for updating specific fields of the user without overwriting the entire user object.
  updateUser: (data) =>
    set((state) => ({
      user: { ...state.user, ...data },
    })),
}));

export { useAuthStore };
