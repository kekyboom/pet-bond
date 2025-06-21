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

  const filtered = allPets.filter(pet => {
    const petEspecie = pet.especie?.toLowerCase();
    const petGenero = pet.genero?.toLowerCase();
    const petRegion = pet.region?.toLowerCase();
    const petEsterilizado = pet.estado_salud?.esterilizado;

    return tagsLower.every(tag => {
      if (tag === "perro" || tag === "gato") return petEspecie === tag;
      if (tag === "macho" || tag === "hembra") return petGenero === tag;
      if (tag === "santiago") return petRegion === "santiago";
      if (tag === "esterilizado") return petEsterilizado === true;
      return true; 
    });
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
