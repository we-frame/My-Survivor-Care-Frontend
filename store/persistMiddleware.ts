import { StateCreator } from "zustand";

// Define the persist middleware
// This middleware will persist the Zustand state to localStorage
export const persistMiddleware =
  <T>(config: StateCreator<T>, options: { name: string }): StateCreator<T> =>
  (set, get, api) => {
    // Initialize state from localStorage if it exists
    if (typeof localStorage !== "undefined") {
      const savedState = localStorage.getItem(options.name);

      if (savedState) {
        // If there's a saved state in localStorage, set it to the store
        set(JSON.parse(savedState));
      }
    }
    // Subscribe to state changes and save the updated state to localStorage
    api.subscribe((state) => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(options.name, JSON.stringify(state));
      }
    });

    // Return the original config with a wrapped set function
    return config(
      (...args) => {
        // Update the state using the original set function
        set(...args);

        // Save the updated state to localStorage
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(options.name, JSON.stringify(get()));
        }
      },
      get,
      api,
    );
  };
