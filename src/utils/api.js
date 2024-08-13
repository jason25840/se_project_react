import { checkResponse } from "./utils";

const baseUrl = "http://localhost:3001";

export function request(url, options = {}, token = null) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return fetch(url, {
    ...options,
    headers,
  }).then(checkResponse);
}

export function getItems() {
  return request(`${baseUrl}/items`);
}

export function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export function addItem(item) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}