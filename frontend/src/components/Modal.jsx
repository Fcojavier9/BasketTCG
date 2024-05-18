import "../styles/modal.css";

export const Modal = ({ title, closeModal, acceptModal }) => {
     return (
        <div className="modal-overlay">       
            <div className="modal-content">
                  <h2>{title}</h2>
                  <div>
                    <button onClick={closeModal}>Cancelar</button>
                    <button onClick={acceptModal}>Actualizar campo</button>
                  </div>
            </div>
        </div>
    );
};