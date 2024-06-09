import { fetchData } from "./fetchData";

export const handleColeccion = async (
  setCartas,
  all,
  token,
  setIsLoading,
  ENDPOINT_COLECCION
) => {
  setCartas([]);

  try {
    let listado = [];

    const { data, isLoading } = await fetchData(
      ENDPOINT_COLECCION,
      "GET",
      token
    );

    data
      ? data?.map((item) => {
          let c = all.find((card) => card.id === item.carta);

          c && listado.push(c);
          listado && setCartas(listado);
        })
      : setCartas(all);

    setIsLoading(isLoading);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
