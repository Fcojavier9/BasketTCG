import { useState } from "react";
import { fetchData } from "../helpers/fetchData";

const ENDPOINT_DELETE = `deleteUsuario/`;
const METODO_DELETE = "DELETE";

export const useAdmin = ({TOKEN}) => {
  const [activeField, setActiveField] = useState("");
  const [datos, setDatos] = useState({});
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (nombre) => {
    setActiveField(nombre);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setId();
    setIsModalOpen(false);
  };

  const handleExit = () => {
    window.location.href = "/admin";
  };

  const acceptModal = async () => {
    setIsLoading(true);
    setIsLoadingData(true);
    const endpoint_delete = `${ENDPOINT_DELETE}${id}`;
    const { data } = await fetchData(endpoint_delete, METODO_DELETE, TOKEN);
    setId();
    handleExit();
  };

  const handleDelete = async (id, nombre) => {
    openModal(nombre);
    setId(id);
  };

  return {
    activeField,
    datos,
    isLoading,
    isLoadingData,
    isModalOpen,
    acceptModal,
    closeModal,
    handleDelete,
    setDatos,
    setIsLoading,
    setIsLoadingData
  };
};
