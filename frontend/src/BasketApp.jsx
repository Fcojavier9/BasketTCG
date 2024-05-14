import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { InicioPage } from "./pages/InicioPage";
import { Inicio } from "./pages/Inicio";
import { Perfil } from "./pages/Perfil";
import { Footer } from "./components/Footer";
import './basketApp.css';
import { Coleccion } from "./pages/Coleccion";

export const BasketApp = () => {
  return (
    <>
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/usuarios" element={<InicioPage endPoint="usuarios"  metodo="GET" />}/>
          <Route path="/" element={<Inicio />}/>
          <Route path="/coleccion" element={<Coleccion endPoint="fran/coleccion" metodo="GET"/>}/>
          <Route path="/*" element={<Navigate to="/" />}/>
        </Routes>
      </div>
      <Footer/>
    </>
  );
};
