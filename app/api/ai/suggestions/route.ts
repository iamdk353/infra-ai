import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { getEmailFromToken } from "@/lib/jwtParser";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;

if (!GOOGLE_API_KEY) throw new Error("Please add GOOGLE_API_KEY to .env");

export async function POST(req: Request) {
  try {
    const { domain, token } = await req.json();

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      maxOutputTokens: 2048,
      apiKey: GOOGLE_API_KEY,
    });
    await connectDB();
    const email = getEmailFromToken(token);
    if (!email) throw new Error("User not authenticated");
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
const AiPrompt = `
TTask:
You are an AI assistant that generates high-quality, domain-based suggestions in **Markdown format**.

Goal:
Based on the provided *domain* and *user description*, produce **5 actionable, clearly formatted suggestions** relevant to the user’s domain expertise and goals.

---

###  Output Formatting Rules:
- Write in Markdown (no code blocks).
- Each suggestion must follow this exact format:

### {sl.no} {Heading}  
**Suggestion:** {Concise explanation of the idea or solution}.  
**Goal You Will Achieve:** {Specific, measurable, or clear outcome such as profit, time efficiency, or resource savings}.

- Leave **one blank line** between suggestions.
- Do **not** include any introductions, explanations, summaries, or extra text.
- add new line for **Goal You Will Achieve:**
- Use simple, natural English suitable for general readers.
- Each suggestion should be actionable and directly relevant to the domain.
- use relevent emoji 

---

### Inputs:
- **Domain:** ${domain}  
- **User Description:** ${user.userDesc}

---

Now, generate **exactly 5 suggestions** following the above Markdown structure and spacing precisely.

`

    const result = await model.invoke([["human", AiPrompt]]);

    return NextResponse.json({
      message: "Generation success",
      data: result.content,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
