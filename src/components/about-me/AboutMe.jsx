import React from "react";
import "./AboutMe.css";
import photo from "../../images/photo-student.png";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__student">
          <h3 className="about-me__name">Виталий</h3>
          <h4 className="about-me__job">Фронтенд-разработчик, 30 лет</h4>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/MsJuliaMars"
            className="about-me__git"
            target="_blank"
          >
            Github
          </a>
        </div>
        <img src={photo} className="about-me__photo" alt="фото студента" />
      </div>
    </section>
  );
}

export default AboutMe;
