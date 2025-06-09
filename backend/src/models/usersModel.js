import { pool} from "../db/db.js";

//Crear Usuario
export const createUser = async (nombre, apellido, email, telefono, password) => {
    const query = "INSERT INTO users (nombre, apellido, email, telefono, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [nombre, apellido, email, telefono, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

//get usuario por email
export const getUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};

//traer a todos los usuarios
export const getAllUsers = async () => {
    const query = "SELECT * FROM users";
    const { rows } = await pool.query(query);
    return rows;
  };