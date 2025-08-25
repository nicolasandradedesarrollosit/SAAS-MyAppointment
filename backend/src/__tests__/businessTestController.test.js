import { jest } from '@jest/globals';

////////////////////////
// conecta con la base Mock
////////////////////////

jest.unstable_mockModule('../config/db.js', () => ({
  pool: { query: jest.fn() }
}));

const request = (await import('supertest')).default;
const app = (await import('../app.js')).default;
const { pool } = await import('../config/db.js');

////////////////////////
// Conecta con la api
////////////////////////
describe('API /api/business', () => {
  beforeEach(() => {
    pool.query.mockReset();
  });
  ////////////////////////
  // Hace el test de la funcionalidad, envia la data mock
  ////////////////////////
  test('POST /api/business crea negocio → 201', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1, name: 'Cafetería Palermo', email: 'contacto@palermo.com',
        phone: '1155555555', address: 'Av. Córdoba 1234',
        category: 'Gastronomía', created_at: '2025-08-23T00:00:00Z'
      }]
    });

    const data = {
      name: 'Cafetería Palermo',
      email: 'contacto@palermo.com',
      phone: '1155555555',
      address: 'Av. Córdoba 1234',
      category: 'Gastronomía',
      password: 'Secreta123A!'
    };

    const res = await request(app)
      .post('/api/business')
      .send(data);
    expect(res.status).toBe(201);
  });

  ////////////////////////
  // Hace el test de la funcionalidad erronea, envia la data mock
  ////////////////////////

  test('POST /api/business inválido → 400', async () => {
    const res = await request(app)
      .post('/api/business')
      .send({ name: 'Nicolas', email: 'MAL@pito.com', phone: '3416923901', address: 'ovidio lagos 4867', category: 'Barberia', password: '' })
      .expect(400);

    expect(res.body.ok).toBe(false);
    expect(pool.query).not.toHaveBeenCalled();
  });
});