import { create } from 'zustand';
import { persist } from "zustand/middleware";
const useAuthStore = create(
    persist(
      (set) => ({
        token: null,
        email: null,
        setToken: () => set((state) => ({ token: state })),
        setEmail: () => set((state) => ({ email: state })),
        logout: () => {
        set({ 
            token: null,
            email: null 
        })  
        },
      }),
      {
        name: "user",
      }
    )
  );
  
  export default useAuthStore;