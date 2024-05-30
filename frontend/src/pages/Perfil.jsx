import { useEffect, useState } from "react";
import { InfoCard } from "../components/InfoCard";
import { ButtonCard } from "../components/ButtonCard";
import { Modal } from "../components/Modal";
import { fetchData } from "../helpers/fetchData";
import { LoadingCircle } from "../components/LoadingCircle";
import "../styles/perfil.css";
import { Navigate } from "react-router-dom";

// Componente principal del panel de usuario
export const Perfil = () => {
  const PRECIO_SOBRE = 250;
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
  const [user, setUser] = useState("");
  const [sobres, setSobres] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [toInicio, setToInicio] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [count, setCount] = useState(1);

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
      setUser(data.username);
      setEmail(data.email);
      setSaldo(data.saldo);
      setIsAdmin(data.is_admin);
      setIsLoadingData(false);
      setSobres(data.sobres);
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

  const cantidad = (valor) => {
      if(valor.target.textContent === "+" && count*PRECIO_SOBRE < saldo-PRECIO_SOBRE){
        setCount(count + 1);
      }
      if(valor.target.textContent === "-" && count > 1){
        setCount(count - 1);
      }
  }

  const comprarSobres = async () => {
    const saldoRestante = saldo - count*PRECIO_SOBRE;
    const body = {sobres: sobres + count, saldo: saldoRestante};
    const { data } = await fetchData(ENDPOINT_PUT, METODO_PUT, TOKEN, body);
    setSaldo(saldoRestante);
    setToInicio(true);
  }

  if (toInicio){
    return <Navigate to="/" /> 
  }  

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
        <p>{`Bienvenido, ${user} 🎉`}</p>
        <p>{`Su saldo es: ${saldo}BP`}</p>
      </div>
      <div className="panel-sobres">
          <p className="cantidad-sobres">Comprar sobres: </p>
          <button className="boton-menos"
            onClick={cantidad}>
            -
          </button>
          <p className="cantidad-sobres">{saldo < 250 ? "0" : count}</p>
          <button className="boton-mas"
            onClick={cantidad}>
            +
          </button>
          <button className="boton-comprar" disabled={saldo < 250} onClick={comprarSobres}>{saldo < 250 ? "BP insuficientes" : "Comprar"}</button>
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
