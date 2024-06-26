import { Navigate, Route, Routes } from "react-router-dom";
import { FondoEstrellas } from "./components/FondoEstrellas";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
import { Admin } from "./pages/Admin";
import { Coleccion } from "./pages/Coleccion";
import { Legal } from "./pages/Legal";
import { Login } from "./pages/Login";
import { Inicio } from "./pages/Inicio";
import { Mercado } from "./pages/Mercado";
import { Noticias } from "./pages/Noticias";
import { Perfil } from "./pages/Perfil";
import { Register } from "./pages/Register";
import './basketApp.css';

export const BasketApp = () => {
  return (
    <>
      <NavBar/>
      <div className="container">
        <FondoEstrellas/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Inicio />}/>
          <Route path="/mercado" element={<Mercado endPoint="mercado" metodo="GET"/>}/>
          <Route path="/coleccion" element={<Coleccion endPoint="fran/coleccion" metodo="GET"/>}/>
          <Route path="/noticias" element={<Noticias/>}/>
          <Route path="/*" element={<Navigate to="/" />}/>
          <Route path="/legal" element={<Legal/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  );
};
