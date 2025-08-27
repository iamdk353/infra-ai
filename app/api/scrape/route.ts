import { scrapeToText } from "@/lib/Scrapper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // const authHeader = req.headers.get("authorization");
    // if (!authHeader?.startsWith("Bearer ")) {
    //   return NextResponse.json({ error: "No token provided" }, { status: 401 });
    const { url } = await req.json();
    const data = await scrapeToText(url);
    return NextResponse.json({
      data,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
