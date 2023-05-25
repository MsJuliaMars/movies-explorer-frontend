import React from "react";
import './Promo.css';

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <div className="promo__container">
                <div className="promo__container-element"><p className="promo__text">О проекте</p></div>
                <div className="promo__container-element"><p className="promo__text">Технологии</p></div>
                <div className="promo__container-element"><p className="promo__text">Студент</p></div>
            </div>
        </section>
    )
}

export default Promo;
