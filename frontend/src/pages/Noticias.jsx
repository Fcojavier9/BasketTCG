import { useState, useEffect } from "react";
import "../styles/noticias.css"; 
import { LoadingCircle } from "../components/LoadingCircle";
import { Pagination } from "@mui/material";
import { useFetchNoticias } from "../customHooks/useFetchNoticias";

export const Noticias = () => {
  const { noticias, loading, error } = useFetchNoticias();
  const [page, setPage] = useState(1);


  const formatFecha = (fechaStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', options);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // controlo la paginacion
  const currentItems = noticias.length > 0 && noticias?.slice((page - 1) * 10, page * 10);

  if (loading) {
    return <LoadingCircle sizeLoading={200}/>
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

return (
    <div>
      <h1 className="titulo-principal-noticias">Últimas Noticias de Baloncesto</h1>
      <ul className="noticias-list">
        {currentItems.map((noticia, index) => (
          <li
            key={index}
            className={`noticia-item ${index % 2 === 0 ? "leftImage" : "rightImage"}`}
          >
            <div className="noticia-content">
              <h5 className="fecha-noticias">{formatFecha(noticia.publishedAt)}</h5>
              <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="title-noticias">
                {noticia.title}
              </a>
              <p className="descripcion-noticias">{noticia.description ? noticia.description.replace(/Leer/g, '') : ''}<a href={noticia.url} className="enlace-leer"> ...</a></p>
            </div>
            {noticia.urlToImage && (
              <img
                src={noticia.urlToImage}
                alt={noticia.title}
                className="noticia-image"
              />
            )}
          </li>
        ))}
      </ul>
      <div className="noticias-pagination">
        <Pagination count={Math.ceil(noticias.length/10)} color="warning" page={page} onChange={handleChange}/>
      </div>
    </div>
  );
};