import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await login(email, password); 
    navigate("/");
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    alert("Error al conectar con el servidor");
  }
  };

  return (
    <section className="bg-pbwhite h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 border border-gray-300">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Iniciar Sesión
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black"
              placeholder="name@mail.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="w-full bg-pborange hover:bg-orange-300 text-white font-semibold py-2.5 rounded-lg">
            Iniciar sesión
          </button>

          <p className="text-center text-sm text-gray-700 pt-2">
            ¿No tienes una cuenta?{" "}
            <Link to="/registro">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
