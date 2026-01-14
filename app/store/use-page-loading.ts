import { create } from "zustand";

interface PageLoadingStore {
    loading: boolean;
    setLoading: (val: boolean) => void;
}

export const usePageLoadingStore = create<PageLoadingStore>((set) => ({
    loading: false,
    setLoading: (val) => set({ loading: val }),
}));
