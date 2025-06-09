import { getPets, createPet, updatePet, deletePet, getPetsByUserId } from "../models/petsModel.js";

// GET - Obtener mascotas
export const fetchPets = async (req, res, next) => {
  try {
    const { especie } = req.query;
    console.log("Filtro especie:", especie);
    const pets = await getPets(especie);
    res.json(pets);
  } catch (error) {
    console.error("Error en fetchPets:", error);
    next(error);
  }
};

// GET - Obtener mascotas por usuario
export const getPetsByUser = async (req, res) => {
  const user_id  = req.userId;
  try {
    const pets = await getPetsByUserId(user_id);
    res.json(pets);
  } catch (err) {
    console.error("Error al obtener mascotas del usuario:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// POST - Agregar mascota
export const addPet = async (req, res, next) => {
  try {
    const newPet = await createPet(req.body);
    res.status(201).json(newPet);
  } catch (error) {
    next(error);
  }
};

// PUT - Actualizar mascota
export const updatePetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPet = await updatePet(id, req.body);
    res.json(updatedPet);
  } catch (error) {
    next(error);
  }
};

// DELETE - Eliminar mascota
export const deletePetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deletePet(id);
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};