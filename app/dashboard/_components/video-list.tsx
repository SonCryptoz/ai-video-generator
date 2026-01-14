import { useState } from "react";
import { Thumbnail } from "@remotion/player";
import { VideoDataType } from "@/configs/schema";
import RemotionVideo from "../../../remotion/compositions/remotion-video";
import PlayerDialog from "./player-dialog";

const ITEMS_PER_PAGE = 8;

const VideoList = ({ videoList }: { videoList: VideoDataType[] }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState<
        string | number | null
    >(null);
    const [page, setPage] = useState(1);

    // PAGINATION LOGIC
    const totalPages = Math.ceil(videoList.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const currentVideos = videoList.slice(start, start + ITEMS_PER_PAGE);

    if (!videoList || videoList.length === 0) {
        return (
            <p className="text-center text-base opacity-60 mt-10">
                No videos found.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-10 mt-8">
            {/* Video Grid */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {currentVideos.map((video) => (
                    <div
                        key={video.id}
                        className="
                            group cursor-pointer relative 
                            rounded-3xl overflow-hidden 
                            bg-white/5 dark:bg-black/10 
                            backdrop-blur-xl 
                            border border-white/20 
                            shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                            transition-all duration-300 
                            hover:-translate-y-2 
                            hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                        "
                        onClick={() => {
                            setOpenDialog(true);
                            setSelectedVideoId(video.id);
                        }}
                    >
                        <div className="relative">
                            <Thumbnail
                                component={RemotionVideo}
                                compositionWidth={500}
                                compositionHeight={400}
                                frameToDisplay={0}
                                durationInFrames={120}
                                fps={30}
                                inputProps={{ ...video }}
                                className="
                                    w-full aspect-3/4 object-cover 
                                    transition-all duration-500 
                                    group-hover:scale-105 
                                    group-hover:brightness-110
                                "
                            />

                            <div
                                className="
                                    absolute inset-0 
                                    bg-black/0 group-hover:bg-black/40 
                                    backdrop-blur-none group-hover:backdrop-blur-sm 
                                    opacity-0 group-hover:opacity-100 
                                    flex items-center justify-center 
                                    transition-all duration-300
                                "
                            >
                                <span className="text-white text-sm font-medium tracking-wide">
                                    ▶ Preview Video
                                </span>
                            </div>
                        </div>

                        <div
                            className="
                                absolute bottom-0 left-0 right-0 
                                px-3 py-2 text-xs text-white/90 
                                bg-linear-to-t from-black/60 to-transparent 
                                backdrop-blur-sm opacity-0 
                                group-hover:opacity-100 transition-all duration-300
                            "
                        >
                            {video.id || "Untitled Video"}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="
                        btn btn-sm rounded-full 
                        btn-outline 
                        btn-primary 
                        disabled:opacity-40
                    "
                >
                    «
                </button>

                <span className="text-sm opacity-70">
                    Page <strong>{page}</strong> / {totalPages}
                </span>

                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="
                        btn btn-sm rounded-full 
                        btn-outline
                        btn-primary 
                        disabled:opacity-40
                    "
                >
                    »
                </button>
            </div>

            <PlayerDialog
                playVideo={openDialog}
                videoId={selectedVideoId}
                setPlayVideo={setOpenDialog}
            />
        </div>
    );
};

export default VideoList;
