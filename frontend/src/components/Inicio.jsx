import { useState } from "react"
import "../styles/inicio.css" // importamos css personalizado
import { Carta } from './Carta'
import { useFetchData } from "../customHooks/useFetchData"
import cartaComun from "../assets/cartaComun.png";
import cartaRara from "../assets/cartaRara.png";
import cartasHeroe from "../assets/cartasHeroe.png";



export const Inicio = ({endPoint}) => {
    const [endP, setEndPoint] = useState(endPoint)
    const {data, isLoading} = useFetchData(endP);
    // const [cartas, setCartas] = useState([])



    return(
        <>
            
            <div className="cont">
                    {isLoading ? <p>Cargando, espere por favor...</p> :

                    (data)? (
                        <div className="cartaContainer">
                            
                            <div><Carta id={cartaComun}  position="left"/></div>
                            <div ><Carta id={cartasHeroe} position="center"/></div>
                            <div ><Carta id={cartaRara} position="right"/></div>
                            <div className="foco heroe"> 
                             <div className="ground heroe-ground"></div>
                            </div>
                        </div>
                        ) : (
                            <h1>No hay cartas disponibles</h1>
                        )}

                  
            </div>
            
        </>
    )

}
/* Rectangle 16 */


