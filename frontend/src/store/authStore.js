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
            setIsAuth: (bool) => set({ isAuth: bool }),
            setUsername: (newUsername) => set({ username: newUsername }),
            setEmail: (newEmail) => set({ email: newEmail }),
            setRole: (newRole) => set({ role: newRole }),
            setToken: (newToken) => set({ token: newToken }),
            logout: () => set({
                token: null,
                username: "",
                email: "",
                role: "",
                isAuth: false,
                mineBookedeTimer: [],
            }),
            
        }),
        { name: "app-store" }
    )
)

export const useMineBookedeTimer = () => useAppStore((state) => state.mineBookedeTimer);



/* Eksempel Store under fra docsa til Zustand:
export const useBear = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
    doubleTheBears: () => set((state) => ({ bears: state.bears * 2 })),
}))

*/


/* 

            fjernBookedTime: (timeID) => set((state) => ({
                mineBookedeTimer: state.mineBookedeTimer.filter((time) => time._id !== timeID)
            })),
            leggTilBookedtime: (time) => set((state) => ({
                mineBookedeTimer: [...state.mineBookedeTimer, time]
            })),
*/
