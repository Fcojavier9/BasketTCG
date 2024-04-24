import { useEffect, useState } from "react"
import "../styles/inicio.css" // importamos css personalizado
import { Carta } from '../components/Carta'
import { useFetchData } from "../customHooks/useFetchData"
import cartaComun from "../assets/cartaComun.png";
import cartaRara from "../assets/cartaRara.png";
import cartasHeroe from "../assets/cartasHeroe.png";

export const Inicio = ({endPoint}) => {
    const [endP, setEndPoint] = useState(endPoint);
    const {data, isLoading} = useFetchData(endP);
    const [cartas, setCartas] = useState([]);
    const [foco, setFoco] = useState();
    const [suelo, setSuelo] = useState();
    const [rareza, setRareza] = useState();
    
    cartas.push(
       {clase:"heroe", imagen: cartasHeroe} ,
       {clase:"rara", imagen: cartaRara} ,
       {clase:"comun", imagen: cartaComun} ,
    );

     useEffect (() => {
        switch(rareza){
            case "heroe":
                setFoco("foco heroe");
                setSuelo("ground heroe-ground");
                break;
            
            case "rara":
                setFoco("foco rara");
                setSuelo("ground rara-ground");
                break;
            
            case "comun":
                setFoco("foco comun");
                setSuelo("ground comun-ground");
                break;
            
        }
     }, [rareza]);

    return(
        <>
            <div className="cont">
                {isLoading ? <p>Cargando, espere por favor...</p> :
                data? (
                    <div className="cartaContainer">
                        <div className= {foco} >
                            <div className={suelo}/>
                        <Carta 
                            elemento={cartas[0]} 
                            position="center"
                            tipo = {setRareza}
                        />
                        <Carta 
                            elemento={cartas[1]} 
                            position="right"/>
                        <Carta 
                            elemento={cartas[cartas.length - 1]}  
                            position="left"/>
                            </div> 
                    </div>
                    ) : (
                        <h1>No hay cartas disponibles</h1>
                    )} 
            </div>   
        </>
    )

}


