import {
  createBusiness,
  getBusinessById,
  listBusiness,
  updateBusinessPartial,
  deleteBusiness
} from '../models/businessModel.js';
import { validateCreate } from '../utils/validateCreateBusiness.js';

////////////////////////
// Hace el asincronismo de la funcion try --> catch; retorna errores si los hay
////////////////////////

export async function postCreateBusiness(req, res) {
  try {
    const result = validateCreate(req.body);

    if (!result.ok) {
      return res.status(400).json({ ok: false, errors: result.errors });
    }

    // usar SIEMPRE el valor normalizado
    const created = await createBusiness(result.value);

    return res.status(201).json({ ok: true, data: created });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ ok: false, message: 'Email ya registrado' });
    }
    console.error('Error al crear negocio:', err);
    return res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
  }
}

////////////////////////
// Hace el asincronismo de la funcion try --> catch; retorna errores si los hay
////////////////////////

export async function getBusiness(req, res) {
  try {
    const { id } = req.params;
    const business = await getBusinessById(id);
    if (!business) return res.status(404).json({ ok: false, error: 'No encontrado' });
    return res.json({ ok: true, data: business });
  }
  catch (err) {
    console.error('Error al obtener negocio: ', err);
    return res.status(500).json({ ok: false, error: 'Error interno en el servidor' })
  }
}

////////////////////////
// Hace el asincronismo de la funcion try --> catch; retorna errores si los hay; valida que los parametros cumplan con los tipos de datos --> LIMIT, OFFSET, SEARCH
////////////////////////

export async function getBusinesses(req, res) {
  try {
    const { limit, offset, search } = req.query;
    const list = await listBusiness({
      limit: Number(limit) || 20,
      offset: Number(offset) || 0,
      search: search || ''
    });
    return res.json({ ok: true, data: list });
  } catch (e) {
    console.error('Error al listar negocios:', e);
    return res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
  }
}

////////////////////////
// Hace el asincronismo de la funcion try --> catch; retorna errores si los hay
////////////////////////

export async function patchBusiness(req, res) {
  try {
    const { id } = req.params;
    const updated = await updateBusinessPartial(id, req.body || {});
    if (!updated) return res.status(404).json({ ok: false, error: 'No encontrado' });
    return res.json({ ok: true, data: updated })
  }
  catch (err) {
    console.error('Eror al actualizar negocio: ', err);
    return res.status(500).json({ ok: false, error: 'Error interno en el servidor' });
  }
}

////////////////////////
// Hace el asincronismo de la funcion try --> catch; retorna errores si los hay
////////////////////////

export async function deleteBusinessCtrl(req, res) {
  try {
    const { id } = req.params;
    const removed = await deleteBusiness(id);
    if (!removed) return res.json({ ok: false, error: 'No encontrado' });
    return res.json({ ok: true, data: removed });
  }
  catch (err) {
    console.error('Error al eliminar negocio: ', err);
    return res.status(500).json({ ok: false, error: 'Error interno en el servidor' });
  }
}

