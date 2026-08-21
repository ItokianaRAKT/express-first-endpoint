import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as adminRepository from "../repositories/adminRepository.js";

const JWT_SECRET: string = process.env.JWT_SECRET || "";
const JWT_OPTIONS: jwt.SignOptions = { expiresIn: 3600 };

export function generateToken(admin: { id: number; nom: string; prenom: string }) {
  return jwt.sign(
    { adminId: admin.id, nom: admin.nom, prenom: admin.prenom },
    JWT_SECRET,
    JWT_OPTIONS
  );
}

export async function login(nom: string, mot_de_passe: string) {
  const admin = await adminRepository.findByNom(nom);
  if (!admin) {
    throw new Error("Nom ou mot de passe incorrect");
  }

  const valid = await bcrypt.compare(mot_de_passe, admin.mot_de_passe);
  if (!valid) {
    throw new Error("Nom ou mot de passe incorrect");
  }

  const token = generateToken(admin);

  return {
    admin: {
      id: admin.id,
      nom: admin.nom,
      prenom: admin.prenom,
      email: admin.email,
    },
    token,
  };
}
