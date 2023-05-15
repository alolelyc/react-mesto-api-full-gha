import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name || "");
    setAbout(currentUser.about || "");
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeJob(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        className="popup__input popup__input_type_name"
        placeholder="О себе"
        type="text"
        name="name"
        id="name-edit"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
        required
      />
      <span id="name-edit-error" className="popup__error"></span>

      <input
        className="popup__input popup__input_type_job"
        placeholder="Род деятельности"
        type="text"
        name="job"
        id="job"
        minLength="2"
        maxLength="200"
        value={about}
        onChange={handleChangeJob}
        required
      />
      <span id="job-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

//
