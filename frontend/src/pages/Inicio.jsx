import { useEffect, useState } from "react";
import { Carrusel } from "../components/Carrusel";
import { LoadingCircle } from "../components/LoadingCircle";
import Sobre from "../components/Sobre";
import { useToken } from "../customHooks/useToken";
import { fetchData } from "../helpers/fetchData";
import "../styles/inicio.css";

export const Inicio = () => {
  const { isValidToken, isLoadingToken } = useToken();
  const [numSobres, setNumSobres] = useState();
  const [saldo , setSaldo] = useState();
  const [ isLoadingSobres, setIsLoadingSobres ] = useState(false);

  useEffect(() => {
    const fetchCartas = async () => {
      if (isValidToken && !isLoadingToken) {
        const endpoint_usuario = `usuario/${localStorage.getItem("id")}`
        const {data, isLoading} = await fetchData(endpoint_usuario, "GET", localStorage.getItem("token"));
        setIsLoadingSobres(isLoading);
        setNumSobres(data.sobres);
        setSaldo(data.saldo)
      }
    };

    fetchCartas();

  },[isValidToken, isLoadingToken])

  if (isLoadingToken || isLoadingSobres) {
    return <LoadingCircle sizeLoading={200}/>;
  }

  if(isValidToken && !numSobres && numSobres !== 0){
    return <LoadingCircle sizeLoading={200}/>
  }

  return (
    <>
      {isValidToken
        ? ( numSobres > 0 
            ? (
            <div className="contenedor-sobres">
              <h1 className="titulo-sobres-inicio">Sobres disponibles: {numSobres}</h1>
              <Sobre saldo={saldo} sobres={numSobres} setNumSobres={setNumSobres}/>
            </div>
            ) : (
              <Carrusel isValidToken={isValidToken}/>
            )
        ) : (
          <Carrusel isValidToken={isValidToken}/>
        )
      }
    </>
  )
};
