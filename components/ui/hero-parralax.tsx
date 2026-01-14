"use client";

import { useEffect, useRef } from "react";

export default function HeroParallax({
    children,
}: {
    children: React.ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (!ref.current) return;

            const x = (e.clientX / window.innerWidth - 0.5) * 14;
            const y = (e.clientY / window.innerHeight - 0.5) * 14;

            ref.current.style.setProperty("--mx", `${x}px`);
            ref.current.style.setProperty("--my", `${y}px`);
        };

        window.addEventListener("mousemove", handle);
        return () => window.removeEventListener("mousemove", handle);
    }, []);

    return (
        <div
            ref={ref}
            className="
                hero-mouse
                relative z-10
                will-change-transform
                transition-transform duration-150 ease-out
            "
            style={{
                transform: "translate3d(var(--mx, 0px), var(--my, 0px), 0)",
            }}
        >
            {children}
        </div>
    );
}
