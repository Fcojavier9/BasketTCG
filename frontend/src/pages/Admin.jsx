import { useEffect, useState } from "react";
import { InfoCard } from "../components/InfoCard";
import { Modal } from "../components/Modal";
import { fetchData } from "../helpers/fetchData";
import { LoadingCircle } from "../components/LoadingCircle";
import "../styles/admin.css";
import { Pagination } from "@mui/material";

const ENDPOINT_DELETE = `deleteUsuario/`;
const METODO_DELETE = "DELETE";
const ENDPOINT_GET = `usuarios`;
const METODO_GET = "GET";


// Componente principal del panel de usuario
export const Admin = () => {
  const TOKEN = localStorage.getItem("token");
  const [datos, setDatos] = useState({});
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [page, setPage] = useState(1);

  const openModal = (nombre) => {
    setActiveField(nombre);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setId();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchDataUser = async (endPoint, metodo, token) => {
      const { data } = await fetchData(endPoint, metodo, token);
      setDatos(data);
    };

    fetchDataUser(ENDPOINT_GET, METODO_GET, TOKEN);   
  }, []);

  useEffect(() => {
    if(datos.length > 0){
      setIsLoadingData(false);
    }
  }, [datos]);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoadingData]);


  const handleExit = () => {
    window.location.href = "/admin";
  };

  const acceptModal = async () => {
    setIsLoading(true);
    setIsLoadingData(true);
    const endpoint_delete = `${ENDPOINT_DELETE}${id}`;
    const { data } = await fetchData(endpoint_delete, METODO_DELETE, TOKEN);
    console.log(data);
    setId();
    handleExit();
  };

  const handleDelete = async (id, nombre) => {
    openModal(nombre);
    setId(id);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // controlo la paginacion
  const currentItems = datos.length > 0 && datos?.slice((page - 1) * 10, page * 10);

  return isLoading || isLoadingData ? (
    <div className="loading">
      <LoadingCircle sizeLoading={200}/>
    </div>
  ) : isModalOpen ? (
    <Modal
      title={`¿Eliminar a ${activeField}?`}
      closeModal={closeModal}
      acceptModal={acceptModal}
      campoValidacion={"Eliminar"}
    />
  ) : (
    //Aqui me quedo
    <div className="panel-admin">
      <div className="admin-panel">
        {currentItems.map((dato) => (
          <InfoCard
            key={dato.id}
            title={dato.name}
            value={dato.email}
            onChange={null}
            onClick={() => handleDelete(dato.id, dato.name)}
            type={"text"}
            textButton={"Eliminar"}
          />
        ))}
      </div>
      <div className="admin-pagination">
        <Pagination count={Math.ceil(datos.length/10)} color="warning" page={page} onChange={handleChange} />
      </div>
    </div>
  );
};
