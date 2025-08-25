////////////////////////
// Recibe un mail, lo valida y hace que sea lowercase y unique
////////////////////////

export function normalizeEmail(email) {
    if (typeof email !== 'string') throw new Error('El correo debe ser un string.');
    const raw = email.trim();
    if (!raw) throw new Error('El correo no puede estar vacío.');
    const parts = raw.split('@');
    if (parts.length !== 2) throw new Error('Formato de correo inválido.');

    let [local, domain] = parts;
    local = local.normalize('NFKC');
    domain = domain.normalize('NFKC').toLowerCase();

    return `${local.toLowerCase()}@${domain}`;
}