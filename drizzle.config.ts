import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./configs/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_2vQIkpTe6qxa@ep-lively-band-aepscep4-pooler.c-2.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require&channel_binding=require",
    },
});
