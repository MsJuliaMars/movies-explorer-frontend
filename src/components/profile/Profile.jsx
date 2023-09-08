import "./Profile.css";
import React, { useContext, useEffect } from "react";
import { CurrentMovieContext } from "../../contexts/CurrentMovieContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile({
  onLogout,
  onUpdateUser,
  successEditProfile,
  userMessage,
  userErrorMessage,
}) {
  const currentUser = useContext(CurrentMovieContext);
  const nameUser = currentUser.currentUser.name;
  const emailUser = currentUser.currentUser.email;

  const {
    values,
    handleChange,
    setValues,
    isErrors,
    errorMessages,
    isFormNotValid,
  } = useFormWithValidation({ name_profile: "", email_profile: "" });

  useEffect(() => {
    if (currentUser.currentUser.name && currentUser.currentUser.email) {
      setValues({
        name_profile: currentUser.currentUser.name,
        email_profile: currentUser.currentUser.email,
      });
    }
  }, [currentUser.currentUser]);

  const handleSubmit = (evt) => {
    evt.preventDefault(); // Запрещаем браузеру переходить по адресу формы
    onUpdateUser({
      // Передаём значения управляемых компонентов во внешний обработчик
      name: values.name_profile,
      email: values.email_profile,
    });
  };

  return (
    <div className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h1 className="profile__title">{`Привет, ${currentUser.currentUser.name}!`}</h1>
        <label className="profile__field">
          Имя
          <input
            type="name"
            name="name_profile"
            className="profile__text"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            // disabled="disabled"
            autoComplete="off"
            onChange={handleChange}
            value={values.name_profile || ""}
            required
          />
          <span
            className={`error__message ${
              isErrors?.name_profile ? "error__visible" : ""
            }`}
          >
            {errorMessages?.name_profile}
          </span>
        </label>
        <label className="profile__field">
          E-mail
          <input
            type="email"
            name="email_profile"
            className="profile__text"
            placeholder="E-mail"
            minLength="2"
            maxLength="40"
            // disabled="disabled"
            autoComplete="off"
            onChange={handleChange}
            value={values.email_profile || ""}
            required
          />
          <span
            className={`error__message ${
              isErrors?.email_profile ? "error__visible" : ""
            }`}
          >
            {errorMessages?.email_profile || isErrors?.email_profile}
          </span>
        </label>
        <span className="error__message error__visible">
          {successEditProfile ? userMessage : userErrorMessage}
        </span>
        <button className={
                  "profile__button-edit"
                  }
          type="submit"
          aria-label="Редактирование аккаунта пользователя"
          disabled={ (
              (nameUser !== values.name_profile  || emailUser !== values.email_profile )  &&
              (values.name_profile !== '' || values.email_profile !== '') &&
              !isFormNotValid )
            ? false
            : true}
        >
          Редактировать
        </button>
        <button
          onClick={onLogout}
          className="profile__button-logout"
          type="submit"
          aria-label="Выход из аккаунта пользователя"
        >
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}

export default Profile;
