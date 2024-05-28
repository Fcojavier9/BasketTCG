import { useEffect, useState } from "react";
import { useToken } from "../customHooks/useToken";

import "../styles/coleccion.css";
import { Filtro } from "../components/Filtro";
import { Carta } from "../components/Carta";
import { fetchData } from "../helpers/fetchData";
import flechaR from "../assets/flechaR.png";
import flechaL from "../assets/flechaL.png";
import { CartaModal } from "../components/CartaModal";
import cartaDorso from "../assets/cartaDorso.png"
// import {Modal} from

const ENDPOINT_COLECCION = localStorage.getItem('id')+"/coleccion";
const token = localStorage.getItem('token');

export const Coleccion = ({ endPoint }) => {
  const [first, setFirst] = useState(1);
  const [last, setLast] = useState(12);
  const [page, setPage] = useState(1);
  const [mostrar, setMostrar] = useState([[]]);
  const [cartas, setCartas] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedCarard, setSelecCard] = useState();
  const [cantidad, setCantidad] = useState()
  const [coleccionId, setColeccionId] = useState()
  const [search, setSearch] =useState([
   
  ]);
  const [coleccion, setColeccion]= useState()
  const handleOpen = (selected, repes = 0, id) => {
    setSelecCard(selected);
    setCantidad(repes);
    setColeccionId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setSelecCard('');
    setOpen(false);
  };

  const handlePage = (direction) => {
    let pagina = page + direction;
    setPage(pagina);
  };
  const handleColeccion = async () => {
      setColeccion([])
      const token = localStorage.getItem("token");
      try {

          let listado = []
          const { data, isLoading } = await fetchData(ENDPOINT_COLECCION, 'GET', token);
          data && setColeccion(data)

          setIsLoading(isLoading);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }
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
  
  console.log("cartas", coleccion)
  useEffect(() => {
    const getData = async () => {
      await handleColeccion();
      await handleUnlogued();
    };
    getData();
  }, [open]);

  useEffect(() => {
    setFirst(page === 0 ? 1 : 12 * (page - 1) + 1);
    setLast(page === 0 ? 12 : 12 * (page - 1) + 12);

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
  }, [page, cartas]);

  return (
    <>
      {page === 0 ? (
        <div>
          <h1>PORTADA</h1>

            <img src={flechaR} alt="siguiente" className="flechaR" onClick={() => handlePage(1)} />
        </div>
      ) : (
        <div>
          {/* <DataGrid /> */}
          <div className="coleccion">
            {page > 0 && (
                <img
                  style={{ marginRight: "50%" }}
                  src={flechaL}
                  alt="anterior"
                  className="flechaL"
                  onClick={() => handlePage(-1)}
                />
            )}

            <div className="album">
              {mostrar.map((pagina) => (
                <div className="pagina">
                  {pagina.map((fila) => (
                    <div className="fila">
                      {fila.map((card) => {
                        let c = coleccion.find(entrada => entrada.carta === card?.id);
                        return (coleccion.some(elemento => elemento.carta === card?.id)) ? (
                          console.log('adfasfa',c),
                          <Carta carta={card} estilo={(c.cantidad>1)?"cartaColeccion repe":"cartaColeccion"} accion={()=>handleOpen(card, c.cantidad, c.id)}/> 
                          
                        ):
                        <img src={cartaDorso} className="cartaColeccion dorso" ></img>
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {page < Math.ceil(cartas?.length / 12) && (
                <img
                 className="flechaR"
                  src={flechaR}
                  alt="siguiente"
                  onClick={() => handlePage(1)}
                />
              
            )}
          </div>
          <CartaModal
            carta={selectedCarard}
            cantidad={cantidad}
            coleccionId={coleccionId}
            open={open}
            handleClose={handleClose}
          />
        </div>
      )}
    </>
  );
};

