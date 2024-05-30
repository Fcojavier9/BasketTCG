import { useEffect, useState } from "react";
import "../styles/mercado.css";
import { Carta } from "../components/Carta";
import { fetchData } from "../helpers/fetchData";
import cartaComun from "../assets/cartaComun.png";
import cartaRara from "../assets/cartaRara.png";
import cartasHeroe from "../assets/cartasHeroe.png";
import { useToken } from "../customHooks/useToken";
import { useFetchData } from "../customHooks/useFetchData";

import { Paginacion } from "../components/Paginacion";
import { BusquedaMercado } from "../components/BusquedaMercado";
import { ListaCartasMercado } from "../components/ListaCartasMercado";

export const Mercado = ({ endPoint }) => {
    // Declaramos constantes
    const [endP, setEndPoint] = useState("/mercado");
    const [token, setToken] = useState("");
    const {isValidToken} = useToken();
    const [isLogin, setIsLogin] = useState(isValidToken);
    const [isLoading, setIsLoading] = useState(false);

    // Miramos si el token es válido
    useEffect(() => {
        isValidToken ? handleMercado() : handleUnlogged();
        console.log(isValidToken);
    }, [isValidToken]);

    const handleMercado = () => {

    }

    const handleUnlogged = () => {
        console.log("Sesión expirada o no iniciada")
    }

    return(
        <>
        {isLoading ? (
            <h1>Cargando...</h1>
        ):(
            <div className="mercadoContainer">
                <BusquedaMercado />
                <ListaCartasMercado />
                <Paginacion />
            </div>
        )}
        </>
    )
}