import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { normalizeEmail } from '../utils/normalizeEmail.js';

////////////////////////
// Recibe los parametros del formData, normaliza, hashea contrasenia y crea una cuenta para business
////////////////////////

export async function createBusiness({ name, email, address, phone, category, password }) {
    const normalizedEmail = normalizeEmail(email);
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const password_hash = await bcrypt.hash(password, salt);

    const sql = `
    INSERT INTO business (name, email, phone, address, category, password)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING id, name, email, phone, address, category, created_at;
    `;

    const params = [name, normalizedEmail, phone, address, category, password_hash];
    const { rows } = await pool.query(sql, params);
    return rows[0];
}

////////////////////////
// Recibe un id como parametro y muestra el business con ese id
////////////////////////

export async function getBusinessById(id) {
    const { rows } = await pool.query(
        `SELECT id, name, email, phone, address, category, created_at FROM business WHERE id = $1`,
        [id]
    );
    return rows[0] || null;
}

////////////////////////
// Recibe un mail como parametro y muestra el business con ese mail
////////////////////////

export async function getBusinessByEmail(email) {
    const { rows } = await pool.query(`
        SELECT id, name, email, phone, address, category, created_at FROM business WHERE email = $1`,
        [email]
    );
    return rows[0] || null;
}

////////////////////////
// hace un listado de mails, que va siendo filtrado por un buscador, con un "ver mas" hecho por limit y offset los cuales son todos pasados por parametros
////////////////////////

export async function listBusiness({ limit = 20, offset, search = '' } = {}) {
    const q = `%${search.trim().toLowerCase()}%`;
    const params = [q, limit, offset];
    const sql = `
    SELECT id, name, email, phone, address, category, created_at
    FROM business
    WHERE LOWER(name) LIKE $1 OR LOWER(category) LIKE $1 OR LOWER(email) LIKE $1
    ORDER BY id DESC
    LIMIT $2 OFFSET $3
    `;
    const { rows } = await pool.query(sql, params);
    return rows;
}

////////////////////////
// Recibe un formData, verifica que campos fueron cambiados, actualiza solo esos datos, para optimizar la query
////////////////////////

export async function updateBusinessPartial(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.name != null) { fields.push(`name = $${idx++}`); values.push(data.name) }
    if (data.phone != null) { fields.push(`phone = $${idx++}`); values.push(data.phone) }
    if (data.address != null) { fields.push(`address = $${idx++}`); values.push(data.address) }
    if (data.category != null) { fields.push(`category = $${idx++}`); values.push(data.category) }
    if (data.password != null) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        const hash = await bcrypt.hash(data.password, salt);
        fields.push(`password_hash = $${idx++}`); values.push(hash);
    }

    if (fields.length === 0) {
        return await getBusinessById(id);
    }

    const sql = `
        UPDATE business
        SET ${fields.join(', ')}
        WHERE id = $${idx}
        RETURNING id, name, email, phone, address, category, created_at
    `;
    values.push(id);

    const { rows } = await pool.query(sql, values);
    return rows[0];
}

////////////////////////
// Recibe un id y elimina el business de la base de datos
////////////////////////

export async function deleteBusiness(id) {
    const { rows } = await pool.query(
        `DELETE FROM business
        WHERE id = $1
        RETURNING id, name, email, phone, address, category, created_at
        `,
        [id]
    );
    return rows[0] || null;
}

////////////////////////
// Recibe un mail y una password, verifica si existe el mail en la base de datos, compara la password de la bd con el hasheo pasado por la UI
////////////////////////

export async function verifyCredentials(email, password) {
    const normalizedEmail = normalizeEmail(email);
    const { rows } = await pool.query(
        `SELECT id, name, email, phone, address, category, created_at, password
        FROM business
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