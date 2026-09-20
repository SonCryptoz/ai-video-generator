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
    const [renderProgress, setRenderProgress] = useState<number | null>(null);
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
        if (!videoId || exporting || !videoData) return;

        const createdBlobUrls: string[] = [];

        try {
            setExporting(true);
            setRenderProgress(0);
            toast.info(
                "Rendering video in your browser with hardware acceleration...",
            );

            // Pre-load assets as local Blob URLs so they are strictly same-origin (cannot taint canvas)
            const toBlobUrl = async (url: string) => {
                try {
                    const res = await fetch(url);
                    const blob = await res.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    createdBlobUrls.push(blobUrl);
                    return blobUrl;
                } catch (e) {
                    console.warn("Fallback to original URL:", url, e);
                    return url;
                }
            };

            const localImageList = await Promise.all(
                (videoData.imageList || []).map(toBlobUrl),
            );

            const localAudioUrl = videoData.audioFileUrl
                ? await toBlobUrl(videoData.audioFileUrl)
                : videoData.audioFileUrl;

            const inputProps = {
                ...videoData,
                imageList: localImageList,
                audioFileUrl: localAudioUrl,
                isPreview: false,
            };

            // Dynamic import to avoid any SSR evaluation
            const { renderMediaOnWeb } = await import("@remotion/web-renderer");

            const result = await renderMediaOnWeb({
                composition: {
                    component: RemotionVideo,
                    id: "RemotionVideo",
                    width: 1080,
                    height: 1920,
                    fps: fps,
                    durationInFrames: durationInFrames,
                    defaultProps: inputProps,
                },
                inputProps,
                codec: "h264",
                container: "mp4",
                onProgress: ({ encodedFrames }) => {
                    const percent = Math.round(
                        (encodedFrames / durationInFrames) * 100,
                    );
                    setRenderProgress(Math.min(percent, 99));
                },
            });

            setRenderProgress(100);
            const blob = await result.getBlob();

            let videoUrl: string | null = null;

            // Upload lên Cloudinary để lấy link URL xem video
            try {
                const signRes = await fetch("/api/cloudinary-sign", {
                    method: "POST",
                });
                if (signRes.ok) {
                    const signData = await signRes.json();
                    const formData = new FormData();
                    formData.append("file", blob, `video-${videoId}.mp4`);
                    formData.append("api_key", signData.apiKey);
                    formData.append("timestamp", String(signData.timestamp));
                    formData.append("signature", signData.signature);
                    formData.append("folder", signData.folder);

                    const uploadRes = await fetch(
                        `https://api.cloudinary.com/v1_1/${signData.cloudName}/video/upload`,
                        {
                            method: "POST",
                            body: formData,
                        },
                    );

                    if (uploadRes.ok) {
                        const uploadJson = await uploadRes.json();
                        if (uploadJson.secure_url) {
                            videoUrl = uploadJson.secure_url;
                        }
                    }
                }
            } catch (uploadErr) {
                console.warn("Cloudinary upload error:", uploadErr);
            }

            // Mở tab mới với URL Cloudinary hoặc Blob URL
            const finalUrl = videoUrl || URL.createObjectURL(blob);

            toast.success("Export completed. Opening video in a new tab");

            setTimeout(() => {
                window.open(finalUrl, "_blank");
            }, 1000);
        } catch (err) {
            console.error("Client render error:", err);
            toast.error(
                err instanceof Error
                    ? err.message
                    : "Client-side video render failed",
            );
        } finally {
            setExporting(false);
            setRenderProgress(null);
            // Clean up blob URLs from memory
            createdBlobUrls.forEach((url) => {
                try {
                    URL.revokeObjectURL(url);
                } catch {}
            });
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
                title={
                    renderProgress !== null
                        ? `Rendering video (${renderProgress}%)`
                        : "Rendering your video..."
                }
                message="Processing frames with GPU acceleration directly in your browser. Please keep this tab open."
            />
        </div>
    );
}
