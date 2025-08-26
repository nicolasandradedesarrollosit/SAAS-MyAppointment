////////////////////////
// Recibe un formData de business, lo valida, verifica si falta algo, valida otra vez, valida otra vez si hay errores
////////////////////////

export function validateCreate(body = {}) {
  const fields = {
    name: String(body.name ?? ''),
    email: String(body.email ?? ''),
    phone: String(body.phone ?? ''),
    address: String(body.address ?? ''),
    birthDate: String(body.category ?? ''),
    password: String(body.password ?? '')
  };

  const faltan = Object.entries(fields)
    .filter(([, v]) => !v.trim())
    .map(([k]) => k);

  if (faltan.length) {
    return { faltan };
  }

  const errors = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Correo inválido.';
  }
  if (!/^\d{7,15}$/.test(fields.phone)) {
    errors.phone = 'Teléfono inválido.';
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(fields.password)) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.';
  }

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: fields };
}