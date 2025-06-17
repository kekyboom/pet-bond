import { useState } from "react";

function EditPet({ pet, user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nombre: pet.nombre || "",
    especie: pet.especie || "",
    edadAnios: pet.edad_anios || 0,
    edadMeses: pet.edad_meses || 0,
    genero: pet.genero || "",
    pesoKg: pet.peso_kg || 0,
    region: pet.region || "",
    imagen: null, 
    caracter: pet.caracter || "",
    estadoSalud: {
      vacunaAntirrabica: pet.estadoSalud?.vacunaAntirrabica || false,
      vacunaTripleFelina: pet.estadoSalud?.vacunaTripleFelina || false,
      vacunaLeucemia: pet.estadoSalud?.vacunaLeucemia || false,
      esterilizado: pet.estadoSalud?.esterilizado || false,
    },
    historia: pet.historia || "",
  });

  const [imagenPreview, setImagenPreview] = useState(pet.imagen || "");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleEstadoSaludChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      estadoSalud: {
        ...prev.estadoSalud,
        [name]: checked,
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, imagen: file }));

    // Mostrar preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();

    data.append("nombre", formData.nombre);
    data.append("especie", formData.especie);
    data.append("edad_anios", formData.edadAnios);
    data.append("edad_meses", formData.edadMeses);
    data.append("genero", formData.genero);
    data.append("peso_kg", formData.pesoKg);
    data.append("region", formData.region);
    data.append("caracter", formData.caracter);
    data.append("historia", formData.historia);
    data.append("user_id", user.id);


    // Estado de salud 
    data.append("estado_salud", JSON.stringify(formData.estadoSalud));

    // Imagen 
    if (formData.imagen) {
      data.append("imagen", formData.imagen);
    }

    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Editar Mascota</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">Nombre</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border rounded" />

          <label className="block text-sm">Especie</label>
          <input type="text" name="especie" value={formData.especie} onChange={handleChange} className="w-full p-2 border rounded" />

          <label className="block text-sm">Edad (años)</label>
          <input type="number" name="edadAnios" value={formData.edadAnios} onChange={handleChange} className="w-full p-2 border rounded" />

          <label className="block text-sm">Edad (meses)</label>
          <input type="number" name="edadMeses" value={formData.edadMeses} onChange={handleChange} className="w-full p-2 border rounded" />

          <label className="block text-sm">Género</label>
          <select name="genero" value={formData.genero} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Selecciona género</option>
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </select>

          <label className="block text-sm">Peso (kg)</label>
          <input type="number" name="pesoKg" value={formData.pesoKg} onChange={handleChange} className="w-full p-2 border rounded" />

          <label className="block text-sm">Región</label>
          <input type="text" name="region" value={formData.region} onChange={handleChange} className="w-full p-2 border rounded" />

          <label className="block text-sm">Imagen</label>
          {imagenPreview && (
            <img src={imagenPreview} alt="preview" className="w-full h-40 object-cover mb-2 rounded" />
          )}
          <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />

          <label className="block text-sm">Carácter</label>
          <input type="text" name="caracter" value={formData.caracter} onChange={handleChange} className="w-full p-2 border rounded" />

          <label className="block text-sm">Historia</label>
          <textarea name="historia" value={formData.historia} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />

          <fieldset className="border p-2 rounded">
            <legend className="font-semibold mb-2">Estado de Salud</legend>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="vacunaAntirrabica" checked={formData.estadoSalud.vacunaAntirrabica} onChange={handleEstadoSaludChange} />
              Vacuna Antirrábica
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="vacunaTripleFelina" checked={formData.estadoSalud.vacunaTripleFelina} onChange={handleEstadoSaludChange} />
              Vacuna Triple Felina
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="vacunaLeucemia" checked={formData.estadoSalud.vacunaLeucemia} onChange={handleEstadoSaludChange} />
              Vacuna Leucemia
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="esterilizado" checked={formData.estadoSalud.esterilizado} onChange={handleEstadoSaludChange} />
              Esterilizado
            </label>
          </fieldset>

          <div className="flex justify-center pt-4 gap-4">
            <button type="submit" className="bg-pbblue text-white px-4 rounded">Guardar</button>
            <button type="button" onClick={onClose} className="bg-pborange text-white px-4 rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPet;
