import React from 'react';
import { useForm } from '../../hooks/useForm';
import './Login.css';
import logo from '../../images/logo.svg';

function Login({ onLogin }) {
    const { values, handleChange, setValues } = useForm({
        email_login: "",
        password_login: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!values.email_login || !values.password_login) {
            return;
        }
        onLogin({ email: values.email_login, password: values.password_login });
    };
    return (
        <div className="login">
            <img src={logo} className="login__logo"/>
            <form className="login__form" onSubmit={handleSubmit}>
                <h2 className="login__title">Рады видеть!</h2>
                <label className="login__field">E-mail
                    <input
                        type="email"
                        name="email_login"
                        className="login__text login__text_email"
                        placeholder=""
                        minLength="2"
                        maxLength="40"
                        autoComplete="new-password"
                        value={values.email_login || ""}
                        onChange={handleChange}
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
                        value={values.password_login || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
            </form>
                <button
                    className="login__button-enter"
                    type="submit"
                    aria-label="Вход в аккаунт пользователя"
                >
                    Войти
                </button>
                <p className="login__question">
                    Ещё не зарегистрированы?{" "}
                    <a className="login__link-entry">Регистрация</a>
                </p>
        </div>
    )
}

export default Login;
