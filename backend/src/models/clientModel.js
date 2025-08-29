import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { normalizeEmail } from '../utils/normalizeEmail.js';
import dotenv from 'dotenv';
dotenv.config();

////////////////////////
// Recibe los parametros del formData, normaliza, hashea contrasenia y crea una cuenta para client
////////////////////////

export async function createClient(payload) {
  const { name, email, phone, address, birthDate, password } = payload;

  if (!birthDate) {
    throw new Error('birthDate es obligatorio y no puede ser vacío');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(birthDate))) {
    throw new Error(`birthDate debe ser YYYY-MM-DD. Recibí: ${birthDate}`);
  }

  const emailNorm = String(email).trim().toLowerCase();
  const saltRounds = Number.parseInt(process.env.SALT_ROUNDS ?? '10', 10);
  const password_hash = await bcrypt.hash(String(password), saltRounds);

  // OJO con el ORDEN de columnas y params:
  const sql = `
    INSERT INTO client (name, email, phone, address, date_birth, password)
    VALUES ($1,   $2,    $3,   $4,      $5,         $6)
    RETURNING id, name, email, phone, address, date_birth, created_at
  `;
  const params = [name, emailNorm, phone, address, birthDate, password_hash];

  // Log de diagnóstico: verificá que $5 sea birthDate:
  console.log('SQL params:', params);

  const { rows } = await pool.query(sql, params);
  return rows[0];
}

////////////////////////
// Recibe un id como parametro y muestra el client con ese id
////////////////////////

export async function getClientById(id) {
  const { rows } = await pool.query(
    `SELECT id, name, email, phone, address, date_birth, created_at FROM client WHERE id = $1
    `,
    [id]
  );
  return rows[0] || null;
}

////////////////////////
// Recibe un mail como parametro y muestra el client con ese mail
////////////////////////

export async function getClientByEmail(email) {
  const { rows } = await pool.query(
    `
      SELECT id, name, email, phone, address, date_birth, created_at 
      FROM client 
      WHERE email = $1 
    `,
    [email]
  );
  return rows[0] || null;
}

////////////////////////
// hace un listado de clients, que va siendo filtrado por un buscador, con un "ver mas" hecho por limit y offset los cuales son todos pasados por parametros
////////////////////////

export async function listClient({ limit = 20, offset = 0, search = '' } = {}) {
  const q = `%${search.trim().toLowerCase()}%`;
  const params = [q, limit, offset];
  const sql = `
    SELECT id, name, email, phone, address, date_birth, created_at 
    FROM client
    WHERE LOWER(name) LIKE $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;
  const { rows } = await pool.query(sql, params);
  return rows;
}

////////////////////////
// Recibe un formData, verifica que campos fueron cambiados, actualiza solo esos datos, para optimizar la query
////////////////////////

export async function updateClientPartial(id, data) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.name != null) { fields.push(`name = $${idx++}`); values.push(data.name) }
  if (data.phone != null) { fields.push(`phone = $${idx++}`); values.push(data.phone) }
  if (data.address != null) { fields.push(`address = $${idx++}`); values.push(data.address) }
  if (data.dateBirth != null) { fields.push(`date_birth = $${idx++}`); values.push(data.dateBirth) }
  if (data.password != null) {
    const salt = await bcrypt.genSalt(Number.parseInt(process.env.SALT_ROUNDS ?? '10', 10));
    const hash = await bcrypt.hash(String(data.password), salt);
    fields.push(`password_hash = $${idx++}`);
    values.push(hash);
  }

  if (fields.length === 0) {
    return await getClientById(id);
  }
  values.push(id);

  const sql = `
    UPDATE client
    SET ${fields.join(', ')}
    WHERE id = $${idx}
    RETURNING id, name, email, phone, address, date_birth, created_at
  `;
  const { rows } = await pool.query(sql, values);
  return rows[0];
}

////////////////////////
// Recibe un id y elimina el business de la base de datos
////////////////////////

export async function deleteClient(id) {
  const { rows } = await pool.query(
    `DELETE FROM client
     WHERE id = $1
     RETURNING id, name, email, phone, address, date_birth, created_at`,
    [id]
  );
  return rows[0] || null;
}

export async function verifyCredentials(email, password) {
  const normalizedEmail = normalizeEmail(email);
  const { rows } = await pool.query(
    `SELECT id, name, email, phone, address, date_birth, created_at, password
        FROM client
        WHERE email = $1`,
    [normalizedEmail]
  );

  if (rows.length === 0) return null;
  const record = rows[0];
  const ok = await bcrypt.compare(password, record.password);
  if (!ok) return null;
  const { password_hash, ...publicData } = record;
  return publicData;
}