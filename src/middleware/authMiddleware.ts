import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token manquant" });
  }

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Format du token invalide" });
  }

  const token = header.slice(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
}
