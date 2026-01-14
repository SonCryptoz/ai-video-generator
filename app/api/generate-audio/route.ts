import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
    try {
        const { text } = await req.json();

        if (!text) {
            return new Response(
                JSON.stringify({ error: "Missing text field" }),
                { status: 400 },
            );
        }

        // Gọi Murf AI TTS API
        const murfResponse = await fetch(
            "https://api.murf.ai/v1/speech/generate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.MURF_API_KEY!,
                },
                body: JSON.stringify({
                    voiceId: "en-US-natalie", // đổi voice tùy ý
                    text,
                    multiNativeLocale: "en-US",
                    format: "mp3",
                }),
            },
        );

        const data = await murfResponse.json();

        // Lấy URL file mp3 từ Murf
        const audioUrl = data.audioFile;

        if (!audioUrl) {
            console.error("Murf response:", data);
            throw new Error("Murf returned no audio");
        }

        // Tải file về dạng ArrayBuffer
        const fetched = await fetch(audioUrl);
        const arrayBuffer = await fetched.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload Cloudinary
        const uploadResponse = await new Promise<{ secure_url: string }>(
            (resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "video",
                        folder: "text_to_speech_audio",
                        format: "mp3",
                        public_id: `tts-${Date.now()}`,
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        if (!result?.secure_url) return reject("Upload failed");
                        resolve({ secure_url: result.secure_url });
                    },
                );

                stream.end(buffer);
            },
        );

        return new Response(
            JSON.stringify({ url: uploadResponse.secure_url }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            },
        );
    } catch (err) {
        console.error("Murf AI error:", err);
        return new Response(
            JSON.stringify({ error: "Failed to generate audio" }),
            { status: 500 },
        );
    }
};
