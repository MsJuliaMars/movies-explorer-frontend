import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__desc">
          <h3 className="about-project__title-text">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__desc">
          <h3 className="about-project__title-text">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__progress">
        <li className="about-project__progress-element">1 неделя</li>
        <li className="about-project__progress-element">4 недели</li>
        <li className="about-project__progress-element">Back-end</li>
        <li className="about-project__progress-element">Front-end</li>
      </div>
    </section>
  );
}

export default AboutProject;
