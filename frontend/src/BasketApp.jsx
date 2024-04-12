import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { InicioPage } from "./pages/InicioPage";
import './basketApp.css';

export const BasketApp = () => {
  return (
    <>
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<InicioPage endPoint="usuarios" />}></Route>
          <Route path="/*" element={<Navigate to="/" />}></Route>
        </Routes>
      </div>
    </>
  );
};
