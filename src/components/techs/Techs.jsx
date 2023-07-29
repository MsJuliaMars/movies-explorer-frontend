import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__container-title">7 технологий</h3>
        <p className="techs__container-subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <ul className="techs__list">
        <li className="techs__list-element techs__list-skill">HTML</li>
        <li className="techs__list-element techs__list-skill">CSS</li>
        <li className="techs__list-element techs__list-skill">JS</li>
        <li className="techs__list-element techs__list-skill">React</li>
        <li className="techs__list-element techs__list-skill">Git</li>
        <li className="techs__list-element techs__list-skill">Express.js</li>
        <li className="techs__list-element techs__list-skill">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
