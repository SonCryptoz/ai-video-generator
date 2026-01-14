import { VideoDataType } from "@/configs/schema";

export type RemotionProps = {
    imageList: string[];
    audioFileUrl: string;
    captions: {
        startTime: number;
        endTime: number;
        text: string;
    }[];
};

export const prepareRemotionProps = (data: VideoDataType): RemotionProps => {
    return {
        imageList: Array.isArray(data.imageList) ? data.imageList : [],
        audioFileUrl: data.audioFileUrl ?? "",
        captions: Array.isArray(data.captions) ? data.captions : [],
    };
};
