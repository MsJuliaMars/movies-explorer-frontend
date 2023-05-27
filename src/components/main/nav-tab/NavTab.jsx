import React from 'react';

import './NavTab.css';

function NavTab() {
    return (
        <section className="navigation">
            <nav className="navigation__container">
                <nav className='header__movies-navigator'>

                        Фильмы

                        Сохраненые фильмы
                </nav>

                    Аккаунт
                    <div className='header__account-logo' alt='account logo'></div>

            </nav>
        </section>
    )
}

export default NavTab;
