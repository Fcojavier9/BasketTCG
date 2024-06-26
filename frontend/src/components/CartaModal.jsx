import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { fetchData } from "../helpers/fetchData";
import "../styles/cartaModal.css";

export const CartaModal = ({
  carta,
  open,
  handleClose,
  cantidad,
  coleccionId,
  vendida
}) => {
  const token = localStorage.getItem("token");
  const [cantidadVenta, setCantidaVenta] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [precioVenta, setPrecioVenta] = useState(5);
  const [onSale, setOnSale] = useState(false);

  const handleVenta = () => {
    setOnSale(true);
  };

  const handleCancel = () => {
    setOnSale(false);
  };
  const handleCloseModal = () => {
    onSale && handleCancel();
    handleClose();
  };

  const handleCantidad = (e) => {
    setCantidaVenta(e);
    console.log(cantidadVenta)
  };
  const handlePrecio = (e) => {
    setPrecioVenta(e);
    console.log(precioVenta)
  };

  const sale = async () => {
    setIsLoading(true)
    vendida(true)
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
        console.error(data)
        alert("ha ocurrido un error al poner a la venta la carta");
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
          console.error(data)
          console.error("Error al modificar la coleccion: ", error);
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
            <NumberInput
              onChange={(event, newValue) => handleCantidad(newValue)}
              defaultValue={1}
              className="number"
              slotProps={{
                input: {
                  className: "inputCantidad",
                  onChange: (e) => handleCantidad(e.target.value),
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
            <NumberInput
              onChange={(event, newValue) => handlePrecio(newValue)}
              className="number"
              slotProps={{
                input: {
                  className: "inputPrecio",
                  onChange: (e) => handlePrecio(e.target.value),
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
              defaultValue={5}
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
      <Modal open={open} onClose={handleCloseModal} className="modal">
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
