import { useEffect, useState } from "react"
import "../styles/inicio.css" // importamos css personalizado
import { Carta } from '../components/Carta'
import { fetchData } from "../helpers/fetchData";
import cartaComun from "../assets/cartaComun.png";
import cartaRara from "../assets/cartaRara.png";
import cartasHeroe from "../assets/cartasHeroe.png";
import { useToken } from "../customHooks/useToken";
import { useFetchData } from "../customHooks/useFetchData";

const ENDPOINT_COLECCION = '/coleccion';
const ENDPOINT_CARTAS = 'cartas';

export const Inicio = () => {
    const [cartas, setCartas] = useState();
    const [foco, setFoco] = useState();
    const [suelo, setSuelo] = useState();
    const [rareza, setRareza] = useState();
    const {isValidToken} = useToken();
    const [isLoading, setIsLoading] = useState(false);
    let token = null;

    // cartas.push(
    //    {clase:"heroe", imagen: cartasHeroe} ,
    //    {clase:"rara", imagen: cartaRara} ,
    //    {clase:"comun", imagen: cartaComun} ,
    // );

    const handleUnlogged = async () => {
        setCartas([])
        try {
            
            const { data, isLoading } = await fetchData(ENDPOINT_CARTAS, 'GET', token);
            data ? setCartas(data) : setCartas([]);
            setIsLoading(isLoading);
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
    const handleColeccion = async () => {
        setCartas([])
        const token = localStorage.getItem("token");
        let endpoint = `fran${ENDPOINT_COLECCION}`
        try {
            
            const { data, isLoading } = await fetchData(endpoint, 'GET', token);
            data && setCartas(data);
            setIsLoading(isLoading);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
      
    useEffect(() => {
        const fetchData = async () => {
            isValidToken ? await handleColeccion() : await handleUnlogged()
        }
        fetchData()
    }, [isValidToken]);

    
    
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

     console.log(cartas)

    return(
    <>

    {isLoading? (
        <h1>Cargando...</h1>
    ):(
        <div className="cartaContainer">
        {/* <div className= {foco} >
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
            </div>  */}
           
    </div>
    )}
    
    </>
    
    )
}


