import { fetchData } from "./fetchData";

export const handleAllCartas = async (
  setCartas,
  setAll,
  setIsLoading,
) => {
  setCartas([]);

  try {
    const { data, isLoading } = await fetchData("cartas", "GET");
    data && data ? setAll(data.sort(() => Math.random() - 0.5)) : setAll([]);
    setIsLoading(isLoading);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
