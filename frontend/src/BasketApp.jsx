import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { InicioPage } from "./pages/InicioPage";
import { Inicio } from "./pages/Inicio";
import { Footer } from "./components/Footer";
import './basketApp.css';
import { Coleccion } from "./pages/Coleccion";
import { Mercado } from "./pages/Mercado";

export const BasketApp = () => {
  return (
    <>
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login endPoint="auth/login" metodo="POST" />}/>
          <Route path="/register" element={<Register endPoint="auth/login" metodo="POST" />}/>
          <Route path="/usuarios" element={<InicioPage endPoint="usuarios"  metodo="GET" />}/>
          <Route path="/mercado" element={<Mercado endPoint="mercado" metodo="GET"/>}/>
          <Route path="/coleccion" element={<Coleccion endPoint="fran/coleccion" metodo="GET"/>}/>
          <Route path="/*" element={<Navigate to="/" />}/>
        </Routes>
      </div>
      <Footer/>
    </>
  );
};
