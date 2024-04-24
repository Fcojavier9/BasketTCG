import { NavLink } from "react-router-dom"; // importamos NavLink de react-router-dom, que nos permite navegar entre rutas sin recargar la página
import logo from '../assets/logo.png';
import "../styles/footer.css"; // importamos css personalizado

export const Footer = () => {
    return (
    <div className="container-fluid footer-container">
        <footer className="row row-cols-4 py-4 my-4">
            <div className="col footer-col footer-col-1">
                <div className="d-flex align-items-end footer-brand">
                    <NavLink to="/" className="navbar-brand" href="#">
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
            <div className="col footer-col">
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="footer-link">Colección</a></li>
                    <li className="nav-item mb-2"><a href="#" className="footer-link">Mercado</a></li>
                    <li className="nav-item mb-2"><a href="#" className="footer-link">Noticias</a></li>
                </ul>
            </div>

            <div className="col footer-col">
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="footer-link">Código fuente</a></li>
                    <li className="nav-item mb-2"><a href="#" className="footer-link">Documentación</a></li>
                    <li className="nav-item mb-2"><a href="#" className="footer-link">Licencia</a></li>
                </ul>
            </div>
            <div className="col footer-col footer-col-right">
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="footer-link">Perfil</a></li>
                    <li className="nav-item mb-2"><a href="#" className="footer-link">Inicio</a></li>
                    <li className="nav-item mb-2"><a href="#" className="footer-link">Legal</a></li>
                </ul>
            </div>
        </footer>
    </div>
    )
}