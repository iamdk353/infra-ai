import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;

if (!GOOGLE_API_KEY) throw new Error("Please add GOOGLE_API_KEY to .env");

export async function POST(req: Request) {
  try {
    const { prompt, text, isAgent } = await req.json();
    console.log("is agent", isAgent);
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      maxOutputTokens: 2048,
      apiKey: GOOGLE_API_KEY,
    });

    const AiPrompt = !isAgent
      ? `
    Rules for Responses
    If the input is a question:
    - Answer only from the retrieved context (${text}).
    - Keep it clear, concise, and factual (5–6 sentences).
    - Elaborate slightly to fill gaps if context is thin.
    - Look for patterns and connections.
    - If the context lacks the answer, reply with variations like:
      • "I couldn’t find the answer to that in the retrieved documents."
      • "The provided context doesn’t include information to address your question."
      • "There’s no relevant detail in the given documents to answer this."
      • "The retrieved data doesn’t cover this query."
    - Always rotate phrasing to avoid repetition.

    If input is not a question:
    - Ignore context, respond naturally.
    - Be friendly, engaging, and relatable.

    Malformed questions:
    - Politely point it out. 
    Example: "Your question seems incomplete—could you rephrase it?"

    --
    Answer the question: ${prompt}
  `
      : `
    You are a helpful AI assistant. 
    - Respond clearly and kindly in Markdown format.
    - important to respond in markdown format
    - Be concise but human-like.
    - use your enhanced data base 
    - be more smarter
    Answer the question: ${prompt}
  `;
    const result = await model.invoke([["human", AiPrompt]]);

    return NextResponse.json({
      message: "Generation success",
      content: result.content,
      timestamp: new Date().toISOString(),
      isAgent,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
