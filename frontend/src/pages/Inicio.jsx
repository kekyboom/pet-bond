import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import heroImg from "../assets/img/hero-img.jpg";

function Inicio() {
  const navigate = useNavigate();
  const [mostrarSelector, setMostrarSelector] = useState(false);
  const { user } = useAuth()

  const selectType = (type) => {
  navigate(`/mascotas?especie=${type}`);
};

  return (
    <div className="relative w-full h-screen">
      <img src={heroImg} alt="Imagen de fondo de gato y perro" className="w-full h-full object-cover" />

      {user ? (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <Link to="/publicar" className="bg-pborange hover:bg-orange-300 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition" >
          Dar en Adopción
        </Link>

    {/* Botón ADOPTAR para mostrar Selector */}

    {!mostrarSelector && (
      <button onClick={() => setMostrarSelector(true)} className="bg-pbblue hover:bg-pbdarkblue text-white font-semibold px-6 py-3 rounded-full shadow-lg transition" >
        Adoptar
      </button>
    )}
  </div>
) : (
  <div className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <h1 className="text-white text-4xl pb-10 uppercase">Haz que su historia comience contigo.</h1>
    <button className="bg-pbblue hover:bg-pbdarkblue text-white font-semibold px-6 py-3 rounded-full shadow-lg transition">
      <Link to="/registro">Crear Cuenta</Link>
    </button>
  </div>
)}
      

  {/*Tarjeta de Selección*/}
  {mostrarSelector && (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center w-[90%] max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">¿QUÉ DESEAS ADOPTAR?</h2>

          <div className="flex justify-center gap-6">
              {/* Gato */}
              <button onClick={() => selectType("gato")} className="flex flex-col items-center bg-pborange hover:bg-orange-400 text-white p-4 rounded-xl shadow-md transition">
                🐱
                <span className="mt-1 font-medium">Gato</span>
              </button>

              {/* Perro */}
              <button onClick={() => selectType("perro")} className="flex flex-col items-center bg-pbblue hover:bg-pbdarkblue text-white p-4 rounded-xl shadow-md transition">
                🐶
                <span className="mt-1 font-medium">Perro</span>
              </button>
            </div>
          </div>
        </div>  
      )}
    </div>
  );
}

export default Inicio;