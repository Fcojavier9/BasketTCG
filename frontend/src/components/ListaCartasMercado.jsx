import { useEffect, useState } from "react";
import "../styles/listaCartasMercado.css";
import cartaComun from "../assets/cartaComun.png";
import { fetchData } from "../helpers/fetchData";

const ENDPOINT_MERCADO = "/mercado";
const ITEMS_PER_PAGE = 12;

export const ListaCartasMercado = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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
        const pageData = data.slice(start, end);
        console.log(pageData);
    }, [data, currentPage]);

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        const start = (nextPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const nextPageData = data.slice(start, end);
        if (nextPageData.length > 0) {
            setCurrentPage(nextPage);
        }
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="lista-entradas-mercado">
            <div className="entrada-mercado">
                <img src={cartaComun} alt="Carta" />
                <div className="entrada-mercado-info">
                    <p className="entrada-mercado-nombre">Carta</p>
                    <p className="entrada-mercado-precio">Precio€</p>
                    <p className="entrada-mercado-boton">Ver más</p>
                </div>
            </div>
            <button onClick={handlePrevPage}>Previous Page</button>
            <button onClick={handleNextPage}>Next Page</button>
        </div>
    );
};