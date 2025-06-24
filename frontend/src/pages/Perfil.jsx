import { useState, useMemo, useCallback, useEffect } from "react";
import { usePetContext } from "../context/PetContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import PetGrid from "../components/PetGrid";
import PetCard from "../components/PetCard";
import EditPet from "../components/EditPet";
import profileImg from "../assets/img/profile-default.png"

function Perfil() {
  const { user, token } = useAuth();
  const { pets, loading, error, setPets} = usePetContext();
  const [editingPet, setEditingPet] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [vistasRecientes, setVistasRecientes] = useState([]);
  
   useEffect(() => {
    if (user && token) {
      axios.get(`${baseUrl}/vistas/${user.id}`)
        .then((res) => setVistasRecientes(res.data))
        .catch((err) => console.error("Error al cargar vistas recientes:", err));
    }
  }, [user, token]);
   
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

  const handleSaveEdit = async (formData) => {
  try {
    const response = await axios.put(
      `${baseUrl}/pets/${editingPet.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    
  setPets((prev) =>
        prev.map((pet) => (pet.id === editingPet.id ? response.data : pet))
      );
      setEditingPet(null);
    } catch (error) {
      console.error("Error al actualizar la mascota:", error.response?.data || error.message);
      alert("Error al guardar los cambios");
    }
  };

  if (loading) return <p className="text-center mt-4">Cargando mascotas...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  
  return (
    <>
  
      <div className="flex items-center px-15 pt-10 afacad-flux-reg">
        <img className="w-20 h-20 rounded-full" src={profileImg} alt="Usuario" />
        <div className="p-5 font-medium text-black">

          <div className="font-bold uppercase">{user?.nombre } {user?.apellido }</div>
          <div>{user?.email} </div>
          <div>{user?.telefono}</div>
        </div>
      </div>
      
      <p className="px-16 py-10 text-lg uppercase afacad-flux-reg">Publicaciones</p>
      {userPets.length === 0 ? (
        <p className="px-16">No has publicado ninguna mascota todavía.</p>
        ) : (
        <PetGrid>
          {userPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} editable={true} showViewMore={false} onEdit={handleEdit} onDelete={async (pet) => {
              if (window.confirm("¿Seguro que deseas eliminar esta mascota?")) {
                try {
                  await axios.delete(`${baseUrl}/pets/${pet.id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  setPets((prev) => prev.filter((p) => p.id !== pet.id));
                  
                  setVistasRecientes((prev) => prev.filter((v) => v.id !== pet.id))
                } catch (error) {
                  alert("Error al eliminar la mascota");
                  console.error(error);
                }
              }
          }}/>
          ))}
        </PetGrid>
      )}

      <p className="px-16 py-10 text-lg uppercase afacad-flux-reg">Vistas Recientemente</p>
      {vistasRecientes.length === 0 ? (
        <p className="px-16 pb-20 afacad-flux-reg">No has visto ninguna mascota recientemente.</p>
      ) : (
        <PetGrid>
          {vistasRecientes.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </PetGrid>
      )}  

      {/* Modal de edición */}
      {editingPet && (
        <EditPet pet={editingPet} user={user} onClose={handleCloseEdit} onSave={handleSaveEdit}/>
      )}
    </>
  )}

export default Perfil;