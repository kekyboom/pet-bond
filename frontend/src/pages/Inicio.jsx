import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { usePetContext } from "../context/PetContext";
import heroImg from "../assets/img/hero-img.jpg";
import PetGrid from "../components/PetGrid"
import PetCard from "../components/PetCard";
import gatoImg from "../assets/img/cat.png"
import perroImg from "../assets/img/dog.png"


function Inicio() {
  const navigate = useNavigate();
  const [mostrarSelector, setMostrarSelector] = useState(false);
  const { user } = useAuth();
  const { pets, loading, error } = usePetContext();

  const selectType = (type) => {
    navigate(`/mascotas?especie=${type}`);
  };

  return (
    <div className="w-full min-h-screen">
      {/* HERO */}
      <div className="relative w-full h-[50vh] md:h-[55vh]">
        <img
          src={heroImg} alt="Imagen de fondo de gato y perro" className="w-full h-full object-cover"/>
        
        {/* Contenido centrado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 afacad-flux-reg">
          {user ? (
            <>
              <div className="flex gap-4">
                <Link to="/publicar" className="bg-pborange hover:bg-orange-300 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition">
                  Dar en Adopción
                </Link>
                {!mostrarSelector && (
                  <button onClick={() => setMostrarSelector(true)} className="bg-pbblue hover:bg-pbdarkblue text-white font-semibold px-6 py-3 rounded-full shadow-lg transition cursor-pointer">
                    Adoptar
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-white knewave-regular text-3xl sm:text-4xl font-bold mb-6 uppercase ">
                Haz que su historia comience contigo.
              </h1>
              <Link to="/registro">
                <button className="bg-pbblue hover:bg-pbdarkblue text-white font-semibold px-6 py-3 rounded-full shadow-lg transition cursor-pointer">
                  Crear Cuenta
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Selector */}
        {mostrarSelector && (
          <div className="absolute inset-0 flex items-center justify-center z-20 ">
            <div className="bg-white p-8 rounded-lg shadow-2xl text-center w-[90%] max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">¿QUÉ DESEAS ADOPTAR?</h2>
              <div className="flex justify-center gap-6">
                <button onClick={() => selectType("gato")} className="flex flex-col items-center bg-pborange hover:bg-orange-400 text-white p-4 rounded-xl shadow-md transition cursor-pointer justify-center">
                  <img src={gatoImg} className="h-24"/>
                </button>
                <button onClick={() => selectType("perro")} className="flex flex-col items-center bg-pbblue hover:bg-pbdarkblue text-white p-4 pt-6 rounded-xl shadow-md transition cursor-pointer ">
                  <img src={perroImg} className="h-22"/>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* EXPLORA */}
      <div className="px-4 py-10">
        <p className="text-lg uppercase mb-6 mx-16">Explora</p>
        <PetGrid>
          {pets.slice(0, 12).map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </PetGrid>
      </div>
    </div>
  );
}


export default Inicio;