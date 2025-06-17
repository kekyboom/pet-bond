export const validatePetFields = (req, res, next) => {
  console.log("Middleware validatePetFields - req.body:", req.body);
  console.log("Middleware validatePetFields - req.file:", req.file);

  const {
    nombre,
    especie,
    edad_anios,
    edad_meses,
    genero,
    peso_kg,
    region,
    caracter,
    historia,
    userId, 
  } = req.body;

  
  const user_id = userId || req.userId;

  const isPost = req.method === "POST";

  if (
    !nombre ||
    !especie ||
    edad_anios == null ||
    edad_meses == null ||
    !genero ||
    peso_kg == null ||
    !region ||
    !caracter ||
    !historia ||
    !user_id ||
    (isPost && !req.file) 
  ) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

 
  let estadoSalud;
  try {
    estadoSalud = JSON.parse(req.body.estado_salud);
  } catch {
    return res.status(400).json({ message: "estado_salud inválido" });
  }

  const allBooleans = Object.values(estadoSalud).every(val => typeof val === "boolean");
  if (!allBooleans) {
    return res.status(400).json({ message: "estado_salud debe tener booleanos válidos" });
  }

  req.estadoSalud = estadoSalud;
  req.userId = user_id;

  next();
};
