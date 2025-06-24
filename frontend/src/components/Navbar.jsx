import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoImg from "../assets/img/petbond-logo.png";

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); 

  return (
    <nav className="w-full sticky bg-pbwhite shadow-xl afacad-flux-reg">
      <div className="flex flex-wrap items-center justify-between px-20 py-2">
        {/* Logo */}
        <a href="/">
          <img src={logoImg} className="h-40" alt="PetBond Logo" />
        </a>
        
        {/* Botón hamburguesa */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Menú */}
        <div className={`w-full md:w-auto ${menuOpen ? "block" : "hidden"} md:block`}>
          <ul className="font-medium flex flex-col p-10 md:p-0 mt-4 md:mt-0 md:flex-row md:space-x-3">
            {user ? (
              <>
                {location.pathname !== "/perfil" && (
                  <li>
                    <Link to="/perfil" className="block py-2 px-4 text-gray-700 hover:text-pbdarkblue">
                      Perfil
                    </Link>
                  </li>
                )}
                <li className="flex">
                  <Link className="block py-2 px-4 text-gray-700 hover:text-pbdarkblue" to="/">
                    Inicio
                  </Link>
                  <Link onClick={logout} className="block py-2 px-4 text-gray-700 hover:text-pbdarkblue" to="/">
                    Cerrar Sesión
                  </Link>
                  
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="bg-pbdarkblue hover:bg-pbblue text-white font-semibold px-6 py-3 rounded-full shadow-lg transition block text-center">
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
