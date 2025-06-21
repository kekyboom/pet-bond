import { pool} from "../db/db.js";

// Registrar una vista 
export const registrarVista = async (user_id, pet_id) => {
  const result = await pool.query(
    `INSERT INTO vistas_recientes (user_id, pet_id, vista_en)
     VALUES ($1, $2, NOW())
     ON CONFLICT (user_id, pet_id)
     DO UPDATE SET vista_en = NOW()
     RETURNING *`,
    [user_id, pet_id]
  );

  return result.rows[0];
};

// Obtener las últimas 4 vistas de un usuario
export const obtenerVistasPorUsuario = async (user_id) => {
  const result = await pool.query(
    `SELECT p.* 
     FROM vistas_recientes vr
     JOIN pets p ON vr.pet_id = p.id
     WHERE vr.user_id = $1
     ORDER BY vr.vista_en DESC
     LIMIT 4`,
    [user_id]
  );

  return result.rows;
};