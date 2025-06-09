import { useState } from "react";

function EditPet({ pet, onClose, onSave }) {

  const [formData, setFormData] = useState({
    nombre: pet.nombre || "",
    especie: pet.especie || "",
    edadAnios: pet.edadAnios || 0,
    edadMeses: pet.edadMeses || 0,
    genero: pet.genero || "",
    pesoKg: pet.pesoKg || 0,
    region: pet.region || "",
    imagen: pet.imagen || "",
    caracter: pet.caracter || "",
    estadoSalud: {
      vacunaAntirrabica: pet.estadoSalud?.vacunaAntirrabica || false,
      vacunaTripleFelina: pet.estadoSalud?.vacunaTripleFelina || false,
      vacunaLeucemia: pet.estadoSalud?.vacunaLeucemia || false,
      esterilizado: pet.estadoSalud?.esterilizado || false,
    },
    historia: pet.historia || "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: type === "number" ? Number(value) : value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Editar Mascota</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Texto y números */}
          <label className="block mb-1 text-sm text-gray-700 ">Nombre</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="w-full p-2 border rounded " />
          <label className="block mb-1 text-sm text-gray-700">Tipo</label>
          <input type="text" name="especie" value={formData.especie} onChange={handleChange} placeholder="Especie" className="w-full p-2 border rounded rounded border-pbdarkblue" />
          <label className="block mb-1 text-sm text-gray-700">Años</label>
          <input type="number" name="edadAnios" value={formData.edadAnios} onChange={handleChange} placeholder="Años" className="w-full p-2 border rounded rounded border-pbdarkblue" />
          <label className="block mb-1 text-sm text-gray-700">Meses</label>
          <input type="number" name="edadMeses" value={formData.edadMeses} onChange={handleChange} placeholder="Meses" className="w-full p-2 border rounded rounded border-pbdarkblue" />
          
          <label className="block mb-1 text-sm text-gray-700">Género</label>
          <select name="genero" value={formData.genero} onChange={handleChange} className="w-full p-2 border rounded rounded border-pbdarkblue">
            <option value="">Selecciona género</option>
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </select>

          <label className="block mb-1 text-sm text-gray-700">Peso Kg</label>
          <input type="number" name="pesoKg" value={formData.pesoKg} onChange={handleChange} placeholder="Peso (kg)" className="w-full p-2 border rounded rounded border-pbdarkblue" />

          <label className="block mb-1 text-sm text-gray-700">Ubicación</label>
          <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Región" className="w-full p-2 border rounded rounded border-pbdarkblue" />

          <label className="block mb-1 text-sm text-gray-700">Imagen</label> {/*Cambiara de manera distinta */}
          
          <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} placeholder="URL de la imagen" className="w-full p-2 border rounded rounded border-pbdarkblue" />
          
          <label className="block mb-1 text-sm text-gray-700">Caracter</label>
          <input type="text" name="caracter" value={formData.caracter} onChange={handleChange} placeholder="Carácter" className="w-full p-2 border rounded border-pbdarkblue" />
          
          <label className="block mb-1 text-sm text-gray-700">Su Historia</label>
          <textarea name="historia" value={formData.historia} onChange={handleChange} placeholder="Historia" className="w-full p-2 border rounded border-pbdarkblue" rows={3} />

          {/* Checkboxes para estadoSalud */}
          <fieldset className="border p-2 rounded border border-pbdarkblue">
            <legend className="font-semibold mb-2">Estado de Salud</legend>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="vacunaAntirrabica" checked={formData.estadoSalud.vacunaAntirrabica} onChange={handleEstadoSaludChange}/>
              Vacuna Antirrábica
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="vacunaTripleFelina" checked={formData.estadoSalud.vacunaTripleFelina} onChange={handleEstadoSaludChange}/>
              Vacuna Triple Felina
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="vacunaLeucemia" checked={formData.estadoSalud.vacunaLeucemia} onChange={handleEstadoSaludChange} />
              Vacuna Leucemia
            </label>
            <label className="flex items-center gap-2">
              <input  type="checkbox" name="esterilizado" checked={formData.estadoSalud.esterilizado} onChange={handleEstadoSaludChange} />
              Esterilizado
            </label>
          </fieldset>

          <div className="flex justify-center pt-4 gap-4">
            <button type="submit" className="bg-pbblue text-white px-4 rounded">
              Guardar
            </button>
            <button type="button" onClick={onClose} className="bg-pborange text-white px-4 py-2 rounded">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPet;