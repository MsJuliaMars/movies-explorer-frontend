import React from "react";
import './Portfolio.css';
import arrow from '../../../images/arrow-portfolio.svg';

function Portfolio() {
    return (
        <section className="portfolio">
            <h1 className="portfolio__title">Портфолио</h1>
            <ul className="portfolio__list">
                <li className="portfolio__list-item"><a href="https://github.com/MsJuliaMars/how-to-learn" className="portfolio__link" target='_blank'>Статичный сайт<img
                    className="portfolio__arrow" src={arrow} alt="Ссылка-стрелка"/></a></li>
                <li className="portfolio__list-item"><a href="https://github.com/MsJuliaMars/russian-travel" className="portfolio__link" target='_blank'>Адаптивный сайт<img
                    className="portfolio__arrow" src={arrow}
                    alt="Ссылка-стрелка"/></a></li>
                <li className="portfolio__list-item"><a href="https://github.com/MsJuliaMars/react-mesto-api-full-gha" className="portfolio__link" target='_blank'>Одностраничное приложение<img
                    className="portfolio__arrow"
                    src={arrow} alt="Ссылка-стрелка"/>
                </a></li>
            </ul>
        </section>
    )
}

export default Portfolio;
