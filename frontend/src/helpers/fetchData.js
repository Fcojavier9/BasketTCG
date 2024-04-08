// creamos una función asincrona para hacer la petición a la API
export const fetchData = async (endPoint) => {

    // intentamos hacer la petición
    try {
      // guardamos la respuesta en la variable response, el await es para esperar a que la petición termine
      const response = await fetch(`http://localhost:8200/${endPoint}`)
      // guardamos los datos de la respuesta en la variable data, el await es para esperar a que la respuesta se convierta en JSON
      const data = await response.json()
      
      // retornamos los datos en forma de objeto
        return {
            data,
            isLoading: false
        }
    } catch (error) {
      // si hay un error, lo mostramos en consola
      console.error(error)
    }
}