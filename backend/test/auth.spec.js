import request from 'supertest';
import app from '../src/server.js';

describe('Auth API', () => {
  let token;

  const testUser = {
    nombre: 'Test',
    apellido: 'User',
    email: 'testuser@example.com',
    telefono: '123456789',
    password: 'password123',
  };

  beforeAll(async () => {
    const res = await request(app).post('/usuarios').send(testUser);
    if (res.statusCode !== 201 && res.statusCode !== 409) {
      throw new Error(`Error inesperado al registrar usuario: ${res.statusCode}`);
    }
  });

  it('Debe iniciar sesión correctamente y devolver un token (POST /login)', async () => {
    const res = await request(app).post('/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');

    token = res.body.token;
  });

  it('Debe acceder a una ruta protegida con un token válido (GET /usuarios)', async () => {
    const res = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });

  it('Debe rechazar acceso a ruta protegida sin token (GET /usuarios)', async () => {
    const res = await request(app).get('/usuarios');

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('message'); 
    expect(res.body.message).toBe('Token no proporcionado'); 
  });
});
