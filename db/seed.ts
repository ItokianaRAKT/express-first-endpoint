import 'dotenv/config';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function seed() {
  const nom = 'itokiana';
  const prenom = 'Admin';
  const email = 'admin@example.com';
  const mot_de_passe = 'itokiana';

  const hash = await bcrypt.hash(mot_de_passe, 10);

  await pool.query(
    'INSERT INTO admins (nom, prenom, email, mot_de_passe) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
    [nom, prenom, email, hash]
  );

  console.log(`Admin seedé: nom=${nom}, mot_de_passe=${mot_de_passe}`);
  await pool.end();
}

seed().catch((err) => {
  console.error('Erreur seed:', err);
  process.exit(1);
});
