import { getEmailFromToken } from "@/lib/jwtParser";
import { Chunk } from "@/models/KnowledgeChunk";
import { pipeline } from "@xenova/transformers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query, token } = await req.json();

    if (!query || !token) {
      return NextResponse.json(
        { error: "Missing query or token" },
        { status: 400 }
      );
    }

    const embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    const vec = await embedder(query, {
      pooling: "mean",
      normalize: true,
    });

    const embedding = Array.from(vec.data);

    const data = await Chunk.aggregate([
      {
        $vectorSearch: {
          index: "knowledgeChunks",
          path: "embedding",
          queryVector: embedding,
          numCandidates: 50,
          limit: 3,
          filter: {
            creator: { $eq: getEmailFromToken(token) },
          },
        },
      },
      {
        $project: {
          fileId: 1,
          creator: 1,
          content: 1,
          chunkIndex: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]);
    return NextResponse.json({
      success: true,
      query,
      results: parseSearchResults(data),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process query", details: error },
      { status: 500 }
    );
  }
}

interface SearchResult {
  _id: string;
  fileId: string;
  content: string;
  chunkIndex: number;
  creator: string;
  score: number;
}

const parseSearchResults = (results: SearchResult[]): string => {
  if (!results || results.length === 0) {
    return "No relevant information found.";
  }

  // Sort by score (highest first) and chunk index for better flow
  const sortedResults = results.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score; // Higher score first
    }
    return a.chunkIndex - b.chunkIndex; // Lower chunk index first
  });

  // Combine content with proper spacing
  const combinedText = sortedResults
    .map((result) => result.content.trim())
    .join(" ")
    .replace(/\s+/g, " ") // Remove extra spaces
    .trim();

  return combinedText;
};
