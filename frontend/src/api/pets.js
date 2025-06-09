import axios from "axios";

const BASE_URL = 'http://localhost:3001';

// GET - Obtener mascotas
export const fetchPets = async (especie = "") => {
    const url = especie ? `${BASE_URL}/pets?especie=${especie}` : `${BASE_URL}/pets`;

    const response = await axios.get(url);
    return response.data;
}

// POST - Agregar mascota
export const createPet = async (newPet) => {
  const { data } = await axios.post(`${BASE_URL}/pets`, newPet);
  return data;
};

  // PUT - Actualizar mascota
export const updatePetById = async (updatedPet) => {
  if (!updatedPet.id) throw new Error("ID de mascota inválido");
  const { data } = await axios.put(`${BASE_URL}/pets/${updatedPet.id}`, updatedPet);
  return data;
};

// DELETE - Eliminar mascota
export const deletePetById = async (id) => {
  await axios.delete(`${BASE_URL}/pets/${id}`);
};