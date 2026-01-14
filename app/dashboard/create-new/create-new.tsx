"use client";

import { useContext, useEffect, useState } from "react";
// import { useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/app/actions/toast";

import SelectTopic from "./_components/select-topic";
import SelectStyle from "./_components/select-style";
import SelectDuration from "./_components/select-duration";
import CustomLoading from "./_components/custom-loading";
import { useVideoData } from "@/app/_context/video-data-context";
import PlayerDialog from "../_components/player-dialog";
import { UserDetailsContext } from "@/app/_context/user-details-context";

// ---- Định nghĩa type chuẩn cho form ---- //
export interface FormDataType {
    topic?: string;
    style?: string;
    duration?: string | number;
}

interface VideoScene {
    imagePrompt: string;
    contextText: string;
}

interface VideoScriptResponse {
    scenes: VideoScene[];
}

const CreateNewPage = () => {
    const { user } = useUser();

    const [formData, setFormData] = useState<FormDataType>({ duration: 30 });
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [playVideo, setPlayVideo] = useState(false);
    const [videoId, setVideoId] = useState<string>("");

    // const [scripts, setScripts] = useState<VideoScriptResponse | null>(null);
    // const [audioFileURL, setAudioFileURL] = useState<string | null>(null);
    // const [captions, setCaptions] = useState<string>("");
    // const [images, setImages] = useState<string[]>([]);

    const { videoData, setVideoData } = useVideoData();
    const { userDetails, setUserDetails } = useContext(UserDetailsContext)!;

    // Nhận dữ liệu từ component con
    const onHandleInputChange = (
        fieldName: keyof FormDataType,
        fieldValue: string | number,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
        }));
    };

    // Generate button
    const onClickGenerate = () => {
        if (!formData.topic || !formData.style || !formData.duration) {
            toast.warning(
                "Please select complete information before creating video!",
            );
            return;
        }

        // if (userDetails && (!userDetails.credits || userDetails.credits <= 0)) {
        //     toast.error(
        //         "You don't have enough credits to create a new video. Please top up your credits to continue.",
        //     );
        //     return;
        // }
        generateScript();
    };

    // Sinh video script
    const generateScript = async () => {
        const prompt = `
            Generate a video script with a TOTAL duration of exactly ${
                formData.duration
            } seconds on the topic "${formData.topic}".

            Rules (IMPORTANT):
            1. The TOTAL narration text must fit within ${
                formData.duration
            } seconds.
            2. Limit total narration to a maximum of ${
                Number(formData.duration) * 2.5
            } words (speech rate ~2.5 words/sec).

            3. The number of scenes MUST follow this duration rule:
            - If duration is 5 or 10 seconds: use EXACTLY 2 scenes.
            - If duration is 15 or 20 seconds: use EXACTLY 3 scenes.
            - If duration is 25, 30, or 35 seconds: use EXACTLY 4 scenes.
            - If duration is 40, 45, or 50 seconds: use EXACTLY 5 scenes.
            - If duration is 55 or 60 seconds: use EXACTLY 6 scenes.

            4. Each scene must include:
            - "imagePrompt": an AI image prompt in ${formData.style} style.
            - "contextText": narration for that scene only.

            5. Keep narration concise, clear, and properly paced.
            6. Do NOT exceed the total word limit.
            7. The result must be valid JSON.

            Return ONLY JSON in this exact structure:
            {
                "scenes": [
                    {
                    "imagePrompt": "string",
                    "contextText": "string"
                    }
                ]
            }

            No explanations. No comments. Only JSON.
        `;

        try {
            setLoading(true);

            const res = await axios.post("/api/get-video-script", { prompt });

            // Nếu API trả về "rawText" thì parse thủ công
            let data = res.data;

            // Nếu mô hình trả về JSON dạng text, xử lý thủ công
            if (data.rawText) {
                const cleaned = data.rawText
                    .replace(/```json|```/g, "") // xóa code fences
                    .trim();
                try {
                    data = JSON.parse(cleaned);
                } catch (parseErr) {
                    console.error("JSON parse error:", parseErr, cleaned);
                    toast.error("AI returned invalid JSON. Please try again.");
                    return;
                }
            }

            if (!data.scenes || !Array.isArray(data.scenes)) {
                toast.error("Invalid response from AI. Please try again.");
                return;
            }

            // set scenes data
            setVideoData((prev) => ({
                ...prev,
                videoScript: {
                    scenes: data.scenes,
                },
            }));

            // setScripts({ scenes: data.scenes });
            await generateAudioFile({ scenes: data.scenes });
        } catch (err: unknown) {
            console.error("Error generating video script:", err);

            let message = "Unknown error";

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.error || err.message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            toast.error(`AI generation failed: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    // Sinh tệp audio
    const generateAudioFile = async (data: VideoScriptResponse) => {
        const script = data.scenes.map((s) => s.contextText).join(" ");

        try {
            const res = await fetch("/api/generate-audio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: script }),
            });

            if (!res.ok) {
                toast.error("Failed to generate audio!");
                return;
            }

            const { url } = await res.json();

            // set audio data
            setVideoData((prev) => ({
                ...prev,
                audioUrl: url,
            }));

            // setAudioFileURL(url);

            await generateCaption(url);
            await generateImage(data.scenes);
        } catch (err) {
            console.error("Error generating audio:", err);
            toast.error("Error generating audio file");
        }
    };

    // Sinh nội dung tiêu đề
    const generateCaption = async (fileURL: string) => {
        try {
            const res = await fetch("/api/generate-caption", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    audioFileURL: fileURL,
                }),
            });

            if (!res.ok) {
                toast.error("Failed to generate caption!");
                return;
            }

            const { captions } = await res.json();

            // set caption
            setVideoData((prev) => ({
                ...prev,
                captions,
            }));

            // setCaptions(captions);
        } catch (err) {
            console.error("Error generating caption:", err);
            toast.error("Error generating caption file");
        }
    };

    // Sinh hình ảnh cho toàn bộ scenes
    const generateImage = async (scenes: { imagePrompt: string }[]) => {
        try {
            if (!scenes || scenes.length === 0) {
                toast.warning("No scenes found to generate images!");
                return;
            }

            const imageUrls: string[] = await Promise.all(
                scenes.map(async (scene) => {
                    const res = await fetch("/api/generate-image", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            prompt: scene?.imagePrompt,
                        }),
                    });

                    if (!res.ok) {
                        throw new Error("API returned error status");
                    }

                    const data = await res.json();

                    if (!data?.url) {
                        throw new Error("Image generation failed");
                    }

                    return data.url;
                }),
            );

            setVideoData((prev) => ({
                ...prev,
                imageUrls: imageUrls,
            }));

            // setImages(imageUrls);
        } catch (err) {
            console.error("Error generating images:", err);
            toast.error("Failed to generate images");
        }
    };

    // Lưu dữ liệu video vào DB và cập nhật credits
    // const updateUserCredits = useCallback(async () => {
    //     try {
    //         const res = await fetch("/api/update-user-credits", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 email: userDetails?.email,
    //                 creditsToDeduct: 10,
    //             }),
    //         });

    //         if (!res.ok) throw new Error("Failed to update credits");

    //         const data = await res.json();

    //         setUserDetails((prev) =>
    //             prev ? { ...prev, credits: data.updatedCredits } : prev,
    //         );
    //     } catch (err) {
    //         console.error("Error updating credits:", err);
    //     }
    // }, [userDetails, setUserDetails]);

    useEffect(() => {
        const save = async () => {
            if (!userDetails?.email) return;

            try {
                const res = await fetch("/api/save-video-data", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...videoData,
                        email:
                            user?.primaryEmailAddress?.emailAddress ||
                            "unknown",
                    }),
                });

                const json = await res.json();

                // Lưu ID video
                setVideoId(json.id);

                // Trừ credits
                // await updateUserCredits();

                // Mở dialog
                setPlayVideo(true);

                // Reset videoData SAU KHI save thành công
                setVideoData({
                    videoScript: undefined,
                    audioUrl: undefined,
                    captions: undefined,
                    imageUrls: undefined,
                });

                // Đánh dấu đã lưu
                setIsSaved(true);
            } catch (err) {
                console.error("Save error:", err);
            }
        };

        if (
            !isSaved &&
            videoData.videoScript &&
            videoData.audioUrl &&
            videoData.captions &&
            videoData.imageUrls
        ) {
            save();
        }
    }, [
        videoData,
        isSaved,
        userDetails?.email,
        user?.primaryEmailAddress?.emailAddress,
        // updateUserCredits,
        setVideoData,
    ]);

    return (
        <div className="max-w-6xl mx-auto md:px-10 px-4">
            <div className="mt-10 shadow-lg rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800 bg-base-300 dark:bg-gray-900">
                {/* Select Topic */}
                <SelectTopic
                    onUserSelect={(key, value) =>
                        onHandleInputChange(key as keyof FormDataType, value)
                    }
                />

                {/* Select Style */}
                <SelectStyle
                    onUserSelect={(key, value) =>
                        onHandleInputChange(key as keyof FormDataType, value)
                    }
                />

                {/* Select Duration */}
                <SelectDuration
                    onUserSelect={(key, value) =>
                        onHandleInputChange(key as keyof FormDataType, value)
                    }
                />

                {/* Nút Generate */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={onClickGenerate}
                        disabled={loading}
                        className={`btn btn-primary rounded-full px-6 ${
                            loading ? "loading" : ""
                        }`}
                    >
                        {loading ? "Generating..." : "Generate Video"}
                    </button>
                </div>

                {/* Loading overlay */}
                <CustomLoading loading={loading} />

                {/* Player Dialog */}
                <PlayerDialog
                    playVideo={playVideo}
                    videoId={videoId}
                    setPlayVideo={setPlayVideo}
                />
            </div>
        </div>
    );
};

export default CreateNewPage;
