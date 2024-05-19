import { useEffect, useState } from "react";
import { InfoCard } from "../components/InfoCard";
import { ButtonCard } from "../components/ButtonCard";
import { Modal } from "../components/Modal";
import { fetchData } from "../helpers/fetchData";
import { LoadingCircle } from "../components/LoadingCircle";
import "../styles/perfil.css";


// Componente principal del panel de usuario
export const Perfil = () => {
  const ENDPOINT_GET = `usuario/${localStorage.getItem("id")}`;
  const METODO_GET = "GET";
  const ENDPOINT_PUT = `updateUsuario/${localStorage.getItem("id")}`;
  const METODO_PUT = "PUT";
  const ENDPOINT_DELETE = `deleteUsuario/${localStorage.getItem("id")}`;
  const METODO_DELETE = "DELETE";
  const TOKEN = localStorage.getItem("token");

  const [name, setName] = useState("Nombre");
  const [username, setUsername] = useState("Usuario");
  const [email, setEmail] = useState("Correo");
  const [password, setPassword] = useState("*********");
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
      setUsername(data.username);
      setEmail(data.email);
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

  const acceptModal = async () => {
    const body = {};
    if (activeField === "Nombre") body.name = name;
    if (activeField === "Usuario") body.username = username;
    if (activeField === "Correo") body.email = email;
    if (
      activeField === "Contraseña" &&
      password !== "*********" &&
      password !== null &&
      password !== ""
    ) {
      body.password = password;
    }

    setIsLoading(true);
    const { data } = await fetchData(ENDPOINT_PUT, METODO_PUT, TOKEN, body);
    setIsLoadingData(true);
    closeModal();
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.href = "/";
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
    <div className="panel">
      <div className="user-title">
        <p>{`Bienvenido, ${username}`}</p>
      </div>
      <div className="user-panel">
        <InfoCard
          title="Nombre"
          value={name}
          onChange={handleNameChange}
          onClick={() => handleClick("Nombre")}
          type={"text"}
        />
        <InfoCard
          title="Usuario"
          value={username}
          onChange={handleUsernameChange}
          onClick={() => handleClick("Usuario")}
          type={"text"}
        />
        <InfoCard
          title="Correo"
          value={email}
          onChange={handleEmailChange}
          onClick={() => handleClick("Correo")}
          type={"email"}
        />
        <InfoCard
          title="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          onClick={() => handleClick("Contraseña")}
          type={"password"}
        />
        <ButtonCard
          title="Cerrar Sesión"
          value={"Salir"}
          onClick={handleExit}
          className={"button-orange"}
        />
        <ButtonCard
          title="Eliminar Cuenta"
          value={"Eliminar"}
          onClick={handleDelete}
          className={"button-delete"}
        />
      </div>
      {isAdmin && 
      <div className="admin-panel">
        <ButtonCard
          title="Administrar Usuarios"
          value={"Administrar"}
          onClick={() => (window.location.href = "/admin")}
          className={"button-orange"}
        />
      </div>}
    </div>
  );
};
