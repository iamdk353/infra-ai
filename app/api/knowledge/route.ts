import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { TextFile } from "@/models/Knowledge";
import { getEmailFromToken } from "@/lib/jwtParser";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { pipeline } from "@xenova/transformers";
import { Chunk } from "@/models/KnowledgeChunk";
import { cleanText } from "@/lib/textClean";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { token, fileName, content, creator, type } = await req.json();
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

    logBackground("INIT", "starting background worker...");
    process.nextTick(() =>
      processEmbeddings(newFile._id, content, newFile.creator, type)
    );
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

function logBackground(process: string, message: string) {
  const brightYellow = "\x1b[93m";
  const reset = "\x1b[0m";
  const msg = `|| [background] -> ${process
    .toLocaleUpperCase()
    .padEnd(10)} :: ${message}`;
  const line = "-".repeat(msg.length);

  console.log(`${brightYellow}${line}${reset}`);
  console.log(`${msg}${reset}`);
  console.log(`${brightYellow}${line}${reset}`);
}

async function processEmbeddings(
  fileId: string,
  text: string,
  creator: string,
  type: string
) {
  if (type == "csv") {
    logBackground("", "not embedding csv files");
    return;
  }
  try {
    logBackground("init", `Starting embedding process for file ${fileId}`);

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 350,
      chunkOverlap: 40,
    });
    logBackground("splitter", "Splitting text into chunks...");

    const chunks = await textSplitter.splitText(text);
    logBackground("splitter", `Created ${chunks.length} chunks`);

    logBackground("embedder", "Loading embedding model...");
    const embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    logBackground("embedder", "Model loaded successfully");

    for (let i = 0; i < chunks.length; i++) {
      logBackground("chunk", `Processing chunk ${i + 1}/${chunks.length}`);
      const vec = await embedder(cleanText(chunks[i]), {
        pooling: "mean",
        normalize: true,
      });
      const embedding = Array.from(vec.data);

      await Chunk.create({
        fileId,
        chunkIndex: i,
        content: cleanText(chunks[i]),
        creator,
        embedding,
      });
      logBackground("db", `Saved chunk ${i + 1} to database`);
    }

    logBackground("success", ` All embeddings saved for file ${fileId}`);
  } catch (err) {
    logBackground("error", ` Embedding process failed: ${err}`);
  }
}
