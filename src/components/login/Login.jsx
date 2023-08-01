import React from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./Login.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Login({ onLogin, userErrorMessage }) {
  const {
    values,
    handleChange,
    setValues,
    isErrors,
    errorMessages,
    isFormNotValid,
  } = useFormWithValidation({ email_login: "", password_login: "" });
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.email_login || !values.password_login) {
      return;
    }
    onLogin({ email: values.email_login, password: values.password_login });
  };
  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <Link to="/" className="login__logo">
          <img src={logo} className="login__logo" alt="Логотип приложения" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <label className="login__field">
          E-mail
          <input
            type="email"
            name="email_login"
            className="login__text"
            placeholder="E-mail"
            minLength="2"
            maxLength="40"
            autoComplete="new-password"
            value={values.email_login || ""}
            onChange={handleChange}
            required
          />
          <span
            className={`error__message ${
              isErrors?.email_login ? "error__visible" : ""
            }`}
          >
            {errorMessages?.email_login || isErrors?.email_login}
          </span>
        </label>
        <label className="login__field">
          Пароль
          <input
            type="password"
            name="password_login"
            className="login__text"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            autoComplete="new-password"
            value={values.password_login || ""}
            onChange={handleChange}
            required
          />
          <span
            className={`error__message ${
              isErrors?.password_login ? "error__visible" : ""
            }`}
          >
            {errorMessages?.password_login}
          </span>
        </label>
        <span className="error__message error__visible">
          {userErrorMessage}
        </span>
        <button
          className={`${
            values.email_login !== "" &&
            values.password_login !== "" &&
            !isFormNotValid
              ? "login__button-enter"
              : "login__button-enter_disabled"
          } `}
          type="submit"
          aria-label="Вход в аккаунт пользователя"
          disabled={
            values.email_login !== "" &&
            values.password_login !== "" &&
            !isFormNotValid
              ? false
              : true
          }
          // disabled={isFormNotValid}
        >
          Войти
        </button>
        <p className="login__question">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="login__link-entry">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
