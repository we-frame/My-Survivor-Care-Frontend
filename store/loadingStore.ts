import { create } from "zustand";

type LoadingState = {
  refresh: boolean;
  setRefresh: (loading: boolean) => void;
};

const useLoadingStore = create<LoadingState>((set, get) => ({
  refresh: false,
  setRefresh: (refresh: boolean) => set({ refresh }),
}));

export default useLoadingStore;
