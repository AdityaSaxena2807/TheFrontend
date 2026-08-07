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

  selectedLogo: "Duck",

  setSelectedLogo: async (logoName) => {
    set({ selectedLogo: logoName });

    try {
      await updatePreferences(logoName);
    } catch (err) {
      console.error("Failed to save logo preference", err);
    }
  },

  // Only updates Zustand, NO API call
  setSelectedLogoFromServer: (logoName) => {
    set({ selectedLogo: logoName });
  },
}));

export { useUiStore };
