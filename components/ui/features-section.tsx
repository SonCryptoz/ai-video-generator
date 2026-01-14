"use client";

import FeatureCard3D from "./features-card-3d";
import { Sparkles, Video, Wand2, Layers, Captions, Rocket } from "lucide-react";

const FEATURES = [
    {
        icon: Sparkles,
        title: "AI Script Generation",
        desc: "Generate scripts from ideas instantly.",
    },
    {
        icon: Video,
        title: "AI Video Composition",
        desc: "Turn images & scenes into short videos.",
    },
    {
        icon: Captions,
        title: "Smart Captions",
        desc: "Auto subtitles synced perfectly with visuals.",
    },
    {
        icon: Wand2,
        title: "Image Prompting",
        desc: "Craft stunning AI visuals with prompt control.",
    },
    {
        icon: Layers,
        title: "Scene Control",
        desc: "Adjust pacing, timing, and transitions easily.",
    },
    {
        icon: Rocket,
        title: "One-click Export",
        desc: "Render & export optimized videos instantly.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="features-section relative min-h-screen py-32 overflow-hidden flex justify-center items-center">
            <div className="features-wrapper relative max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="features-heading text-center mb-20">
                    <h2 className="features-title text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                        Powerful AI Features
                    </h2>
                    <p className="features-subtitle mt-4 text-base-content/70 max-w-xl mx-auto">
                        Everything you need to create viral AI short videos.
                    </p>
                </div>

                {/* Grid */}
                <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((f, i) => (
                        <FeatureCard3D key={i} {...f} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
