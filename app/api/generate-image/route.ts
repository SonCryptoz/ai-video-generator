import { v2 as cloudinary } from "cloudinary";
import { InferenceClient } from "@huggingface/inference";

export const runtime = "nodejs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const client = new InferenceClient(process.env.HF_TOKEN);

export const POST = async (req: Request) => {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== "string") {
            return new Response(JSON.stringify({ error: "Invalid prompt" }), {
                status: 400,
            });
        }

        // // Pollinations API (free)
        // const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        //     prompt,
        // )}?width=1024&height=1280&model=flux`;

        // // Gọi ảnh từ Pollinations
        // const response = await fetch(pollinationsUrl);

        // if (!response.ok) {
        //     return new Response(
        //         JSON.stringify({ error: "Failed to fetch image" }),
        //         {
        //             status: 500,
        //         },
        //     );
        // }

        // const arrayBuffer = await response.arrayBuffer();

        // Hugging Face API
        const image = await client.textToImage({
            provider: "wavespeed",
            model: "Tongyi-MAI/Z-Image-Turbo",
            inputs: prompt,
            parameters: { num_inference_steps: 5 },
        }) as Blob | string;

        let arrayBuffer;

        // Trường hợp HuggingFace trả về Blob
        if (image instanceof Blob) {
            arrayBuffer = await image.arrayBuffer();
        }

        // Trường hợp HuggingFace trả về URL string
        else if (typeof image === "string") {
            const res = await fetch(image);
            if (!res.ok) throw new Error("Failed to fetch image URL");
            arrayBuffer = await res.arrayBuffer();
        } else {
            throw new Error("Unknown image type returned from HF");
        }

        const buffer = Buffer.from(arrayBuffer);

        const base64Image =
            "data:image/png;base64," + buffer.toString("base64");

        // Upload → Cloudinary
        const uploaded = await cloudinary.uploader.upload(base64Image, {
            resource_type: "image",
            folder: "ai_image_outputs",
            format: "png",
            public_id: `image-${Date.now()}`,
        });

        return new Response(JSON.stringify({ url: uploaded.secure_url }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Image Generation API error:", err);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
        });
    }
};
