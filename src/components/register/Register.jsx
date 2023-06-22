import './Register.css';
import logo from "../../images/logo.svg";
import React from "react";
import {Link} from "react-router-dom";
import {useForm} from "../../hooks/useForm";

const Register = ({onRegister}) => {
    const {values, handleChange, setValues} = useForm({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault(); // Запрещаем браузеру переходить по адресу формы

        if (values.email === values.password === values.name ) {
            return;
        }
        onRegister({
            name: values.name,
            email: values.email,
            password: values.password,
        });
    };
    return (
        <div className="register">
            <form className="login__form" onSubmit={handleSubmit}>
                <Link to="/" className="login__logo">
                    <img src={logo} className="login__logo"/></Link>
                <h1 className="login__title">Добро пожаловать!</h1>
                <label className="login__field">Имя
                    <input
                        type="name"
                        name="name"
                        className="login__text"
                        placeholder="Имя"
                        minLength="2"
                        maxLength="40"
                        value={values.name || ""}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                </label>
                <label className="login__field">E-mail
                    <input
                        type="email"
                        name="email"
                        className="login__text"
                        placeholder="E-mail"
                        minLength="2"
                        maxLength="40"
                        value={values.email || ""}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                </label>
                <label className="login__field">Пароль
                    <input
                        type="password"
                        name="password"
                        className="login__text"
                        placeholder=""
                        minLength="2"
                        maxLength="200"
                        value={values.password || ""}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                </label>
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
            </form>
        </div>
    )
}

export default Register;
