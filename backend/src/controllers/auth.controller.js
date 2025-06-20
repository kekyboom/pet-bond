import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, getAllUsers, getUserByIdFromDb } from '../models/usersModel.js';

//Registro de Usuarios

export const registerUser = async (req, res, next) => {
    try {
        const { nombre, apellido, email, telefono, password} = req.body;
        if (!nombre || !apellido || !email || !telefono || !password) {
            return res.status(400).json({ message: 'Todos los datos son obligatorios' });
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(nombre, apellido, email, telefono, hashedPassword);

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
    } catch (error) {
        next(error);
    }
};

// Loggin de Usuarios
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales invalidas' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { id, nombre, apellido, telefono } = user;
        res.json({ token, user: { id, nombre, apellido, email: user.email, telefono } });
    } catch (error) {
        next(error);
    }
};

//Obetener los usuarios
export const getUsers = async (req, res, next) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };
  
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdFromDb(id); 

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { nombre, apellido, email, telefono } = user;
    res.json({ id, nombre, apellido, email, telefono });
  } catch (error) {
    next(error);
  }
};
