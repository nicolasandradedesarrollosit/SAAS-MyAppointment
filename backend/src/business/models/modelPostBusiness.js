import { pool } from '../../others/config/db.js';
import bcrypt from 'bcryptjs';

////////////////////////
// Recibe los parametros del formData, normaliza, hashea contrasenia y crea una cuenta para business
////////////////////////

export async function createBusinessModel({ name, email, address, phone, category, password }) {
  if (!name.trim() || !email.trim() || !address.trim() || !phone.trim() || !category.trim() || !password.trim()) throw new Error('Los campos no pueden estar vacios');
  if (Array.isArray(password)) throw new Error('Formato de contrasenia invalido');
  password = String(password);
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  const sql = `
    INSERT INTO business (name, email, address, phone, category, password)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, name, email, address, phone, category, created_at;
  `;
  const params = [name, email, address, phone, category, hash];
  const { rows } = await pool.query(sql, params);
  return rows[0];
}