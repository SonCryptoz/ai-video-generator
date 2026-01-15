import { VideoDataType } from "../types";
import {
    AbsoluteFill,
    Img,
    Sequence,
    useVideoConfig,
    useCurrentFrame,
    interpolate,
    Html5Audio,
    Audio,
} from "remotion";

type Props = VideoDataType & {
    isPreview?: boolean;
};

const RemotionVideo = ({
    imageList = [],
    audioFileUrl,
    captions = [],
    isPreview = false,
}: Props) => {
    const { durationInFrames, fps, height } = useVideoConfig();
    const frame = useCurrentFrame();

    const safeImageCount = imageList.length || 1;
    const framesPerImage = Math.ceil(durationInFrames / safeImageCount);

    const currentMs = (frame / fps) * 1000;
    const activeCaption = captions.find(
        (c) => currentMs >= c.startTime && currentMs <= c.endTime,
    );

    const opacity = (() => {
        if (!activeCaption) return 0;

        const { startTime, endTime } = activeCaption;
        const duration = endTime - startTime;
        if (duration <= 600) return 1;

        return interpolate(
            currentMs,
            [startTime, startTime + 300, endTime - 300, endTime],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
    })();

    // SCALE THEO TỈ LỆ VIDEO
    const fontSize = Math.round(height * 0.035);
    const paddingY = Math.round(height * 0.01);
    const paddingX = Math.round(height * 0.02);
    const bottom = Math.round(height * 0.14);

    return (
        <AbsoluteFill className="bg-black">
            {/* IMAGES */}
            {imageList.map((img, index) => (
                <Sequence
                    key={index}
                    from={index * framesPerImage}
                    durationInFrames={framesPerImage}
                >
                    <Img
                        src={img}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transform: `scale(${interpolate(
                                frame,
                                [
                                    index * framesPerImage,
                                    (index + 1) * framesPerImage,
                                ],
                                index % 2 === 0 ? [1, 1.2] : [1.2, 1],
                                {
                                    extrapolateLeft: "clamp",
                                    extrapolateRight: "clamp",
                                },
                            )})`,
                        }}
                    />
                </Sequence>
            ))}

            {/* CAPTION */}
            {activeCaption && (
                <div
                    style={{
                        position: "absolute",
                        bottom,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        pointerEvents: "none",
                    }}
                >
                    <div
                        style={{
                            opacity,
                            maxWidth: "85%",
                            padding: `${paddingY}px ${paddingX}px`,
                            fontSize,
                            fontFamily: "Geist",
                            lineHeight: 1.35,
                            fontWeight: 600,
                            color: "#fff",
                            textAlign: "center",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",

                            // TikTok / CapCut style
                            background: "rgba(255,255,255,0.14)",
                            borderRadius: fontSize,
                            backdropFilter: "blur(14px)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            boxShadow: "0 6px 30px rgba(0,0,0,0.45)",
                            textShadow: "0 4px 10px rgba(0,0,0,0.85)",
                        }}
                    >
                        {activeCaption.text}
                    </div>
                </div>
            )}

            {/* AUDIO */}
            {audioFileUrl &&
                (isPreview ? (
                    <Audio src={audioFileUrl} />
                ) : (
                    <Html5Audio src={audioFileUrl} />
                ))}
        </AbsoluteFill>
    );
};

export default RemotionVideo;
