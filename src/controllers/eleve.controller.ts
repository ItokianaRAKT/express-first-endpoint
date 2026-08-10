import type { Request, Response, NextFunction } from "express";
import { pool } from "../config/database.js";

export async function getEleves(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  const result = await pool.query(
    'SELECT * FROM eleves ORDER BY id'
  );
    res.json(result.rows);
}
catch (error) {
  next(error);
}}

export async function getEleveById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM eleves WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Elève introuvable"
      });
    }
    res.json(result.rows[0]);
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
    const { nom, prenom } = req.body;
    const result = await pool.query(
      'INSERT INTO eleves (nom, prenom) VALUES ($1, $2) RETURNING *',
      [nom, prenom]
    );
    res.status(201).json(result.rows[0]);
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
        error: "L'identifian doit être un nombre"
      });
    }
    const { nom, prenom } = req.body;
    const result = await pool.query(
      'UPDATE eleves SET nom = $1, prenom = $2 WHERE id = $3 RETURNING *', [nom, prenom, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Élève introuvable"
      })
    }
    res.json(result.rows[0])
  } catch (error) {
      next(error)
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
    const { nom, prenom } = req.body;
    if (nom === undefined && prenom === undefined) {
      return res.status(400).json({
        error: "Au moins un champ doit être fourni"
      })
    }
    const result = await pool.query(
      'UPDATE eleves SET nom = COALESCE($1, nom), prenom = COALESCE($2, prenom) WHERE id = $3 RETURNING *', [nom, prenom, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Élève introuvable"
      })
    }
    res.json(result.rows[0])
  } catch (error) {
    next(error)
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
      })
    }

    const result = await pool.query(
      'DELETE FROM eleves WHERE id = $1 RETURNING *', [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Élève introuvable"
      })
    }
    res.status(204).send();

  } catch (error) {
    next(error)
  }
}
