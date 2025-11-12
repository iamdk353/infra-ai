import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userDesc: { type: String, default: "" },
    domains: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
