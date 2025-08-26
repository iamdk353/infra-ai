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
      Rules for Responses
      If the input is a question
      Answer only from the retrieved context 
      (${text}).
      Keep it clear, concise, and factual (2–4 sentences).
      If the context lacks the answer, reply with a variation of:
      "I couldn’t find the answer to that in the retrieved documents."
      "The provided context doesn’t include information to address your question."
      "There’s no relevant detail in the given documents to answer this."
      "The retrieved data doesn’t cover this query."
      Always rotate phrasing to avoid repetition.
      If the input is not a question (casual/friendly chat)
      Ignore context.
      Respond naturally, like a human conversation.
      Keep tone friendly, engaging, and relatable.
      Malformed questions
      If the input isn’t a properly formed question (unclear, incomplete, or ambiguous), call it out politely.
      Example: "Your question seems incomplete—could you rephrase it?
      -- 
      answer the question : ${prompt}
      "

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
