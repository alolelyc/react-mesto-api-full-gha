class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }
  
    _verifyResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
    getProfileInfo() {
      //получение информации о пользователе с сервера
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: this._headers,
      }).then((res) => this._verifyResponse(res));
    }
  
    setUserInfo({ name, about }) {
      // редактирование информации  о пользователе
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }).then((res) => this._verifyResponse(res));
    }
  
    setAvatarInfo(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }).then((res) => this._verifyResponse(res));
    }
  
    getServerCards() {
      // Загрузка карточек с сервера
      return fetch(`${this._url}/cards`, {
        method: "GET",
        headers: this._headers,
      }).then((res) => this._verifyResponse(res));
    }
  
    renderCard(item) {
      // добавление новой карточки
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: item.name,
          link: item.link,
        }),
      }).then((res) => this._verifyResponse(res));
    }
  
    clickLike(cardId) {
      //ставим лайк
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._verifyResponse(res));
    }
  
    delClickLike(cardId) {
      //снимаем лайк
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._verifyResponse(res));
    }
  
    changeLikeCardStatus(id, isLiked) {
      if (isLiked) {
        return this.clickLike(id);
      } else {
        return this.delClickLike(id);
      }
    }
  
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._verifyResponse(res));
    }
  }
  
  const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-59",
    headers: {
      authorization: "8d43be2a-82a5-43e7-b68e-9400e1814337",
      "Content-Type": "application/json",
    },
  });
  
  export default api;