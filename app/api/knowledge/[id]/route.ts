import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TextFile } from "@/models/Knowledge";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    const file = await TextFile.findById(id).select("fileName content");
    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json({ file }, { status: 200 });
  } catch (err) {
    console.error("Error fetching file:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
