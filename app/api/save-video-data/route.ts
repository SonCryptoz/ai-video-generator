import { db } from "@/configs/db";
import { VideoDataTable } from "@/configs/schema";

export const POST = async (req: Request) => {
    try {
        const data = await req.json();

        const result = await db
            .insert(VideoDataTable)
            .values({
                script: data.videoScript,
                audioFileUrl: data.audioUrl,
                captions: data.captions,
                imageList: data.imageUrls,
                createdBy: data.email,
            })
            .returning({ id: VideoDataTable.id });

        return Response.json({ id: result[0].id });
    } catch (err) {
        return Response.json(
            { error: "Failed to save video data: ", err },
            { status: 500 },
        );
    }
};
