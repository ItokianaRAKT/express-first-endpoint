import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }
);

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS eleves (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(50) NOT NULL,
      prenom VARCHAR(50) NOT NULL,
      email VARCHAR(255) UNIQUE
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(50) NOT NULL,
      prenom VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      mot_de_passe VARCHAR(255) NOT NULL
    )
  `);
  await pool.query('ALTER TABLE eleves DROP COLUMN IF EXISTS mot_de_passe');

  const existing = await pool.query('SELECT id FROM admins LIMIT 1');
  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash('itokiana', 10);
    await pool.query(
      'INSERT INTO admins (nom, prenom, email, mot_de_passe) VALUES ($1, $2, $3, $4)',
      ['itokiana', 'Admin', 'admin@example.com', hash]
    );
    console.log('Admin seedé: itokiana / itokiana');
  }
  await pool.end();
}

migrate()
  .then(() => {
    console.log('Migration OK');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Migration échouée:', err);
    process.exit(1);
  });
