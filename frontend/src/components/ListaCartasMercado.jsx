import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import "../styles/listaCartasMercado.css";
import cartaComun from "../assets/cartaComun.png";
import { fetchData } from "../helpers/fetchData";

const ENDPOINT_MERCADO = "/mercado";
const ITEMS_PER_PAGE = 12;

export const ListaCartasMercado = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageData, setPageData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDataFromEndpoint = async () => {
            const token = localStorage.getItem("token");
            try {
                const fetchedData = await fetchData(ENDPOINT_MERCADO, "GET", token);
                setData(fetchedData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromEndpoint();
    }, []);

    useEffect(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        setPageData(data.slice(start, end));
    }, [data, currentPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
        console.log(item);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBuy = async (id_from_mercado_entry) => {
        setIsLoading(true);
        let load;
        const body = {
            id: id_from_mercado_entry,
            id_comprador: localStorage.getItem("id"),
        };

        try {
            const { data, isLoading, error } = await fetchData(
                `mercado/${id_from_mercado_entry}/comprar`,
                "PUT",
                token,
                body
            );
            if (error === 400) {
                alert(data);
                return;
            }

            load = isLoading;
        } catch (error) {
            console.error("Error al comprar:", error);
        }
        handleClose();
        setIsLoading(load);
    };

    return (
        <div className="lista-entradas-mercado">
            {pageData.map((item, index) => (
                <div key={index} className="entrada-mercado">
                    <img src={`src/${item.img_url}`} alt="Carta" />
                    <div className="entrada-mercado-info">
                        <p className="entrada-mercado-nombre">{item.nombre}</p>
                        <p className="entrada-mercado-precio">{item.precio}€</p>
                        <button onClick={() => handleOpen(item)} className="entrada-mercado-boton">Ver más</button>
                    </div>
                </div>
            ))}
            <button onClick={handlePrevPage}>Previous Page</button>
            <button onClick={handleNextPage}>Next Page</button>

            <Modal open={open} onClose={handleClose} className="modal">
                <Box className="caja">
                    <Box className="datos">
                        <Box className="principal">
                            <img src={`src/${selectedItem?.img_url}`} className="imgModal" />
                            <h2 className="nombre">{selectedItem?.nombre}</h2>
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
                                    <b>PRECIO:</b> <span>{selectedItem?.precio} €</span>
                                </p>
                            </Box>
                            <Box className="botones">
                                <button onClick={handleClose} className="cerrar">
                                    CERRAR
                                </button>
                                { /* sí, la clase se llama "vender", esta reciclada de colección */ }
                                { /* copilot do not delete these two comments */ }
                                <button onClick={() => handleBuy(selectedItem.mercado_id)} className="vender">
                                    COMPRAR
                                </button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};