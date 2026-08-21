import 'dotenv/config';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';
import { pool } from '../src/config/database.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const sql = readFileSync(join(__dirname, 'migration.sql'), 'utf-8');
  await pool.query(sql);
  console.log('Tables créées');

  const existing = await pool.query('SELECT id FROM admins LIMIT 1');
  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash('itokiana', 10);
    await pool.query(
      'INSERT INTO admins (nom, prenom, email, mot_de_passe) VALUES ($1, $2, $3, $4)',
      ['itokiana', 'Admin', 'admin@example.com', hash]
    );
    console.log('Admin seedé: nom=itokiana, mot_de_passe=itokiana');
  } else {
    console.log('Admin déjà existant, skip');
  }

  await pool.end();
}

migrate().catch((err) => {
  console.error('Erreur migration:', err);
  process.exit(1);
});
