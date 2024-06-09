import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ButtonCard } from "../components/ButtonCard";
import { LoadingCircle } from "../components/LoadingCircle";
import { InfoCard } from "../components/InfoCard";
import { Modal } from "../components/Modal";
import { usePerfil } from "../customHooks/usePerfil";
import { fetchData } from "../helpers/fetchData";
import "../styles/perfil.css";

// Componente principal del panel de usuario
export const Perfil = () => {
  const ENDPOINT_GET = `usuario/${localStorage.getItem("id")}`;
  const METODO_GET = "GET";
  const TOKEN = localStorage.getItem("token");

  const {
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
  } = usePerfil({TOKEN});

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
