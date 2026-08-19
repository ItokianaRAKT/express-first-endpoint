import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/database.js";

const JWT_SECRET: string = process.env.JWT_SECRET || "";
const JWT_OPTIONS: jwt.SignOptions = { expiresIn: 3600 };

async function findByEmail(email: string) {
  const result = await pool.query(
    "SELECT * FROM eleves WHERE email = $1",
    [email]
  );
  return result.rows[0] || null;
}

async function createEleve(eleve: {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
}) {
  const result = await pool.query(
    "INSERT INTO eleves (nom, prenom, email, mot_de_passe) VALUES ($1, $2, $3, $4) RETURNING id, nom, prenom, email",
    [eleve.nom, eleve.prenom, eleve.email, eleve.mot_de_passe]
  );
  return result.rows[0];
}

export function generateToken(user: { id: number; nom: string; prenom: string }) {
  return jwt.sign(
    { userId: user.id, nom: user.nom, prenom: user.prenom },
    JWT_SECRET,
    JWT_OPTIONS
  );
}

export async function register(eleve: {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
}) {
  const existing = await findByEmail(eleve.email);
  if (existing) {
    throw new Error("Cet email est déjà utilisé");
  }

  const hash = await bcrypt.hash(eleve.mot_de_passe, 10);
  const created = await createEleve({
    ...eleve,
    mot_de_passe: hash,
  });

  const token = generateToken(created);

  return { eleve: created, token };
}

export async function login(email: string, mot_de_passe: string) {
  const eleve = await findByEmail(email);
  if (!eleve) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const valid = await bcrypt.compare(mot_de_passe, eleve.mot_de_passe);
  if (!valid) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const token = generateToken(eleve);

  return {
    eleve: {
      id: eleve.id,
      nom: eleve.nom,
      prenom: eleve.prenom,
      email: eleve.email,
    },
    token,
  };
}
