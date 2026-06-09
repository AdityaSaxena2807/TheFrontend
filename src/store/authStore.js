import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,
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
  //The updateUser function allows for updating the user information in the store. It takes a data object as a parameter and merges it with
  //the existing user information in the state. This is useful for updating specific fields of the user without overwriting the entire user object.
  updateUser: (data) =>
    set((state) => ({
      user: { ...state.user, ...data },
    })),
}));

export { useAuthStore };
