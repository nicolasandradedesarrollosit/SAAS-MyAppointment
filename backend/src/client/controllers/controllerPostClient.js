import { createClientModel } from "../models/modelPostClient.js";

export default async function createClientController(req, res) {
  try {
    const result = validateFields(req.body);

    if (!result.ok) return res.status(400).json({ ok: false, errors: result.errors })

    const created = await createClientModel(result.value);
    return res.status(201).json({ ok: true, data: created });
  }
  catch (err) {
    if (err.code === '23505') return res.status(409).json({ ok: false, message: 'Email ya registrado' });
    console.error('Error al crear negocio ', err);
    return res.status(500).json({ ok: false, message: 'Error en el servidor' })
  }
}

function validateFields(result = {}) {
  const fields = {
    name: String(result.name ?? ''),
    email: String(result.email ?? ''),
    phone: String(result.phone ?? ''),
    address: String(result.address ?? ''),
    date_birth: String(result.date_birth ?? ''),
    password: String(result.password ?? '')
  };

  const faltan = Object.entries(fields)
    .filter(([, v]) => !v.trim())
    .map(([k]) => k);

  if (faltan.length) {
    return { faltan };
  }

  const errors = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Correo invalido';
  if (!/^\d{7,15}$/.test(fields.phone)) errors.phone = 'Telefono invalido';
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(fields.password)) errors.password = 'Password invalida';
  if (!/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fields.date_birth)) errors.date_birth = 'Fecha invalida';

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: fields }
}