import { useEffect, useState } from "react";
import { useFetchData } from "../customHooks/useFetchData";
import { useToken } from "../customHooks/useToken";
import "../styles/Coleccion.css"
import { Filtro } from '../components/Filtro'
import { Carta } from "../components/Carta";

export const Coleccion = ({endPoint}) => {
    const [endP, setEndPoint] = useState(endPoint);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const {isValidToken} = useToken();
    const {data, isLoading} = useFetchData(endP, 'GET', token)
    const [cartas, setCartas] = useState([])
    const coleccion = []
  


  



    return (
        <>
            <div className="coleccion">
                
            <Filtro/>
            <div className="album">
                <ol>

                {cartas.map( (data) => (
                    <Carta 
                        id={data.carta}
                    />
                ))}
                </ol>
            </div>
            </div>
           {/* <div>
                    <h1>CARTAS</h1>
                    <ol>
                        {data.map((item)=> (
                            <li>{item.carta}</li>
                        ))}
                    </ol>
                </div>
            */}
        </>
    )
}