import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;

if (!GOOGLE_API_KEY) throw new Error("Please add GOOGLE_API_KEY to .env");

export async function POST(req: Request) {
  try {
    const { prompt, action } = await req.json(); // action = "generate" | custom actions

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-pro",
      maxOutputTokens: 2048,
      apiKey: GOOGLE_API_KEY,
    });

    if (action === "generate" || !action) {
      const result = await model.invoke([
        [
          "human",
          prompt ||
            "What would be a good company name for a company that makes colorful socks?",
        ],
      ]);

      return NextResponse.json({
        message: "Generation success",
        content: result.content,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
