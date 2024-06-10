import { useEffect, useState } from "react";
import { handleAllCartas } from "../helpers/handleAllCartas";
import { handleColeccion } from "../helpers/handleColeccion";
import { toLeft } from "../helpers/toLeft";
import { toRight } from "../helpers/toRight";

export const useCarrusel = ({ isValidToken }) => {
  const ENDPOINT_COLECCION = `${localStorage.getItem("id")}/coleccion`;
  let token = localStorage.getItem("token");

  const [all, setAll] = useState([]);
  const [animatingL, setAnimatingL] = useState(false);
  const [animatingR, setAnimatingR] = useState(false);
  const [cartas, setCartas] = useState([]);
  const [foco, setFoco] = useState();
  const [iCenter, setICenter] = useState();
  const [iLeft, setILeft] = useState();
  const [index, setIndex] = useState(0);
  const [iRight, setIRight] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [suelo, setSuelo] = useState();
  const [underLeft, setUnderLeft] = useState();
  const [underRight, setUnderRight] = useState();

  useEffect(() => {
    return async () =>
      await handleAllCartas(setCartas, setAll, setIsLoading);
  }, []);

  useEffect(() => {
    const fetchDataCartas = async () => {
      await handleColeccion(
        setCartas,
        all,
        token,
        setIsLoading,
        ENDPOINT_COLECCION
      );
    };

    isValidToken ? fetchDataCartas() : setCartas(all);
  }, [ENDPOINT_COLECCION, all, isValidToken]);

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

  const handleKeyDown = (direction) => {
    direction.key === "ArrowLeft" && toLeft(cartas, setAnimatingL, setAnimatingR, setIndex);
    direction.key === "ArrowRight" && toRight(cartas, setAnimatingL, setAnimatingR, setIndex);
  };

  return {
    animatingL,
    animatingR,
    cartas,
    foco,
    iCenter,
    iLeft,
    isLoading,
    iRight,
    suelo,
    underRight,
    underLeft,
    handleKeyDown,
    setAnimatingL,
    setAnimatingR,
    setIndex,
    toLeft,
    toRight,
  };
};
