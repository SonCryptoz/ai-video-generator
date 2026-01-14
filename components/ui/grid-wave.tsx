"use client";

import { useEffect, useRef } from "react";

interface Props {
    className?: string;
}

export default function GridWave({ className }: Props) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current!;
        const ctx = canvas.getContext("2d")!;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        let t = 0;
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(255,255,255,0.035)";
            ctx.lineWidth = 1;

            const gap = 30;

            for (let x = 0; x < canvas.width; x += gap) {
                ctx.beginPath();
                for (let y = 0; y < canvas.height; y += gap) {
                    const wave = Math.sin((x + y + t) * 0.015) * 6;
                    ctx.lineTo(x, y + wave);
                }
                ctx.stroke();
            }

            t += 0.8;
            requestAnimationFrame(draw);
        }
        draw();

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <canvas
            ref={ref}
            className={`absolute inset-0 z-0 opacity-40 pointer-events-none ${
                className ?? ""
            }`}
        />
    );
}
