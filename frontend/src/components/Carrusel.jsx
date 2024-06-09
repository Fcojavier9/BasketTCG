import { useEffect } from "react";
import { useCarrusel } from "../customHooks/useCarrusel";
import { LoadingCircle } from "./LoadingCircle";
import "../styles/inicio.css";
import "../styles/cartas.css";

export const Carrusel = ({ isValidToken }) => {
  const {
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
  } = useCarrusel({ isValidToken });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cartas, iCenter]);

  useEffect(() => {
    const intervalId = setInterval(
      () => toRight(cartas, setAnimatingL, setAnimatingR, setIndex),
      7000
    );
    return () => clearInterval(intervalId);
  }, [cartas]);

  return (
    <>
      {!foco || !iCenter || isLoading ? (
        <LoadingCircle sizeLoading={200} />
      ) : (
        <div className="cont">
          <div className={foco}>
            {animatingL && (
              <img
                src={`src/${underLeft?.img_url}`}
                alt="carta"
                className={`left`}
              />
            )}
            <img
              src={`src/${iLeft?.img_url}`}
              alt="carta"
              className={`left ${animatingL ? "animate-left" : ""}`}
              onClick={() =>
                toLeft(cartas, setAnimatingL, setAnimatingR, setIndex)
              }
            />

            {animatingR && (
              <img
                src={`src/${underRight?.img_url}`}
                alt="carta"
                className="right"
              />
            )}

            <img
              src={`src/${iRight?.img_url}`}
              alt="carta"
              className={`right ${animatingR ? "animate-right" : ""}`}
              onClick={() =>
                toRight(cartas, setAnimatingL, setAnimatingR, setIndex)
              }
            />

            <img
              src={`src/${iCenter?.img_url}`}
              alt="carta"
              className={`center ${animatingR ? "animate-centerRight" : ""}  ${
                animatingL ? "animate-centerLeft" : ""
              }`}
              tabIndex="0"
            />

            <div className={suelo} />
          </div>
        </div>
      )}
    </>
  );
};
