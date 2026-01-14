"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
    show: boolean;
}

export default function PageLoader({ show }: Props) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="
                        fixed inset-0 z-9999
                        flex items-center justify-center
                        bg-base-100/40
                        backdrop-blur-2xl
                    "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    {/* Glass card */}
                    <motion.div
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="
                            relative
                            flex flex-col items-center gap-4
                            px-8 py-6
                            rounded-2xl
                            bg-base-100/60
                            backdrop-blur-xl
                            border border-white/20
                            shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                        "
                    >
                        {/* Glow orb */}
                        <div className="relative w-14 h-14">
                            <div className="absolute inset-0 rounded-full bg-primary/60 blur-2xl animate-pulse" />
                            <div className="relative w-14 h-14 rounded-full bg-primary shadow-[0_0_30px_rgba(0,0,0,0.2)]" />
                        </div>

                        <span className="text-[10px] tracking-[0.3em] text-base-content/60">
                            LOADING
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
