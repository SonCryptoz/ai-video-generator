"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
    icon: LucideIcon;
    title: string;
    desc: string;
    index?: number;
}

export default function FeatureCardParallax({
    icon: Icon,
    title,
    desc,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-120, 120], [10, -10]);
    const rotateY = useTransform(x, [-120, 120], [-10, 10]);

    return (
        <div className="parallax-perspective">
            <motion.div
                ref={ref}
                style={{ rotateX, rotateY }}
                onMouseMove={(e) => {
                    const rect = ref.current!.getBoundingClientRect();
                    x.set(e.clientX - rect.left - rect.width / 2);
                    y.set(e.clientY - rect.top - rect.height / 2);
                }}
                onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                }}
                whileHover={{ y: -12 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="parallax-card"
            >
                {/* STACKED LAYERS */}
                <span className="parallax-layer layer-3 bg-primary" />
                <span className="parallax-layer layer-2 bg-secondary" />
                <span className="parallax-layer layer-1 bg-accent" />

                {/* CONTENT */}
                <div className="parallax-content">
                    <div className="icon-wrap">
                        <Icon className="w-6 h-6 text-base-content" />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-sm opacity-70">{desc}</p>
                </div>
            </motion.div>
        </div>
    );
}
