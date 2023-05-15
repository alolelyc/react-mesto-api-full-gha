import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  title,
  name,
  buttonText,
  onSubmit,
  children,
  isDisabled = false,
}) {
  return (
    <section className={`popup popup__${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          disabled={isDisabled}
          name={`${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__save">
            {buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;

//<span className="popup__error"></span>
