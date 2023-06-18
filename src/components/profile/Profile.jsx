import './Profile.css';
import React from "react";

function Profile() {
    return (
        <div className="profile">
            <form className="profile__form">
                <h1 className="profile__title">Привет, Виталий!</h1>
                <label className="profile__field">Имя
                    <input
                        type="name"
                        name="email_login"
                        className="profile__text"
                        placeholder="Имя"
                        minLength="2"
                        maxLength="40"
                        disabled="disabled"
                        autoComplete="off"
                        required
                    />
                </label>
                <label className="profile__field">E-mail
                    <input
                        type="email"
                        name="email_login"
                        className="profile__text"
                        placeholder="E-mail"
                        minLength="2"
                        maxLength="40"
                        disabled="disabled"
                        autoComplete="off"
                        required
                    />
                </label>
                <button
                    className="profile__button-edit"
                    type="submit"
                    aria-label="Редактирование аккаунта пользователя"
                >
                    Редактировать
                </button>
                <button
                    className="profile__button-logout"
                    type="submit"
                    aria-label="Выход из аккаунта пользователя"
                >
                    Выйти из аккаунта
                </button>
            </form>
        </div>
    )
}

export default Profile;
