import { Box, Modal } from "@mui/material";
import { useEffect } from "react";
import { LoadingCircle } from "../components/LoadingCircle";
import { useMercado } from "../customHooks/useMercado";
import "../styles/mercado.css";

const ITEMS_PER_PAGE = 12;

export const Mercado = () => {
  const {
    currentPage,
    filteredData,
    isLoading,
    isValidToken,
    name,
    open,
    order,
    pageData,
    position,
    rarity,
    selectedItem,
    totalPages,
    handleBuy,
    handleClose,
    handleFilter,
    handleMercado,
    handleNextPage,
    handleOpen,
    handlePrevPage,
    setIsLoading,
    setName,
    setOrder,
    setPageData,
    setTotalPages,
    setPosition,
    setRarity,
  } = useMercado();

  // Miramos si el token es válido
  useEffect(() => {
    setIsLoading(true);
    isValidToken && handleMercado();
  }, [isValidToken]);

  useEffect(() => {
    // Calculate the indices of the items to display on the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Slice the filteredData array to get only the items for the current page
    setPageData(filteredData.slice(startIndex, endIndex));
  }, [filteredData, currentPage]);

  useEffect(() => {
    // Calculate the total pages
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    setTotalPages(totalPages);
  }, [filteredData]);

  useEffect(() => {
    handleFilter();
  }, [rarity, position, order, name]);

  return (
    <>
      <div className="busqueda-mercado-container">
        <div className="dropdown-container">
          <label className="form-label">Rereza</label>
          <select
            className="form-select"
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
          >
            <option value="">Todo</option>
            <option value="comun">Común</option>
            <option value="rara">Rara</option>
            <option value="heroe">Héroe</option>
          </select>
        </div>
        <div className="dropdown-container">
          <label className="form-label">Posición</label>
          <select
            className="form-select"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="">Todo</option>
            <option value="pg">Point Guard</option>
            <option value="sg">Shooting Guard</option>
            <option value="sf">Small Forward</option>
            <option value="pf">Power forward</option>
            <option value="c">Center</option>
          </select>
        </div>
        <div className="dropdown-container">
          <label className="form-label">Orden</label>
          <select
            className="form-select"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="precio">Precio</option>
            <option value="precio-desc">Precio (Desc.)</option>
            <option value="puntuacion">Puntuación</option>
            <option value="puntuacion-desc">Puntuación (Desc.)</option>
          </select>
        </div>
        <div className="search-bar-container">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="lista-entradas-mercado">
        {isLoading ? (
          <LoadingCircle sizeLoading={200} />
        ) : (
          pageData.map((item, index) => (
            <div key={index} className="entrada-mercado">
              <img src={`src/${item.img_url}`} alt="Carta" />
              <div className="entrada-mercado-info">
                <p className="entrada-mercado-nombre">{item.nombre}</p>
                <p className="entrada-mercado-precio">{item.precio} BP</p>
                <button
                  onClick={() => handleOpen(item)}
                  className="entrada-mercado-boton"
                >
                  Ver más
                </button>
              </div>
            </div>
          ))
        )}
        <Modal open={open} onClose={handleClose} className="modal">
          <Box className="caja">
            <Box className="datos">
              <Box className="principal">
                <h2 className="nombre">{selectedItem?.nombre}</h2>
                <img
                  src={`src/${selectedItem?.img_url}`}
                  className="imgModal"
                />
              </Box>
              <Box className="informacion">
                <Box className="texto">
                  <p className="linea">
                    <b>POSICION:</b> <span>{selectedItem?.position}</span>
                  </p>
                  <p className="linea">
                    <b>PUNTUACION:</b> <span>{selectedItem?.puntuacion}</span>
                  </p>
                  <p className="linea">
                    <b>RAREZA:</b> <span>{selectedItem?.rarity}</span>
                  </p>
                  <p className="linea">
                    <b>PRECIO:</b> <span>{selectedItem?.precio} BP</span>
                  </p>
                </Box>
                <Box className="botones">
                  <button onClick={handleClose} className="cerrar">
                    CERRAR
                  </button>
                  <button
                    onClick={() => handleBuy(selectedItem.mercado_id)}
                    className="vender"
                    style={{
                      display:
                        selectedItem?.id_usuario === localStorage.getItem("id")
                          ? "none"
                          : "block",
                    }}
                  >
                    COMPRAR
                  </button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
      {!isLoading && (
        <div className="pagination-buttons">
          <button onClick={handlePrevPage} className="pagination-button">
            <img src="/src/assets/flechaL.png" alt="Previous" />
          </button>
          <div className="page-info">
            Pagina: {currentPage} / {totalPages}
          </div>
          <button onClick={handleNextPage} className="pagination-button">
            <img src="/src/assets/flechaR.png" alt="Next" />
          </button>
        </div>
      )}
    </>
  );
};
