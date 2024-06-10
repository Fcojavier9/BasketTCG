import "../styles/infoCard.css";

export const InfoCard = ({
  title,
  value = "",
  onChange = null,
  onClick,
  type,
  textButton = "Cambiar",
  readOnly,
}) => {
  return (
    <div className="info-card">
      <h3>{title}</h3>
      {readOnly ? (
        <input type={type} value={value} readOnly />
      ) : (
        <input type={type} value={value} onChange={onChange} />
      )}
      <button className="edit-button" onClick={onClick}>
        {textButton}
      </button>
    </div>
  );
};
