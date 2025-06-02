import { createContext, useContext, useState, useEffect } from "react";

const PetContext = createContext();

export function PetProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET - Obtener mascotas
  const fetchPets = async (especie = "") => {
    setLoading(true);
    try {
      const url = especie
        ? `http://localhost:3001/pets?especie=${especie}`
        : `http://localhost:3001/pets`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al cargar mascotas");
      const data = await res.json();
      setPets(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // POST - Agregar mascota
  const addPet = async (newPet) => {
    try {
      const res = await fetch("http://localhost:3001/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPet),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error al agregar mascota: ${res.status} ${text}`);
      }
      const data = await res.json();
      setPets((prev) => [...prev, data]);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // PUT - Actualizar mascota
  const updatePet = async (updatedPet) => {
    if (!updatedPet.id) throw new Error("ID de mascota inválido");

    try {
      const res = await fetch(`http://localhost:3001/pets/${updatedPet.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPet),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error al actualizar mascota: ${res.status} ${text}`);
      }

      const data = await res.json();
      setPets((prev) =>
        prev.map((pet) => (pet.id === data.id ? data : pet))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // DELETE - Eliminar mascota
  const deletePet = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/pets/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error al eliminar mascota: ${res.status} ${text}`);
      }
      setPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        setPets,
        selectedPet,
        setSelectedPet,
        loading,
        error,
        fetchPets,
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
