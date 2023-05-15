import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onClickCard, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  function handleClickCard() {
    onClickCard(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card._id);
  }

  return (
    <article className="card">
      {isOwn && (
        <button
          type="button"
          className="card__button-del"
          onClick={handleDeleteCard}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClickCard}
      />
      <div className="card__item">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-box">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span id="count-likes" className="card__count-likes">
            {card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}

export default Card;
