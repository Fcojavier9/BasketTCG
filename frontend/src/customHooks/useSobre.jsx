import { useState } from "react";
import { fetchData } from "../helpers/fetchData";
import { getRandomCard } from "../helpers/getRandomCard";
import { getRandomNumber } from "../helpers/getRandomNumber";

export const useSobre = ({ sobres, saldo }) => {
    const id_usuario = localStorage.getItem('id');
    const [animationClass, setAnimationClass] = useState('');
    const [body, setBody] = useState({});
    const [calculoSaldo, setCalculoSaldo] = useState(0);
    const [carta, setCarta] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [confetti, setConffeti] = useState(false);
    const [isLoadingFetch, setIsLoadingFetch] = useState();
    const [source, setSource] = useState(`/src/assets/sobre.png`);

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
                const { isLoading } = await fetchData(endpoint, 'PUT', localStorage.getItem('token'), bodyUser);
                setIsLoadingFetch(isLoading);
            }
        }
    }

    return{
        animationClass,
        body,
        calculoSaldo,
        carta,
        clicked,
        confetti,
        id_usuario,
        isLoadingFetch,
        source,
        changeImagen,
        setConffeti,
    }
}