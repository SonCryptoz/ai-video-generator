import { generateAIScript } from "@/configs/ai_model";

export const POST = async (req: Request) => {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return new Response(JSON.stringify({ error: "Missing prompt" }), {
                status: 400,
            });
        }

        // --- Thêm cơ chế retry 3 lần nếu model overloaded ---
        let script = "";
        const maxRetries = 3;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                script = await generateAIScript(prompt);
                break;
            } catch (err: unknown) {
                if (
                    typeof err === "object" &&
                    err !== null &&
                    "message" in err &&
                    typeof (err as { message?: string }).message === "string" &&
                    (
                        (err as { message: string }).message.includes("503") ||
                        (err as { message: string }).message.includes("overloaded") ||
                        (err as { message: string }).message.includes("UNAVAILABLE")
                    )
                ) {
                    console.warn(
                        `Gemini overloaded, retrying (${attempt}/${maxRetries})...`
                    );
                    await new Promise((r) => setTimeout(r, 2000 * attempt));
                    continue;
                }
                throw err; 
            }
        }

        if (!script) {
            return new Response(
                JSON.stringify({ error: "AI generation failed after retries" }),
                { status: 503 }
            );
        }

        // --- Đảm bảo trả JSON ---
        let parsedScript;
        try {
            parsedScript = JSON.parse(script);
        } catch {
            parsedScript = { rawText: script };
        }

        return new Response(JSON.stringify(parsedScript), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("AI generation error:", err);
        return new Response(
            JSON.stringify({ error: "Failed to generate script" }),
            { status: 500 }
        );
    }
};
