"use client";

import { useEffect, useRef } from "react";

interface Props {
    className?: string;
}

interface Particle {
    x: number;
    y: number;
    z: number;
    hue: number;
    vx: number;
    vy: number;
}

export default function Particles3D({ className }: Props) {
    const ref = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(1);

    const mouse = useRef({
        x: -9999,
        y: -9999,
    });

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const PARTICLE_COUNT = 260;
        const MOUSE_RADIUS = 80; // vùng ảnh hưởng hover
        const REPULSION_STRENGTH = 0.5; // lực đẩy
        const DAMPING = 0.95; // mượt

        const particles: Particle[] = Array.from(
            { length: PARTICLE_COUNT },
            () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 2.4 + 0.6,
                hue: Math.random() * 360,
                vx: 0,
                vy: 0,
            }),
        );

        function resize() {
            if (!canvas) return;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        function onMouseMove(e: MouseEvent) {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        }

        function onMouseLeave() {
            mouse.current.x = -9999;
            mouse.current.y = -9999;
        }

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            for (const p of particles) {
                /* ===== Base motion ===== */
                p.y += p.z * 0.42;

                if (p.y > height + 20) {
                    p.y = -20;
                    p.x = Math.random() * width;
                }

                /* ===== Hover repulsion ===== */
                const dx = p.x - mouse.current.x;
                const dy = p.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS) {
                    const force =
                        (1 - dist / MOUSE_RADIUS) * REPULSION_STRENGTH;
                    const angle = Math.atan2(dy, dx);
                    p.vx += Math.cos(angle) * force;
                    p.vy += Math.sin(angle) * force;
                }

                /* ===== Apply velocity ===== */
                p.x += p.vx;
                p.y += p.vy;

                p.vx *= DAMPING;
                p.vy *= DAMPING;

                /* ===== Color drift ===== */
                p.hue = (p.hue + 0.06) % 360;

                /* ===== Render ===== */
                const size = p.z * 1.6;
                const alpha = 0.18 + p.z * 0.22;

                ctx.shadowBlur = 22 + p.z * 8;
                ctx.shadowColor = `hsla(${p.hue}, 95%, 65%, ${alpha})`;

                ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${alpha})`;
                ctx.fillRect(p.x, p.y, size, size);
            }

            ctx.shadowBlur = 0;
            rafRef.current = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <canvas
            ref={ref}
            className={`
                absolute inset-0
                pointer-events-none
                z-0
                opacity-80
                mix-blend-screen
                ${className ?? ""}
            `}
        />
    );
}
