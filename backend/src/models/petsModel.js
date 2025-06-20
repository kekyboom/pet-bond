import { pool } from "../db/db.js";

// Obtener mascotas
export const getPets = async (especie) => {
  try {
    if (especie) {
      const { rows } = await pool.query('SELECT * FROM pets WHERE especie ILIKE $1', [especie]);
      return rows;
    }
    const { rows } = await pool.query('SELECT * FROM pets');
    return rows;
  } catch (error) {
    console.error("Error en getPets:", error);
    throw error;
  }
};

// Crear mascota
export const createPet = async (pet) => {
  const {
    nombre,
    especie,
    genero,
    region,
    imagen,
    caracter,
    estadoSalud,
    historia,
    
  } = pet;

  const edadAnios = parseInt(pet.edad_anios);
  const edadMeses = parseInt(pet.edad_meses);
  const pesoKg = parseFloat(pet.peso_kg);
  const user_id = parseInt(pet.user_id);
  
  console.log("DEBUG valores:", {
  edadAnios: pet.edad_anios,
  edadMeses: pet.edad_meses,
  pesoKg: pet.peso_kg,
  userId: pet.user_id,
});

  const query = `
    INSERT INTO pets (
      nombre, especie, edad_anios, edad_meses, genero, peso_kg, region,
      imagen, caracter, estado_salud, historia, user_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING *;
  `;

  const values = [
    nombre,
    especie,
    edadAnios,
    edadMeses,
    genero,
    pesoKg,
    region,
    imagen,
    caracter,
    JSON.stringify(estadoSalud),
    historia,
    user_id,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

// Actualizar mascota
export const updatePet = async (id, pet) => {
    const {
    nombre,
    especie,
    edad_anios,
    edad_meses,
    genero,
    peso_kg,
    region,
    imagen,
    caracter,
    estado_salud,
    historia,
    user_id,
  } = pet;

  const query = `
    UPDATE pets SET
      nombre = $1,
      especie = $2,
      edad_anios = $3,
      edad_meses = $4,
      genero = $5,
      peso_kg = $6,
      region = $7,
      imagen = COALESCE($8, imagen),
      caracter = $9,
      estado_salud = $10,
      historia = $11,
      user_id = $12
    WHERE id = $13
    RETURNING *;
  `;

    const values = [
    nombre,
    especie,
    edad_anios,
    edad_meses,
    genero,
    peso_kg,
    region,
    imagen,
    caracter,
    JSON.stringify(estado_salud),
    historia,
    user_id,
    id,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Eliminar mascota
export const deletePet = async (id) => {
  await pool.query("DELETE FROM pets WHERE id = $1", [id]);
};

// Obtener publicaciones de un usuario
export const getPetsByUserId = async (user_id) => {
  const { rows } = await pool.query('SELECT * FROM pets WHERE user_id = $1', [user_id]);
  return rows;
};

// Guardar vista reciente (cuando el usuario ve una mascota) - Pendiente
export const addRecentView = async (user_id, pet_id) => {
  const query = `
    INSERT INTO recent_views (user_id, pet_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, pet_id)
    DO UPDATE SET viewed_at = CURRENT_TIMESTAMP
  `;
  await pool.query(query, [user_id, pet_id]);
};

// Obtener vistas recientes del usuario (las mascotas que ha visto) - Pendiente
export const getRecentViewsByUser = async (user_id, limit = 4) => {
  const query = `
    SELECT p.*
    FROM recent_views rv
    JOIN pets p ON rv.pet_id = p.id
    WHERE rv.user_id = $1
    ORDER BY rv.viewed_at DESC
    LIMIT $2
  `;
  const { rows } = await pool.query(query, [user_id, limit]);
  return rows;
};