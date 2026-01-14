"use client";

import { useEffect, useState } from "react";
import { Player } from "@remotion/player";

import RemotionVideo from "@/remotion/compositions/remotion-video";
import { VideoDataType } from "@/configs/schema";
import { toast } from "@/app/actions/toast";
import CustomLoading from "../create-new/_components/custom-loading";

export default function PlayerDialog({
    playVideo,
    videoId,
    setPlayVideo,
}: {
    playVideo: boolean;
    videoId: string | number | null;
    setPlayVideo: (value: boolean) => void;
}) {
    const [videoData, setVideoData] = useState<VideoDataType | null>(null);
    const [durationInFrames, setDurationInFrames] = useState(120);
    const [exporting, setExporting] = useState(false);
    const fps = 30;

    const calculateDuration = async (data: VideoDataType) => {
        if (data.audioFileUrl) {
            try {
                const response = await fetch(data.audioFileUrl);
                const arrayBuffer = await response.arrayBuffer();

                const audioContext = new AudioContext();
                const decoded = await audioContext.decodeAudioData(arrayBuffer);

                setDurationInFrames(Math.floor(decoded.duration * fps));
                return;
            } catch {}
        }

        if (data.script && typeof data.script === "object") {
            const words = data.script.scenes
                .map((s) => s.contextText)
                .join(" ")
                .trim()
                .split(/\s+/).length;

            setDurationInFrames(Math.floor((words / 2.5) * fps));
            return;
        }

        setDurationInFrames(120);
    };

    const renderVideo = async () => {
        if (!videoId || exporting) return;

        try {
            setExporting(true);

            const res = await fetch("/api/render-video", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    videoId,
                    durationInFrames,
                    fps,
                }),
            });

            if (!res.ok) {
                throw new Error(`API error ${res.status}`);
            }

            const json = await res.json();

            if (!json.url) {
                throw new Error("Export succeeded but no URL returned");
            }

            if (!json.success || !json.url) {
                throw new Error(json.message || "Export failed");
            }

            toast.success("Export completed. Opening video in a new tab");

            setTimeout(() => {
                window.open(json.url, "_blank");
            }, 3000);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Export failed");
        } finally {
            setExporting(false);
        }
    };

    useEffect(() => {
        if (!videoId) return;

        (async () => {
            try {
                const res = await fetch("/api/get-video", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: videoId }),
                });

                const json = await res.json();
                const data = json.data;

                setVideoData(data);
                if (data) calculateDuration(data);
            } catch {}
        })();
    }, [videoId]);

    if (!playVideo) return null;

    return (
        // BACKDROP
        <div
            className="
                fixed inset-0 bg-black/60 backdrop-blur-md 
                flex items-center justify-center 
                z-999 animate-fadeIn
            "
            onClick={() => {
                if (!exporting) setPlayVideo(false);
            }}
        >
            {/* MODAL */}
            <div
                className="
                    relative
                    w-full max-w-100
                    rounded-3xl
                    p-6
                    bg-white/10 dark:bg-black/20
                    backdrop-blur-2xl
                    border border-white/20 dark:border-white/10
                    shadow-[0_8px_40px_rgba(0,0,0,0.25)]
                    animate-scaleIn
                "
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-center mb-4">
                    Your video is ready
                </h2>

                {!videoData && (
                    <div className="text-center py-10 opacity-70">
                        Loading your video…
                    </div>
                )}

                {videoData && (
                    <div className="flex justify-center mb-5">
                        <Player
                            key={videoId + "--" + durationInFrames}
                            component={RemotionVideo}
                            durationInFrames={durationInFrames}
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={fps}
                            controls
                            inputProps={{
                                ...videoData,
                                isPreview: true,
                            }}
                            acknowledgeRemotionLicense
                        />
                    </div>
                )}

                {/* BUTTONS */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        disabled={exporting}
                        className="btn btn-sm btn-neutral/30 backdrop-blur-md border border-white/20"
                        onClick={() => setPlayVideo(false)}
                    >
                        Close
                    </button>

                    <button
                        className="btn btn-sm btn-primary rounded-full"
                        disabled={exporting}
                        onClick={renderVideo}
                    >
                        Export
                    </button>
                </div>
            </div>
            <CustomLoading
                loading={exporting}
                title="Rendering your video"
                message="This may take a few moments. Please don’t close or reload the site."
            />
        </div>
    );
}
