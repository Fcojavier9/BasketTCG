import { useEffect, useState } from "react";
import { useToken } from "../customHooks/useToken";

import "../styles/coleccion.css"
import { Filtro } from "../components/Filtro";
import { Carta } from "../components/Carta";
import { fetchData } from "../helpers/fetchData";
import flechaR from "../assets/flechaR.png";
import flechaL from "../assets/flechaL.png";
// import {Modal} from

const ENDPOINT_COLECCION = "/coleccion";

export const Coleccion = ({ endPoint }) => {
  const [first, setFirst] = useState(1);
  const [last, setLast] = useState(18);
  const [page, setPage] = useState(1);
  const [mostrar, setMostrar] = useState([[]]);
  const [cartas, setCartas] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const handlePage = (direction) => {
    let pagina = page + direction;
    setPage(pagina);
  };
  // const handleColeccion = async () => {
  //     setCartas([])
  //     const token = localStorage.getItem("token");
  //     let endpoint = `fran${ENDPOINT_COLECCION}`
  //     try {

  //         let listado = []
  //         const { data, isLoading } = await fetchData(endpoint, 'GET', token);
  //         data.map(async (item)=>{
  //             const {data, isLoading} = await fetchData(`carta/${item.carta}`, 'GET', token)
  //             listado.push(data)

  //             listado &&  setCartas(listado);
  //         })

  //         setIsLoading(isLoading);
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //     }
  // }
  const handleUnlogued = async () => {
    setCartas([]);

    try {
      const { data, isLoading } = await fetchData("cartas", "GET", null);
      data ? setCartas(data) : setCartas([]);

      setIsLoading(isLoading);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleUnlogued();
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFirst(page === 0 ? 1 : 18 * (page - 1) + 1);
    setLast(page === 0 ? 18 : 18 * (page - 1) + 18);

    if (cartas != undefined) {
      let m = [];
      let l = [];
      let r = [];

      for (let i = first; i <= last; i += 3) {
        let fila = [];

        for (let j = i - 1; j < i + 2; j++) {
          fila.push(cartas[j]);
        }

        i < first + 9 ? l.push(fila) : r.push(fila);
      }
      m.push(l, r);
      setMostrar(m);
    }
  }, [page, cartas]);

  return (
    <>
      {page === 0 ? (
        <div>
          <h1>PORTADA</h1>

          <div className="flecha">
            <img src={flechaR} alt="siguiente" onClick={() => handlePage(1)} />
          </div>
        </div>
      ) : (
        <div>
          <Filtro />
          <div className="coleccion">
            {page > 0 && (
              <div className="flecha">
                <img
                  style={{ marginRight: "50%" }}
                  src={flechaL}
                  alt="anterior"
                  onClick={() => handlePage(-1)}
                />
              </div>
            )}

            <div className="album">
              {mostrar.map((pagina) => (
                <div className="pagina">
                  {pagina.map((fila) => (
                    <div className="fila">
                      {fila.map((card) => (
                        <Carta carta={card} estilo={"cartaColeccion"} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {page < cartas?.length / 18 && (
              <div className="flecha">
                <img
                  src={flechaR}
                  alt="siguiente"
                  onClick={() => handlePage(1)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
