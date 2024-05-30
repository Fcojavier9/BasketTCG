import { useEffect, useState } from "react";
import "../styles/inicio.css"; // importamos css personalizado
import { fetchData } from "../helpers/fetchData";
import { useToken } from "../customHooks/useToken";
import { LoadingCircle } from "./LoadingCircle";

const ENDPOINT_COLECCION = "/coleccion";
const ENDPOINT_CARTAS = "cartas";

export const Carrusel = () => {
  const [cartas, setCartas] = useState();
  const [foco, setFoco] = useState();
  const [suelo, setSuelo] = useState();

  const [index, setIndex] = useState(0);
  const [iCenter, setICenter] = useState();
  const [iLeft, setILeft] = useState();
  const [iRight, setIRight] = useState();

  const { isValidToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);
  let token = null;

  // cartas.push(
  //    {clase:"heroe", imagen: cartasHeroe} ,
  //    {clase:"rara", imagen: cartaRara} ,
  //    {clase:"comun", imagen: cartaComun} ,
  // );

  const handleUnlogued = async () => {
    setCartas([]);

    try {
      const { data, isLoading } = await fetchData(
        ENDPOINT_CARTAS,
        "GET",
        token
      );
      data ? setCartas(data) : setCartas([]);

      setIsLoading(isLoading);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleColeccion = async () => {
    setCartas([]);

    const token = localStorage.getItem("token");
    let endpoint = `fran${ENDPOINT_COLECCION}`;

    try {
      let listado = [];
      const { data, isLoading } = await fetchData(endpoint, "GET", token);

      data.map(async (item) => {
        const { data, isLoading } = await fetchData(
          `carta/${item.carta}`,
          "GET",
          token
        );

        listado.push(data);
        listado && (setCartas(listado));
      });

      setIsLoading(isLoading);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchDataCartas = async () => {
      isValidToken ? await handleColeccion() : await handleUnlogued();
    };
    fetchDataCartas();
  }, [isValidToken]);

  useEffect(() => {
    if (cartas != undefined) {
      setICenter(cartas[index]);
      setIRight(cartas[(index + 1) % cartas.length]);
      setILeft(cartas[(index + cartas.length - 1) % cartas.length]);
    }
  }, [index, cartas]);

  useEffect(() => {
    switch (iCenter?.rarity) {
      case "heroe":
        setFoco("foco heroe");
        setSuelo("ground heroe-ground");
        break;

      case "rara":
        setFoco("foco rara");
        setSuelo("ground rara-ground");
        break;

      case "comun":
        setFoco("foco comun");
        setSuelo("ground comun-ground");
        break;
    }
  }, [iCenter, cartas]);


  const toLeft = () => {
    if (cartas !== undefined) {
      setIndex(() =>
        cartas?.indexOf(iLeft) === 0 ? cartas?.length - 1 : cartas.indexOf(iLeft)
      );
    }
  };

  const toRight = () => {
    if (cartas !== undefined) {
      setIndex(() =>
        cartas.indexOf(iRight) === cartas.length ? 0 : cartas?.indexOf(iRight)
      );
    }
  };

  return (
    <>
      {foco === undefined || cartas === undefined ? (
        <LoadingCircle sizeLoading={200} />
      ) : (
        <div className="cont">
          <div className={foco}>
            <img
             src={`src/${iLeft?.img_url}`}
              alt="carta"
              className="left"
              onClick={toLeft}
            />

            <img
              src={`src/${iCenter?.img_url}`} 
              alt="carta" 
              className="center" 
            />

            <img
              src={`src/${iRight?.img_url}`}
              alt="carta"
              className="right"
              onClick={toRight}
            />
            
            <div className={suelo} />
          </div>
        </div>
      )}
    </>
  );
};
