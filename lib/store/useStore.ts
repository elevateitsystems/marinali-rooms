import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  language: string;
  setLanguage: (lang: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
      isSidebarOpen: false,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: "marinali-settings", // name of the item in local storage
    }
  )
);
