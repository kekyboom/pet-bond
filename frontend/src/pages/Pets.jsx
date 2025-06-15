import { usePetContext } from "../context/PetContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PetCard from "../components/PetCard";
import PetGrid from "../components/PetGrid";
import QuickFilter from "../components/QuickSearch";
import Filter from "../components/Filters";

function Pets() {
  const location = useLocation();
  const especie = new URLSearchParams(location.search).get("especie");
  const { pets, loading, error, loadPets } = usePetContext();

  useEffect(() => {
    loadPets(especie);
  }, [especie]);

  if (loading) return <p className="text-center mt-4">Cargando mascotas...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <>
      <div>
        <QuickFilter />
      </div>
      <div className="flex">
        <div>
          <Filter />
        </div>
      </div>
      <PetGrid>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} editable={false} />
        ))}
      </PetGrid>
    </>
  );
}

export default Pets;
