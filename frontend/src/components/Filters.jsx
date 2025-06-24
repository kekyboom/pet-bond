import { useState } from "react";
import { usePetContext } from "../context/PetContext";


const filterOptions = {
  region: [ 
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
  "Magallanes",],
  
  especie: ["perro", "gato"],
  genero: ["Macho", "Hembra"],
  salud: [
    "Vacuna Antirrábica",
    "Vacuna Triple Felina",
    "Vacuna Leucemia",
    "Esterilizado",
  ],
};

//Edades
const ageRanges = [
  { label: "0 a 5 años", min: 0, max: 5 },
  { label: "6 a 10 años", min: 6, max: 10 },
  { label: "11 a 15 años", min: 11, max: 15 },
  { label: "16 a 20 años", min: 16, max: 20 },
];

//Peso
const weightRanges = [
  { label: "0 a 10 kg", min: 0, max: 10 },
  { label: "11 a 20 kg", min: 11, max: 20 },
  { label: "21 a 30 kg", min: 21, max: 30 },
  { label: "31 a 50 kg", min: 31, max: 50 },
];

function Filter() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    especie:[],
    region: [],
    genero: [],
    salud: [],
  });

  const [selectedAgeRange, setSelectedAgeRange] = useState(null);
  const [selectedWeightRange, setSelectedWeightRange] = useState(null);

  const { filterPetsByTags } = usePetContext();


  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleCheckboxChange = (key, option, checked) => {
    const value = option.toLowerCase();
    setSelectedFilters((prev) => {
      const prevValues = prev[key] || [];
      const newValues = checked
        ? [...prevValues, value]
        : prevValues.filter((v) => v !== value);
      return {
        ...prev,
        [key]: newValues,
      };
    });
  };

  const applyAdvancedFilters = () => {
    const tags = Object.values(selectedFilters).flat();

    if (selectedAgeRange) {
      tags.push(`edad_min:${selectedAgeRange.min}`);
      tags.push(`edad_max:${selectedAgeRange.max}`);
    }
    if (selectedWeightRange) {
      tags.push(`peso_min:${selectedWeightRange.min}`);
      tags.push(`peso_max:${selectedWeightRange.max}`);
    }

    filterPetsByTags(tags);
  };
  
  return (
    <div className="container mx-auto px-15 pb-5 afacad-flux-reg">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-4 text-sm text-pbdarkblue hover:underline uppercase cursor-pointer font-bold"
      >
        {showFilters ? "Ocultar filtros ▲" : "Búsqueda avanzada ▼"}
      </button>

      {showFilters && (
        <>
          <div className="w-full flex flex-wrap items-start gap-4 relative z-10 ">
            {Object.entries(filterOptions).map(([key, options]) => (
              <div key={key} className="relative">
                <div onClick={() => toggleDropdown(key)} className="flex items-center border rounded px-3 py-1 text-sm bg-white cursor-pointer hover:bg-gray-50 min-w-[160px]">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <span className="ml-auto text-gray-500">▾</span>
                </div>

                {openDropdown === key && (
                  <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-xl w-52 p-2 z-20">
                    {options.map((option) => {
                      const value = option.toLowerCase();
                      const isChecked = selectedFilters[key]?.includes(value);
                      return (
                        <label key={option} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm">
                          <input type="checkbox" checked={isChecked} onChange={(e) =>
                              handleCheckboxChange(key, option, e.target.checked)
                            }/>
                          {option}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Select edad */}
          <div className="mt-6 max-w-xs">
            <label className="block mb-1 font-semibold text-sm">Edad (años)</label>
            <select className="w-full border rounded px-3 py-1 text-sm"
              value={selectedAgeRange ? selectedAgeRange.label : ""}
              onChange={(e) => {
                const selected = ageRanges.find(
                  (range) => range.label === e.target.value
                );
                setSelectedAgeRange(selected || null);
              }}>

              <option value="">Todos</option>
              {ageRanges.map(({ label }) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Select peso */}
          <div className="mt-6 max-w-xs">
            <label className="block mb-1 font-semibold text-sm">Peso (kg)</label>
            <select eleclassName="w-full border rounded px-3 py-1 text-sm"
              value={selectedWeightRange ? selectedWeightRange.label : ""}
              onChange={(e) => {
                const selected = weightRanges.find(
                  (range) => range.label === e.target.value
                );
                setSelectedWeightRange(selected || null);
              }}>

              <option value="">Todos</option>
              {weightRanges.map(({ label }) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Botón aplicar filtros */}
          <div className="mt-6">
            <button onClick={applyAdvancedFilters} className="px-4 py-2 bg-pbblue text-white rounded hover:bg-pbdarkblue">
              Aplicar filtros
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Filter;