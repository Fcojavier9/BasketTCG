import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import "../styles/mercado.css";
import { fetchData } from "../helpers/fetchData";
import { useToken } from "../customHooks/useToken";
import { LoadingCircle } from "../components/LoadingCircle";

const ENDPOINT_MERCADO = "/mercado";
const ITEMS_PER_PAGE = 12;

export const Mercado = ({ endPoint }) => {
    // Declaramos constantes
    const [endP, setEndPoint] = useState("/mercado");
    const [token, setToken] = useState("");
    const {isValidToken} = useToken();
    const [isLogin, setIsLogin] = useState(isValidToken);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageData, setPageData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [rarity, setRarity] = useState("");
    const [position, setPosition] = useState("");
    const [order, setOrder] = useState("");
    const [name, setName] = useState("");
    const [filteredData, setFilteredData] = useState([]);


    // Miramos si el token es válido
    useEffect(() => {
        setIsLoading(true);
        isValidToken ? handleMercado() : handleUnlogged();
        console.log(isValidToken);
        setIsLoading(false);
    }, [isValidToken]);

    const handleMercado = () => {
    const fetchDataFromEndpoint = async () => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const id = Number(localStorage.getItem("id")); // Convert the id to a number
        console.log("Stored id:", id); // Log the stored id
        try {
            let fetchedData = await fetchData(ENDPOINT_MERCADO, "GET", token);
            console.log("Fetched data:", fetchedData); // Log the fetched data
            // Filter out entries where id_usuario is the same as id
            fetchedData = fetchedData.data.filter(item => {
                if (item.id_usuario === id) {
                    console.log("Found entry with same id_usuario as stored id:", item); // Log the found entry
                }
                return item.id_usuario !== id;
            });
            console.log("Filtered data:", fetchedData); // Log the filtered data
            setData(fetchedData);
            setFilteredData(fetchedData); // Set filteredData to be the same as data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchDataFromEndpoint();
    }

    const handleUnlogged = () => {
        console.log("Sesión expirada o no iniciada")
    }

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

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
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
        const token = localStorage.getItem("token");
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

            // Después de comprar, recargamos la lista de cartas
            const { data: newCards } = await fetchData(ENDPOINT_MERCADO, "GET", token);
            setData(newCards);
            setFilteredData(newCards); // Add this line
        } catch (error) {
            console.error("Error al comprar:", error);
        }
        handleClose();
        setIsLoading(load);
    };

    useEffect(() => {
    let newFilteredData = [...data]; // Replace "data" with your data

    // Filter by rarity
    if (rarity) {
        newFilteredData = newFilteredData.filter(item => item.rarity === rarity);
    }

    // Filter by position
    if (position) {
        newFilteredData = newFilteredData.filter(item => item.position === position);
    }

    // Filter by nombre
    if (name) {
        newFilteredData = newFilteredData.filter(item => item.nombre && item.nombre.toLowerCase().includes(name.toLowerCase()));
    }

    // Sort by order
    switch (order) {
        case 'precio':
            newFilteredData.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-desc':
            newFilteredData.sort((a, b) => b.precio - a.precio);
            break;
        case 'puntuacion':
            newFilteredData.sort((a, b) => a.puntuacion - b.puntuacion);
            break;
        case 'puntuacion-desc':
            newFilteredData.sort((a, b) => b.puntuacion - a.puntuacion);
            break;
        default:
            break;
    }

    setFilteredData(newFilteredData);
    setCurrentPage(1);
    }, [rarity, position, order, name]);

    return (
        <>
        <div className="busqueda-mercado-container">
            <div className="dropdown-container">
                <label className="form-label">Rereza</label>
                <select className="form-select" value={rarity} onChange={(e) => setRarity(e.target.value)}>
                    <option value="">Todo</option>
                    <option value="comun">Común</option>
                    <option value="rara">Rara</option>
                    <option value="heroe">Héroe</option>
                </select>
            </div>
            <div className="dropdown-container">
                <label className="form-label">Posición</label>
                <select className="form-select" value={position} onChange={(e) => setPosition(e.target.value)}>
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
                <select className="form-select" value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="precio">Precio</option>
                    <option value="precio-desc">Precio (Desc.)</option>
                    <option value="puntuacion">Puntuación</option>
                    <option value="puntuacion-desc">Puntuación (Desc.)</option>
                </select>
            </div>
            <div className="search-bar-container">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" placeholder="Search" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
        </div>
        <div className="lista-entradas-mercado">
    {pageData.map((item, index) => (
        <div key={index} className="entrada-mercado">
            <img src={`src/${item.img_url}`} alt="Carta" />
            <div className="entrada-mercado-info">
                <p className="entrada-mercado-nombre">{item.nombre}</p>
                <p className="entrada-mercado-precio">{item.precio} BP</p>
                <button onClick={() => handleOpen(item)} className="entrada-mercado-boton">Ver más</button>
            </div>
        </div>
    ))}
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
                            style={{ display: selectedItem?.id_usuario === localStorage.getItem("id") ? 'none' : 'block' }}
                        >
                            COMPRAR
                        </button>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Modal>
</div>
        <div className="pagination-buttons">
            <button onClick={handlePrevPage} className="pagination-button">
                <img src="/src/assets/flechaL.png" alt="Previous" />
            </button>
            <div className="page-info">Pagina: {currentPage} / {totalPages}</div>
            <button onClick={handleNextPage} className="pagination-button">
                <img src="/src/assets/flechaR.png" alt="Next" />
            </button>
        </div>
</>
    );
};