"use client";

import { createContext, useContext, useState } from "react";

type LoadingContextType = {
    show: boolean;
    setShow: (v: boolean) => void;
};

const PageLoadingContext = createContext<LoadingContextType | undefined>(
    undefined,
);

export const PageLoadingProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [show, setShow] = useState(false);

    return (
        <PageLoadingContext.Provider value={{ show, setShow }}>
            {children}
        </PageLoadingContext.Provider>
    );
};

export const usePageLoading = () => {
    const ctx = useContext(PageLoadingContext);
    if (!ctx) {
        throw new Error(
            "usePageLoading must be used inside PageLoadingProvider",
        );
    }
    return ctx;
};
