import "../styles/infoCard.css";

export const InfoCard = ({ title, value, onChange, onClick, type }) => {
    return (
      <div className="info-card">
        <h3>{title}</h3>
        <input type={type} value={value} onChange={onChange}/>
        <button className="edit-button" onClick={onClick} >Cambiar</button>
      </div>
    );
};