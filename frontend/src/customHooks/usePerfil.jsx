import { useState } from "react";
import { fetchData } from "../helpers/fetchData";

const METODO_DELETE = "DELETE";
const METODO_PUT = "PUT";
const PRECIO_SOBRE = 250;

export const usePerfil = ({TOKEN}) => {
  const ENDPOINT_DELETE = `deleteUsuario/${localStorage.getItem("id")}`;
  const ENDPOINT_PUT = `updateUsuario/${localStorage.getItem("id")}`;

  const [activeField, setActiveField] = useState("");
  const [count, setCount] = useState(1);
  const [email, setEmail] = useState("Correo");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("Nombre");
  const [password, setPassword] = useState("*********");
  const [saldo, setSaldo] = useState(0);
  const [sobres, setSobres] = useState();
  const [toInicio, setToInicio] = useState(false);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("Usuario");

  const openModal = (field) => {
    setActiveField(field);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

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
    console.log(data);
    handleExit();
  };

  const cantidad = (valor) => {
    if (
      valor.target.textContent === "+" &&
      count * PRECIO_SOBRE < saldo - PRECIO_SOBRE
    ) {
      setCount(count + 1);
    }
    if (valor.target.textContent === "-" && count > 1) {
      setCount(count - 1);
    }
  };

  const comprarSobres = async () => {
    const saldoRestante = saldo - count * PRECIO_SOBRE;
    const body = { sobres: sobres + count, saldo: saldoRestante };
    const { data } = await fetchData(ENDPOINT_PUT, METODO_PUT, TOKEN, body);
    setSaldo(saldoRestante);
    setToInicio(true);
  };

  return {
    activeField,
    count,
    email,
    isAdmin,
    isLoading,
    isLoadingData,
    isModalOpen,
    name,
    password,
    saldo,
    toInicio,
    user,
    username,
    acceptModal,
    cantidad,
    closeModal,
    comprarSobres,
    handleClick,
    handleDelete,
    handleEmailChange,
    handleExit,
    handleNameChange,
    handlePasswordChange,
    handleUsernameChange,
    setEmail,
    setIsAdmin,
    setIsLoading,
    setIsLoadingData,
    setName,
    setSobres,
    setUser,
    setUsername,
    setSaldo,
  }
};
