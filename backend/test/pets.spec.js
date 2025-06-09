import request from 'supertest';
import app from '../src/server.js';

describe('Pets API', () => {
  let token;
  let createdPetId;

  const testUser = {
    nombre: 'PetTest',
    apellido: 'User',
    email: 'petuser@example.com',
    telefono: '987654321',
    password: 'testpassword',
  };

  const testPet = {
    nombre: 'Firulais',
    especie: 'perro',
    edad: 3,
    descripcion: 'Amigable y juguetón',
  };

  beforeAll(async () => {
    const res = await request(app).post('/usuarios').send(testUser);
    if (res.statusCode !== 201 && res.statusCode !== 409) {
      throw new Error(`Fallo al registrar usuario: ${res.statusCode}`);
    }

    // Login
    const loginRes = await request(app).post('/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    token = loginRes.body.token;
  });

  it('Debe obtener todas las mascotas (GET /mascotas)', async () => {
    const res = await request(app).get('/pets'); 
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
