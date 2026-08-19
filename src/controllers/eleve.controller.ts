import type { Request, Response, NextFunction } from "express";
import * as eleveService from "../services/eleve.service.js";

export async function getEleves(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const eleves = await eleveService.getAll();
    res.json(eleves);
  } catch (error) {
    next(error);
  }
}

export async function getEleveById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "L'identifiant doit être un nombre"
      });
    }
    const eleve = await eleveService.getById(id);

    if (!eleve) {
      return res.status(404).json({
        error: "Elève introuvable"
      });
    }
    res.json(eleve);
  } catch (error) {
    next(error);
  }
}

export async function createEleve(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { nom, prenom, email, mot_de_passe } = req.body;

    if (!nom || !prenom || !email || !mot_de_passe) {
      return res.status(400).json({
        error: "Les champs 'nom', 'prenom', 'email' et 'mot_de_passe' sont obligatoires"
      });
    }

    const eleve = await eleveService.create({ nom, prenom, email, mot_de_passe });
    res.status(201).json(eleve);
  } catch (error) {
    next(error);
  }
}

export async function updateEleve(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "L'identifiant doit être un nombre"
      });
    }
    const { nom, prenom, email, mot_de_passe } = req.body;

    if (!nom || !prenom || !email || !mot_de_passe) {
      return res.status(400).json({
        error: "Les champs 'nom', 'prenom', 'email' et 'mot_de_passe' sont obligatoires"
      });
    }

    const eleve = await eleveService.update(id, { nom, prenom, email, mot_de_passe });
    if (!eleve) {
      return res.status(404).json({
        error: "Élève introuvable"
      });
    }
    res.json(eleve);
  } catch (error) {
    next(error);
  }
}

export async function updateElevePartially(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "L'identifiant doit être un nombre"
      });
    }
    const { nom, prenom, email, mot_de_passe } = req.body;
    if (nom === undefined && prenom === undefined && email === undefined && mot_de_passe === undefined) {
      return res.status(400).json({
        error: "Au moins un champ doit être fourni"
      });
    }
    const eleve = await eleveService.updatePartial(id, { nom, prenom, email, mot_de_passe });
    if (!eleve) {
      return res.status(404).json({
        error: "Élève introuvable"
      });
    }
    res.json(eleve);
  } catch (error) {
    next(error);
  }
}

export async function deleteEleve(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "L'identifiant doit être un nombre"
      });
    }

    const deleted = await eleveService.remove(id);
    if (!deleted) {
      return res.status(404).json({
        error: "Élève introuvable"
      });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
