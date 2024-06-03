import { Box, Modal, Button, Input } from "@mui/material";
import { Unstable_NumberInput as NumberImput } from "@mui/base/Unstable_NumberInput";
import "../styles/cartaModal.css";
import { Carta } from "./Carta";
import { useState } from "react";
import { fetchData } from "../helpers/fetchData";
import { LoadingCircle } from "../components/LoadingCircle";


export const CartaModal = ({
  carta,
  open,
  handleClose,
  cantidad,
  coleccionId,
}) => {
  const token = localStorage.getItem("token");
  const [onSale, setOnSale] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [precioVenta, setPrecioVenta] = useState();
  const [cantidadVenta, setCantidaVenta] = useState(1);

  const handleVenta = () => {
    setOnSale(true);
  };

  const handleCancel = () => {
    setOnSale(false);
  };

  const handleCantidad = (e) => {
    setCantidaVenta(e);
  };
  const handlePrecio = (e) => {
    setPrecioVenta(e);
  };

  const sale = async () => {
    setIsLoading(true)
    let load
    const body = {
      id_coleccion: coleccionId,
      precio: precioVenta,
      cantidad: cantidadVenta,
    };

    try {
      const { data, isLoading, error } = await fetchData(
        "mercado/insert",
        "POST",
        token,
        body
      );
      if (error === 400) {
        alert(data);
        return;
      }

      load = isLoading;
      const body2 = {
        cantidad: cantidad - cantidadVenta,
      };

      try {
        const { data, isLoading, error } = await fetchData(
          `/coleccion/${coleccionId}`,
          "PUT",
          token,
          body2
        );
        if (error === 400) {
          alert(data);
          return;
        }
      } catch (error) {
        console.error("Error al modificar la coleccion:", error);
      }
    } catch (error) {
      console.error("Error al poner a la venta:", error);
    }
    handleCancel();
    handleClose();
    setIsLoading(load)
  };

  const info = () => {
    return (
      <Box className="informacion">
        <Box className="texto">
          <p className="linea">
            <b>POSICION:</b> <span className="datos">{carta?.position}</span>
          </p>
          <p className="linea">
            <b>PUNTUACION:</b> <span className="datos">{carta?.puntuacion}</span>
          </p>
          <p className="linea">
            <b>RAREZA:</b> <span className="datos">{carta?.rarity}</span>
          </p>
          <p className="linea">
            <b>CANTIDAD:</b> <span className="datos">{cantidad}</span>
          </p>
        </Box>
        <Box className="botones">
          <button onClick={handleClose} className="cerrar">
            CERRAR
          </button>
          {cantidad > 1 && (
            <button onClick={handleVenta} className="vender">
              VENDER
            </button>
          )}
        </Box>
      </Box>
    );
  };

  const venta = () => {
    return  (
      <Box className="informacion">
        <Box className="texto">
          <div className="linea">
            <p className="infoVenta">Cantidad:</p>
            <NumberImput
              onChange={(event, newValue) => handleCantidad(newValue)}
              defaultValue={1}
              className="number"
              slotProps={{
                input: {
                  className: "inputCantidad",
                },
                incrementButton: {
                  children: <p className="iconoIncremento">+</p>,
                  className: "incremento",
                },
                decrementButton: {
                  children: <p className="iconoDecremento">-</p>,
                  className: "decremento",
                },
              }}
              min={1}
              max={cantidad - 1}
            />
          </div>

          <div className="linea">
            <p className="infoVenta">Precio:</p>
            <NumberImput
              onChange={(event, newValue) => handlePrecio(newValue)}
              className="number"
              slotProps={{
                input: {
                  className: "inputPrecio",
                },
                incrementButton: {
                  children: <p className="iconoIncremento">+</p>,
                  className: "incremento",
                },
                decrementButton: {
                  children: <p className="iconoDecremento">-</p>,
                  className: "decremento",
                },
              }}
              min={1}
              max={999999}
            />
          </div>
        </Box>
        <Box className="botones">
          <button onClick={handleCancel} className="cerrar">
            CANCELAR
          </button>
          <button className="vender" onClick={sale}>
            VENDER
          </button>
        </Box>
      </Box>
    );
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} className="modal">
        <Box className="caja">
          <Box className="datos">
            <Box className="principal">
              <h2 className="nombre">{carta?.nombre}</h2>
              <img src={`src/${carta?.img_url}`} className="imgModal" />
            </Box>
            {onSale ? venta() : info()}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
