"use client";

import { motion } from "framer-motion";

interface Props {
    className?: string;
}

export default function FloatingSpheres({ className }: Props) {
    return (
        <div className={`pointer-events-none ${className}`}>
            {/* Sphere 1 – accent */}
            <motion.div
                className="
                    absolute
                    top-[18%] left-[6%]
                    w-56 h-56 rounded-full
                    bg-primary
                    opacity-30
                    blur-3xl
                "
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -40, 20, 0],
                    scale: [1, 1.08, 0.95, 1],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Sphere 2 – primary */}
            <motion.div
                className="
                    absolute
                    top-[58%] right-[6%]
                    w-72 h-72 rounded-full
                    bg-secondary
                    opacity-25
                    blur-2xl
                "
                animate={{
                    x: [0, -40, 25, 0],
                    y: [0, 30, -30, 0],
                    scale: [1, 0.95, 1.1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
