import mongoose, { Schema, model, models } from "mongoose";

const ChunkSchema = new Schema(
  {
    fileId: { type: String, required: true },
    content: { type: String, required: true },
    chunkIndex: { type: Number, required: true },
    embedding: { type: [Number], required: true },
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

export const Chunk =
  mongoose.models.Chunk || mongoose.model("Chunk", ChunkSchema);
