export type Caption = {
    startTime: number;
    endTime: number;
    text: string;
};

export type VideoDataType = {
    imageList: string[];
    audioFileUrl?: string;
    captions: Caption[];
};
