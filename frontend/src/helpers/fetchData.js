// creamos una función asincrona para hacer la petición a la API
export const fetchData = async (endPoint, token, metodo) => {

    // intentamos hacer la petición
    try {

      console.log(token)

      // creamos un objeto con los headers de la petición
      const requestOptions = {
        method: metodo, // o cualquier otro método HTTP que estés utilizando
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };
      
      
      const response = await fetch(`http://localhost:8200/${endPoint}`, requestOptions);

      // guardamos los datos de la respuesta en la variable data, el await es para esperar a que la respuesta se convierta en JSON
      const data = await response.json();
      
      // retornamos los datos en forma de objeto
        return {
            data,
            isLoading: false,
        }
    } catch (error) {
      // si hay un error, lo mostramos en consola
      console.error(error);
    }
}