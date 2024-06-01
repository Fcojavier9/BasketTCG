import { useEffect, useState } from "react";
import "../styles/listaCartasMercado.css";
import cartaComun from "../assets/cartaComun.png";
import { fetchData } from "../helpers/fetchData";

/*
    Este es el tipo de contenido que puedes encontrar en el json de respuesta de la API
     {
        "mercado_id": 68,
        "precio": 98,
        "nombre": "Michael Jordan",
        "position": "sg",
        "rarity": "heroe",
        "puntuacion": 100,
        "img_url": "assets/cartas/48.png"
    }, 
*/

const ENDPOINT_MERCADO = "/mercado";
const ITEMS_PER_PAGE = 12;

export const ListaCartasMercado = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageData, setPageData] = useState([]);

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

    return (
        <div className="lista-entradas-mercado">
            {pageData.map((item, index) => (
                <div key={index} className="entrada-mercado">
                    <img src={`src/${item.img_url}`} alt="Carta" />
                    <div className="entrada-mercado-info">
                        <p className="entrada-mercado-nombre">{item.nombre}</p>
                        <p className="entrada-mercado-precio">{item.precio}€</p>
                        <p className="entrada-mercado-boton">Ver más</p>
                    </div>
                </div>
            ))}
            <button onClick={handlePrevPage}>Previous Page</button>
            <button onClick={handleNextPage}>Next Page</button>
        </div>
    );
};