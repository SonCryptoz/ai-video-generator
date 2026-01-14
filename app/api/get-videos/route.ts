import { db } from "@/configs/db";
import { VideoDataTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const email = new URL(req.url).searchParams.get("email");

    if (!email) return NextResponse.json([]);

    const res = await db
        .select()
        .from(VideoDataTable)
        .where(eq(VideoDataTable.createdBy, email));

    return NextResponse.json(res);
}
