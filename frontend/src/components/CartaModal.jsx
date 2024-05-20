import { Box, Modal, Button } from "@mui/material";
import "../styles/cartaModal.css";
import { Carta } from "./Carta";

export const CartaModal = ({ carta, open, handleClose }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose} className="modal">
        <Box className="caja">
          <Box className="datos">
            <Box className="principal">
              <Carta carta={carta} estilo="imgModal" />
              <h2 className="nombre">{carta?.nombre}</h2>
            </Box>

            <Box className="informacion">
              <Box className="texto">
                <p className="linea"><b>POSICION:</b> <span>{carta?.position}</span></p>
                <p className="linea"><b>PUNTUACION:</b> <span>{carta?.puntuacion}</span></p>
                <p className="linea"><b>RAREZA:</b> <span>{carta?.rarity}</span></p>
              </Box>
              <Box className="botones">
                <button onClick={handleClose} className="cerrar">CERRAR</button>
                <button className="vender">VENDER</button>
              </Box>
            </Box>
          </Box>
          
        
        </Box>
      </Modal>
    </div>
  );
};
