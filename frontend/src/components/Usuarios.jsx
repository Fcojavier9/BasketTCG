import { useEffect, useState } from "react"

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    
    const fetchUsuarios = async () =>{
        try{
            const response = await fetch("http://localhost:8200/usuarios")
            const data = await response.json()
            console.log(data)
            setUsuarios(data)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUsuarios()
    }, []);
    
    return (
        <>
            <h1>Usuarios</h1>
            <ul>
                {usuarios.map((usuario) => (
                <li key={usuario.id}>{usuario.username}</li>
                ))}
            </ul>
        </>
    );
}