-- Migration: Schéma complet pour Railway

-- 1. Table eleves
CREATE TABLE IF NOT EXISTS eleves (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE
);

-- 2. Table admins
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  mot_de_passe VARCHAR(255) NOT NULL
);

-- 3. Retirer mot_de_passe de eleves si elle existe encore
ALTER TABLE eleves DROP COLUMN IF EXISTS mot_de_passe;
