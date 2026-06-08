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

  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isLoggedIn: false,
    }),

  updateUser: (data) =>
    set((state) => ({
      user: { ...state.user, ...data },
    })),
}));

export { useAuthStore };