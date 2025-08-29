import { pool } from '../../others/config/db.js'
import bcrypt from 'bcryptjs';

////////////////////////
// Recibe los parametros del formData, compara credenciales e inicia sesion
////////////////////////

export async function verifyCredentialsBusinessModel({ email, password }) {
  if (!email.trim() || !password.trim()) throw new Error('Los campos no pueden estar vacios');
  if (Array.isArray(password)) throw new Error('Formato de contrasenia invalido');
  const sql = `
    SELECT id, name, email, address, phone, category, created_at, password
    from business
    WHERE email = $1
    LIMIT 1;
  `;
  const params = [email];
  const { rows } = await pool.query(sql, params);
  const user = rows[0];

  if (!user) throw new Error('No existe usuario con ese mail');

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('La contrasenia no coincide...');

  const { password: passwordHash, ...safeUser } = user;
  return safeUser;
}