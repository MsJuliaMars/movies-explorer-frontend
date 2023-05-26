import React from "react";
import './Portfolio.css';
import arrow from '../../../images/arrow-portfolio.svg';

function Portfolio() {
    return (
        <section className="portfolio">
            <h1 className="portfolio__title">Портфолио</h1>
            <ul className="portfolio__list">
                <li className="portfolio__list-item"><a className="portfolio__link">Статичный сайт<img
                    className="portfolio__arrow" src={arrow} alt="Ссылка-стрелка"/></a></li>
                <li className="portfolio__list-item"><a className="portfolio__link">Адаптивный сайт<img
                    className="portfolio__arrow" src={arrow}
                    alt="Ссылка-стрелка"/></a></li>
                <li className="portfolio__list-item"><a className="portfolio__link">Одностраничное приложение<img
                    className="portfolio__arrow"
                    src={arrow} alt="Ссылка-стрелка"/>
                </a></li>
            </ul>
        </section>
    )
}

export default Portfolio;
