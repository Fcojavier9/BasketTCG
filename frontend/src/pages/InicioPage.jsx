// importamos los hooks a utilizar
import { useEffect, useState } from "react"

// creamos el componente Usuarios, como no pongo default, puedo importarlo con llaves en la clase que lo llame
export const InicioPage = () => {

    // creamos un estado para guardar los usuarios
    const [usuarios, setUsuarios] = useState([])
    
    // creamos una función asincrona para hacer la petición a la API
    const fetchUsuarios = async () =>{

        // intentamos hacer la petición
        try{
            // guardamos la respuesta en la variable response, el await es para esperar a que la petición termine
            const response = await fetch("http://localhost:8200/usuarios")
            // guardamos los datos de la respuesta en la variable data, el await es para esperar a que la respuesta se convierta en JSON
            const data = await response.json()
            // actualizamos el estado usuarios con los datos de la respuesta
            setUsuarios(data)

        }catch(error){ // si hay un error, lo mostramos en consola
            console.error(error)
        }
    }

    // useEffect es un hook que se ejecuta cuando el componente se monta o se actualiza 
    // en este caso, llamamos a la función fetchUsuarios
    useEffect(() => {
        fetchUsuarios()
    }, []);
    
    // retornamos un fragmento con un título y una lista de usuarios
    return (
        <>
            <h1>Usuarios</h1>
            <ol>
                {usuarios.map((usuario) => (
                <li key={usuario.id}>Usuario: <b>{usuario.username}</b>, con el correo: <b>{usuario.email}</b></li>
                ))}
            </ol>
        </>
    );
}