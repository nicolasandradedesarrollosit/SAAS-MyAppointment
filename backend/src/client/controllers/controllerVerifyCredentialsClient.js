import { verifyCredentialsClientModel } from '../models/modelVerifyCredentialsClient.js';
import jwt from 'jsonwebtoken';

export default async function controllerBusinesVerifyCredentials(req, res) {
  try {
    const result = validateFields(req.body);

    if (!result.ok) return res.status(400).json({ ok: false, errors: result.errors });
    const tokenCredentials = await verifyCredentialsClientModel(result.value);
    const token = jwt.sign(
      {
        id: tokenCredentials.id,
        name: tokenCredentials.name,
        email: tokenCredentials.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );
    return res.status(200).json({ ok: true, token })
  }
  catch (err) {
    console.error('Error en el login ', err.message);
    return res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
  }
}

function validateFields(result = {}) {
  const fields = {
    email: String(result.email ?? ''),
    password: String(result.password ?? '')
  };

  const faltan = Object.entries(fields)
    .filter(([, v]) => !v.trim())
    .map(([k]) => k);

  if (faltan.length) return { ok: false, faltan };

  const errors = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Correo invalido';
  if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(fields.password)) errors.password = 'La contrasenia es invalida';

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: fields }
}