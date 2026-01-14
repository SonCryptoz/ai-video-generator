import { createContext, useContext } from "react";

export interface VideoScene {
    imagePrompt: string;
    contextText: string;
}

export interface VideoScript {
    scenes: VideoScene[];
}

export interface VideoData {
    videoScript?: VideoScript;
    audioUrl?: string;
    captions?: string;
    imageUrls?: string[];
}

export interface VideoDataContextType {
    videoData: VideoData;
    setVideoData: (value: VideoData | ((prev: VideoData) => VideoData)) => void;
}

export const VideoDataContext = createContext<VideoDataContextType | null>(
    null,
);

export const useVideoData = () => {
    const context = useContext(VideoDataContext);
    if (!context) {
        throw new Error(
            "useVideoData must be used inside VideoDataContext.Provider",
        );
    }
    return context;
};
