import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { InicioPage } from "./pages/InicioPage";
import { Inicio } from "./pages/Inicio";
import { Footer } from "./components/Footer";
import './basketApp.css';

export const BasketApp = () => {
  return (
    <>
      <NavBar/>
      <div className="container">
        <Routes>
        <Route path="/usuarios" element={<InicioPage endPoint="usuarios" token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGktYmFza2V0LXRjZyIsInN1YiI6MSwiaWF0IjoxNzEzNjk3ODA0LCJleHAiOjE3MTM3MDE0MDR9.gd8v2lGxheM0abPe9vrlzQBZ1Xow03ZARY3ryxpoDuE" metodo="GET" />}></Route>
         <Route path="/usuario" element={<InicioPage />}></Route>
          <Route path="/" element={<Inicio endPoint="fran/coleccion" />}></Route>
          <Route path="/*" element={<Navigate to="/" />}></Route>
        </Routes>
      </div>
      <Footer/>
    </>
  );
};
