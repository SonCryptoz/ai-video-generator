import { auth } from "@clerk/nextjs/server";
import { db } from "@/configs/db";
import { VideoDataTable } from "@/configs/schema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const data = await req.json();

        const result = await db
            .insert(VideoDataTable)
            .values({
                script: data.videoScript,
                audioFileUrl: data.audioUrl,
                captions: data.captions,
                imageList: data.imageUrls,
                createdBy: userId,
            })
            .returning({ id: VideoDataTable.id });

        return NextResponse.json({ id: result[0].id });
    } catch (err) {
        console.error("SAVE VIDEO ERROR:", err);
        return NextResponse.json(
            { error: "Failed to save video data" },
            { status: 500 },
        );
    }
};
