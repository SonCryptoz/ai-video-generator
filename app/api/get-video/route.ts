import { db } from "@/configs/db";
import { VideoDataTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export const POST = async (req: Request) => {
    try {
        const { id } = await req.json();

        const result = await db
            .select()
            .from(VideoDataTable)
            .where(eq(VideoDataTable.id, Number(id)));

        return Response.json({ data: result[0] ?? null });
    } catch (err) {
        return Response.json({ error: "Failed", err }, { status: 500 });
    }
}
