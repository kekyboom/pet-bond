import { usePetContext } from '../context/PetContext';
import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModalContacto from '../components/ModalContacto';
import axios from 'axios';


function Detalle() {
  const { selectedPet } = usePetContext();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [publicador, setPublicador] = useState(null);


  useEffect(() => {
    
    if (!selectedPet) {
      
      navigate('/');
    } else {
      axios .get(`${baseUrl}/usuarios/${selectedPet.user_id}`)
      .then((res) => {
        setPublicador(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener el usuario publicador:", err);
      });
    }
  }, [selectedPet, navigate]);

  if (!selectedPet) return null;
console.log("selectedPet:", selectedPet);
  return (
    <div className="max-w-6xl mx-auto p-16">
      <div className="mb-6">
         <img src={selectedPet.imagen.startsWith("http") ? selectedPet.imagen : `${baseUrl}${selectedPet.imagen}`} alt={`Foto de ${selectedPet.nombre}`} className="w-full max-h-[800px] object-cover rounded-2xl"/>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Columna izquierda */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold uppercase">{selectedPet.nombre}</h2>

          <div className="grid grid-cols-3 gap-4 text-sm font-semibold border-b pb-2 uppercase text-gray-500">
            <div>Edad</div>
            <div>Sexo</div>
            <div>Peso</div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-base text-gray-800 border-b pb-4 capitalize">
            <div>{selectedPet.edad_anios} año y {selectedPet.edad_meses} meses</div>
            <div>{selectedPet.genero}</div>
            <div>{selectedPet.peso_kg} kg</div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Carácter</h3>
            <p className="text-gray-800 border-b pb-4">{selectedPet.caracter}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Estado de salud</h3>
            {selectedPet.estado_salud ? (
              <ul className="text-gray-800 border-b pb-4 list-disc list-inside space-y-1">
                <li>Vacuna Antirrábica: {selectedPet.estado_salud.vacunaAntirrabica ? 'Sí' : 'No'}</li>
                <li>Vacuna Triple Felina: {selectedPet.estado_salud.vacunaTripleFelina ? 'Sí' : 'No'}</li>
                <li>Vacuna Leucemia: {selectedPet.estado_salud.vacunaLeucemia ? 'Sí' : 'No'}</li>
                <li>Esterilizado: {selectedPet.estado_salud.esterilizado ? 'Sí' : 'No'}</li>
              </ul>
            ) : (
              <p className="text-gray-800 border-b pb-4">Sin información</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Historia de {selectedPet.nombre}</h3>
            <p className="text-gray-800">{selectedPet.historia || "Sin historia disponible"}</p>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="col-span-1 flex text-center">
          <div className="p-6 shadow-lg rounded-xl bg-white space-y-4 h-fit">
            <p className="font-semibold text-gray-800 text-lg">
              ¿Deseas adoptar a <span className="text-orange-600">{selectedPet.nombre}</span>?
            </p>
            <p className="text-sm text-gray-500 uppercase">
              ¡Contacta a <strong>{publicador?.nombre}</strong>!
            </p>
            <button className="bg-pborange hover:bg-orange-300 text-white px-4 py-2 rounded-md shadow cursor-pointer" onClick={() => setModalOpen(true)}>
              Adoptar
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalContacto
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        usuario={publicador?.nombre}
        correo={publicador?.email} 
        telefono={publicador?.telefono} 
      />
    </div>
  );
}

export default Detalle;
