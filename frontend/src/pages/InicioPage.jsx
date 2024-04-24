// importamos el customHooks a utilizar
import { useState } from "react";
import { useFetchData } from "../customHooks/useFetchData";

// creamos el componente Usuarios, como no pongo default, puedo importarlo con llaves en la clase que lo llame
export const InicioPage = ({endPoint, token, metodo}) => {
    // creamos un estado para guardar el endPoint
    const [endP, setEndP] = useState(endPoint); // [variable, funcion para setearla] = useState(valor inicial de la variable)

    // utilizamos el custom hook useFetchData, pasándole el endPoint
    // destructuramos data e isLoading del objeto que retorna useFetchData
    // data es un array con los datos de la API
    // isLoading es un booleano que indica si la petición a la API está en curso
    const {data, isLoading} = useFetchData(endP, metodo, token );

    const typeData = typeof data;

    const handleFetch = () => {
        setEndP("cartas");
    }
    
    // retornamos un fragmento con un título y una lista de usuarios
    return (
        <>
            <h1>Usuarios</h1>
            {/* si isLoading es true, mostramos un mensaje de carga */
            isLoading && <p>Cargando, espere por favor...</p> // usamos una "condicion ternaria" para mostrar el mensaje de carga
            /* si isLoading es false, mostramos el título y la lista de usuarios */}            
            <ol>
                { typeData === "object" && /* Utilizamos un ternario dentro de un ternario */
                    data.map((dato) => ((endP === "usuarios")
                    ? <li key={dato.id}>Usuario: <b>{dato.username}</b>, con el correo: <b>{dato.email}</b></li>
                    : (isLoading) 
                        ?<p>Cargando, espere por favor...</p>
                        :<li key={dato.id}>Nombre jugador: <b>{dato.nombre}</b></li>   
                    ))
                }

                {typeData === "string" &&/* Utilizamos un ternario dentro de un ternario */
                    <li>{data}</li>  
                }
            </ol>
            <button onClick={handleFetch}>Cartas</button>
        </>
    );
}