import { useState } from "react";
import { useToken } from "./useToken";
import { fetchData } from "../helpers/fetchData";

const ENDPOINT_MERCADO = "/mercado";

export const useMercado = () => {
  // Declaramos constantes
  const { isValidToken } = useToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState("");
  const [pageData, setPageData] = useState([]);
  const [position, setPosition] = useState("");
  const [rarity, setRarity] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const handleMercado = () => {
    const fetchDataFromEndpoint = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const id = Number(localStorage.getItem("id")); // Convert the id to a number
      try {
        const { data, isLoading } = await fetchData(
          ENDPOINT_MERCADO,
          "GET",
          token
        );
        // Filter out entries where id_usuario is the same as id
        let fetchedData = data.filter((item) => item.id_usuario !== id);
        setData(fetchedData);
        setFilteredData(fetchedData); // Set filteredData to be the same as data
        setIsLoading(isLoading);
      } catch (error) {
        console.error("Error fetching data: ", error);
        alert("Error al cargar los datos del mercado");
      }
    };

    fetchDataFromEndpoint();
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuy = async (id_from_mercado_entry) => {
    handleClose();
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
        console.error(data);
        alert("Error al comprar la carta");
        return;
      }

      load = isLoading;

      // Después de comprar, recargamos la lista de cartas
      const { data: newCards } = await fetchData(
        ENDPOINT_MERCADO,
        "GET",
        token
      );
      setData(newCards);
      setFilteredData(newCards); // Add this line
    } catch (error) {
      console.error("Error al comprar:", error);
      alert("Error al recargar la lista de cartas");
    }
    handleClose();
    setIsLoading(load);
  };

  const handleFilter = () => {
    let newFilteredData = [...data]; // Replace "data" with your data

    // Filter by rarity
    if (rarity) {
      newFilteredData = newFilteredData.filter(
        (item) => item.rarity === rarity
      );
    }

    // Filter by position
    if (position) {
      newFilteredData = newFilteredData.filter(
        (item) => item.position === position
      );
    }

    // Filter by nombre
    if (name) {
      newFilteredData = newFilteredData.filter(
        (item) =>
          item.nombre && item.nombre.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Sort by order
    switch (order) {
      case "precio":
        newFilteredData.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        newFilteredData.sort((a, b) => b.precio - a.precio);
        break;
      case "puntuacion":
        newFilteredData.sort((a, b) => a.puntuacion - b.puntuacion);
        break;
      case "puntuacion-desc":
        newFilteredData.sort((a, b) => b.puntuacion - a.puntuacion);
        break;
      default:
        break;
    }

    setFilteredData(newFilteredData);
    setCurrentPage(1);
  };

  return {
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
  };
};
