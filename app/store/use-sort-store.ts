import { create } from "zustand";

interface SortState {
    sort: string;
    setSort: (v: string) => void;
}

export const useSortStore = create<SortState>((set) => ({
    sort: "",
    setSort: (v) => set({ sort: v }),
}));
