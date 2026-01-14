"use client";

import Particles3D from "@/components/ui/partics-3d";
import GridWave from "@/components/ui/grid-wave";
import FloatingSpheres from "@/components/ui/floating-spheres";

export default function CinematicBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Aurora */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,100,255,0.25),transparent_60%)] opacity-70" />

            {/* Soft overlay */}
            <div className="absolute inset-0 bg-black/10" />

            <Particles3D className="hero-particles" />
            <GridWave />
            <FloatingSpheres className="hero-spheres" />
        </div>
    );
}
