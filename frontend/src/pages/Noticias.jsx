import { useState, useEffect } from "react";
import "../styles/noticias.css"; // Asegúrate de importar el archivo CSS
import { LoadingCircle } from "../components/LoadingCircle";
import { Pagination } from "@mui/material";

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=baloncesto&language=es&sortBy=publishedAt&apiKey=d199ec6908a1461abc06a66e7117179c"
        );
        if (!response.ok) {
          throw new Error("Error al obtener las noticias");
        }
        const data = await response.json();
        setNoticias(data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

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
      <h1>Últimas Noticias de Baloncesto</h1>
      <ul className="noticias-list">
        {currentItems.map((noticia, index) => (
          <li
            key={index}
            className={`noticia-item ${index % 2 === 0 ? "leftImage" : "rightImage"}`}
          >
            <div className="noticia-content">
                <h5>{formatFecha(noticia.publishedAt)}</h5>
              <a href={noticia.url} target="_blank" rel="noopener noreferrer">
                {noticia.title}
              </a>
              <p>{noticia.description ? noticia.description.replace(/Leer/g, '') : ''}<a href={noticia.url} className="enlace-leer"> ...</a></p>
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

export default Noticias;
