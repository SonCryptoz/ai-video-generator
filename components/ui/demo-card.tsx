"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

export default function DemoCard() {
    const [playing, setPlaying] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Subtle 3D tilt (nhẹ hơn)
    const rotateX = useTransform(y, [-200, 200], [20, -20]);
    const rotateY = useTransform(x, [-200, 200], [-20, 20]);

    return (
        <motion.div
            className="
                relative
                w-55 sm:w-60 md:w-65
                aspect-9/16
                rounded-3xl overflow-hidden cursor-pointer
                bg-black/40 backdrop-blur-xl
                border border-white/10
                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                transition-transform
            "
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - rect.left - rect.width / 2);
                y.set(e.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            onClick={() => setPlaying(true)}
        >
            {/* Soft Glow Border */}
            <div
                className="
                    absolute inset-0 rounded-3xl
                    pointer-events-none
                    bg-linear-to-tr from-primary/20 via-transparent to-secondary/20
                    opacity-100 blur-xl
                "
            />

            {/* ===== Preview Video ===== */}
            {!playing && (
                <>
                    <video
                        src="https://res.cloudinary.com/dzgr9rfhk/video/upload/v1766332241/ai-videos/iz1ix1qzkz4svt40fgim.mp4"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />

                    {/* Play Overlay */}
                    <div
                        className="
                            absolute inset-0
                            flex items-center justify-center
                            bg-black/25
                            backdrop-blur-sm
                            transition
                        "
                    >
                        <div
                            className="
                                flex items-center justify-center
                                w-14 h-14
                                rounded-full
                                bg-white/20
                                border border-white/30
                                backdrop-blur-xl
                                hover:scale-110 hover:bg-white/30
                                transition
                            "
                        >
                            <Play className="w-6 h-6 text-white ml-0.5" />
                        </div>
                    </div>
                </>
            )}

            {/* ===== Playing Mode ===== */}
            {playing && (
                <video
                    src="https://res.cloudinary.com/dzgr9rfhk/video/upload/v1766332241/ai-videos/iz1ix1qzkz4svt40fgim.mp4"
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    controls
                    playsInline
                    onEnded={() => setPlaying(false)}
                />
            )}
        </motion.div>
    );
}
