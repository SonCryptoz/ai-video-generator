import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { spawn } from "child_process";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const { videoId, durationInFrames, fps } = await req.json();

        const video = await db.query.VideoDataTable.findFirst({
            where: (v, { eq }) => eq(v.id, videoId),
        });

        if (!video) {
            return NextResponse.json(
                { success: false, message: "Video not found" },
                { status: 404 },
            );
        }

        const scriptPath = path.join(
            process.cwd(),
            "scripts",
            "render-video.mjs",
        );

        const child = spawn("node", [scriptPath], {
            env: {
                ...process.env,
                VIDEO_DATA: JSON.stringify(video),
                DURATION_IN_FRAMES: String(durationInFrames),
                FPS: String(fps),
            },
        });

        let output = "";
        let error = "";

        child.stdout.on("data", (d) => (output += d.toString()));
        child.stderr.on("data", (d) => (error += d.toString()));

        const exitCode = await new Promise<number>((res) =>
            child.on("close", res),
        );

        if (exitCode !== 0) {
            console.error(error);
            throw new Error("Render process failed");
        }

        return NextResponse.json({
            success: true,
            url: output.trim(),
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Export failed" },
            { status: 500 },
        );
    }
}
