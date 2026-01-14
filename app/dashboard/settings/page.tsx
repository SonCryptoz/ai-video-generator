"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import type { Metadata } from "next";

import { THEMES, useThemeStore } from "@/app/store/use-theme-store";

export const metadata: Metadata = {
    title: "Settings",
};

const SettingsPage = () => {
    const { user } = useUser();
    const { theme, setTheme } = useThemeStore();

    return (
        <div className="h-full container mx-auto pt-6 max-w-5xl">
            <div className="space-y-12">
                {/* GENERAL SETTINGS */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-1">Settings</h2>
                    <p className="opacity-60 text-sm">
                        Customize your preferences.
                    </p>
                </div>

                {/* ===== PROFILE SECTION ===== */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Profile</h3>

                    <div
                        className="
                        bg-base-200/40 dark:bg-base-200/10 
                        rounded-2xl p-6 border border-base-300/40 
                        flex items-center justify-between gap-6
                    "
                    >
                        {/* Left: Avatar + info */}
                        <div className="flex items-center gap-4">
                            <Image
                                src={user?.imageUrl || "/cartoon.png"}
                                alt="Avatar"
                                width={72}
                                height={72}
                                className="rounded-full shadow"
                            />

                            <div>
                                <p className="font-bold text-lg">
                                    {user?.fullName}
                                </p>
                                <p className="opacity-70 text-sm">
                                    {user?.primaryEmailAddress?.emailAddress}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* THEME SELECTOR */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Theme</h3>
                    <p className="text-base-content/70 text-sm mb-3">
                        Choose an interface theme.
                    </p>

                    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {THEMES.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTheme(t)}
                                className={`
                                    group p-2 rounded-2xl border-4 transition-all hover:scale-[1.03] cursor-pointer
                                    ${
                                        theme === t
                                            ? "border-primary shadow-md"
                                            : "border-base-300 hover:border-base-200"
                                    }
                                `}
                                data-theme={t}
                            >
                                <div className="h-6 w-full rounded-md bg-linear-to-r from-primary via-secondary to-accent mb-2" />
                                <div className="grid grid-cols-4 gap-1">
                                    <div className="h-3 rounded bg-primary"></div>
                                    <div className="h-3 rounded bg-secondary"></div>
                                    <div className="h-3 rounded bg-accent"></div>
                                    <div className="h-3 rounded bg-neutral"></div>
                                </div>
                                <span className="block text-[11px] mt-1 text-center font-medium truncate">
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
