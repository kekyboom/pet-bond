import { createContext, useContext, useState, useEffect } from "react";
import {fetchPets, createPet, updatePetById, deletePetById } from "../api/pets";

const PetContext = createContext();

export function PetProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Cargar todas las mascotas
  const loadPets = async (especie) => {
    setLoading(true);
    setError(null);
    try { 
      const data = await fetchPets(especie);
      setPets(data);
    } catch (err) {
      setError(err.message || "Error al cargar mascotas");
    } finally {
      setLoading(false);
    }
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
        setPets,
        selectedPet,
        setSelectedPet,
        loading,
        error,
        loadPets,
        addPet,
        updatePet,
        deletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export function usePetContext() {
  return useContext(PetContext);
}
