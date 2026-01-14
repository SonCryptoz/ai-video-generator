"use client";

import Image from "next/image";
import Link from "next/link";

import HeroParallax from "@/components/ui/hero-parralax";

export default function HeroSection() {
    return (
        <section
            className="
                hero relative h-screen w-full
                flex items-center justify-center
                perspective-distance
            "
        >
            <HeroParallax>
                <div className="hero-content relative flex flex-col items-center justify-center text-center px-4 max-w-2xl">
                    {/* Logo */}
                    <div className="hero-title flex items-center gap-3 mb-5 drop-shadow-xl">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={62}
                            height={62}
                            className="animate-float-slow"
                        />
                        <h1
                            className="
                                text-4xl md:text-5xl font-extrabold leading-tight
                                bg-clip-text text-transparent
                                bg-linear-to-r from-primary to-secondary
                            "
                        >
                            AI PicMotion Lab
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p className="hero-subtitle max-w-lg text-base-content/70 mb-8 text-sm md:text-base leading-relaxed">
                        Create cinematic AI-powered short videos from text,
                        images, and ideas. Designed for creators, marketers, and
                        storytellers.
                    </p>

                    <Link href="/dashboard" className="hero-cta">
                        <button
                            className="
                                relative px-8 py-3 rounded-full
                                font-medium text-sm md:text-base
                                bg-white/10 backdrop-blur-xl
                                border border-white/20 shadow-lg
                                hover:bg-white/20 hover:shadow-xl
                                active:scale-95 transition-all cursor-pointer
                            "
                        >
                            Enter Dashboard
                        </button>
                    </Link>
                </div>
            </HeroParallax>
        </section>
    );
}
