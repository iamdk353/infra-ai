import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { TextFile } from "@/models/Knowledge";
import { getEmailFromToken } from "@/lib/jwtParser";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { token, fileName, content, creator } = await req.json();
    if (!fileName || !content || !creator) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const email = getEmailFromToken(creator);

    // optional JWT validation
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET as string);
      } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }

    const newFile = await TextFile.create({
      fileName,
      content,
      creator: email,
    });
    return NextResponse.json(
      { message: "File saved", file: newFile },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    // get email from query param
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }
    const email = getEmailFromToken(token);

    // fetch only fileName where creator matches
    const files = await TextFile.find({ creator: email })
      .sort({ createdAt: -1 })
      .select("fileName _id");

    return NextResponse.json({ files }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
