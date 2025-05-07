import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const EMAIL: string = import.meta.env.VITE_AUTH_EMAIL;
const PASSWORD: string = import.meta.env.VITE_AUTH_PASSWORD;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (email: string, password: string) => {
        if (email === EMAIL && password === PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
