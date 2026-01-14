import { pgTable, serial, varchar, boolean, json, integer } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull(),
    imageUrl: varchar("image_url"),
    subscription: boolean("subscription").default(false),
    credits: integer("credits").default(30), // 1 video = 10 credits
});

export const VideoDataTable = pgTable("videoData", {
    id: serial("id").primaryKey(),

    script: json("script")
        .$type<{
            scenes: {
                imagePrompt: string;
                contextText: string;
            }[];
        }>()
        .notNull(),

    audioFileUrl: varchar("audioFileUrl", { length: 500 }).notNull(),

    captions: json("captions")
        .$type<
            {
                startTime: number;
                endTime: number;
                text: string;
            }[]
        >()
        .notNull(),

    imageList: varchar("imageList", { length: 500 })
        .array()
        .notNull()
        .default([]),

    createdBy: varchar("createdBy", { length: 255 }).notNull(),
});

// SELECT type
export type UserType = typeof Users.$inferSelect;

export type VideoDataType = typeof VideoDataTable.$inferSelect;
