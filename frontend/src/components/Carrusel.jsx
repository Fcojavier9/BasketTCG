import { useEffect, useState } from "react";
import "../styles/inicio.css"; // Importa el CSS personalizado
import "../styles/cartas.css"; // Importa el CSS de animaciones
import { fetchData } from "../helpers/fetchData";
import { useToken } from "../customHooks/useToken";
import { LoadingCircle } from "./LoadingCircle";

export const Carrusel = () => {
  const [cartas, setCartas] = useState([]);
  const [foco, setFoco] = useState();
  const [suelo, setSuelo] = useState();
  const [animatingR, setAnimatingR] = useState(false);
  const [animatingL, setAnimatingL] = useState(false);

  const [index, setIndex] = useState(0);
  const [iCenter, setICenter] = useState();
  const [iLeft, setILeft] = useState();
  const [iRight, setIRight] = useState();
  const [underLeft, setUnderLeft] = useState();
  const [underRight, setUnderRight] = useState();

  const { isValidToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);
  let token = null;

  const ENDPOINT_COLECCION = `${localStorage.getItem("id")}/coleccion`;

  const handleUnlogued = async () => {
    setCartas([]);

    try {
      const { data, isLoading } = await fetchData("cartas", "GET", token);
      data ? setCartas(data.sort(() => Math.random() - 0.5)) : setCartas([]);
      setIsLoading(isLoading);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleColeccion = async () => {
    setCartas([]);
    const token = localStorage.getItem("token");

    try {
      let listado = [];
      const { data, isLoading } = await fetchData(
        ENDPOINT_COLECCION,
        "GET",
        token
      );

      data.map(async (item) => {
        const { data } = await fetchData(`carta/${item.carta}`, "GET", token);

        listado.push(data);
      });

      listado && setCartas(listado);
      setIsLoading(isLoading);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyDown = (direction) => {
    direction.key === "ArrowLeft" && toLeft();
    direction.key === "ArrowRight" && toRight();
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
      setUnderRight(cartas[(index + 2) % cartas.length]);
      setUnderLeft(cartas[(index + cartas.length - 2) % cartas.length]);
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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cartas, iCenter]);

  const toLeft = () => {
    if (cartas.length > 0) {
      setAnimatingR(false);
      setAnimatingL(true);
      setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === 0 ? cartas.length - 1 : prevIndex - 1
          ),
        500
      );
      setTimeout(() => setAnimatingL(false), 500);
    }
  };

  const toRight = () => {
    if (cartas.length > 0) {
      setAnimatingL(false);
      setAnimatingR(true);
      setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === cartas.length - 1 ? 0 : prevIndex + 1
          ),
        500
      );
      setTimeout(() => setAnimatingR(false), 500);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(toRight, 7000);
    return () => clearInterval(intervalId);
  }, [cartas]);

  return (
    <>
      {!foco || !iCenter || isLoading ? (
        <LoadingCircle sizeLoading={200} />
      ) : (
        <div className="cont">
          <div className={foco}>
            {animatingL && <img
              src={`src/${underLeft?.img_url}`}
              alt="carta"
              className={`left`}
            />}
            <img
              src={`src/${iLeft?.img_url}`}
              alt="carta"
              className={`left ${animatingL ? "animate-left" : ""}`}
              onClick={toLeft}
            />

           {animatingR && <img
              src={`src/${underRight?.img_url}`}
              alt="carta"
              className="right"
            />}

            <img
              src={`src/${iRight?.img_url}`}
              alt="carta"
              className={`right ${animatingR ? "animate-right" : ""}`}
              onClick={toRight}
            />

            <img
              src={`src/${iCenter?.img_url}`}
              alt="carta"
              className={`center ${animatingR ? "animate-centerRight" : ""}  ${
                animatingL ? "animate-centerLeft" : ""
              }`}
              onKeyDown={(e) => handleKey(e)}
              tabIndex="0"
            />

            <div className={suelo} />
          </div>
        </div>
      )}
    </>
  );
};
