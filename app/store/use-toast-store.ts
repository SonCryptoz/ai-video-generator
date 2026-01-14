import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning" | "loading";

export interface ToastItem {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastState {
    toast: ToastItem | null;
    show: (toast: ToastItem) => void;
    hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
    toast: null,
    show: (toast) => set({ toast }), // chỉ 1 toast duy nhất
    hide: () => set({ toast: null }),
}));
