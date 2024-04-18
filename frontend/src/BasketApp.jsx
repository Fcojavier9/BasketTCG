import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { InicioPage } from "./pages/InicioPage";
import { Inicio } from "./components/Inicio";
import { Footer } from "./components/Footer";
import './basketApp.css';

export const BasketApp = () => {
  return (
    <>
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/usuarios" element={<InicioPage endPoint="usuarios" />}></Route>
          <Route path="/" element={<Inicio endPoint="fran/coleccion" />}></Route>
          <Route path="/*" element={<Navigate to="/" />}></Route>
        </Routes>
      </div>
      <Footer/>
    </>
  );
};
