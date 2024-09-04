import { checkResponse } from "./utils";

const baseUrl = "http://34.74.30.39:3001";

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
  return request(`${baseUrl}/items`);
}

export function deleteItem(id, token) {
  return request(`${baseUrl}/items/${id}`, {
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
    `${baseUrl}/items`,
    {
      method: "POST",
      body: JSON.stringify(item),
    },
    token
  );
}

export function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
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