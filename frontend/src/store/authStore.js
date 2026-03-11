import { create } from "zustand";

export const useStore = create((set) => ({
    token: null,
    username: "",
    email: "",
    role: "",
    mineBookedeTimer: [],
    setUsername: (newUsername) => set({ username: newUsername }),
    setEmail: (newEmail) => set({ email: newEmail }),
    setRole: (newRole) => set({ role: newRole }),
    setToken: (newToken) => set({ token: newToken }),
    fjernBookedTime: (timeID) => set((state) => ({
        mineBookedeTimer: state.mineBookedeTimer.filter((time) => time._id !== timeID)
    })),
    leggTilBookedtime: (time) => set((state) => ({
        mineBookedeTimer: [...state.mineBookedeTimer, time]
    })),
    logout: () => set({
        token: null,
        username: "",
        email: "",
        role: "",
        mineBookedeTimer: [],
    }),
}))




/* Eksempel Store under fra docsa til Zustand:
export const useBear = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
    doubleTheBears: () => set((state) => ({ bears: state.bears * 2 })),
}))

*/