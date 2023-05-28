import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__container">
                <div className="about-project__desc">
                    <h2 className="about-project__title-text">Дипломный проект включал 5 этапов</h2>
                    <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__desc">
                    <h2 className="about-project__title-text">На выполнение диплома ушло 5 недель</h2>
                    <p className="about-project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
                        было
                        соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <table className="about-project__progress">
                <tr className="about-project__progress-lines">
                    <td className="about-project__progress-one">1 неделя</td>
                    <td className="about-project__progress-two">4 неделя</td>
                </tr>
                <tr className="about-project__progress-lines">
                    <td className="about-project__progress-three">Back-end</td>
                    <td className="about-project__progress-four">Front-end</td>
                </tr>
            </table>
        </section>
    )
        ;
}

export default AboutProject;
