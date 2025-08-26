import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;

if (!GOOGLE_API_KEY) throw new Error("Please add GOOGLE_API_KEY to .env");

export async function POST(req: Request) {
  try {
    const { prompt, text } = await req.json();

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      maxOutputTokens: 2048,
      apiKey: GOOGLE_API_KEY,
    });

    const AiPrompt = `
You are an AI assistant.

Retrieved Context:
${text}  

User Input:
${prompt}  

Rules:
1. If the input is a **question**, answer using ONLY the retrieved context.  
   - Be clear, concise, and factual.  
   - Provide a helpful explanation in 2–4 sentences instead of just a short reply.  
   - If the context does not contain the answer, reply exactly:  
     "The retrieved documents do not contain information to answer this question." 
     


2. If the input is **not a question** (casual/friendly chat), respond naturally and conversationally.  
   - Do not force context usage.  
   - Keep replies friendly, human-like, and engaging.  

3. Never hallucinate, guess, or invent details outside the context.  

    `;
    const result = await model.invoke([["human", AiPrompt]]);

    return NextResponse.json({
      message: "Generation success",
      content: result.content,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
