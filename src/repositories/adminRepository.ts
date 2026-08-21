import { pool } from "../config/database.js";
import type { Admin } from "../models/adminModel.js";

export async function findByNom(nom: string): Promise<Admin | null> {
  const result = await pool.query(
    "SELECT * FROM admins WHERE nom = $1",
    [nom]
  );
  return result.rows[0] ?? null;
}
