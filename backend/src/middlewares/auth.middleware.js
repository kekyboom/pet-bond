import jwt from "jsonwebtoken";

//Verificar Credenciales para Registro
export const checkRegisterFields = (req, res, next) => {
    const { nombre, apellido, email, telefono, password } = req.body;
    if (!nombre || !apellido || !email || !telefono || !password) {
        return res.status(400).json({ message: "Faltan datos para el registro" });
    }
    next();
};
//Verificar Credenciales para Loggin
export const checkLoginFields = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }
    next();
};

// Verificar Token
export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "No Autorizado" });
        }
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    });
};


//Consultas recibidas
export const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

