import { Pagination } from "@mui/material";
import { useEffect } from "react";
import { InfoCard } from "../components/InfoCard";
import { Modal } from "../components/Modal";
import { fetchData } from "../helpers/fetchData";
import { LoadingCircle } from "../components/LoadingCircle";
import { useAdmin } from "../customHooks/useAdmin";
import { usePagination } from "../customHooks/usePagination";
import "../styles/admin.css";

const ENDPOINT_GET = `usuarios`;
const METODO_GET = "GET";

// Componente principal del panel de usuario
export const Admin = () => {
  const TOKEN = localStorage.getItem("token");

  const {
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
  } = useAdmin({ TOKEN });

  const { currentItems, page, handleChange } = usePagination({datos});

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
        {currentItems.map((dato) => ( // pinto array
          <InfoCard
            key={dato.id}
            title={dato.name ? dato.name : dato.username}
            value={dato.email}
            onClick={() => handleDelete(dato.id, dato.name)}
            type={"text"}
            textButton={"Eliminar"}
            readOnly={true}
          />
        ))}
      </div>
      <div className="admin-pagination">
        <Pagination count={Math.ceil(datos.length/10)} color="warning" page={page} onChange={handleChange} />
      </div>
    </div>
  );
};
