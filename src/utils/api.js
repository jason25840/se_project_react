const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function addItem(item) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

//function getItems() {
 // return fetch(`${baseUrl}/items`).then((res) => {
//    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
//  });
//}

//function deleteItem(id) {
 // return fetch(`${baseUrl}/items/${id}`, {
 //   method: "DELETE",
 //   headers: {
 //     "Content-Type": "application/json",
 //   },
 // }).then((res) => {
 //   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
 // });
//}

//function addItem(item) {
//  return fetch(`${baseUrl}/items`, {
//    method: "POST",
//    headers: {
 //     "Content-Type": "application/json",
 //   },
 //   body: JSON.stringify(item),
 // }).then((res) => {
 //   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
 // });
//}

export { getItems };
export { addItem };
export { deleteItem };