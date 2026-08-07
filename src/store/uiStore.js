import { create } from "zustand";
import { updatePreferences } from "../services/userApi";

const useUiStore = create((set) => ({
  sidebarOpen: true,

  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),

  setSidebar: (value) =>
    set({
      sidebarOpen: value,
    }),

  selectedLogo: "Duck", // hydrated from user object on login instead of localStorage now
  setSelectedLogo: async (logoName) => {
    set({ selectedLogo: logoName }); // optimistic update
    try {
      await updatePreferences(logoName);
    } catch (err) {
      console.error("Failed to save logo preference", err);
    }
  },
}));

export { useUiStore };
