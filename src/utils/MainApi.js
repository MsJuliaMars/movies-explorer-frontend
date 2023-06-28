class MainApi {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
        this._token = null;
    }

    // Функция устанавливает новое значение токена
    setToken(token) {
        this._token = token;
        this._headers = {
            ...this._headers,
            'authorization': `Bearer ${token}`
        }
    }

    // Получение данных о пользователе
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Отправка/редактирование данных о пользователе
    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            // body: JSON.stringify(data),
            body: JSON.stringify({
                name: `${data.name}`,
                email: `${data.email}`,
            }),
        }).then(this._checkResponse);
    }

    addCardMovie(newMovie) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                country: `${newMovie.country}`,
                director: `${newMovie.director}`,
                duration: newMovie.duration,
                year: `${newMovie.year}`,
                description: `${newMovie.description}`,
                image: `https://api.nomoreparties.co/${newMovie.image.url}`,
                trailerLink: `${newMovie.trailerLink}`,
                nameRU: `${newMovie.nameRU}`,
                nameEN: `${newMovie.nameEN}`,
                thumbnail: `https://api.nomoreparties.co/${newMovie.image.formats.thumbnail.url}`,
                movieId: `${newMovie.id}`,
            }),
        }).then(this._checkResponse);
    }

    // // Редактирование аватара
    // setUserAvatar(link) {
    //     return fetch(`${this._url}/users/me/avatar`, {
    //         method: "PATCH",
    //         // credentials: 'include',
    //         headers: this._headers,
    //         body: JSON.stringify(link),
    //     }).then(this._checkResponse);
    // }

    // Загрузка карточек с фильмами с сервера
    downloadingCardsMovie() {
        return fetch(`${this._url}/movies`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // getSaveCardsMovie() {
    //     return fetch(`${this._url}/movies`, {
    //         method: "GET",
    //         headers: this._headers,
    //     }).then(this._checkResponse);
    // }

    getSaveCardsMovie() {
        return fetch(`${this._url}/movies`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    saveCardsMovie(movie) {
        return fetch(`${this._url}/movies`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailer: movie.trailerLink,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            }),
        }).then(this._checkResponse);
    }

    // Удаление карточки фильма
    deleteCardMovie(id) {
        return fetch(`${this._url}/movies/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Добавление карточки
    setCardMovie(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._checkResponse);
    }

    // Работа с лайком (постановка/удаление)
    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Сообщение об ошибке
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Возникла ошибка моя: ${res.message}`);
    }
}

// Создаем один экземпляр класса на все приложение
const api = new MainApi({
    url: "http://localhost:3001", // "https://api.mesto.kozhevnikova.nomoredomains.monster",//"http://localhost:3001", //"https://mesto.nomoreparties.co/v1/cohort-45",
    headers: {
        authorization: localStorage.getItem('token'),//`Bearer ${token}`,//"715ee43e-9fed-4d9c-98b6-32ed8625bba1",
        "Content-Type": "application/json",
    },
});

export default api;
