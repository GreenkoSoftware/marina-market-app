import { authenticate } from '@/utils/authSettings';
import { create } from 'zustand';
import { persist } from "zustand/middleware";
const useAuthStore = create(
    persist(
      (set) => ({
        name: null,
        lastName: null,
        fullName: null,
        isAdmin: false,
        token: null,
        email: null,
        loading: false,
        error: false,
        setToken: () => set((state) => ({ token: state })),
        setEmail: () => set((state) => ({ email: state })),
        signIn: ({ email, password }) => {
          set({ loading: true, error: null })
          try {
            authenticate(
              {
              email: email,
              password: password,
              }
            ).then(({ user, statusCode, statusText, error, message }) => {
              if (user.token){
                const { name, lastName, userType, token } = user
                set({
                  name: name,
                  lastName: lastName,
                  fullName: name + ' ' + lastName,
                  email: email, 
                  token: token,
                  isAdmin: userType == 'admin' ? true : false,
                })  
                if(userType == 'admin') set({ isAdmin: true })  
              }else {
                set({ error: statusCode + ' ' + (error || message || statusText) })  
              }
              set({ loading: false })
          })
        } catch {
            set({ loading: false })
          }
        },
        signOut: () => {
        set({ 
          name: null,
          lastName: null,
          fullName: null,
          isAdmin: false,
          token: null,
          email: null,
          loading: false,
          error: false,
        })  
        },
      }),
      {
        name: "user",
      }
    )
  );
  
  export default useAuthStore;