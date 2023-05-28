import React from 'react';
import './NavTab.css';

function NavTab() {
    return (
        <section className='nav-tab'>
            <div className="nav-tab__container">
                <div className="nav-tab__container-element"><p className="nav-tab__text"><a href="#about-project"
                                                                                            className="nav-tab__link">О
                    проекте</a></p>
                </div>
                <div className="nav-tab__container-element"><p className="nav-tab__text"><a href='#techs'
                                                                                            className="nav-tab__link">Технологии</a>
                </p></div>
                <div className="nav-tab__container-element"><p className="nav-tab__text"><a href='#about-me'
                                                                                            className="nav-tab__link">Студент</a>
                </p></div>
            </div>
        </section>
    )
}

export default NavTab;
