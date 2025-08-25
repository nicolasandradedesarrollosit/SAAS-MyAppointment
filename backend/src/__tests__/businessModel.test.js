import { jest } from '@jest/globals';

jest.unstable_mockModule('../config/db.js', () => ({
  pool: { query: jest.fn() }
}));

jest.unstable_mockModule('bcryptjs', () => ({
  default: {
    genSalt: jest.fn(async () => 'sal'),
    hash: jest.fn(async (txt) => `hash(${txt})`),
    compare: jest.fn(async (txt, hash) => hash === `hash(${txt})`)
  }
}));

////////////////////////
// Conecta con la BD mock
////////////////////////

const { pool } = await import('../config/db.js');
const {
  createBusiness,
  getBusinessById,
  verifyCredentials
} = await import('../models/businessModel.js');

describe('businessModel', () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  ////////////////////////
  // Testea con los datos de la data mock
  ////////////////////////

  test('createBusiness inserta y retorna campos públicos', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        name: 'Cafetería Palermo',
        email: 'contacto@palermo.com',
        phone: '1155555555',
        address: 'Av. Córdoba 1234',
        category: 'Gastronomía',
        created_at: '2025-08-23T00:00:00Z'
      }]
    });

    const result = await createBusiness({
      name: 'Cafetería Palermo',
      email: 'Contacto@Palermo.com',
      phone: '1155555555',
      address: 'Av. Córdoba 1234',
      category: 'Gastronomía',
      password: 'Secreta123A'
    });

    expect(result).toMatchObject({ id: 1, email: 'contacto@palermo.com' });

    const [sql, params] = pool.query.mock.calls[0];
    expect(sql).toMatch(/insert into business/i);
    expect(params).toHaveLength(6);
    expect(params[1]).toBe('contacto@palermo.com');
    expect(params[5]).toMatch(/^hash\(.+\)$/);
  });

  test('getBusinessById retorna null o la fila', async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ id: 9, name: 'X' }] });

    expect(await getBusinessById(123)).toBeNull();
    expect(await getBusinessById(9)).toMatchObject({ id: 9, name: 'X' });
  });

  test('verifyCredentials retorna datos públicos si la contraseña coincide', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 7,
        name: 'N',
        email: 'a@b.com',
        phone: '1',
        address: 'd',
        category: 'c',
        password: 'hash(Secreta1)'
      }]
    });

    const ok = await verifyCredentials('A@B.com', 'Secreta1');
    expect(ok).toMatchObject({ id: 7, email: 'a@b.com' });

    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 7, name: 'N', email: 'a@b.com', phone: '1', address: 'd',
        category: 'c', password: 'hash(Secreta1)'
      }]
    });
    expect(await verifyCredentials('a@b.com', 'otra')).toBeNull();
  });
});