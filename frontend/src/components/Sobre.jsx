import { useEffect } from "react";
import { useSobre } from "../customHooks/useSobre";
import { fetchData } from "../helpers/fetchData";
import "../styles/sobre.css";

const Sobre = ({saldo, sobres}) => {
    const {
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
    } = useSobre({ sobres, saldo});

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
