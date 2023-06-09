import React, {useEffect, useState} from "react";
import './Navigation.css';
import account from '../../images/account-min.svg';
import {Link} from "react-router-dom";

function Navigation({}) {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function handlePopupOpen() {
        setIsOpenPopup(true);
    }

    function handlePopupClose() {
        setIsOpenPopup(false);
    }

    return (
        <section className='navigation'>
            {width < 800 ? (<>
                <div className={`${isOpenPopup ? "navigation__overlay" : ""}`}>
                    <div
                        className={`navigation__popup ${isOpenPopup ? 'navigation__popup_opened' : ''}`}>
                        <button type="button" className='navigation__close-btn' alt='крестик закрывает бургер-меню'
                                onClick={handlePopupClose}></button>
                        <nav className="navigation__links">
                            <Link
                                className={`navigation__link ${window.location.pathname === "/" ? "navigation__link_active" : " "}`}
                                to='/'>
                                Главная
                            </Link>
                            <Link
                                className={`navigation__link ${window.location.pathname === "/movies" ? "navigation__link_active" : " "}`}
                                to='/movies'>
                                Фильмы
                            </Link>
                            <Link
                                className={`navigation__link ${window.location.pathname === "/saved-movies" ? "navigation__link_active" : " "}`}
                                to='/saved-movies'>
                                Сохраненые фильмы
                            </Link>
                        </nav>
                        <Link className='navigation__link-account' to='/profile'>
                            Аккаунт
                            <img className='navigation__link-icon' src={account} alt='иконка аккаунта'></img>
                        </Link>
                    </div>
                </div>
                <button className="navigation__burger-btn" onClick={handlePopupOpen}></button>
            </>) : (
                <>
                    <nav className="navigation__laptop">
                        <div className="navigation__elements">
                            <Link
                                className={`navigation__element ${window.location.pathname === '/movies' ? 'navigation__element_active' : ' '}`}
                                to='/movies'>
                                Фильмы
                            </Link>
                            <Link
                                className={`navigation__element ${window.location.pathname === '/saved-movies' ? 'navigation__element_active' : ' '}`}
                                to='/saved-movies'>
                                Сохраненые фильмы
                            </Link>
                        </div>
                        <Link className='navigation__element-account' to='/profile'>
                            Аккаунт
                            <img className='navigation__link-icon' src={account} alt='иконка аккаунта'></img>
                        </Link>
                    </nav>
                </>
            )}
        </section>
    );
};

export default Navigation;
