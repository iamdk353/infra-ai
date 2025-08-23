import mongoose from "mongoose";

const Knowledge = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    content: { type: String, required: true },
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

export const TextFile =
  mongoose.models.Knowledge || mongoose.model("Knowledge", Knowledge);
