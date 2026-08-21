import 'dotenv/config';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pool } from '../src/config/database.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const sql = readFileSync(join(__dirname, 'migration.sql'), 'utf-8');
  await pool.query(sql);
  console.log('Migration appliquée avec succès');
  await pool.end();
}

migrate().catch((err) => {
  console.error('Erreur migration:', err);
  process.exit(1);
});
