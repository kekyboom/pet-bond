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
  const loadPets = async (especie) => {
    setLoading(true);
    setError(null);
    setSelectedEspecie(especie);
    try { 
      const data = await fetchPets(especie);

    // Normalizar la especie a minúsculas para evitar problemas
    const normalizedData = data.map(pet => ({
      ...pet,
      especie: pet.especie?.trim().toLowerCase() || ""
    }));

    setPets(normalizedData);
    setAllPets(normalizedData);
    } catch (err) {
      setError(err.message || "Error al cargar mascotas");
    } finally {
      setLoading(false);
    }
    
  };

  //Aplicar Filtros
  const applyFilters = (petsData, tags) => {
  if (tags.length === 0) {
    setPets(petsData);
    return;
  }

  const especies = ["Perro", "Gato"];
   const selectedEspecies = tags
    .map(t => t.toLowerCase())
    .filter(tag => especies.includes(tag));
  const otherTags = tags.filter(tag => !especies.includes(tag.toLowerCase()));

  const filtered = petsData.filter(pet => {
    const petEspecie = pet.especie?.toLowerCase();

    if (selectedEspecies.length > 0) {
      const matchEspecie = selectedEspecies.some(
        especie => especie.toLowerCase() === petEspecie
      );
      if (!matchEspecie) return false;
    }

    const matchOtherTags = otherTags.every(tag => {
      if (tag === "Santiago") return pet.region === "Santiago";
      if (tag === "Macho") return pet.genero?.toLowerCase() === "macho";
      if (tag === "Hembra") return pet.genero?.toLowerCase() === "hembra";
      if (tag === "Esterilizado") return pet.estado_salud?.esterilizado === true;
      return true;
    });

    return matchOtherTags;
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
    applyFilters(allPets, tags); 
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
