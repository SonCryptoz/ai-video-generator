"use client";

import { useEffect, useState } from "react";

import DemoSection from "@/components/ui/demo-section";
import FeaturesSection from "@/components/ui/features-section";
import CTASection from "@/components/ui/cta-section";
import HeroSection from "@/components/ui/hero-section";
import CinematicBackground from "@/components/ui/cinematic-bg";
import PageLoader from "@/components/ui/page-loader";
import useParallax from "./store/use-parallax";

export default function Home() {
    const [ready, setReady] = useState(false);

    useParallax();

    useEffect(() => {
        const timer = setTimeout(() => {
            setReady(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* ===== LOADER ===== */}
            <PageLoader show={!ready} />

            {/* ===== PAGE ===== */}
            <main
                className={`
                    relative w-full min-h-screen
                    bg-base-100 overflow-hidden
                    transition-opacity duration-700
                    ${ready ? "opacity-100" : "opacity-0"}
                `}
            >
                {/* GLOBAL CINEMATIC BACKGROUND */}
                <CinematicBackground />

                {/* PAGE CONTENT */}
                <div className="parallax-section relative z-10">
                    <HeroSection />
                    <DemoSection />
                    <FeaturesSection />
                    <CTASection />
                </div>

                {/* FOOTER */}
                <footer
                    className="
                        w-full py-3 text-center text-[11px] opacity-70
                        backdrop-blur-xl bg-white/10
                        border-t border-white/15
                    "
                >
                    © {new Date().getFullYear()} AI PicMotion Lab – Made with ❤️
                </footer>
            </main>
        </>
    );
}
