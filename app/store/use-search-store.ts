import { create } from "zustand";

export const useSearchStore = create<{
    q: string;
    setQ: (v: string) => void;
}>((set) => ({
    q: "",
    setQ: (v) => set({ q: v }),
}));
