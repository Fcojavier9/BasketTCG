import { NavLink } from "react-router-dom"
import logo from '../assets/logo.png'

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <NavLink to='/' className="navbar-brand" href="#"><img src={logo} alt="logo" style={{ maxWidth: '100px' }}/></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link active">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link active">Colección</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link active">Mercado</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link active">Noticias</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
