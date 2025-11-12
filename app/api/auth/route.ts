import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) throw new Error("Please add JWT_SECRET to .env");

export async function POST(req: Request) {
  try {
    const { email, password, action, name } = await req.json(); // action = "signup" | "login"
    await connectDB();

    if (action === "signup") {
      // check existing
      const existing = await User.findOne({ email });
      if (existing) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed, name });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);

      return NextResponse.json({ message: "Signup success", token });
    }

    if (action === "login") {
      const user = await User.findOne({ email });
      if (!user)
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 400 }
        );

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 400 }
        );

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
      });

      return NextResponse.json({ message: "Login success", token });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
