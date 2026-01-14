"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useParallax() {
    useEffect(() => {
        const mm = gsap.matchMedia();

        // DESKTOP ANIMATIONS
        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                /* ======================================================
                   MASTER SCROLL
                ====================================================== */
                const TIMELINE_UNITS = 16;

                const master = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".parallax-section",
                        start: "top top",
                        end: () => `+=${window.innerHeight * TIMELINE_UNITS}`,
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                gsap.set(
                    [
                        ".hero",
                        ".demo-section",
                        ".features-section",
                        ".cta-section",
                    ],
                    {
                        pointerEvents: "none",
                    },
                );

                /* ======================================================
                   HERO (0 → 1)
                ====================================================== */
                master.addLabel("hero", 0);

                master.set(".hero", { pointerEvents: "auto" }, 0);

                master.to(".hero", { scale: 1.12, ease: "none" }, 0);

                master.addLabel("heroOut", 0.6);

                master.to(".hero-title", { x: -1080, autoAlpha: 0 }, "heroOut");

                master.to(
                    ".hero-subtitle",
                    { x: 1080, autoAlpha: 0 },
                    "heroOut",
                );

                master.to(
                    ".hero-cta",
                    { y: 60, scale: 0.94, autoAlpha: 0 },
                    "heroOut+=0.05",
                );

                /* ======================================================
                   DEMO (1 → 2)
                ====================================================== */
                master.addLabel("demoIn", 1);

                master.set(".hero", { pointerEvents: "none" }, "demoIn");

                master.set(
                    ".demo-section",
                    { pointerEvents: "auto" },
                    "demoIn",
                );

                gsap.set(".demo-section", { autoAlpha: 1 });

                gsap.set(".demo-title, .demo-subtitle, .demo-micro-copy", {
                    autoAlpha: 0,
                    y: 40,
                });

                gsap.set(".demo-hint-left", { autoAlpha: 0, x: -720 });

                gsap.set(".demo-hint-right", { autoAlpha: 0, x: 720 });

                gsap.set(".demo-card", {
                    autoAlpha: 0,
                    scale: 0.9,
                    y: 120,
                    rotateX: 14,
                    transformPerspective: 1200,
                });

                gsap.set(".demo-card-left, .demo-card-right", {
                    autoAlpha: 0,
                    x: 0,
                    rotateZ: 0,
                    scale: 0.8,
                });

                master.to(
                    ".demo-title",
                    { autoAlpha: 1, y: 0 },
                    "demoIn+=0.05",
                );

                master.to(
                    ".demo-subtitle",
                    { autoAlpha: 1, y: 0 },
                    "demoIn+=0.15",
                );

                master.to(
                    ".demo-card",
                    { autoAlpha: 1, scale: 1, y: 0, rotateX: 0 },
                    "demoIn+=0.25",
                );

                master.to(
                    ".demo-card-left",
                    { autoAlpha: 0.6, x: -120, rotateZ: -15, scale: 0.9 },
                    "demoIn+=0.35",
                );

                master.to(
                    ".demo-card-right",
                    { autoAlpha: 0.6, x: 120, rotateZ: 15, scale: 0.9 },
                    "demoIn+=0.35",
                );

                master.to(
                    ".demo-hint-left, .demo-hint-right",
                    { autoAlpha: 1, x: 0 },
                    "demoIn+=0.55",
                );

                master.to(
                    ".demo-micro-copy",
                    { autoAlpha: 1, y: 0 },
                    "demoIn+=0.65",
                );

                /* ======================================================
                   DEMO OUT (2 → 2.6)
                ====================================================== */
                master.addLabel("demoOut", 2);

                master.set(
                    ".demo-section",
                    { pointerEvents: "none" },
                    "demoOut+=0.1",
                );

                master.to(
                    ".demo-card",
                    {
                        y: -100,
                        scale: 0.92,
                        autoAlpha: 0,
                        filter: "blur(6px)",
                    },
                    "demoOut",
                );

                master.to(
                    ".demo-card-left",
                    {
                        x: -220,
                        rotateZ: -24,
                        scale: 0.8,
                        autoAlpha: 0,
                    },
                    "demoOut",
                );

                master.to(
                    ".demo-card-right",
                    {
                        x: 220,
                        rotateZ: 24,
                        scale: 0.8,
                        autoAlpha: 0,
                    },
                    "demoOut",
                );

                master.to(
                    [
                        ".demo-title",
                        ".demo-subtitle",
                        ".demo-micro-copy",
                        ".demo-hint-left",
                        ".demo-hint-right",
                    ],
                    {
                        y: -40,
                        autoAlpha: 0,
                    },
                    "demoOut+=0.05",
                );

                master.to(".demo-section", { autoAlpha: 0 }, "demoOut+=0.65");

                /* ======================================================
                FEATURES IN (2.6 → 3.6)
                ====================================================== */
                master.addLabel("featuresIn", "demoOut+=0.55");

                master.set(
                    ".demo-section",
                    { pointerEvents: "none" },
                    "featuresIn",
                );
                master.set(
                    ".features-section",
                    { pointerEvents: "auto" },
                    "featuresIn",
                );

                /* RESET */
                gsap.set(".features-section", { autoAlpha: 0 });

                gsap.set(".features-title, .features-subtitle", {
                    autoAlpha: 0,
                    y: 40,
                });

                gsap.set(".features-grid > *", {
                    autoAlpha: 0,
                    y: 60,
                    scale: 0.92,
                });

                /* SECTION FADE */
                master.to(
                    ".features-section",
                    {
                        autoAlpha: 1,
                        duration: 0.25,
                        ease: "none",
                    },
                    "featuresIn",
                );

                /* TITLE */
                master.to(
                    ".features-title",
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power3.out",
                    },
                    "featuresIn+=0.1",
                );

                /* SUBTITLE */
                master.to(
                    ".features-subtitle",
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power3.out",
                    },
                    "featuresIn+=0.18",
                );

                /* CARDS IN */
                master.to(
                    ".features-grid > *",
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.08,
                        duration: 0.35,
                        ease: "power3.out",
                    },
                    "featuresIn+=0.3",
                );

                /* FLOAT LIFE */
                master.to(
                    ".features-grid > *",
                    {
                        y: -6,
                        stagger: {
                            each: 0.06,
                            yoyo: true,
                            repeat: 1,
                        },
                        duration: 0.4,
                        ease: "sine.inOut",
                    },
                    "featuresIn+=1.1",
                );

                /* ======================================================
                FEATURES OUT (3.6 → 4.1)
                ====================================================== */
                master.addLabel("featuresOut", "featuresIn+=1.2");

                /* disable interaction */
                master.set(
                    ".features-section",
                    { pointerEvents: "none" },
                    "featuresOut",
                );

                /* ===== CARDS OUT (mirror IN) ===== */
                master.to(
                    ".features-grid > *",
                    {
                        y: -100,
                        scale: 1,
                        autoAlpha: 0,
                        stagger: 0.08,
                        duration: 0.35,
                        ease: "power3.in",
                    },
                    "featuresOut+=0.3",
                );

                /* ===== FLOAT LIFE (final breath) ===== */
                master.to(
                    ".features-grid > *",
                    {
                        y: 6,
                        stagger: {
                            each: 0.06,
                            yoyo: true,
                            repeat: 1,
                        },
                        duration: 0.4,
                        ease: "sine.inOut",
                    },
                    "featuresOut",
                );

                /* ===== TITLE + SUBTITLE OUT ===== */
                master.to(
                    [".features-title", ".features-subtitle"],
                    {
                        y: -40,
                        autoAlpha: 0,
                        duration: 0.25,
                        ease: "power3.in",
                    },
                    "featuresOut+=0.4",
                );

                /* ===== SECTION FADE ===== */
                master.to(
                    ".features-section",
                    {
                        autoAlpha: 0,
                        duration: 0.3,
                        ease: "none",
                    },
                    "featuresOut+=0.5",
                );

                /* ======================================================
                CTA IN (4.1 → end)
                ====================================================== */
                master.addLabel("ctaIn", "featuresOut+=0.9");

                gsap.set(".cta-section", { autoAlpha: 0, scale: 0.96, y: 40 });

                gsap.set(".cta-title", { autoAlpha: 0, y: 30 });
                gsap.set(".cta-subtitle", { autoAlpha: 0, y: 24 });

                gsap.set(".cta-stats > *", {
                    autoAlpha: 0,
                    y: 24,
                    scale: 0.95,
                }); 

                gsap.set(".cta-action", {
                    autoAlpha: 0,
                    y: 20,
                    scale: 0.9,
                });

                master.set(".cta-section", { pointerEvents: "auto" }, "ctaIn");

                master.to(
                    ".cta-section",
                    {
                        autoAlpha: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "ctaIn",
                );

                /* TITLE */
                master.to(
                    ".cta-title",
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "ctaIn+=0.2",
                );

                /* SUBTITLE */
                master.to(
                    ".cta-subtitle",
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "ctaIn+=0.35",
                );

                /* STATS STAGGER */
                master.to(
                    ".cta-stats > *",
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.12,
                        duration: 0.5,
                        ease: "power3.out",
                    },
                    "ctaIn+=0.5",
                );

                /* CTA BUTTON – POP */
                master.to(
                    ".cta-action",
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.55,
                        ease: "back.out(1.6)",
                    },
                    "ctaIn+=0.85",
                );
            });

            return () => ctx.revert();
        });

        // TABLET + MOBILE ANIMATIONS – DISABLE PARALLAX
        mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
            disableParallax();
        });

        mm.add("(max-width: 767px)", () => {
            disableParallax();
        });

        return () => mm.revert();
    }, []);
}

const disableParallax = () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    /* Reset transform / opacity scroll */
    gsap.set(
        [".hero-section", ".demo-section", ".features-section", ".cta-section"],
        {
            clearProps: "all",
        },
    );

    /* eliminate pin */
    gsap.set(".parallax-section", {
        clearProps: "all",
    });

    /* Enable pointer events for every sections */
    gsap.set(
        [".hero-section", ".demo-section", ".features-section", ".cta-section"],
        {
            pointerEvents: "auto",
        },
    );
};
