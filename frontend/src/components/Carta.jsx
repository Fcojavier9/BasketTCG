// importamos el customHooks a utilizar
import "../styles/cartas.css"

// creamos el componente Usuarios, como no pongo default, puedo importarlo con llaves en la clase que lo llame
export const Carta = ({id, position}) => {

    const imagen = id
    const stilo = position

    // const carta = useFetchData(endP)


    console.log("carta",position)
    
    return (
        //le coloco el tamaño de la imagen por motivo de comodidad ya que de momento sera lo unico que le editare aqui
        <img src={imagen} alt="carta" className={stilo}/> 
    )
}