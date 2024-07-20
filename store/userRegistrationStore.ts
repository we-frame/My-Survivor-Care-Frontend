import { create } from "zustand";

// Define the state type
interface RegistrationState {
  step: number;
  interested: boolean | null;
  notInterestedMsg: string | null;
  eligible: boolean | null;
  setEligible: (eligible: boolean | null) => void;
  setStep: (step: number) => void;
  setInterested: (interested: boolean | null) => void;
  setNotInterestedMsg: (notInterestedMsg: string | null) => void;
}

// Create the Zustand store with the defined types
const useRegistrationStore = create<RegistrationState>((set) => ({
  step: 1,
  interested: false,
  notInterestedMsg: null,
  eligible: false,
  setEligible: (eligible) => set({ eligible }),
  setStep: (step) => set({ step }),
  setInterested: (interested) => set({ interested }),
  setNotInterestedMsg: (notInterestedMsg) => set({ notInterestedMsg }),
}));

export default useRegistrationStore;
