import { useCallback, useEffect, useState } from "react";
import { LoadingCircle } from "../components/LoadingCircle";

import "../styles/coleccion.css";
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
  const [coleccion, setColeccion]= useState();

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
     const newPage = page + direction;
    setPage(newPage);
    setFirst(newPage === 1 ? 1 : (12 * (newPage - 1)) + 1);
    setLast(newPage === 1 ? 12 : (12 * (newPage - 1)) + 12);
  };

  const handleColeccion = useCallback(async () => {
      setColeccion([])
      const token = localStorage.getItem("token");
      try {
          const { data, isLoading } = await fetchData(ENDPOINT_COLECCION, 'GET', token);
          data && setColeccion(data)
          setIsLoading(isLoading);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }, [ENDPOINT_COLECCION])

  const handleUnlogued = useCallback(async () => {
    setCartas([]);

    try {
      const { data, isLoading } = await fetchData("cartas", "GET", null);
      data ? setCartas(data) : setCartas([]);
      
      setIsLoading(isLoading);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [])

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      await handleColeccion();
      await handleUnlogued();
      setIsLoading(false)
    };
    getData();
  }, [handleUnlogued,handleColeccion]);

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
    { isLoading ||!cartas || !coleccion ? (
        <LoadingCircle sizeLoading={200} />
      ): (
        <div>
          <div className="coleccion">
            {page > 0 && (
                <img
                  style={{ marginRight: "50%" }}
                  src={flechaL}
                  alt="anterior"
                  className="flechaL"
                  onClick={() =>page!=1 && handlePage(-1)}
                />
            )}

            <div className="album">
              {mostrar.map((pagina) => (
                <div className="pagina">
                  {console.log(pagina)}
                  {
                  pagina.map((fila) => (
                    <div className="fila">
                      {fila.map((card) => {
                        let c = coleccion.find(entrada => entrada?.carta === card?.id);
                        return ( c && c?.cantidad > 0) ? (
                          <img src={`src/${card?.img_url}`} className={(c.cantidad>1)?"cartaColeccion repe":"cartaColeccion"} onClick={()=>handleOpen(card, c.cantidad, c.id)}/> 
                        ): (
                          <img src={cartaDorso} className="cartaColeccion dorso" ></img>
                        )
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
                <img
                 className="flechaR"
                  src={flechaR}
                  alt="siguiente"
                  onClick={() => page < Math.ceil(cartas?.length / 12) && handlePage(1)}
                />

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

