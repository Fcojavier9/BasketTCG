import { useEffect, useState } from "react"
import "../styles/inicio.css" // importamos css personalizado
import { Carta } from '../components/Carta'
import { fetchData } from "../helpers/fetchData";
import cartaComun from "../assets/cartaComun.png";
import cartaRara from "../assets/cartaRara.png";
import cartasHeroe from "../assets/cartasHeroe.png";
import { useToken } from "../customHooks/useToken";
import { useFetchData } from "../customHooks/useFetchData";

export const Inicio = ({endPoint}) => {
    const [endP, setEndPoint] = useState('/cartas');
    const [token, setToken] = useState('');
    const [cartas, setCartas] = useState([]);
    const [foco, setFoco] = useState();
    const [suelo, setSuelo] = useState();
    const [rareza, setRareza] = useState();
    const {isValidToken} = useToken();
    const [isLogin, setIsLogin] = useState(isValidToken);

    const {data, isLoading} = useFetchData(endP, 'GET', token);

    // cartas.push(
    //    {clase:"heroe", imagen: cartasHeroe} ,
    //    {clase:"rara", imagen: cartaRara} ,
    //    {clase:"comun", imagen: cartaComun} ,
    // );
      
    useEffect(() => {
        isValidToken? handleColeccion() : handleUnlogued()
        console.log(isValidToken)

    }, [isValidToken]);

    const handleColeccion = () => {
        let total = [] 

        setEndPoint(endPoint)
        setToken(localStorage.getItem("token"))  
        console.log(endP)

        data.map((elemento) => (
            total.push(elemento.carta)
        )) 
        setCartas(total)
        
    }
    const handleUnlogued = () => {
        let total = [] 

        setEndPoint('/cartas')
        setToken(null) 
        data.map((elemento) => (
            total.push(elemento.id)
        )) 
        setCartas(total)    
    }
    
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


