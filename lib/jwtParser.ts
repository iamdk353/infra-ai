import jwt from "jsonwebtoken";

export function getEmailFromToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      email?: string;
    };
    return decoded.email || null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
