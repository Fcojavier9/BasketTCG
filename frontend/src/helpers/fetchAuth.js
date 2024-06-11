
const apiUrl = import.meta.env.VITE_API_URL;

// creamos una función asincrona para hacer la petición a la API
export const fetchAuth = async (body) => {

  // creamos un objeto con las opciones de la petición
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  requestOptions.body = JSON.stringify(body);
  

  // intentamos hacer la petición
  try {

    const response = await fetch(
      `${apiUrl}auth/login`,
      requestOptions
    );

    // si la respuesta es 400, retornamos un mensaje de error
    if(response.status === 400) return { data: "", isToken: false}
        
    // si la respuesta es 401, retornamos un mensaje de error
    if(response.status === 401) return { data: "", isToken: false}

    //sino,  guardamos los datos de la respuesta en la variable data, el await es para esperar a que la respuesta se convierta en JSON
    const resp = await response.json();

    const token = resp.token;
    const id = resp.id;


    // retornamos los datos en forma de objeto
    return {
      token,
      id,
      isToken: true,
    };
  } catch (error) {
    // si hay un error, lo mostramos en consola
    console.error(error);
  }
};
