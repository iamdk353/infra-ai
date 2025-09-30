import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { getEmailFromToken } from "@/lib/jwtParser";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;

if (!GOOGLE_API_KEY) throw new Error("Please add GOOGLE_API_KEY to .env");

export async function POST(req: Request) {
  try {
    const { json, token } = await req.json();

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      maxOutputTokens: 2048,
      apiKey: GOOGLE_API_KEY,
    });
    const AiPrompt = `this is a text summarization task. Summarize the following text in a concise manner while retaining the key points and overall meaning. json: ${JSON.stringify(
      json,
      null,
      2
    )}`;
    console.log(json[0].answer);
    const result = await model.invoke([["human", AiPrompt]]);
    await connectDB();
    const resp = await User.findOneAndUpdate(
      { email: getEmailFromToken(token) },
      { $set: { userDesc: result.content, domains: json[0].answer } },
      { new: true }
    );

    return NextResponse.json({
      message: "Generation success",
      updatedData: resp,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
