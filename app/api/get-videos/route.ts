import { db } from "@/configs/db";
import { VideoDataTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const GET = async () => {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json([], { status: 401 });
    }

    const res = await db
        .select()
        .from(VideoDataTable)
        .where(eq(VideoDataTable.createdBy, userId))
        .orderBy(VideoDataTable.id);

    return NextResponse.json(res);
};
