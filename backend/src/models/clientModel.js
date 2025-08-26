import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { normalizeEmail } from '../utils/normalizeEmail.js';

////////////////////////
// Recibe los parametros del formData, normaliza, hashea contrasenia y crea una cuenta para client
////////////////////////

export async function createClient({ name, email, address, phone, dateBirth, password }) {
  if (Array.isArray(password)) password = password[0];
  password = String(password);

  const normalizedEmail = normalizeEmail(email);
  const saltRounds = Number.parseInt(process.env.SALT_ROUNDS ?? '10', 10);
  const password_hash = await bcrypt.hash(password, saltRounds);

  const sql = `INSERT INTO client (name, email, phone, address, date_birth, password)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id, name, email, phone, address, date_birth, password
  `;
  const params = [name, normalizedEmail, phone, address, dateBirth, password_hash];
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

export async function listClient({ limit = 20, offset, search = '' } = {}) {
  const q = `%${search.trim().toLowerCase()}%`;
  const params = [q, limit, offset];
  const sql = `
    SELECT id, name, email, phone, address, date_birth, created_at 
    FROM client
    WHERE LOWER(name) LIKE $1
    ORDER BY DESC
    LIMIT $2 OFFSET $3
  `;
  const { rows } = pool.query(sql, params);
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
  if (data.dateBirth != null) { fields.push(`date_birth = $${idx++}`); values.push(data.date_Birth) }
  if (data.password != null) {
    const salt = await bycript.genSalt(Number(process.env.SALT_ROUNDS));
    const hash = await bcrtpt.hash(data.password, salt);
    fields.push(`password_hash = $${idx++}`); values.push(hash);
  }

  if (fields.length === 0) {
    return await getBusinessById(id);
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
  const { rows } = pool.query(
    `DELETE from client
    WHERE ID = $1
    RETURNING id, name, email, phone, address, date_birth, created_at`,
    [id]
  );
  return rows[0] || null;
}