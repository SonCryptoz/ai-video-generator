import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export const POST = async (req: Request) => {
    try {
        const { email, creditsToDeduct } = await req.json();

        if (!email || creditsToDeduct == null) {
            return NextResponse.json(
                { error: "Missing email or creditsToDeduct" },
                { status: 400 },
            );
        }

        // Lấy user hiện tại
        const user = await db
            .select()
            .from(Users)
            .where(eq(Users.email, email));

        if (!user || user.length === 0) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }

        const currentCredits = user[0].credits ?? 0;

        // Không cho xuống < 0
        const updatedCredits = Math.max(currentCredits - creditsToDeduct, 0);

        // Update DB
        await db
            .update(Users)
            .set({ credits: updatedCredits })
            .where(eq(Users.email, email));

        return NextResponse.json({ updatedCredits });
    } catch (err) {
        console.error("UPDATE CREDITS ERROR:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
