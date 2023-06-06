import React, {useState} from "react";
import './Navigation.css';
import account from '../../images/account-min.svg';
import {Link} from "react-router-dom";

function Navigation({}) {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function handlePopupOpen() {
        setIsOpenPopup(true);
    }

    function handlePopupClose() {
        setIsOpenPopup(false);
    }

    return (
        <section className='navigation'>
            {windowWidth < 769 ? (<>
                <div className={`${isOpenPopup ? "navigation__overlay" : ""}`}>
                    <div
                        className={`navigation__popup ${isOpenPopup ? 'navigation__popup-opened' : ''}`}>
                        <button className='navigation__close-btn' alt='крестик закрывает бургер-меню'
                                onClick={handlePopupClose}></button>
                        <nav className="navigation__links">
                            <Link className='navigation__link' to='/'>
                                Главная
                            </Link>
                            <Link className='navigation__link navigation__link-active' to='/movies'>
                                Фильмы
                            </Link>
                            <Link className='navigation__link' to='/saved-movies'>
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
                            <Link className='navigation__link' to='/movies'>
                                Фильмы
                            </Link>
                            <Link className='navigation__link' to='/saved-movies'>
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
