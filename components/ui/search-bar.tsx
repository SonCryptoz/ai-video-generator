"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useSearchStore } from "@/app/store/use-search-store";

type Suggest = { id: string; text: string };

export default function SearchBar() {
    const { q, setQ } = useSearchStore(); // global search state
    const [open, setOpen] = useState(false);
    const [suggests, setSuggests] = useState<Suggest[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    // -------------------------------
    // CLOSE DROPDOWN WHEN CLICK OUTSIDE
    // -------------------------------
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // -------------------------------
    // DEBOUNCE SUGGEST
    // -------------------------------
    useEffect(() => {
        const t = setTimeout(() => {
            if (!q.trim()) {
                setSuggests([]);
                setOpen(false);
                return;
            }

            setSuggests([
                { id: "s1", text: `${q} cinematic` },
                { id: "s2", text: `${q} animation` },
                { id: "s3", text: `${q} storytelling` },
            ]);
            setOpen(true);
        }, 250);

        return () => clearTimeout(t);
    }, [q]);

    // -------------------------------
    // WHEN SELECT SUGGEST
    // -------------------------------
    const onSelect = (s: Suggest) => {
        setQ(s.text);
        setOpen(false);
    };

    return (
        <div
            ref={ref}
            className="relative w-[360px] max-w-full hidden md:block"
        >
            {/* INPUT */}
            <div className="flex items-center gap-2 bg-base-200 px-3 py-2 rounded-xl border border-base-300 shadow-sm hover:border-base-400 transition">
                <Search className="w-4 h-4 text-base-content/60" />

                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onFocus={() => q && suggests.length > 0 && setOpen(true)}
                    placeholder="Search videos..."
                    className="bg-transparent outline-none w-full text-sm placeholder:opacity-60"
                />

                {q && (
                    <button
                        onClick={() => {
                            setQ("");
                            setSuggests([]);
                            setOpen(false);
                        }}
                        className="p-1 rounded-md hover:bg-base-300 transition flex items-center justify-center w-5 h-5"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* DROPDOWN */}
            {open && suggests.length > 0 && (
                <div
                    className="
                        absolute left-0 right-0 mt-2 z-999
                        bg-base-100 border border-base-300
                        rounded-xl shadow-lg overflow-hidden
                        animate-fadein
                    "
                >
                    {suggests.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => onSelect(s)}
                            className="
                                w-full text-left px-3 py-2 
                                hover:bg-base-200 transition text-sm
                            "
                        >
                            {s.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
