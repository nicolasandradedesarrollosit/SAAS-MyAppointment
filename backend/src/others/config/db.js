////////////////////////
// Hace la conexion con la BD
////////////////////////

import dotenv from 'dotenv';
import pkg from 'pg';
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: String(process.env.PGPASSWORD),
});