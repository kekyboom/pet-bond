import { useState } from "react";

const filterOptions = {
  region: ["Santiago", "Valparaíso", "Biobío"],
  genero: ["Macho", "Hembra"],
  edad: ["Cachorro", "Joven", "Adulto", "Mayor"],
  tamano: ["Pequeño", "Mediano", "Grande"],
  salud: [
    "Vacuna Antirrábica",
    "Vacuna Triple Felina",
    "Vacuna Leucemia",
    "Esterilizado",
  ],
};

function Filter() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <div className="container mx-auto px-15 pb-5">
      {/* Botón para mostrar filtros */}
      <button onClick={() => setShowFilters(!showFilters)} className="mb-4 text-sm text-pbdarkblue hover:underline uppercase cursor-pointer font-bold">
        {showFilters ? "Ocultar filtros ▲" : "Búsqueda avanzada ▼"}
      </button>

      {/* Contenedor de filtros */}
      {showFilters && (
        <div className="w-full flex flex-wrap items-start gap-4 relative z-10">
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key} className="relative">
              <div onClick={() => toggleDropdown(key)} className="flex items-center border rounded px-3 py-1 text-sm bg-white cursor-pointer hover:bg-gray-50 min-w-[140px]"> {key.charAt(0).toUpperCase() + key.slice(1)}
                <span className="ml-auto text-gray-500">▾</span>
              </div>

              {openDropdown === key && (
                <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-xl w-48 p-2 z-20"> {options.map((option) => (
                    <label key={option} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm">
                      <input type="checkbox" value={option.toLowerCase()} />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;
