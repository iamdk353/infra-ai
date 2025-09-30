import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { getEmailFromToken } from "@/lib/jwtParser";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization"); // get header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1]; // extract token
    await connectDB();
    const email = getEmailFromToken(token);
    const data = await User.findOne({ email }).select("domains");

    return NextResponse.json({ data: data.domains });
  } catch (err) {
    console.error("Error fetching domain:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
