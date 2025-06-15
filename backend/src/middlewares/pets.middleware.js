export const validatePetFields = (req, res, next) => {
  const {
    nombre,
    especie,
    edadAnios,
    edadMeses,
    genero,
    pesoKg,
    region,
    caracter,
    info,
    userId,
  } = req.body;

  if (
    !nombre ||
    !especie ||
    edadAnios == null ||
    edadMeses == null ||
    !genero ||
    pesoKg == null ||
    !region ||
    !caracter ||
    !info ||
    !userId ||
    !req.file 
  ) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const estadoSalud = {
  vacunaAntirrabica: req.body["estadoSalud[vacunaAntirrabica]"] === "true",
  vacunaTripleFelina: req.body["estadoSalud[vacunaTripleFelina]"] === "true",
  vacunaLeucemia: req.body["estadoSalud[vacunaLeucemia]"] === "true",
  esterilizado: req.body["estadoSalud[esterilizado]"] === "true",
};

const allBooleans = Object.values(estadoSalud).every(val => typeof val === "boolean");
if (!allBooleans) {
  return res.status(400).json({ message: "estadoSalud debe tener booleanos válidos" });
}

req.estadoSalud = estadoSalud;

  next();
};
