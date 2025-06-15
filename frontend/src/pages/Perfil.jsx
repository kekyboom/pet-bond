import { useState, useMemo, useCallback } from "react";
import { usePetContext } from "../context/PetContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import PetGrid from "../components/PetGrid";
import PetCard from "../components/PetCard";
import EditPet from "../components/EditPet";

function Perfil() {
  const { user } = useAuth();
  const { pets, loading, error, setPets, updatePet} = usePetContext();
  const [editingPet, setEditingPet] = useState(null);
   
  const userPets = useMemo(() => {
    if (!user || !pets) return[];
    return pets.filter((pet) => String(pet.user_id) === String(user.id));
  }, [pets, user]);
  
  
  const handleEdit = useCallback((pet) => {
    setEditingPet(pet);
  }, []);

  const handleCloseEdit = () => {
    setEditingPet(null);
  };

  const handleSaveEdit = async (updatedData) => {
    await updatePet({ ...editingPet, ...updatedData });
    setEditingPet(null);
  };


  if (loading) return <p className="text-center mt-4">Cargando mascotas...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <>
  
      <div className="flex items-center px-15 pt-10">
        <img className="w-20 h-20 rounded-full" src="https://cdn.pixabay.com/photo/2022/08/28/10/20/profile-picture-7416279_1280.png" alt="Usuario" />
        <div className="p-5 font-medium text-black">

          <div className="font-bold uppercase">{user?.nombre } {user?.apellido }</div>
          <div>{user?.email} </div>
          <div>{user?.telefono}</div>
        </div>
      </div>
      
      <p className="px-16 py-10 text-lg uppercase">Publicaciones</p>
      {userPets.length === 0 ? (
        <p className="px-16">No has publicado ninguna mascota todavía.</p>
        ) : (
        <PetGrid>
          {userPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} editable={true} showViewMore={false} onEdit={handleEdit} onDelete={async (pet) => {
              if (window.confirm("¿Seguro que deseas eliminar esta mascota?")) {
                try {
                  await axios.delete(`http://localhost:3001/pets/${pet.id}`);
                  setPets((prev) => prev.filter((p) => p.id !== pet.id));
                } catch (error) {
                  alert("Error al eliminar la mascota");
                  console.error(error);
                }
              }
          }}/>
          ))}
        </PetGrid>
      )}

      <p className="px-16 py-10 text-lg uppercase">Vistas Recientemente</p>
      <PetGrid>
        {pets.slice(0, 4).map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </PetGrid>

      {/* Modal de edición */}
      {editingPet && (
        <EditPet pet={editingPet} onClose={handleCloseEdit} onSave={handleSaveEdit}/>
      )}
    </>
  )}

export default Perfil;