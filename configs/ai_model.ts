// configs/ai_model.ts
import { GoogleGenAI } from "@google/genai";

export async function generateAIScript(prompt: string): Promise<string> {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY");
    }

    const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const model = "gemini-2.5-flash";

    try{
        const result = await ai.models.generateContent({
            model,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: { responseModalities: ["TEXT"] },
        });
    
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
        return text.trim();
    } catch(err){
        throw new Error("AI generation failed: " + err);
    }
}
