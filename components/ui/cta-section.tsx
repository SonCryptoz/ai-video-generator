"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { Video, Users, Zap, ArrowRight } from "lucide-react";

export default function CTASection() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-120, 120], [6, -6]);
    const rotateY = useTransform(x, [-120, 120], [-6, 6]);

    return (
        <section className="cta-section relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            {/* ===== Glass CTA Panel ===== */}
            <motion.div
                style={{ rotateX, rotateY }}
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    x.set(e.clientX - rect.left - rect.width / 2);
                    y.set(e.clientY - rect.top - rect.height / 2);
                }}
                onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                }}
                className="
                    relative z-10
                    w-full max-w-5xl
                    min-h-105
                    px-5 py-8
                    rounded-[42px]
                    bg-white/10 backdrop-blur-2xl
                    border border-white/25
                    shadow-[0_60px_160px_rgba(0,0,0,0.45)]
                    text-center
                    overflow-hidden
                    group
                "
            >
                {/* Liquid light sweep */}
                <div
                    className="
                        absolute inset-0
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-700
                        bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)]
                        animate-liquid-glass
                    "
                />

                {/* Heading */}
                <h2
                    className="
                        cta-title text-4xl md:text-5xl font-extrabold leading-tight
                        bg-clip-text text-transparent
                        bg-linear-to-r from-primary via-secondary to-primary
                        animate-gradient-x
                    "
                >
                    Turn Ideas Into
                    <br />
                    Cinematic AI Videos
                </h2>

                {/* Subtitle */}
                <p className="cta-subtitle mt-6 text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                    No editing. No timeline. Just describe your idea and let AI
                    PicMotion Lab do the rest.
                </p>

                {/* Stats */}
                <div className="cta-stats mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <Stat icon={Video} value="10K+" label="Videos Generated" />
                    <Stat icon={Users} value="3.2K+" label="Creators" />
                    <Stat icon={Zap} value="60s" label="Avg Render Time" />
                </div>

                {/* CTA */}
                <div className="cta-action mt-16 flex flex-col items-center gap-4">
                    <Link href="/dashboard/create-new">
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="
                                relative px-14 py-4 rounded-full
                                font-semibold text-sm md:text-base
                                bg-linear-to-r from-primary to-secondary
                                text-white cursor-pointer
                                shadow-[0_0_60px_rgba(120,120,255,0.8)]
                                overflow-hidden
                                flex items-center gap-3
                            "
                        >
                            <span
                                className="
                                    absolute inset-0
                                    bg-linear-to-r from-primary to-secondary
                                    opacity-40 blur-2xl
                                    animate-pulse
                                "
                            />
                            <span className="relative z-10">
                                Create Your First Video
                            </span>
                            <ArrowRight className="relative z-10 w-5 h-5" />
                        </motion.button>
                    </Link>

                    <span className="text-xs opacity-60">
                        Free to start · No credit required
                    </span>
                </div>
            </motion.div>
        </section>
    );
}

/* ===== Stat ===== */
function Stat({
    icon: Icon,
    value,
    label,
}: {
    icon: React.ElementType;
    value: string;
    label: string;
}) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            className="flex flex-col items-center gap-2 text-center"
        >
            <Icon className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-xs opacity-70">{label}</span>
        </motion.div>
    );
}
