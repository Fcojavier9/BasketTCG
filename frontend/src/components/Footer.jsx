import { NavLink } from "react-router-dom"; // importamos NavLink de react-router-dom, que nos permite navegar entre rutas sin recargar la página
import logo from '../assets/logo.png';
import "../styles/footer.css"; // importamos css personalizado

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="col footer-col-1">
                <h3>Basket TCG</h3>
                <p>Proyecto de TFG por:</p>
                <div className="footer-githubs">
                    <a href="#" className="footer-githubs-link">
                        {/* Placeholder de imagen de github */}
                        <img src="https://pluspng.com/img-png/github-logo-png-white-github-11-icon-free-white-social-icons-256x256.png" alt="Fran" />
                    </a>
                    <a href="#" className="footer-githubs-link">
                        {/* Placeholder de imagen de github */}
                        <img src="https://pluspng.com/img-png/github-logo-png-white-github-11-icon-free-white-social-icons-256x256.png" alt="Pablo" />
                    </a>
                    <a href="#" className="footer-githubs-link">
                        {/* Placeholder de imagen de github */}
                        <img src="https://pluspng.com/img-png/github-logo-png-white-github-11-icon-free-white-social-icons-256x256.png" alt="Rafa" />
                    </a>
                </div>
                <p>2024 © PONER LICENCIA</p>
            </div>
            <div className="col footer-col-2">
                <ul>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/">Colección</NavLink></li>
                    <li><NavLink to="/">Mercado</NavLink></li>
                    <li><NavLink to="/">Noticias</NavLink></li>
                    <li><NavLink to="/">Unirse / Entrar</NavLink></li>
                </ul>
            </div>
            <div className="col footer-col-3">
                <ul>
                    <li><NavLink to="/">Código fuente</NavLink></li>
                    <li><NavLink to="/">Documentación</NavLink></li>
                    <li><NavLink to="/">Licencia</NavLink></li>
                    <li><NavLink to="/">Legal</NavLink></li>
                </ul>
            </div>
        </footer>
    )
}