import { createContext, useContext, useState, useEffect } from "react";
import {fetchPets, createPet, updatePetById, deletePetById } from "../api/pets";

const PetContext = createContext();

export function PetProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allPets, setAllPets] = useState([]); 

  const [selectedEspecie, setSelectedEspecie] = useState(null);
  const [activeTags, setActiveTags] = useState([]);



  //Cargar todas las mascotas
  const loadPets = async (especie = null) => {
  setLoading(true);
  setError(null);
  try {
    const data = await fetchPets();
    const normalizedData = data.map(pet => ({
      ...pet,
      especie: pet.especie?.trim().toLowerCase() || ""
    }));

    setAllPets(normalizedData);

    if (especie) {
      const especieLower = especie.toLowerCase();
      const filtered = normalizedData.filter(p => p.especie === especieLower);
      setPets(filtered);
      setSelectedEspecie(especieLower);
    } else {
      setPets(normalizedData);
      setSelectedEspecie(null);
    }
  } catch (err) {
    setError(err.message || "Error al cargar mascotas");
  } finally {
    setLoading(false);
  }
};

  //Aplicar Filtros
const applyFilters = (tags) => {
  if (tags.length === 0) {
    setPets(allPets);
    return;
  }

  const tagsLower = tags.map(tag => tag.toLowerCase());

  // Extraer rangos de edad y peso de tags
  let edadMin = null;
  let edadMax = null;
  let pesoMin = null;
  let pesoMax = null;

  // Arrays para filtros con múltiples opciones 
  const selectedRegiones = [];
  const selectedEspecies = [];
  const selectedGeneros = [];
  const selectedSalud = [];

  tagsLower.forEach(tag => {
    if (tag.startsWith("edad_min:")) edadMin = Number(tag.split(":")[1]);
    else if (tag.startsWith("edad_max:")) edadMax = Number(tag.split(":")[1]);
    else if (tag.startsWith("peso_min:")) pesoMin = Number(tag.split(":")[1]);
    else if (tag.startsWith("peso_max:")) pesoMax = Number(tag.split(":")[1]);
    else if (["arica y parinacota","tarapacá","antofagasta","atacama","coquimbo","valparaíso","región metropolitana","o'higgins","maule","ñuble","biobío","la araucanía","los ríos","los lagos","aysén","magallanes"].includes(tag)) {
      selectedRegiones.push(tag);
    }
    else if (["perro", "gato"].includes(tag)) {
      selectedEspecies.push(tag);
    }
    else if (["macho", "hembra"].includes(tag)) {
      selectedGeneros.push(tag);
    }
    else if (["vacuna antirrábica","vacuna triple felina","vacuna leucemia","esterilizado"].includes(tag)) {
      selectedSalud.push(tag);
    }
  });

  const filtered = allPets.filter(pet => {
    const petEspecie = pet.especie?.toLowerCase();
    const petGenero = pet.genero?.toLowerCase();
    const petRegion = pet.region?.toLowerCase();
    const estadoSalud = pet.estado_salud || {};


    const petEdad = Number(pet.edad_anios) || 0;
    const petPeso = Number(pet.peso_kg) || 0;

    // Region
    if (selectedRegiones.length > 0 && !selectedRegiones.includes(petRegion)) return false;

    // Especie
    if (selectedEspecies.length > 0 && !selectedEspecies.includes(petEspecie)) return false;

    // Género
    if (selectedGeneros.length > 0 && !selectedGeneros.includes(petGenero)) return false;

    // Salud 
    if (selectedSalud.length > 0) {
      const matchesSome = selectedSalud.some(saludTag => {
        if (saludTag === "esterilizado") return estadoSalud.esterilizado === true;
        if (saludTag === "vacuna antirrábica") return pet.estado_salud?.vacunaAntirrabica === true;
        if (saludTag === "vacuna triple felina") return pet.estado_salud?.vacunaTripleFelina === true;
        if (saludTag === "vacuna leucemia") return pet.estado_salud?.vacunaLeucemia === true;
        return false;
      });
      if (!matchesSome) return false;
    }

    // Rango edad
    if (edadMin !== null && petEdad < edadMin) return false;
    if (edadMax !== null && petEdad > edadMax) return false;

    // Rango peso
    if (pesoMin !== null && petPeso < pesoMin) return false;
    if (pesoMax !== null && petPeso > pesoMax) return false;

    return true;
  });

  setPets(filtered);
};
  ////Agregar nueva mascota
  const addPet = async (newPet) => {
    try {
      const data = await createPet(newPet);
      setPets((prev) => [...prev, data]);
    } catch (err) {
      setError(err.message || "Error al agregar mascota");
      throw err;
    }
  };

  //Modificar mascota
  const updatePet = async (updatedPet) => {
    try {
      const data = await updatePetById(updatedPet);
      setPets((prev) => prev.map((pet) => (pet.id === data.id ? data : pet)));
    } catch (err) {
      setError(err.message || "Error al actualizar mascota");
      throw err;
    }
  };

  //FIltrar Mascotas con los filtros
  const filterPetsByTags = (tags) => {
    setActiveTags(tags); 
    applyFilters( tags); 
  };

  
  //Eliminar Mascota
  const deletePet = async (id) => {
    try {
      await deletePetById(id);
      setPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      setError(err.message || "Error al eliminar mascota");
      throw err;
    }
  };

  useEffect(() => {
  loadPets();
  }, []);

  return (
    <PetContext.Provider
      value={{
        pets,
        allPets,
        setPets,
        selectedPet,
        setSelectedPet,
        loading,
        error,
        loadPets,
        addPet,
        updatePet,
        filterPetsByTags,
        selectedEspecie,
        deletePet,
        activeTags,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export function usePetContext() {
  return useContext(PetContext);
}
