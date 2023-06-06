import './Register.css';
import logo from "../../images/logo.svg";
import React from "react";
import {Link} from "react-router-dom";

function Register() {
    return (
        <div className="login">
            <Link to="/">
                <img src={logo} className="login__logo"/></Link>
            <form className="login__form">
                <h2 className="login__title">Добро пожаловать!</h2>
                <label className="login__field">Имя
                    <input
                        type="name"
                        name="email_login"
                        className="login__text"
                        placeholder="Имя"
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
                        className="login__text"
                        placeholder="E-mail"
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
                className="register__button-enter"
                type="submit"
                aria-label="Вход в аккаунт пользователя"
            >
                Зарегистрироваться
            </button>
            <p className="login__question">
                Уже зарегистрированы?{" "}
                <Link to="/sign-in" className="login__link-entry">Войти </Link>
            </p>
        </div>
    )
}

export default Register;
