import { checkResponse } from "./utils";

import { BASE_URL } from "./constants";

const register = (email, password, name, avatar) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then((res) => checkResponse(res));
};

const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      return data;
    });
};

const editUserInfo = (name, avatar, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => checkResponse(res));
};

const auth = {
  register,
  authorize,
  checkToken,
  getUserInfo,
  editUserInfo,
};

export default auth;
