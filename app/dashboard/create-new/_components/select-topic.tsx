"use client";

import { useState } from "react";

const SelectTopic = ({
    onUserSelect,
}: {
    onUserSelect?: (key: string, value: string) => void;
}) => {
    const [topic, setTopic] = useState("");

    const topics = [
        "Custom Prompt",
        "Motivation",
        "Love",
        "Funny",
        "Storytelling",
        "Music / Lyrics",
        "Travel",
        "Tech Explainer",
        "Quotes",
        "Animals",
        "Product Review",
    ];

    return (
        <div className="mb-10">
            <h2 className="font-bold text-2xl text-primary mb-3">Content</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
                What is the topic of your video?
            </p>

            {/* DaisyUI select */}
            <select
                className="select select-bordered text-primary w-full sm:w-[280px] bg-base-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary"
                value={topic}
                onChange={(e) => {
                    const value = e.target.value;
                    setTopic(value);
                    if (value !== "Custom Prompt") {
                        onUserSelect?.("topic", value);
                    } else {
                        onUserSelect?.("topic", "");
                    }
                }}
            >
                <option disabled value="">
                    Select a topic
                </option>
                {topics.map((item) => (
                    <option
                        key={item}
                        value={item}
                        style={
                            item === "Custom Prompt"
                                ? { color: "var(--color-accent)" }
                                : undefined
                        }
                    >
                        {item}
                    </option>
                ))}
            </select>

            {/* Custom prompt textarea */}
            {topic === "Custom Prompt" ? (
                <div className="mt-6">
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                        Enter your custom prompt
                    </label>
                    <textarea
                        onChange={(e) =>
                            onUserSelect?.("topic", e.target.value)
                        }
                        placeholder="Describe your idea or concept for the video..."
                        className="textarea textarea-bordered w-full h-32 resize-none border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary transition-all rounded-2xl"
                    />
                </div>
            ) : (
                topic && (
                    <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
                        Selected topic:{" "}
                        <span className="font-semibold">{topic}</span>
                    </p>
                )
            )}
        </div>
    );
};

export default SelectTopic;
