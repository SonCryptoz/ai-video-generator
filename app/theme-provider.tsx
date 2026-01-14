"use client";

import { useEffect } from "react";
import { Outfit } from "next/font/google";
import { useThemeStore } from "./store/use-theme-store";

const outfit = Outfit({ subsets: ["latin"] });

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useThemeStore((s) => s.theme);
    const initTheme = useThemeStore((s) => s.initTheme);

    useEffect(() => {
        initTheme();
    }, [initTheme]);

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme);
        }
    }, [theme]);

    return <div className={outfit.className}>{children}</div>;
}
