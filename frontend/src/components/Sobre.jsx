import "../styles/sobre.css";
import { useEffect, useState } from "react";
import { getRandomCard } from "../helpers/getRandomCard";
import { fetchData } from "../helpers/fetchData";
import { getRandomNumber } from "../helpers/getRandomNumber";

const Sobre = ({saldo, sobres, setNumSobres}) => {
    const [source, setSource] = useState(`/src/assets/sobre.png`);
    const [clicked, setClicked] = useState(false);
    const [confetti, setConffeti] = useState(false);
    const [animationClass, setAnimationClass] = useState('');
    const [body, setBody] = useState({});
    const [isLoadingFetch, setIsLoadingFetch] = useState();
    const id_usuario = localStorage.getItem('id');
    const [calculoSaldo, setCalculoSaldo] = useState(0);
    const [carta, setCarta] = useState(0);

    const changeImagen = async () => {
        if (!clicked) {
            setClicked(true);
            const calculo = getRandomCard();
            setCarta(calculo);
            setAnimationClass('animate');
            setTimeout(() => {
                setSource(`/src/assets/cartas/${calculo}.png`);
                setAnimationClass('animate2');
            }, 1000);

            const endpoint = calculo > 0 ? `${id_usuario}/${calculo}/coleccion` : `updateUsuario/${id_usuario}`
            if(calculo > 0){
                const {data, isLoading} = await fetchData(endpoint, 'GET', localStorage.getItem('token'))
                setIsLoadingFetch(isLoading);
                data && setBody(data);
            }else{
                const saldoAleatorio = getRandomNumber();
                setCalculoSaldo(saldoAleatorio);
                const nuevosSobres = sobres - 1;
                const saldoActualizado = saldo + saldoAleatorio;
                const bodyUser = {sobres: nuevosSobres, saldo: saldoActualizado};
                const {data, isLoading} = await fetchData(endpoint, 'PUT', localStorage.getItem('token'), bodyUser);
                setIsLoadingFetch(isLoading);
            }

        }
    }

    useEffect(() => {
        const actualizar = async () => {
            if(body && !isLoadingFetch){
                if(carta > 0){
                    const nuevaCantidad = body.cantidad + 1;
                    const endpointActualizarColeccion = `coleccion/${body.id}`;

                    const nuevoBody = {cantidad: nuevaCantidad}
                    await fetchData(endpointActualizarColeccion, 'PUT', localStorage.getItem('token'), nuevoBody);

                    // actualizar los sobres despues si no al llegar a 0 el ultimo no sale.
                    const nuevosSobres = sobres - 1;
                    await fetchData( `updateUsuario/${id_usuario}`, 'PUT', localStorage.getItem('token'), {sobres: nuevosSobres});
                }
            }
        }
        
        actualizar();
    }, [body, isLoadingFetch]);

    useEffect(() => {
        if(clicked){
            setTimeout(() => {
                setConffeti(true);
            }, 1500);

        }
    }, [clicked])

    return (
        <div className="sobre">
            <div className={`sobre_carta ${animationClass}`}>
                <img src={source} alt="sobre" onClick={changeImagen} />
                {confetti && <img src="/src/assets/confeti.gif" className="confetti-explosion" />}
                {confetti && <img src="/src/assets/confeti.gif" className="confetti-explosion2" />}
                {calculoSaldo > 0 && <h2 className="saldo">+{calculoSaldo} BP</h2>}
                {confetti && sobres > 1 && <div className="boton-div"><button className="boton-sobre" onClick={() => (window.location.href = "/")}>Guardar premio y abrir otro sobre</button></div>}
                {confetti && sobres === 1 && <div className="boton-div"><button className="boton-sobre" onClick={() => (window.location.href = "/")}>Guardar premio e ir a Inicio</button></div>}
            </div>
        </div>
    )
}

export default Sobre;
