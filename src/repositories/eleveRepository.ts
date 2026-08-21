import { pool } from "../config/database.js";
import type { Eleve } from "../models/eleveModel.js";

export async function findAll(): Promise<Eleve[]> {
  const result = await pool.query(
    'SELECT id, nom, prenom, email FROM eleves ORDER BY id'
  );
  return result.rows;
}

export async function findById(id: number): Promise<Eleve | null> {
  const result = await pool.query(
    'SELECT id, nom, prenom, email FROM eleves WHERE id = $1',
    [id]
  );
  return result.rows[0] ?? null
}

export async function create(data: Omit<Eleve, 'id'>): Promise<Eleve> {
  const result = await pool.query(
    'INSERT INTO eleves (nom, prenom, email) VALUES ($1, $2, $3) RETURNING id, nom, prenom, email',
    [data.nom, data.prenom, data.email]
  );
  return result.rows[0]
}

export async function update(id: number, data: Omit<Eleve, 'id'>): Promise<Eleve | null> {
  const result = await pool.query(
    'UPDATE eleves SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING id, nom, prenom, email',
    [data.nom, data.prenom, data.email, id]
  );
  return result.rows[0] ?? null
}

export async function updatePartial(id: number, data: Partial<Omit<Eleve, 'id'>>): Promise<Eleve | null>{
  const result = await pool.query(
    'UPDATE eleves SET nom = COALESCE($1, nom), prenom = COALESCE($2, prenom), email = COALESCE($3, email) WHERE id = $4 RETURNING id, nom, prenom, email',
    [data.nom, data.prenom, data.email, id]
  );
  return result.rows[0] ?? null
}

export async function remove(id: number): Promise<boolean>{
  const result = await pool.query(
    'DELETE FROM eleves WHERE id = $1 RETURNING *', [id]
  )
  return result.rowCount === 1;
}
