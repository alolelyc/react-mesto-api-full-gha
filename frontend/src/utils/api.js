import { BASE_URL } from "./auth";

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
      credentials: 'include',
      headers: this._headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }).then((res) => this._verifyResponse(res));
  }

  setUserInfo({ name, about }) {
    // редактирование информации  о пользователе
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._verifyResponse(res));
  }

  setAvatarInfo(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._verifyResponse(res));
  }

  getServerCards() {
    // Загрузка карточек с сервера
    return fetch(`${this._url}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }).then((res) => this._verifyResponse(res));
  }

  renderCard(item) {
    // добавление новой карточки
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then((res) => this._verifyResponse(res));
  }

  changeLikeCardStatus = (cardId, isLiked) => {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => this._verifyResponse(res));
  }

  /*clickLike(cardId, isLiked) {
    //ставим лайк
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
      headers: this._headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }).then((res) => this._verifyResponse(res));
  }
  
  delClickLike(cardId) {
    //снимаем лайк
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }).then((res) => this._verifyResponse(res));
  
  }
  
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.clickLike(id);
    } else {
      return this.delClickLike(id);
    }
  }*/

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }).then((res) => this._verifyResponse(res));
  }
}

const api = new Api({
  url: BASE_URL,
  headers: {
    //authorization: "8d43be2a-82a5-43e7-b68e-9400e1814337",
    'Accept': 'application/json',
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default api;