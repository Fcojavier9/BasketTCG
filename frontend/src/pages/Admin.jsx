import { useEffect, useState } from "react";
import { InfoCard } from "../components/InfoCard";
import { ButtonCard } from "../components/ButtonCard";
import { Modal } from "../components/Modal";
import { fetchData } from "../helpers/fetchData";
import { LoadingCircle } from "../components/LoadingCircle";
import "../styles/admin.css";
import { Pagination } from "@mui/material";

const ENDPOINT_DELETE = `deleteUsuario/`;
  const METODO_DELETE = "DELETE";


// Componente principal del panel de usuario
export const Admin = () => {
  const ENDPOINT_GET = `usuario/${localStorage.getItem("id")}`;
  const METODO_GET = "GET";
  
  const TOKEN = localStorage.getItem("token");

  const [name, setName] = useState("Nombre");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeField, setActiveField] = useState("");

  const openModal = (field) => {
    setActiveField(field);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchDataUser = async (endPoint, metodo, token) => {
      const { data } = await fetchData(endPoint, metodo, token);
      setName(data.name);
      setIsAdmin(data.is_admin);
      setIsLoadingData(false);
    };

    fetchDataUser(ENDPOINT_GET, METODO_GET, TOKEN);
    
  }, [isModalOpen]);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoadingData]);

  const handleClick = (field) => {
    openModal(field);
  };

  const handleExit = () => {
    window.location.href = "/perfil";
  };

  const handleDelete = async () => {
    const { data } = await fetchData(ENDPOINT_DELETE, METODO_DELETE, TOKEN);
    handleExit();
  };

  return isLoading || isLoadingData ? (
    <div className="loading">
      <LoadingCircle sizeLoading={200}/>
    </div>
  ) : isModalOpen ? (
    <Modal
      title={`¿Actualizar ${activeField}?`}
      closeModal={closeModal}
      acceptModal={acceptModal}
    />
  ) : (
    //Aqui me quedo
    <div className="panel">
      <div className="admin-panel">
        <InfoCard
          title="Usuario"
          value={name}
          onChange={null}
          onClick={() => handleDelete}
          type={"text"}
          textButton={"Eliminar"}
        />
      </div>
      <div className="admin-pagination">
        <Pagination count={10} color="warning" />
      </div>
    </div>
  );
};
