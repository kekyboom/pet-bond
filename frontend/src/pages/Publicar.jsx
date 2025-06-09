import { useState } from "react";

const regionesChile = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Región Metropolitana",
  "O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes",
];

function Publicar() {
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState("");
  const [region, setRegion] = useState("");
  const [genero, setgenero] = useState("");
  const [especie, setespecie] = useState("");
  const [edadAnios, setEdadAnios] = useState("");
  const [edadMeses, setEdadMeses] = useState("");
  const [peso, setPeso] = useState("");
  const [caracter, setCaracter] = useState("");
  const [estadoSalud, setEstadoSalud] = useState({
    vacunaAntirrabica: false,
    vacunaTripleFelina: false,
    vacunaLeucemia: false,
    esterilizado: false,
  });
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const userId = 1;

  // Para la Imagen
  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito(false);

    if (
      !imagen ||
      !nombre.trim() ||
      !region ||
      !genero ||
      !especie ||
      edadAnios === "" ||
      edadMeses === "" ||
      !peso.trim() ||
      !caracter.trim() ||
      Object.values(estadoSalud).some(val => val === null || val === undefined) ||
      !info.trim()
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      // Función para imagen
      const imagenUrl = "https://via.placeholder.com/150";

      const payload = {
        imagenUrl,
        nombre,
        region,
        genero: genero.toLowerCase() === "femenino" ? "hembra" : "macho",
        especie: especie,
        edadAnios: Number(edadAnios),
        edadMeses: Number(edadMeses),
        pesoKg: Number(peso),
        caracter,
        estado_salud,
        info,
        userId,
      };

      const res = await fetch("http://localhost:3001/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al publicar la mascota");

      setExito(true);
      setImagen(null);
      setNombre("");
      setRegion("");
      setgenero("");
      setespecie("");
      setEdadAnios("");
      setEdadMeses("");
      setPeso("");
      setCaracter("");
      setSalud("");
      setInfo("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="bg-pbwhite h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-10 border border-gray-300 overflow-auto max-h-[90vh]">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Publicar Mascota
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Imagen */}
          <div className="col-span-full">
            <label htmlFor="file-upload" className="block text-sm/6 font-medium text-gray-900">
              Foto de la Mascota
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd"/>
                </svg>
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                    <span>Descargar Imágen</span>
                    <input id="file-upload" name="file-upload" onChange={handleImageChange} type="file" className="sr-only"/>
                  </label>
                  <p className="pl-1">o arrastrar</p>
                </div>
                <p className="text-xs/5 text-gray-600">PNG, JPG</p>
              </div>
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Nombre
            </label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" placeholder="Nombre de la mascota"/>
          </div>

          {/* Región */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Región
            </label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black">
              <option value="">Seleccione región</option>
              {regionesChile.map((reg, i) => (
                <option key={i} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* genero */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              genero
            </label>
            <select value={genero} onChange={(e) => setgenero(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black">
              <option value="">Seleccione genero</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
          </div>

          {/* Especie */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Especie
            </label>
            <select
              value={especie} onChange={(e) => setespecie(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black">
              <option value="">Seleccione Especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>

          {/* Edad años y meses */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">
                Edad (años)
              </label>
              <input type="number" min="0" value={edadAnios} onChange={(e) => setEdadAnios(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" placeholder="0"/>
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">
                Edad (meses)
              </label>
              <input type="number" min="0" max="12" value={edadMeses} onChange={(e) => setEdadMeses(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" placeholder="0" />
            </div>
          </div>

          {/* Peso */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Peso (Kg)
            </label>
            <input type="number" min="0" step="0.1" value={peso} onChange={(e) => setPeso(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" placeholder="Ej: 12.5"/>
          </div>

          {/* Caracter */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Carácter de la mascota
            </label>
            <textarea value={caracter} onChange={(e) => setCaracter(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" rows={3} placeholder="Describe el carácter de la mascota"/>
          </div>

          {/* Estado de salud */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-sm font-medium mb-2 text-gray-900">
              Estado de salud
            </legend>

            {[
              { id: "vac1", label: "Vacuna antirrábica", key: "vacunaAntirrabica" },
              { id: "vac2", label: "Vacuna triple felina", key: "vacunaTripleFelina" },
              { id: "vac3", label: "Vacuna leucemia", key: "vacunaLeucemia" },
              { id: "est",  label: "Esterilizado/a",     key: "esterilizado" },
            ].map(({ id, label, key }) => (
              <label key={id} className="flex items-center gap-2 text-gray-700 text-sm">
                <input id={id} type="checkbox" checked={estadoSalud[key]} onChange={(e) => setEstadoSalud({ ...estadoSalud, [key]: e.target.checked }) } className="size-4 accent-pbfucsia" />
                {label}
              </label>
            ))}
          </fieldset>

          {/* Información adicional */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Información adicional
            </label>
            <textarea value={info} onChange={(e) => setInfo(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" rows={3} placeholder="Otra información relevante"/>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {exito && (
            <p className="text-green-600 text-sm">
              Mascota publicada con éxito!
            </p>
          )}

          <button type="submit" className="w-full bg-pborange hover:bg-orange-300 text-white font-semibold py-2.5 rounded-lg">
            Publicar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Publicar;