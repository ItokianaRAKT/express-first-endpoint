import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService.js";

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { nom, mot_de_passe } = req.body;

    if (!nom || !mot_de_passe) {
      return res.status(400).json({
        error: "Les champs 'nom' et 'mot_de_passe' sont obligatoires",
      });
    }

    const result = await authService.login(nom, mot_de_passe);
    res.json(result);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Nom ou mot de passe incorrect"
    ) {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
}
