// importamos el customHooks a utilizar
import "../styles/cartas.css"

// creamos el componente Usuarios, como no pongo default, puedo importarlo con llaves en la clase que lo llame
export const Carta = ({elemento, position, tipo }) => {

    const imagen = elemento.imagen;
    const sitio = position;

    if(tipo !== undefined){
        tipo(elemento.clase)
    }
             
    return (
        //le coloco el tamaño de la imagen por motivo de comodidad ya que de momento sera lo unico que le editare aqui
        <img src={imagen} alt="carta" className={sitio}/> 
    )
}