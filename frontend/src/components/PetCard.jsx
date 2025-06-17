import { usePetContext } from "../context/PetContext";
import { useNavigate } from "react-router-dom";
import femaleIcon from "../assets/img/hembra.png";
import maleIcon from "../assets/img/macho.png";


function PetCard({ pet, editable = false, onEdit, onDelete, showViewMore = true }) {
  const { setSelectedPet} = usePetContext();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

   const handleViewMore = () => {
    setSelectedPet(pet);
    navigate("/detalle");
  };

  return (
    <div className="w-full max-w bg-white shadow-md rounded-xl duration-500 hover:scale-102 hover:shadow-xl relative">
      <div className="relative w-full">
        <img src={pet.imagen.startsWith("http") ? pet.imagen : `${baseUrl}${pet.imagen}`} alt={`Foto de ${pet.nombre}`} className="h-80 w-full object-cover rounded-t-xl"/>
        <div className="absolute top-0 left-0 rounded-br-xl">
          <div className="bg-pbfucsia opacity-75 w-full h-full absolute rounded-br-md rounded-tl-xl" />
          <p className="relative uppercase text-white font-bold text-sm p-3">
            {pet.nombre}
          </p>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 uppercase text-xs">
            {pet.edad_anios} años + {pet.edad_meses} meses
          </span>
          {pet.genero === "hembra" ? (
            <img src={femaleIcon} alt="Hembra" className="w-5 h-5" />
          ) : (
            <img src={maleIcon} alt="Macho" className="w-5 h-5" />
          )}
        </div>

        <span className="text-gray-700 block mt-1 capitalize">
          Ubicación: {pet.region}
        </span>
        <span className="text-gray-700 block mt-1 capitalize pb-3">
          Carácter: {pet.caracter}
        </span>

        {showViewMore && (
          <button onClick={handleViewMore} className="bg-pborange hover:bg-pbblue text-white font-semibold py-2 px-6 rounded-full shadow-lg transition block w-fit mx-auto text-center cursor-pointer">
            Ver Más
          </button>
        )}

        {editable && (
          <div className="flex justify-center gap-3 mt-4">
            <button onClick={() => onEdit(pet)} className="bg-pborange hover:bg-pbblue text-white px-4 py-1 rounded cursor-pointer">
              Editar
            </button>
            <button onClick={() => onDelete(pet)} className="bg-pbblue hover:bg-pborange text-white px-4 py-1 rounded cursor-pointer" >
              ¡Fue Adoptado!
            </button>
          </div>
        )}
      </div>
    </div>
    
  );
}

export default PetCard;
