import { pool } from './config/db.js';
import bycript from 'bycriptjs';
import dotenv from 'dotenv'
import {normalizeEmail} from '../utils/normalizeEmail.js'

export async function createBusiness({name, email, adress, phone, category, password}){
    const normalizeEmail = normalizeEmail(email);
    const salt = await bycript.genSalt(Number(process.env.SALT_ROUNDS));
    const passwordHash = await bycript.hash(password, salt);

    const sql = `
    INSER INTO business (name, email, phone, adress, category, passwordHash)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING id, name, email, phone, adress, category, created_at;
    `;

    const params = [name, normalizeEmail, phone, adress, category, passwordHash];
    const { rows } = await pool.query(sql, params);
    return rows[0];
}

export async function getBusinessById(id){
    const { rows } = await pool.query(
        `SELECT id, name, email, phone, adress, category, created_at FROM business WHERE id = $1`,
        [id]
    );
    return rows[0] || null;
}

export async function getBusinessByEmail(email){
    const { rows } = await pool.query(`
        SELECT id, name, email, phone, adress, category, create_at FROM business WHERE email = $1`,
    [email]
    );
    return rows[0] || null;
}

export async function listBusiness({limit = 20, offset, search = '' } = {}){
    const q = `%${search.trim().toLowerCase()}%`;
    const params = [q, limit, offset];
    const sql = `
    SELECT id, name, email, phone, adress, category, created_at
    FROM business
    WHERE LOWER(name) LIKE $1 OR LOWER(category) LIKE $1 OR LOWER(email) LIKE $1
    ORDER BY id DESC
    LIMIT $2 OFFSET $3
    `;
    const { rows } = await pool.query(sql, params);
    return rows;
}

export async function updateBusinessPartial(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if(data.name != null){fields.push(`name = $${id++}`); values.push(data.name);}
    if(data.phone != null) {fields.push(`phone = $${id++}`); values.push(data.phone)};
    if(data.address != null){fields.push(`address = $${id++}`); values.push(data.address)};
    if(data.category != null){fields.push(`category = $${id++}`); values.push(data.category)};
    if(data.password != null){
        const salt = await bycript.genSalt(Number(process.env.SALT_ROUNDS));
        const hash = await bycript.hash(data.password, salt);
        fields.push(`password_hash = $${idx++}`); values.push(hash);
    }

    if(fields.length === 0){
        return await getBusinessById(id);
    }
}

