import { NavLink } from "react-router-dom"; // importamos NavLink de react-router-dom, que nos permite navegar entre rutas sin recargar la página
import logo from "../assets/logo.png";
import "../styles/navBar.css"; // importamos css personalizado

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg backgroundNavBar">
      <div className="container-fluid" style={{height: "7em"}}>
        <NavLink to="/" className="navbar-brand" href="#">
          <img src={logo} alt="logo" className="image-logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            marginRight: "1em", // Mover el botón más a la derecha (ajusta el valor según sea necesario)
            backgroundColor: "transparent", // Cambiar el color de fondo a transparente
            border: "none", // Eliminar bordes
            outline: "none", // Eliminar el contorno
            color: "white" // Cambiar el color del icono
          }}
        >
          <span className="navbar-toggler-icon text-light"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center">
            <li className="nav-item order-md-last margin-left-auto">
              <NavLink to="/" className="nav-link nav-perfil active">
                Perfil
              </NavLink>
            </li>
            <li className="nav-item margin-left-auto">
              <NavLink to="/" className="nav-link active ">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink to="/" className="nav-link active">
                Colección
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link active">
                Mercado
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link active">
                Noticias
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
