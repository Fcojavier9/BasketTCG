// creamos una función asincrona para hacer la petición a la API
export const fetchData = async (endPoint, metodo, token = null, body = null) => {

  // si no hay token y el endPoint no es auth/login, retornamos un mensaje de error
  if (token === null && endPoint !== "auth/login") {
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

  // si el endpoint es distinto de login, añadimos el token ya que sera necesario
  if (endPoint !== "auth/login") requestOptions.headers["Authorization"] = `Bearer ${token}`;

  // si el body no es null, lo añadimos a las opciones de la petición
  if (body !== null) requestOptions.body = JSON.stringify(body);

  // intentamos hacer la petición
  try {
    const response = await fetch(
      `http://localhost:8200/${endPoint}`,
      requestOptions
    );

    // si la respuesta es 400, retornamos un mensaje de error
    if(response.status === 400) return {data: "Error, Bad request", isLoading: false};
    
    // si la respuesta es 401, retornamos un mensaje de error
    if(response.status === 401) return {data: "Error, Unauthorized", isLoading: false};

    //sino,  guardamos los datos de la respuesta en la variable data, el await es para esperar a que la respuesta se convierta en JSON
    const data = await response.json();

    // retornamos los datos en forma de objeto
    return {
      data,
      isLoading: false,
    };
  } catch (error) {
    // si hay un error, lo mostramos en consola
    console.error(error);
  }
};
