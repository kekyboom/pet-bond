
export const validatePetFields = (req, res, next) => {
  const {
    nombre,
    especie,
    edadAnios,
    edadMeses,
    genero,
    pesoKg,
    region,
    imagen,
    caracter,
    estadoSalud,
    historia,
    user_id,
  } = req.body;

  if (
    !nombre ||
    !especie ||
    edadAnios == null ||
    edadMeses == null ||
    !genero ||
    pesoKg == null ||
    !region ||
    !imagen ||
    !caracter ||
    !historia ||
    !estadoSalud ||
    user_id == null
  ) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  if (
    typeof estadoSalud.vacunaAntirrabica !== "boolean" ||
    typeof estadoSalud.vacunaTripleFelina !== "boolean" ||
    typeof estadoSalud.vacunaLeucemia !== "boolean" ||
    typeof estadoSalud.esterilizado !== "boolean"
  ) {
    return res.status(400).json({ message: "estadoSalud debe tener booleanos válidos" });
  }

  next();
};
