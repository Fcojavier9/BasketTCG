import "../styles/buttonCard.css";

export const ButtonCard = ({ title, value, onClick, className="default" }) => {
    return (
      <div className="button-card">
        <h3>{title}</h3>
        <button className={className} onClick={onClick}>{value}</button>
      </div>
    );
};