import { useState, useEffect } from "react";
import { fetchData } from "../helpers/fetchData";

//creamos un custom hook para hacer la petición a la API
export const useFetchData = (endPoint, metodo, token, body) => {

  // creamos un estado para guardar los datos de la API
  const [data, setData] = useState([]);// esto es como tener una variable array vacio y una funcion para setearla
  
  // creamos un estado para guardar el estado de carga de la petición a la API 
  const [isLoading, setIsLoading] = useState(true);

  // creamos una función asincrona para hacer la petición a la API
  const getData = async () =>{
    // llamamos a la función fetchData de helpers, pasándole el endPoint
    const {data, isLoading} = await fetchData(endPoint, metodo, token, body);

    // actualizamos el estado con los datos de la respuesta
    setData(data);

    // cambiamos el estado de carga a false para indicar que ya terminó
    setIsLoading(isLoading);
  }

  // useEffect es un hook que se ejecuta cuando el componente se monta o se actualiza
  // en este caso, llamamos a la función fetchData
  useEffect(() => {
    setIsLoading(true); // seteamos isLoading a true
    setData([]); // seteamos data a un array vacio, para que no hayan conflictos con los datos anteriores
    getData();
  }, [endPoint]) // la función se ejecuta cuando endPoint cambia, ya que es la dependencia pasada al useEffect

  // devolvemos un objeto con
  return {
    data, // variable que guarda los datos de la API
    isLoading, // variable que guarda el estado de carga
  }
}
