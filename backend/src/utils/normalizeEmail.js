export function normalizeEmail(email){
    if(typeof email !== 'string' || email.trim() === ''){
        throw new Error('El correo debe ser un string no vacio');
    }
    return email.trim().toLowerCase();
}