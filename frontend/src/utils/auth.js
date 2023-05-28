export const BASE_URL = "https://api.alolelyc.nomoredomains.rocks";

function verifyResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function regUser(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    mode: 'no-cors',
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => verifyResponse(res));
}

export function loginUser(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    mode: 'no-cors',
    method: "POST",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => verifyResponse(res));
}

export function getToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

    },
  }).then((res) => verifyResponse(res));
}
