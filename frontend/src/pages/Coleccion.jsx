import { useCallback, useEffect, useState } from "react";
import cartaDorso from "../assets/cartaDorso.png";
import flechaL from "../assets/flechaL.png";
import flechaR from "../assets/flechaR.png";
import { CartaModal } from "../components/CartaModal";
import { LoadingCircle } from "../components/LoadingCircle";
import { fetchData } from "../helpers/fetchData";
import "../styles/coleccion.css";

export const Coleccion = () => {
  const ENDPOINT_COLECCION = localStorage.getItem("id") + "/coleccion";
  const token = localStorage.getItem("token");
  const [cartas, setCartas] = useState();
  const [cantidad, setCantidad] = useState();
  const [coleccion, setColeccion] = useState();
  const [coleccionId, setColeccionId] = useState();
  const [first, setFirst] = useState(1);
  const [last, setLast] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [mostrar, setMostrar] = useState([[]]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCarard, setSelecCard] = useState();
  const [vendida, setVendida] = useState(false);

  const handleOpen = (selected, repes = 0, id) => {
    setSelecCard(selected);
    setCantidad(repes);
    setColeccionId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelecCard("");
    setVendida(false)
    setOpen(false);
  };

  const handlePage = (direction) => {
    const newPage = page + direction;
    setPage(newPage);
    setFirst(newPage === 1 ? 1 : 12 * (newPage - 1) + 1);
    setLast(newPage === 1 ? 12 : 12 * (newPage - 1) + 12);
  };

  const handleColeccion = useCallback(async () => {
    setColeccion([]);
    try {
      const { data, isLoading } = await fetchData(
        ENDPOINT_COLECCION,
        "GET",
        token
      );
      data && setColeccion(data);
      setIsLoading(isLoading);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [ENDPOINT_COLECCION, vendida]);

  const handleUnlogued = useCallback(async () => {
    setCartas([]);

    try {
      const { data, isLoading } = await fetchData("cartas", "GET", null);
      data ? setCartas(data) : setCartas([]);

      setIsLoading(isLoading);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await handleColeccion();
      await handleUnlogued();
      setIsLoading(false);
    };
    getData();
  }, [handleUnlogued, handleColeccion]);

  useEffect(() => {
    if (cartas != undefined) {
      let m = [];
      let l = [];
      let r = [];

      for (let i = first; i <= last; i += 3) {
        let fila = [];

        for (let j = i - 1; j < i + 2; j++) {
          fila.push(cartas[j]);
        }

        i < first + 6 ? l.push(fila) : r.push(fila);
      }
      m.push(l, r);
      setMostrar(m);
    }
  }, [first, cartas]);

  return (
    <>
      {isLoading || Math.ceil(cartas?.length / 12) == 0 || !coleccion ? (
        <LoadingCircle sizeLoading={200} />
      ) : (
        <div>
          <div className="coleccion">
            {page > 0 && (
              <img
                src={flechaL}
                alt="anterior"
                className={`flechaL ${page != 1 && "pulse"}`}
                onClick={() => page != 1 && handlePage(-1)}
              />
            )}

            <div className="album">
              {mostrar.map((pagina, paginaIndice) => (
                <div key={paginaIndice} className="pagina">
                  {pagina.map((fila, filaIndice) => (
                    <div key={filaIndice} className="fila">
                      {fila.map((card, cardIndice) => {
                        let c = coleccion?.find( item => item?.carta === card?.id);
                        return c && c?.cantidad > 0 ? (
                          <img
                            key={cardIndice}
                            src={`src/${card?.img_url}`}
                            className={
                              c.cantidad > 1
                                ? "cartaColeccion repe"
                                : "cartaColeccion"
                            }
                            onClick={() => handleOpen(card, c.cantidad, c.id)}
                          />
                        ) : (
                          <img
                            key={cardIndice}
                            src={cartaDorso}
                            className="cartaColeccion dorso"
                          ></img>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <img
              className={`flechaR ${
                page < Math.ceil(cartas?.length / 12) && "pulse"
              }`}
              src={flechaR}
              alt="siguiente"
              onClick={() =>
                page < Math.ceil(cartas?.length / 12) && handlePage(1)
              }
            />
          </div>
          <CartaModal
            carta={selectedCarard}
            cantidad={cantidad}
            coleccionId={coleccionId}
            open={open}
            handleClose={handleClose}
            vendida={setVendida}
          />
          <div className="pagNum">
            Pagina: {page}/{Math.ceil(cartas.length / 12)}
          </div>
        </div>
      )}
    </>
  );
};
