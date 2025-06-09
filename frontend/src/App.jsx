import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Login from "./pages/Login.jsx";
import Publicar from "./pages/Publicar.jsx";
import Pets from "./pages/Pets.jsx";
import PetDetails from "./pages/PetDetails.jsx";
import Perfil from "./pages/Perfil.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/registro"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}      
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/registro" element={<RegisterPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/publicar" element={ <PrivateRoute><Publicar/></PrivateRoute>}/>
        <Route path="/mascotas" element={<Pets/>}/>
        <Route path="/detalle" element={<PetDetails/>}/>
        <Route path="/perfil" element={ <PrivateRoute><Perfil/></PrivateRoute>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
