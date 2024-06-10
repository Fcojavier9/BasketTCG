import { useState } from "react";

export const usePagination = ({datos}) => {
  const [page, setPage] = useState(1); // para controlar la pagina

  const handleChange = (event, value) => {
    // para modificar la pagina
    setPage(value);
  };

  // controlo la paginacion
  const currentItems =
    datos.length > 0 && datos?.slice((page - 1) * 10, page * 10); // para seccionar el array

  return { currentItems, page, handleChange };
};
