
import './Register.css';
import logo from "../../images/logo.svg";
import React from "react";

function Register() {
    return(
        <div className="login">
            <img src={logo} className="login__logo"/>
            <form className="login__form">
                <h2 className="login__title">Добро пожаловать!</h2>
                <label className="login__field">Имя
                    <input
                        type="name"
                        name="email_login"
                        className="login__text login__text_name"
                        placeholder=""
                        minLength="2"
                        maxLength="40"
                        autoComplete="new-password"
                        required
                    />
                </label>
                <label className="login__field">E-mail
                    <input
                        type="email"
                        name="email_login"
                        className="login__text login__text_email"
                        placeholder=""
                        minLength="2"
                        maxLength="40"
                        autoComplete="new-password"
                        required
                    />
                </label>
                <label className="login__field">Пароль
                    <input
                        type="password"
                        name="password_login"
                        className="login__text login__text_password"
                        placeholder=""
                        minLength="2"
                        maxLength="200"
                        autoComplete="new-password"
                        required
                    />
                </label>
            </form>
            <button
                className="login__button-enter"
                type="submit"
                aria-label="Вход в аккаунт пользователя"
            >
                Зарегистрироваться
            </button>
            <p className="login__question">
                Уже зарегистрированы?{" "}
                <a className="login__link-entry">Войти</a>
            </p>
        </div>
    )
}

export default Register;
