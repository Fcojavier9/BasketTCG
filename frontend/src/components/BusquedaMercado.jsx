import "../styles/busquedaMercado.css";

export const BusquedaMercado = () => {
    return (
        <div className="busqueda-mercado-container">
            <div className="dropdown-container">
                <label className="form-label">Rereza</label>
                <select className="form-select">
                    <option>Común</option>
                    <option>Rara</option>
                    <option>Heroe</option>
                </select>
            </div>
            <div className="dropdown-container">
                <label className="form-label">Posición</label>
                <select className="form-select">
                    <option>Base</option>
                    <option>Escolta</option>
                    <option>Alero</option>
                    <option>Ala-pívot</option>
                    <option>Pívot</option>
                </select>
            </div>
            <div className="dropdown-container">
                <label className="form-label">Orden</label>
                <select className="form-select">
                    <option>Precio</option>
                    <option>Precio (Desc.)</option>
                    <option>Nombre</option>
                    <option>Nombre (Desc.)</option>
                    <option>Puntuación</option>
                    <option>Puntuación (Desc.)</option>
                </select>
            </div>
            <div className="search-bar-container">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" placeholder="Search" />
            </div>
        </div>
    );
};