import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeAdd(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="add"
      title="Новое место"
      buttonText="Создать"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__content">
        <input
          className="popup__input popup__input_type_add"
          placeholder="Название"
          type="text"
          name="name"
          value={name|| ''}
          id="name-add"
          minLength="2"
          maxLength="30"
          onChange={handleChangeAdd}
          required
        />
        <span id="name-add-error" className="popup__error"></span>
        <input
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          value={link || ''}
          id="link"
          onChange={handleChangeLink}
          required
        />
        <span id="link-error" className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
