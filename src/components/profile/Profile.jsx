import './Profile.css';
import React, {useContext, useEffect, useState} from "react";
import {CurrentMovieContext} from "../../contexts/CurrentMovieContext";
import {useFormWithValidation} from "../../hooks/useFormWithValidation";

function Profile({onLogout, onUpdateUser}) {
    const userData = useContext(CurrentMovieContext);

    // const [values, setValues] = useState({name_profile: "", email_profile: ""});
    const {
        values,
        handleChange,
        setValues,
        isErrors,
        errorMessages,
        isFormNotValid
    } = useFormWithValidation({name_profile: "", email_profile: ""});

    // const [isErrors, setIsErrors] = useState({
    //     name_profile: false,
    //     email_profile: false,
    // });
    // const [errorMessages, setErrorMessages] = useState({name_profile: '', email_profile: ''});
    // const [isFormNotValid, setIsFormNotValid] = useState(false);

    useEffect(() => {
        if (userData.name && userData.email) {
            setValues({
                name_profile: userData.name,
                email_profile: userData.email,
            });
        }
    }, [userData]);

    // const onChange = (event) => {
    //     setValues((values) => ({
    //         ...values,
    //         [event.target.name]: event.target.value,
    //     }));
    //     setIsErrors((isErrors) => ({
    //         ...isErrors, [event.target.name]: !event.target.validity.valid,
    //     }));
    //     if(!event.target.validity.valid) {
    //         setErrorMessages({...errorMessages, [event.target.name]: event.target.validationMessage});
    //     } else {
    //         setErrorMessages({...errorMessages, [event.target.name]: ""});
    //     }
    // };

    const handleSubmit = (evt) => {
        evt.preventDefault(); // Запрещаем браузеру переходить по адресу формы

        // if (!setValues.email || !enteredValues.password) {
        //     return;
        // }

        onUpdateUser({
            // Передаём значения управляемых компонентов во внешний обработчик
            name: values.name_profile,
            email: values.email_profile,
        });
    };
    return (
        <div className="profile">
            <form className="profile__form" onSubmit={handleSubmit}>
                <h1 className="profile__title">Привет, Виталий!</h1>
                <label className="profile__field">Имя
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
                        className={`error__message ${isErrors?.name_profile ? "error__visible" : ""}`}>{errorMessages?.name_profile}</span>
                </label>
                <label className="profile__field">E-mail
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
                        className={`error__message ${isErrors?.email_profile ? "error__visible" : ""}`}>{errorMessages?.email_profile}</span>
                </label>
                <button
                    // className="profile__button-edit"
                     className={`profile__button-edit ${isFormNotValid ? "profile__button-edit_disabled" : ""}`}
                    type="submit"
                    aria-label="Редактирование аккаунта пользователя"
                    disabled={isFormNotValid}
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
    )
}

export default Profile;
