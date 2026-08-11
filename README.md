# Gestion des Étudiants — API REST

Mini TP de backend : API REST minimaliste pour la gestion d'élèves.

## Stack

- Node.js + Express 5
- TypeScript (exécuté avec `tsx`)
- PostgreSQL (`pg`)

## Prérequis

- Node.js ≥ 18
- PostgreSQL

## Installation

```bash
npm install
```

## Configuration

1. Créez un fichier `.env` à la racine :

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=votre_bd
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
```

2. Créez la base de données et la table :

```sql
CREATE DATABASE votre_bd;

CREATE TABLE eleves (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL
);
```

## Lancement

```bash
npm run dev
```

Le serveur tourne sur `http://localhost:3000`.

## Endpoints

Toutes les routes sont préfixées par `/eleves`.

| Méthode | Route          | Description                       |
|---------|----------------|-----------------------------------|
| GET     | `/eleves`      | Liste tous les élèves             |
| GET     | `/eleves/:id`  | Récupère un élève par son id      |
| POST    | `/eleves`      | Crée un élève (`nom`, `prenom`)   |
| PUT     | `/eleves/:id`  | Met à jour complètement un élève  |
| PATCH   | `/eleves/:id`  | Met à jour partiellement un élève |
| DELETE  | `/eleves/:id`  | Supprime un élève                 |

### Exemple

```bash
curl -X POST http://localhost:3000/eleves \
  -H "Content-Type: application/json" \
  -d '{"nom": "Rakoto", "prenom": "Jean"}'

curl http://localhost:3000/eleves
```

## Structure du projet

```
src/
├── app.ts                      # Configuration Express (routes + middlewares)
├── server.ts                   # Point d'entrée (démarrage du serveur)
├── config/
│   └── database.ts             # Pool de connexion PostgreSQL
├── models/
│   └── eleve.model.ts          # Interface Eleve
├── repositories/
│   └── eleve.repository.ts     # Accès aux données (requêtes SQL)
├── services/
│   └── eleve.service.ts        # Logique métier
├── controllers/
│   └── eleve.controller.ts     # Gestion des requêtes/réponses
├── routes/
│   └── eleve.routes.ts         # Définition des routes /eleves
└── middleware/
    └── error.middleware.ts     # Gestion centralisée des erreurs

```
