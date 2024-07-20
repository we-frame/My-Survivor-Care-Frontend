import { create } from "zustand";
import { persistMiddleware } from "./persistMiddleware";

interface UserState {
  userData: any;
  setUser: (user: any) => void;
  clearUser: () => void;
}

const savedState =
  typeof window !== "undefined" && localStorage.getItem("user-store")
    ? JSON.parse(localStorage.getItem("user-store")!)
    : {};

const useUserStore = create<UserState>(
  persistMiddleware(
    (set) => ({
      userData: savedState ? savedState?.userData : null,
      setUser: (user) => {
        set({ userData: { userData: user } });
      },
      clearUser: () => {
        set({ userData: null });
      },
    }),
    { name: "user-store" } // Name of the localStorage key to persist state
  )
);

export default useUserStore;
