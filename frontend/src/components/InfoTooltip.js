function InfoTooltip({ isOpen, onClose, image, title }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__info-tool">
        <img className="popup__state" src={image} alt={title} />
        <h2 className="popup__message">{title}</h2>
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
