import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

export const useAppStore = create(
    devtools(
        persist(
            (set) => ({
                token: null,
                isAuth: false,
                username: "",
                email: "",
                role: "",
                typeBehandler: "",
                profilbilde: "",
                setIsAuth: (bool) => set({ isAuth: bool }),
                setUsername: (newUsername) => set({ username: newUsername }),
                setEmail: (newEmail) => set({ email: newEmail }),
                setRole: (newRole) => set({ role: newRole }),
                setToken: (newToken) => set({ token: newToken }),
                setTypeBehandler: (nyTypeBehandler) => set({ typeBehandler: nyTypeBehandler }),
                setProfilbilde: (nyttProfilbilde) => set({ profilbilde: nyttProfilbilde }),
                setProfil: (nyProfil) => set({ ...nyProfil }),
                logout: () => set({
                    token: null,
                    isAuth: false,
                    username: "",
                    email: "",
                    role: "",
                    typeBehandler: "",
                    profilbilde: "",
                }),
            }),
            { name: "app-store" }
        )
    )
);

export const useProfile = () => useAppStore(useShallow((state) => ({
    username: state.username,
    email: state.email,
    role: state.role,
    typeBehandler: state.typeBehandler,
    profilbilde: state.profilbilde,
})));