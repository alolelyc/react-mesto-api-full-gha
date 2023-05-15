import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <div
      className={`popup popup_type_open_foto ${
        card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__content-image">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img className="popup__foto-image" src={card.link} alt={card.name} />
        <h2 className="popup__foto-title">{card.name}</h2>
      </div>
    </div>
  );
};

export default ImagePopup;
