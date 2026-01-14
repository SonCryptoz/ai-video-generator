import { AssemblyAI, type TranscribeParams } from "assemblyai";

type Word = {
    start: number;
    end: number;
    text: string;
};

type CaptionSegment = {
    startTime: number;
    endTime: number;
    text: string;
};

function buildCaptionSegments(words: Word[]): CaptionSegment[] {
    if (!words || words.length === 0) return [];

    return words.map((w) => ({
        startTime: w.start,
        endTime: w.end,
        text: w.text,
    }));
}

export const POST = async (req: Request) => {
    try {
        const { audioFileURL } = await req.json();

        if (!audioFileURL) {
            return new Response(
                JSON.stringify({ error: "Missing audioFileURL" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const client = new AssemblyAI({
            apiKey: process.env.CAPTION_API!,
        });

        const params: TranscribeParams = {
            audio: audioFileURL,
            speech_model: "universal",
            format_text: true,
            punctuate: true,
        };

        const transcript = await client.transcripts.transcribe(params);

        if (!transcript.words) {
            throw new Error("Transcript words is empty");
        }

        const captions = buildCaptionSegments(transcript.words as Word[]);

        return new Response(
            JSON.stringify({
                text: transcript.text,
                captions,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            },
        );
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Failed to transcribe";
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
