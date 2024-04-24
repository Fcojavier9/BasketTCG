import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
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
          <Route path="/login" element={<Login endPoint="auth/login" metodo="POST" />}></Route>
          <Route path="/usuarios" element={<InicioPage endPoint="usuarios" token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGktYmFza2V0LXRjZyIsInN1YiI6MSwiaWF0IjoxNzEzODE2NDYzLCJleHAiOjE3MTM4MjAwNjN9.dJ2dgTweQMJHRPvPU3cMne8pqK3pITVdyaJa-6NZMIY" metodo="GET" />}></Route>
          <Route path="/" element={<Inicio endPoint="fran/coleccion" />}></Route>
          <Route path="/*" element={<Navigate to="/" />}></Route>
        </Routes>
      </div>
      <Footer/>
    </>
  );
};
