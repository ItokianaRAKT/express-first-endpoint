import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { nom, prenom, email, mot_de_passe } = req.body;

    if (!nom || !prenom || !email || !mot_de_passe) {
      return res.status(400).json({
        error: "Les champs 'nom', 'prenom', 'email' et 'mot_de_passe' sont obligatoires",
      });
    }

    const result = await authService.register({
      nom,
      prenom,
      email,
      mot_de_passe,
    });
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "Cet email est déjà utilisé") {
      return res.status(409).json({ error: error.message });
    }
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
      return res.status(400).json({
        error: "Les champs 'email' et 'mot_de_passe' sont obligatoires",
      });
    }

    const result = await authService.login(email, mot_de_passe);
    res.json(result);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Email ou mot de passe incorrect"
    ) {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
}
