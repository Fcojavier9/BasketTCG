const apiUrl = "http://localhost:8200/";

// creamos una función asincrona para hacer la petición a la API
export const fetchData = async (endPoint, metodo, token = null, body = null) => {

  // si no hay token y el endPoint no es auth/login, retornamos un mensaje de error
  if (token === null && endPoint !== "insertUsuario" && endPoint !== "cartas") {
    return {
      data: "Es necesario estar logueado para acceder a esta información",
      isLoading: false,
    };
  }

  // creamos un objeto con las opciones de la petición
  const requestOptions = {
    method: metodo, // o cualquier otro método HTTP que estés utilizando
    headers: {
      "Content-Type": "application/json",
    },
  };

  // si el token no es null, lo añadimos a las cabeceras
  if (token !== null) {
    requestOptions.headers["Authorization"] = `Bearer ${token}`;
  }

  // si el body no es null, lo añadimos a las opciones de la petición
  if (body !== null) requestOptions.body = JSON.stringify(body);

  // intentamos hacer la petición
  try {
    const response = await fetch(
      `${apiUrl}${endPoint}`,
      requestOptions
    );

    // si la respuesta es 400, retornamos un mensaje de error
    if(response.status === 400){
      const data = await response.json();
      return {data: data.error, isLoading: false, error: 400};
    };
    
    // si la respuesta es 401, retornamos un mensaje de error
    if(response.status === 401){
      const data = await response.json();
      return {data: data.error, isLoading: false, error: 400};
    };

    // retornamos los datos en forma de objeto
    try{
      const data = await response.json();
      return {data, isLoading: false, error: false};
    }catch(error){
      return {data: "datos devueltos en formato distinto a JSON", isLoading: false, error: false};
    }
  } catch (error) {
    // si hay un error, lo mostramos en consola
    console.error(error);
  }
};
