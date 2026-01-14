"use server";

import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export const checkAndCreateUser = async ({
    name,
    email,
    imageUrl,
}: {
    name: string;
    email: string;
    imageUrl?: string;
}) =>{
    if (!email) return;

    const result = await db.select().from(Users).where(eq(Users.email, email));

    if (!result.length) {
        await db.insert(Users).values({
            name: name || "Username",
            email,
            imageUrl: imageUrl || "Not Found",
        });
    }
}
