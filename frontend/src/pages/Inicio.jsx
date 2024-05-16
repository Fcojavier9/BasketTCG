import { useEffect, useState } from "react"
import "../styles/inicio.css" // importamos css personalizado
import { Carta } from '../components/Carta'
import { fetchData } from "../helpers/fetchData";
import { useToken } from "../customHooks/useToken";

import cartaComun from "../assets/cartaComun.png";
import cartaRara from "../assets/cartaRara.png";
import cartasHeroe from "../assets/cartasHeroe.png";
import { LoadingCircle } from "../components/LoadingCircle";

const ENDPOINT_COLECCION = '/coleccion';
const ENDPOINT_CARTAS = 'cartas';


export const Inicio = () => {
    const [cartas, setCartas] = useState();
    const [foco, setFoco] = useState();
    const [suelo, setSuelo] = useState();
 
    const [index, setIndex] = useState(0)
    const [iCenter, setICenter] = useState()
    const [iLeft, setILeft] = useState()
    const [iRight, setIRight] = useState()

    const {isValidToken} = useToken();
    const [isLoading, setIsLoading] = useState(false);
    let token = null;

    const handleUnlogued = async () => {
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
            
            let listado = []
            const { data, isLoading } = await fetchData(endpoint, 'GET', token);
            data.map(async (item)=>{
                const {data, isLoading} = await fetchData(`carta/${item.carta}`, 'GET', token)
                listado.push(data)
                listado && await setCartas(listado);
            })
            
            
            setIsLoading(isLoading);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
      
    useEffect(() => {
        const fetchDataCartas = async () => {
            isValidToken ? await handleColeccion() : await handleUnlogued()
        }
        fetchDataCartas()

    }, [isValidToken]);

    

    useEffect(() => {
        if(cartas != undefined){

            setICenter(cartas[index]);
            setIRight(cartas[(index + 1 ) % cartas.length]);
            setILeft(cartas[(index + cartas.length - 1) % cartas.length]);
        }
        

        
    //    }

    },[index,cartas])

    useEffect(()=>{
        
        switch(iCenter?.rarity){
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
    },[iCenter,cartas])
    
     const toLeft = () => {
        if(cartas!== undefined){

            setIndex(() => (
                (cartas?.indexOf(iLeft) === 0) ? (cartas?.length - 1) : (cartas.indexOf(iLeft) )
            ));
            console.log(index)
            console.log('izquierda', iLeft)
            
        }

      };
    
      const toRight = () => {
        if(cartas!== undefined){
        setIndex(() => (
            (cartas.indexOf(iRight) === cartas.length)? 0 :( cartas?.indexOf(iRight) )
        ));
        console.log(cartas?.indexOf(iRight))
        console.log('cartas', cartas)
        console.log('iRight', iRight)
    }
      };
      

      console.log('foco',foco)
      console.log('caRTAS',cartas)
    return(
    <>
  
    {
    
    (foco===undefined || cartas === undefined)? (
        <LoadingCircle sizeLoading={200}/>
    )
    :(
        <div className="cont">
            {/* <p>Carta: {iCenter}</p> */}
            <div className= {foco} >
                <div className={suelo}/>
        <img src={cartasHeroe} alt="carta" className="center"/> 
        <img src={cartasHeroe} alt="carta" className="right" onClick={toRight}/> 
        <img src={cartasHeroe} alt="carta" className="left" onClick={toLeft}/> 

                {/* <Carta 
                    carta={iCenter}
                    estilo=
                    />

                <Carta 
                    carta={iRight}
                    estilo=
                    accion={toLeft}/>

                <Carta 
                    carta={iLeft}
                    estilo=
                    accion={toRight}/> */}
            </div>
        </div>
     )} 
    
    </>
    
    )
}