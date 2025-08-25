import {
  createClient,
  getClientById,
  listClient,
  updateClientPartial,
  deleteClient
} from '../models/clientModel.js';
import { validateCreate } from '../utils/validateCreateClient.js';

////////////////////////
// Hace el asincronismo de la funcion try --> catch; retorna errores si los hay
////////////////////////

export async function postCreateClient(req, res) {
  try {
    const result = validateCreate(req.body);
    if (!result.ok) {
      return res.status(400).json({ ok: false, errors: result.errors });
    }
    const created = await createClient(result.value);
    return res.status(400).json({ ok: true, data: created })
  }

  catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ ok: false, message: 'Email ya registrado' });
    }
    console.log('Error al crear cliente: ', err);
    return res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
  }
}

////////////////////////
// Hace el asincronismo de la funcion try --> catch; retorna errores si los hay
////////////////////////

export async function getClient(req, res) {
  try {
    const { id } = req.params;
    const client = await getClientById(id);
    if (!business) return res.status(404).json({ ok: false, error: 'No encontrado' });
    return res.json({ ok: true, data: client })
  }
  catch (err) {
    console.error('Error al obtener cliente: ', err);
    return res.status(500).json({ ok: false, error: 'Error interno en el servidor' });
  }
}

////////////////////////
// Hace el asincronismo de la funcion try --> catch; retorna errores si los hay; valida que los parametros cumplan con los tipos de datos --> LIMIT, OFFSET, SEARCH
////////////////////////

export async function getClients(req, res) {
  try {
    const { limit, offset, search } = req.query;
    const list = await listClient({
      limit: Number(limit) || 20,
      offset: Number(offset) || 0,
      search: search || ''
    });
    return res.json({ ok: true, data: list });
  }
  catch (err) {
    console.error('Error al listar clientes: ', err);
    return res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
  }
}

