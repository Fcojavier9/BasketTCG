import "../styles/modal.css";

export const Modal = ({ title, closeModal, acceptModal, campoValidacion="Actualizar Campo" }) => {
     return (
        <div className="modal-overlay">       
            <div className="modal-content">
                  <h2>{title}</h2>
                  <div>
                    <button onClick={closeModal}>Cancelar</button>
                    <button onClick={acceptModal}>{campoValidacion}</button>
                  </div>
            </div>
        </div>
    );
};