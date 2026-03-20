import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
    persist(
        (set) => ({
            token: null,
            isAuth: false,
            username: "",
            email: "",
            role: "",
            typeBehandler: "",
            setIsAuth: (bool) => set({ isAuth: bool }),
            setUsername: (newUsername) => set({ username: newUsername }),
            setEmail: (newEmail) => set({ email: newEmail }),
            setRole: (newRole) => set({ role: newRole }),
            setToken: (newToken) => set({ token: newToken }),
            setTypeBehandler: (nyTypeBehandler) => set({ typeBehandler: nyTypeBehandler }),
            logout: () => set({
                token: null,
                isAuth: false,
                username: "",
                email: "",
                role: "",
                typeBehandler: "",
            }),
            
        }),
        { name: "app-store" }
    )
)

export const useMineBookedeTimer = () => useAppStore((state) => state.mineBookedeTimer);