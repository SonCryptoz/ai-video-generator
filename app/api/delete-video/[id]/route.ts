import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/configs/db";
import { VideoDataTable } from "@/configs/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(
    _req: Request,
    context: { params: Promise<{ id: string }> },
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const { id } = await context.params;
        const videoId = parseInt(id, 10);

        if (!Number.isInteger(videoId) || videoId <= 0) {
            return NextResponse.json(
                { error: "Invalid video id" },
                { status: 400 },
            );
        }
        
        const result = await db
            .delete(VideoDataTable)
            .where(
                and(
                    eq(VideoDataTable.id, videoId),
                    eq(VideoDataTable.createdBy, userId),
                ),
            )
            .returning({ id: VideoDataTable.id });

        if (result.length === 0) {
            return NextResponse.json(
                { error: "Video not found or no permission" },
                { status: 404 },
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DELETE VIDEO ERROR:", err);
        return NextResponse.json(
            { error: "Failed to delete video" },
            { status: 500 },
        );
    }
}
