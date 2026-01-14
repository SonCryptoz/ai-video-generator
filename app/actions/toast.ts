import { useToastStore } from "../store/use-toast-store";

export const toast = {
    success(message: string) {
        useToastStore.getState().show({
            id: "toast",
            message,
            type: "success",
        });
    },
    error(message: string) {
        useToastStore.getState().show({
            id: "toast",
            message,
            type: "error",
        });
    },
    info(message: string) {
        useToastStore.getState().show({
            id: "toast",
            message,
            type: "info",
        });
    },
    warning(message: string) {
        useToastStore.getState().show({
            id: "toast",
            message,
            type: "warning",
        });
    },
    loading(message: string) {
        useToastStore.getState().show({
            id: "toast",
            message,
            type: "loading",
        });
    },
};
