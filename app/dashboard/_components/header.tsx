"use client";

import { useState } from "react";
// import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

// import { UserDetailsContext } from "@/app/_context/user-details-context";
import SearchBar from "@/components/ui/search-bar";

export default function Header() {
    const [open, setOpen] = useState(false);
    // const { userDetails } = useContext(UserDetailsContext)!;

    return (
        <>
            {/* TOP NAV - Apple Liquid Glass */}
            <header
                className="
                    sticky top-0 z-50
                    backdrop-blur-2xl
                    bg-base-100/30
                    border-b border-white/20 dark:border-white/5
                    shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_-1px_0_rgba(0,0,0,0.12)_inset]
                    transition-colors
                "
            >
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu */}
                        <button
                            className="md:hidden btn btn-ghost btn-square"
                            onClick={() => setOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        {/* Logo */}
                        <Link
                            href="/"
                            className="
                                flex items-center gap-2
                                scale-100 hover:scale-[1.03] transition-transform duration-200
                            "
                        >
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={36}
                                height={36}
                            />
                            <span
                                className="
                                font-bold text-lg 
                                bg-clip-text text-transparent 
                                bg-linear-to-r from-primary to-secondary
                            "
                            >
                                AI PicMotion Lab
                            </span>
                        </Link>
                    </div>

                    {/* Center Search */}
                    <div className="flex-1 flex items-center justify-center mx-7">
                        <SearchBar />
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Credits
                        <div
                            className="flex items-center gap-4 hover:opacity-80 transition tooltip tooltip-bottom"
                            data-tip="Available credits"
                        >
                            <Image
                                src="/credits.gif"
                                alt="Credits"
                                width={28}
                                height={28}
                                className="rounded-full"
                            />
                            <span className="font-semibold">
                                {userDetails?.credits}
                            </span>
                        </div> */}

                        <UserButton />
                    </div>
                </div>
            </header>

            {/* BG Overlay for Drawer */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${
                    open ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setOpen(false)}
            />

            {/* APPLE GLASS DRAWER */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-72 z-50
                    bg-base-100/20 backdrop-blur-2xl
                    border-r border-white/10
                    shadow-[inset_0_0_0.5px_rgba(255,255,255,0.25)]
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="p-5 flex flex-col gap-6 h-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={32}
                                height={32}
                            />
                            <span className="font-bold text-lg">
                                PicMotion Lab
                            </span>
                        </div>

                        <button
                            className="btn btn-ghost btn-square"
                            onClick={() => setOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex flex-col gap-4 text-base font-semibold">
                        {[
                            ["Dashboard", "/dashboard"],
                            ["Create New", "/dashboard/create-new"],
                            ["Settings", "/dashboard/settings"],
                        ].map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="
                                    px-2 py-2 rounded-lg
                                    hover:bg-white/10 hover:backdrop-blur-xl
                                    transition-all duration-200
                                "
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto text-xs opacity-60">
                        © {new Date().getFullYear()} AI PicMotion Lab
                    </div>
                </div>
            </aside>
        </>
    );
}
