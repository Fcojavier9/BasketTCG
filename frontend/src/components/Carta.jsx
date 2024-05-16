// importamos el customHooks a utilizar
import "../styles/cartas.css";
import cartaComun from "../assets/cartaComun.png";
import cartaRara from "../assets/cartaRara.png";
import cartasHeroe from "../assets/cartasHeroe.png";
import { useEffect, useState } from "react";
import { fetchData } from "../helpers/fetchData";

// creamos el componente Usuarios, como no pongo default, puedo importarlo con llaves en la clase que lo llame
export const Carta = ({carta, estilo, accion}) => {
    const [imagen, setImagen] = useState()
    
    // ------------- A espera de tener imagenes de cartas ----------//
    // se eliminara o modificara entonces
    useEffect(() => {
        if(carta !== undefined ){
        switch (carta?.rarity) {
            case "heroe":
                setImagen(cartasHeroe);
                break;
            case "rara":
                setImagen(cartaRara);
                break;
            case "comun":
                setImagen(cartaComun);
                break;
        }
    } 
}, [carta]);
    return (
        //le coloco el tamaño de la imagen por motivo de comodidad ya que de momento sera lo unico que le editare aqui
        <img src={imagen} alt="carta" className={estilo} onClick={accion}/> 
    )
}