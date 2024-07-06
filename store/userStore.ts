import { create } from "zustand";
import { persistMiddleware } from "./persistMiddleware";

interface UserState {
  userData: any;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>(
  persistMiddleware(
    (set) => ({
      userData: null,

      setUser: (user) => set({ userData: user }),
      clearUser: () => set({ userData: null }),
    }),
    { name: "user-store" } // Name of the localStorage key to persist state
  )
);

export default useUserStore;
