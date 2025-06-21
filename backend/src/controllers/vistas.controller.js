import { registrarVista, obtenerVistasPorUsuario } from '../models/vistasModel.js';

export const postVista = async (req, res) => {
  const { user_id, pet_id } = req.body;

  if (!user_id || !pet_id) {
    return res.status(400).json({ message: "Faltan datos necesarios" });
  }

  try {
    const vista = await registrarVista(user_id, pet_id);
    res.status(201).json(vista);
  } catch (error) {
    console.error("Error al registrar vista:", error);
    res.status(500).json({ message: "Error al registrar vista" });
  }
};

export const getVistasPorUsuario = async (req, res) => {
  const { userId } = req.params;

  try {
    const vistas = await obtenerVistasPorUsuario(userId);
    res.json(vistas);
  } catch (error) {
    console.error("Error al obtener vistas:", error);
    res.status(500).json({ message: "Error al obtener vistas recientes" });
  }
};
