import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateData = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nombre || !apellido || !telefono || !email || !password || !confirmPass) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPass) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await register({ nombre, apellido, telefono, email, password });
      alert("¡Cuenta creada con éxito! Redirigiendo...");
      setTimeout (navigate("/login"),2000);
    } catch (error) {
      setError(error.message || "Error al crear la cuenta");
    }
  };

  return (
    <section className="bg-pbwhite py-20 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 border border-gray-300">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Crear una cuenta
        </h1>

        <form className="space-y-4" onSubmit={validateData}>
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block mb-1 text-sm font-medium text-black">
              Nombre
            </label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-black" placeholder="Ingresar Nombre"/>
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="apellido" className="block mb-1 text-sm font-medium text-gray-900">
              Apellido
            </label>
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" placeholder="Ingresar Apellido"/>
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block mb-1 text-sm font-medium text-gray-900">
              Teléfono
            </label>
            <input type="text" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" placeholder="Ingresar número con código"/>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">
              Correo electrónico
            </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" placeholder="name@mail.com"/>
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">
              Contraseña
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" placeholder="••••••••"/>
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium text-gray-900">
              Confirmar Contraseña
            </label>
            <input type="password" id="confirm-password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black" placeholder="••••••••"/>
          </div>

          {/* Mensajes */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button type="submit" className="w-full bg-pborange hover:bg-orange-300 text-white font-semibold py-2.5 rounded-lg">
            Crear Cuenta
          </button>

          <p className="text-center text-sm text-gray-700 pt-2">
            ¿Ya tienes cuenta?{" "}
            <Link className="text-pbfucsia hover:underline" to="/login">
              Inicia Sesión
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
