import { pool } from "../config/database.js";
import type { Eleve } from "../models/eleve.model.js";

export async function findAll(): Promise<Eleve[]> {
  const result = await pool.query(
    'SELECT * FROM eleves ORDER BY id'
  );
  return result.rows;
}

export async function findById(id: number): Promise<Eleve | null> {
  const result = await pool.query(
    'SELECT * FROM eleves WHERE id = $1',
    [id]
  );
  return result.rows[0] ?? null
}

export async function create(data: Omit<Eleve, 'id'>): Promise<Eleve> {
  const result = await pool.query(
    'INSERT INTO eleves (nom, prenom) VALUES ($1, $2) RETURNING *',
    [data.nom, data.prenom]
  );
  return result.rows[0]
}

export async function update(id: number, data: Omit<Eleve, 'id'>): Promise<Eleve | null> {
  const result = await pool.query(
    'UPDATE eleves SET nom = $1, prenom = $2 WHERE id = $3 RETURNING *', [data.nom, data.prenom, id]
  );
  return result.rows[0] ?? null
}

export async function updatePartial(id: number, data: Partial<Omit<Eleve, 'id'>>): Promise<Eleve | null>{
  const result = await pool.query(
    'UPDATE eleves SET nom = COALESCE($1, nom), prenom = COALESCE($2, prenom) WHERE id = $3 RETURNING *', [data.nom, data.prenom, id]
  );
  return result.rows[0] ?? null
}

export async function remove(id: number): Promise<boolean>{
  const result = await pool.query(
    'DELETE FROM eleves WHERE id = $1 RETURNING *', [id]
  )
  return result.rowCount === 1;
}
