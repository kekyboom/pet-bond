import { getPets, createPet, updatePet, deletePet, getPetsByUserId } from "../models/petsModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

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

  const user_id  = req.user?.id;

  try {
    const pets = await getPetsByUserId(user_id);
    res.json(pets);
  } catch (err) {
    console.error("Error al obtener mascotas del usuario:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// POST - Agregar mascota
export const addPet = async (req, res) => {
  try {
    const {
      nombre,
      region,
      genero,
      especie,
      edad_anios,
      edad_meses,
      peso_kg,
      caracter,
      info,
      userId,
    } = req.body;

    const estado_salud = {
      vacunaAntirrabica: req.body["estadoSalud[vacunaAntirrabica]"] === "true",
      vacunaTripleFelina: req.body["estadoSalud[vacunaTripleFelina]"] === "true",
      vacunaLeucemia: req.body["estadoSalud[vacunaLeucemia]"] === "true",
      esterilizado: req.body["estadoSalud[esterilizado]"] === "true",
    };
    
    let imagenUrl = null;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "pets" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      imagenUrl = result.secure_url;
    }

    const petData = {
      nombre,
      especie,
      edad_anios: Number(edad_anios),
      edad_meses: Number(edad_meses),
      genero,
      peso_kg: Number(peso_kg),
      region,
      imagen: imagenUrl || null,
      caracter,
      estado_salud: estado_salud,
      historia: info,
      user_id: Number(userId),
    };

    const createdPet = await createPet(petData);

    res.status(201).json({ mensaje: "Mascota creada", pet: createdPet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar mascota" });
  }
};

// PUT - Actualizar mascota
export const updatePetById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user_id = req.userId || req.body.userId;

    const {
      nombre,
      region,
      genero,
      especie,
      edad_anios,
      edad_meses,
      peso_kg,
      caracter,
      info,
    } = req.body;

    const estado_salud = JSON.parse(req.body.estado_salud);

    let imagenUrl = null;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "pets" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      imagenUrl = result.secure_url;
    }

    const petData = {
      nombre,
      region,
      genero,
      especie,
      edad_anios,
      edad_meses,
      peso_kg,
      caracter,
      historia: req.body.historia,
      user_id: Number(user_id),  
      estado_salud: {
        vacunaAntirrabica: estado_salud.vacunaAntirrabica,
        vacunaTripleFelina: estado_salud.vacunaTripleFelina,
        vacunaLeucemia: estado_salud.vacunaLeucemia,
        esterilizado: estado_salud.esterilizado
      }
    };

    if (imagenUrl) {
      petData.imagen = imagenUrl;
    }

    const updatedPet = await updatePet(id, petData);
    res.json(updatedPet);
  } catch (error) {
    console.error("Error en updatePetById:", error);
    res.status(500).json({ message: "Error del Servidor" });
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