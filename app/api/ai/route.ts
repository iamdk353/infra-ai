import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;

if (!GOOGLE_API_KEY) throw new Error("Please add GOOGLE_API_KEY to .env");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      maxOutputTokens: 2048,
      apiKey: GOOGLE_API_KEY,
    });

    const AiPrompt = `
    you are an ai assistant use this phrase ${prompt} to answer 
    `;
    const result = await model.invoke([["human", prompt]]);

    return NextResponse.json({
      message: "Generation success",
      content: result.content,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
