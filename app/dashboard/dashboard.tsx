"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import EmptyState from "./_components/empty-state";
import { VideoDataType } from "@/configs/schema";
import VideoList from "./_components/video-list";
import VideoSkeletonList from "./_components/video-skeleton-list";

import { useSearchStore } from "@/app/store/use-search-store";
import NoSearchResult from "@/components/ui/no-search-result";
import { useSortStore } from "@/app/store/use-sort-store";

const DashboardPage = () => {
    const { user } = useUser();
    const search = useSearchStore((s) => s.q.toLowerCase());
    const { sort, setSort } = useSortStore();

    const [videos, setVideos] = useState<VideoDataType[]>([]);
    const [loading, setLoading] = useState(true);

    const getVideoList = async () => {
        const res = await fetch("/api/get-videos");
        return await res.json();
    };

    useEffect(() => {
        let ignore = false;

        const fetchVideos = async () => {
            setLoading(true);
            try {
                const data = await getVideoList();
                if (!ignore) setVideos(data || []);
            } catch (err) {
                console.error(err);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchVideos();

        return () => {
            ignore = true;
        };
    }, []);

    // FILTER
    const filteredVideos = useMemo(() => {
        if (!search.trim()) return videos;

        const q = search.trim();
        return videos.filter((v) => {
            const idMatch = String(v.id).includes(q);

            const scriptMatch = v.script.scenes.some(
                (s) =>
                    s.contextText.toLowerCase().includes(q) ||
                    s.imagePrompt.toLowerCase().includes(q),
            );

            const captionMatch = v.captions.some((c) =>
                c.text.toLowerCase().includes(q),
            );

            return idMatch || scriptMatch || captionMatch;
        });
    }, [search, videos]);

    // SORT
    const sortedVideos = useMemo(() => {
        const arr = [...filteredVideos];

        const num = (v: VideoDataType) => Number(v.id);

        if (sort === "id-asc") arr.sort((a, b) => num(a) - num(b));
        if (sort === "id-desc") arr.sort((a, b) => num(b) - num(a));

        return arr;
    }, [filteredVideos, sort]);

    return (
        <div className="p-6 md:p-10 relative">
            {/* HEADER */}
            <div
                className="
                w-full rounded-3xl p-6 md:p-8
                bg-white/5 dark:bg-black/10
                backdrop-blur-2xl border border-white/20
                shadow-[0_8px_32px_rgb(0,0,0,0.06)]
                flex items-center justify-between flex-wrap gap-4
                animate-fadein
            "
            >
                <div>
                    <h2
                        className="
                        text-3xl font-bold
                        bg-clip-text text-transparent
                        bg-linear-to-r from-primary to-secondary
                    "
                    >
                        Welcome back, {user?.firstName || "Creator"}
                    </h2>

                    <p className="text-sm opacity-70 mt-1">
                        Manage your AI-powered short videos with ease.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/dashboard/create-new">
                        <button className="btn btn-primary rounded-full px-6 shadow-primary/30 shadow-md hover:shadow-lg hover:shadow-primary/40 active:scale-95 transition-all">
                            Create New
                        </button>
                    </Link>
                </div>
            </div>

            {/* SORT - luôn hiển thị */}
            {!loading && sortedVideos.length > 0 && (
                <div className="mt-6">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="
                        select select-bordered select-sm rounded-full 
                        bg-base-200 border-base-300 w-auto
                    "
                    >
                        <option value="id-asc">ID ↑</option>
                        <option value="id-desc">ID ↓</option>
                    </select>
                </div>
            )}

            {/* CONTENT */}
            <div className="mt-6 min-h-75">
                {loading && <VideoSkeletonList />}

                {!loading && sortedVideos.length > 0 && (
                    <VideoList
                        videoList={sortedVideos}
                        onDeleted={(id) => {
                            setVideos((prev) =>
                                prev.filter((v) => v.id !== id),
                            );
                        }}
                    />
                )}

                {!loading && sortedVideos.length === 0 && search && (
                    <NoSearchResult query={search} />
                )}

                {!loading && sortedVideos.length === 0 && !search && (
                    <EmptyState />
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
