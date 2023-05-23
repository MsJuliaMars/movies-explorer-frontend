import React from 'react';
import './Techs.css';

function Techs() {
    return (
        <section className="techs">
            <h2 className="techs__title">Технологии</h2>
            <div className="techs__container">
                <h2 className="techs__container-title">7 технологий</h2>
                <p className="techs__container-subtitle">На курсе веб-разработки мы освоили технологии, которые
                    применили в дипломном проекте.</p>
            </div>
            <div className='techs__list'>
                <div className='techs__list-element'><p className="techs__list-skill">HTML</p></div>
                <div className='techs__list-element'><p className="techs__list-skill">CSS</p></div>
                <div className='techs__list-element'><p className="techs__list-skill">JS</p></div>
                <div className='techs__list-element'><p className="techs__list-skill">React</p></div>
                <div className='techs__list-element'><p className="techs__list-skill">Git</p></div>
                <div className='techs__list-element'><p className="techs__list-skill">Express.js</p></div>
                <div className='techs__list-element'><p className="techs__list-skill">mongoDB</p></div>
            </div>
        </section>
    )
}

export default Techs;
