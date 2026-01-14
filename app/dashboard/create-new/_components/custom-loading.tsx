"use client";

import Image from "next/image";

interface CustomLoadingProps {
    loading: boolean;
    title?: string;
    message?: string;
}

export default function CustomLoading({
    loading,
    title = "Generating Content...",
    message = "Please wait while we create your video",
}: CustomLoadingProps) {
    return (
        <>
            {/* Overlay */}
            <div
                className={`
                    fixed inset-0 z-999
                    transition-all duration-300
                    ${
                        loading
                            ? "opacity-100 visible pointer-events-auto"
                            : "opacity-0 invisible pointer-events-none"
                    }
                    bg-black/40 backdrop-blur-md
                `}
            />

            {/* Modal Box */}
            <div
                className={`
                    fixed inset-0 z-1000
                    flex items-center justify-center
                    transition-all duration-300
                    ${loading ? "pointer-events-auto" : "pointer-events-none"}
                `}
            >
                <div
                    className={`
                        w-[90%] max-w-sm p-8
                        rounded-3xl
                        shadow-[0_8px_40px_rgba(0,0,0,0.2)]
                        bg-base-100/70 backdrop-blur-xl
                        border border-white/20
                        transition-all duration-300
                        ${
                            loading
                                ? "opacity-100 scale-100 translate-y-0"
                                : "opacity-0 scale-95 translate-y-3"
                        }
                    `}
                >
                    <div className="flex flex-col items-center gap-4 text-center">
                        <Image
                            src="/loading.gif"
                            alt="Loading"
                            width={64}
                            height={64}
                            className="animate-pulse drop-shadow-md"
                            unoptimized
                        />

                        <h2 className="text-lg font-semibold text-base-content">
                            {title}
                        </h2>

                        <p className="text-sm opacity-70">{message}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
