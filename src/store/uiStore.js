import { create } from "zustand";

const useUiStore = create((set) => ({
  sidebarOpen: true,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebar: (value) => set({ sidebarOpen: value }),
}));

export { useUiStore };
