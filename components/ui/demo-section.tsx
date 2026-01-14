"use client";

import Image from "next/image";
import DemoCard from "./demo-card";

export default function DemoSection() {
    return (
        <section className="demo-section relative w-full min-h-screen flex justify-center items-center">
            {/* ================= CONTENT ================= */}
            <div className="relative mx-auto px-4 flex flex-col items-center text-center gap-10">
                {/* Title */}
                <div className="flex flex-col items-center gap-4">
                    <h2
                        className="
                        demo-title text-3xl md:text-4xl font-extrabold
                        bg-clip-text text-transparent
                        bg-linear-to-r from-primary to-secondary
                    "
                    >
                        See What You Can Create
                    </h2>

                    <p className="demo-subtitle text-base-content/70 max-w-xl">
                        A cinematic short video generated entirely by
                        <span className="text-base-content font-medium">
                            {" "}
                            AI PicMotion Lab
                        </span>
                        .
                    </p>
                </div>

                {/* ================= DEMO STAGE ================= */}
                <div className="demo-stage w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-70">
                    {/* LEFT HINT */}
                    <div className="hidden md:flex demo-hint-left flex-col items-end gap-2 text-xs opacity-60">
                        <span className="tracking-wide">Text → Video</span>
                        <span className="tracking-wide">Image → Motion</span>
                    </div>

                    {/* DEMO CARD */}
                    <div className="demo-card relative flex items-center justify-center perspective-distant">
                        {/* LEFT CARD */}
                        <div className="demo-card-side demo-card-left">
                            <div className="demo-card-inner">
                                <Image
                                    src="/3drender.png"
                                    alt="Preview 1"
                                    className="w-full h-full object-cover"
                                    width={400}
                                    height={300}
                                />
                            </div>
                        </div>

                        {/* MAIN CARD */}
                        <div className="demo-card-main relative z-20">
                            <DemoCard />
                        </div>

                        {/* RIGHT CARD */}
                        <div className="demo-card-side demo-card-right">
                            <div className="demo-card-inner">
                                <Image
                                    src="/sketch.png"
                                    alt="Preview 2"
                                    className="w-full h-full object-cover"
                                    width={400}
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT HINT */}
                    <div className="hidden md:flex demo-hint-right flex-col items-start gap-2 text-xs opacity-60">
                        <span className="tracking-wide">AI Camera</span>
                        <span className="tracking-wide">Cinematic Motion</span>
                    </div>
                </div>

                {/* Micro copy */}
                <p className="demo-micro-copy text-xs opacity-50">
                    Generated in under 60 seconds · No editing required
                </p>
            </div>
        </section>
    );
}
