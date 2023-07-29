export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";
const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка моя: ${res.status}`);
};

export const getMovies = () => {
  return fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getResponse);
};
