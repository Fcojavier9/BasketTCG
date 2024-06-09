import { Pagination } from "@mui/material";
import { LoadingCircle } from "../components/LoadingCircle";
import { useFetchNoticias } from "../customHooks/useFetchNoticias";
import { usePagination } from "../customHooks/usePagination";
import { getFormatFecha } from "../helpers/getFormatFecha";
import "../styles/noticias.css"; 

export const Noticias = () => {
  const { noticias, loading, error } = useFetchNoticias();
  const { currentItems, page, handleChange } = usePagination({datos: noticias});

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
              <h5 className="fecha-noticias">{getFormatFecha(noticia.publishedAt)}</h5>
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