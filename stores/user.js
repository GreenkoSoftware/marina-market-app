import { authenticate } from '@/utils/authSettings';
import { create } from 'zustand';
import { persist } from "zustand/middleware";
const useAuthStore = create(
    persist(
      (set) => ({
        token: null,
        email: null,
        loading: false,
        setToken: () => set((state) => ({ token: state })),
        setEmail: () => set((state) => ({ email: state })),
        signIn: ({ email, password }) => {
          set({ loading: true })
          authenticate(
            {
            email: email,
            password: password,
            }
          ).then(({ user, statusCode, statusText, error, message }) => {
            console.log(user)
            const { token } = user
            set({ email: email, token: token })  
            set({ loading: false })
          })
        },
        signOut: () => {
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