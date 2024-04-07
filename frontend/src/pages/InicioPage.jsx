// importamos el customHooks a utilizar
import { useFetchData } from "../customHooks/useFetchData";

// creamos el componente Usuarios, como no pongo default, puedo importarlo con llaves en la clase que lo llame
export const InicioPage = ({endPoint}) => {

    // utilizamos el custom hook useFetchData, pasándole el endPoint
    // destructuramos data e isLoading del objeto que retorna useFetchData
    // data es un array con los datos de la API
    // isLoading es un booleano que indica si la petición a la API está en curso
    const {data, isLoading} = useFetchData(endPoint)
    
    // retornamos un fragmento con un título y una lista de usuarios
    return (
        <>
            <h1>Usuarios</h1>
            {/* si isLoading es true, mostramos un mensaje de carga */
            isLoading && <p>Cargando, espere por favor...</p> // usamos una "condicion ternaria" para mostrar el mensaje de carga
            /* si isLoading es false, mostramos el título y la lista de usuarios */}            
            <ol>
                {data.map((data) => (
                <li key={data.id}>Usuario: <b>{data.username}</b>, con el correo: <b>{data.email}</b></li>
                ))}
            </ol>
        </>
    );
}