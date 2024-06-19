"use client";

import { create } from "zustand";
import { persistMiddleware } from "./SettingMiddleware";

interface SettingState {
  backgroundColor: string;
  buttonBgColor: string;
  textColor: string;
  setSetting: (key: keyof SettingState, value: string) => void;
}

// Check if there's any saved state in localStorage
// Use it to initialize the store if it exists
const savedState =
  typeof window !== "undefined" && localStorage.getItem("setting-store")
    ? JSON.parse(localStorage.getItem("setting-store")!)
    : {};

// Create the Zustand store with persistent middleware
export const useSettingStore = create<SettingState>(
  persistMiddleware(
    (set) => ({
      // Define the initial state with default values
      backgroundColor: "#ffffff",
      buttonBgColor: "#14b8a6",
      textColor: "#222222",
      ...savedState, // Merge any saved state from localStorage

      // Function to update the state
      setSetting: (key, value) => set((state) => ({ ...state, [key]: value })),
    }),
    { name: "setting-store" } // Name of the localStorage key to persist state
  )
);

export default useSettingStore;
