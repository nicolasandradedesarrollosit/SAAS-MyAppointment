////////////////////////
// Recibe un formData de business, lo valida, verifica si falta algo, valida otra vez, valida otra vez si hay errores
////////////////////////

export function validateCreateClient(body = {}) {
  const raw = {
    name: body.name ?? '',
    email: body.email ?? '',
    phone: body.phone ?? '',
    address: body.address ?? '',
    birthDate: body.birthDate ?? '',
    password: body.password ?? ''
  };

  const asString = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, String(v ?? '')])
  );

  const missing = Object.entries(asString)
    .filter(([, v]) => v.trim().length === 0)
    .map(([k]) => k);

  if (missing.length) {
    return { ok: false, missing };
  }

  const errors = {};

  const email = asString.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Correo inválido.';
  }

  const phoneDigits = asString.phone.replace(/\D+/g, '');
  if (!/^\d{7,15}$/.test(phoneDigits)) {
    errors.phone = 'Teléfono inválido (7 a 15 dígitos, sin signos).';
  }

  // Password
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(asString.password)) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.';
  }

  const birthDateStr = asString.birthDate.trim();
  const dateCheck = isValidYYYYMMDD(birthDateStr);
  if (!dateCheck.ok) {
    errors.birthDate = dateCheck.error;
  }

  if (Object.keys(errors).length) {
    return { ok: false, errors };
  }

  const value = {
    name: asString.name.trim(),
    email,
    phone: phoneDigits,
    address: asString.address.trim(),
    birthDate: birthDateStr,
    password: asString.password
  };

  return { ok: true, value };
}

function isValidYYYYMMDD(ymd) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) {
    return { ok: false, error: 'Formato de fecha inválido (usa YYYY-MM-DD).' };
  }
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) {
    return { ok: false, error: 'La fecha no existe.' };
  }
  return { ok: true };
}
