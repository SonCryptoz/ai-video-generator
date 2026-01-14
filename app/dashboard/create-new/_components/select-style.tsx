"use client";

import Image from "next/image";
import { useState } from "react";

const SelectStyle = ({
    onUserSelect,
}: {
    onUserSelect?: (key: string, value: string) => void;
}) => {
    const [selected, setSelected] = useState<string | null>(null);

    const styles = [
        { name: "Realistic", image: "/realistic.png" },
        { name: "Minimalist", image: "/minimalist.png" },
        { name: "Pop Art", image: "/popart.png" },
        { name: "Cartoon", image: "/cartoon.png" },
        { name: "Cinematic", image: "/cinematic.png" },
        { name: "Anime", image: "/anime.png" },
        { name: "Fantasy", image: "/fantasy.png" },
        { name: "Cyberpunk", image: "/cyberpunk.png" },
        { name: "Dreamy", image: "/dreamy.png" },
        { name: "3D Render", image: "/3drender.png" },
        { name: "Luxury", image: "/luxury.png" },
        { name: "Sketch", image: "/sketch.png" },
    ];

    return (
        <div className="mb-10">
            <h2 className="font-bold text-2xl text-secondary mb-3">Style</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
                Select your video style
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {styles.map((item) => (
                    <div
                        key={item.name}
                        className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                            selected === item.name
                                ? "border-primary ring-2 ring-primary shadow-md"
                                : "border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => {
                            setSelected(item.name);
                            onUserSelect?.("style", item.name);
                        }}
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={300}
                            height={200}
                            className="h-36 w-full object-cover"
                        />

                        {/* Overlay chữ với gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end justify-center">
                            <p className="text-white text-sm font-medium p-2">
                                {item.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selected && (
                <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
                    Selected style:{" "}
                    <span className="font-semibold text-primary">
                        {selected}
                    </span>
                </p>
            )}
        </div>
    );
};

export default SelectStyle;
