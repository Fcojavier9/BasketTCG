import { NavLink } from "react-router-dom"; // importamos NavLink de react-router-dom, que nos permite navegar entre rutas sin recargar la página
import logo from '../assets/logo.png';
import { useToken } from "../customHooks/useToken";
import "../styles/footer.css"; // importamos css personalizado

export const Footer = () => {
    const { isValidToken } = useToken();

    return (
    <div className="container-fluid footer-container">
        <footer className="row py-2 align-items-center footer-class-footer">
            <div className="col-md-3 col-xs-12 footer-col-1">
                <div className="d-flex align-items-end footer-brand">
                    <NavLink to="/" className="navbar-brand">
                        <img src={logo} alt="logo" className="image-logo" />
                    </NavLink>
                    <h4>BasketTCG</h4>
                </div>
                <div className="footer-social">
                    <a href="https://github.com/Fcojavier9"><img src="https://github.com/Fcojavier9.png" alt="Fran" srcSet="" /></a>
                    <a href="https://github.com/PabloNarVal"><img src="https://github.com/PabloNarVal.png" alt="Pablo" srcSet="" /></a>
                    <a href="https://github.com/rafa-sh"><img src="https://github.com/rafa-sh.png" alt="Rafa" srcSet="" /></a>
                </div>
            </div>
            <div className="col-md-9 col-xs-12">
                <div className="row row-cols-3">
                    <div className="col footer-col">
                        <ul className="nav flex-column">
                            <li className="nav-item custom-footer-item"><a href={isValidToken ? "/coleccion" : "/login"} className="footer-link">Colección</a></li>
                            <li className="nav-item custom-footer-item"><a href={isValidToken ? "/mercado" : "/login"} className="footer-link">Mercado</a></li>
                            <li className="nav-item custom-footer-item"><a href={isValidToken ? "/noticias" : "/login"} className="footer-link">Noticias</a></li>
                        </ul>
                    </div>

                    <div className="col footer-col">
                        <ul className="nav flex-column">
                            <li className="nav-item custom-footer-item"><a href="https://github.com/Fcojavier9/BasketTCG" className="footer-link">Código fuente</a></li>
                            <li className="nav-item custom-footer-item"><a href="https://rafa-sh.github.io/BasketTCG-docs/Tutoriales/empezar-a-desarrollar/" className="footer-link">Documentación</a></li>
                            <li className="nav-item custom-footer-item"><a href="/legal" className="footer-link">Legal</a></li>
                        </ul>
                    </div>
                    <div className="col footer-col">
                        <ul className="nav flex-column">
                            <li className="nav-item custom-footer-item"><a href={isValidToken ? "/perfil" : "/login"} className="footer-link">Perfil</a></li>
                            <li className="nav-item custom-footer-item"><a href="/" className="footer-link">Inicio</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    )
}