import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__container">
        <li className="nav-tab__container-element ">
          <a href="#about-project" className="nav-tab__link">
            О проекте
          </a>
        </li>
        <li className="nav-tab__container-element ">
          <a href="#techs" className="nav-tab__link">
            Технологии
          </a>
        </li>
        <li className="nav-tab__container-element ">
          <a href="#about-me" className="nav-tab__link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
