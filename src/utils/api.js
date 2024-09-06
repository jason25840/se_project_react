import { checkResponse } from "./utils";

import { BASE_URL } from "./constants";

export function request(url, options = {}, token = null) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    console.log("token:", token);
    headers.authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  }).then(checkResponse);
}

export function getItems() {
  return request(`${BASE_URL}/items`);
}
console.log("get items");
export function deleteItem(id, token) {
  return request(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addItem(item) {
  const token = localStorage.getItem("jwt");
  return request(
    `${BASE_URL}/items`,
    {
      method: "POST",
      body: JSON.stringify(item),
    },
    token
  );
}

export function addCardLike(id, token) {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function removeCardLike(id, token) {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}