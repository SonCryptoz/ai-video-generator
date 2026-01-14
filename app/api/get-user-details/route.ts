import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export const POST = async (req: Request) => {
    try {
        const { email } = await req.json();

        if (!email) {
            return Response.json(
                { error: "Email is required" },
                { status: 400 },
            );
        }

        const result = await db
            .select()
            .from(Users)
            .where(eq(Users.email, email));

        if (!result.length) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        return Response.json({ user: result[0] });
    } catch (err) {
        return Response.json(
            { error: "Failed to fetch user", details: err },
            { status: 500 },
        );
    }
};
