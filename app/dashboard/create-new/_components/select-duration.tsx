"use client";

import { useState } from "react";

const SelectDuration = ({
    onUserSelect,
}: {
    onUserSelect?: (key: string, value: string) => void;
}) => {
    const [value, setValue] = useState(30);

    return (
        <div className="mb-10">
            <h2 className="font-bold text-2xl text-balance mb-3">Duration</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
                Select your video duration (in seconds)
            </p>

            <div className="flex flex-col items-start gap-3">
                <input
                    type="range"
                    min={5}
                    max={60}
                    step={5}
                    value={value}
                    onChange={(e) => {
                        const v = Number(e.target.value);
                        setValue(v);
                        onUserSelect?.("duration", v.toString());
                    }}
                    className="range range-accent w-[280px]"
                />

                <div className="flex justify-between w-[280px] text-sm opacity-70">
                    <span>5s</span>
                    <span>30s</span>
                    <span>60s</span>
                </div>
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Duration:{" "}
                <span className="font-semibold text-primary">{value}s</span>
            </p>
        </div>
    );
};

export default SelectDuration;
