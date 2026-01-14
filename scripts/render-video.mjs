import path from "path";
import fs from "fs";
import os from "os";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

let cachedBundle = null;

async function main() {
    try {
        const videoData = JSON.parse(process.env.VIDEO_DATA || "{}");
        const durationInFrames = Number(process.env.DURATION_IN_FRAMES);
        const fps = Number(process.env.FPS);

        if (!videoData?.id) throw new Error("Missing VIDEO_DATA");
        if (!durationInFrames || !fps)
            throw new Error("Missing duration or fps");

        // Bundle Remotion (cache)
        if (!cachedBundle) {
            cachedBundle = await bundle({
                entryPoint: path.resolve("./remotion/index.ts"),
            });
        }

        const composition = await selectComposition({
            serveUrl: cachedBundle,
            id: "RemotionVideo",
            inputProps: videoData,
        });

        const tmpPath = path.join(os.tmpdir(), `video-${Date.now()}.mp4`);

        await renderMedia({
            composition: {
                ...composition,
                durationInFrames,
                fps,
            },
            serveUrl: cachedBundle,
            codec: "h264",
            audioCodec: "aac",
            outputLocation: tmpPath,
            inputProps: videoData,
        });

        const upload = await cloudinary.uploader.upload(tmpPath, {
            resource_type: "video",
            folder: "ai-videos",
            format: "mp4",
        });

        fs.unlinkSync(tmpPath);

        // API sẽ nhận URL
        console.log(upload.secure_url);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();
