-- Migration: Création table admins + retrait mot_de_passe de eleves

-- 1. Créer la table admins
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  mot_de_passe VARCHAR(255) NOT NULL
);

-- 2. Supprimer la colonne mot_de_passe de la table eleves
ALTER TABLE eleves DROP COLUMN IF EXISTS mot_de_passe;
