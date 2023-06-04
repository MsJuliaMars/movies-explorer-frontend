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
            {windowWidth < 768 ? (<>
                <div className={`${isOpenPopup ? "navigation__overlay" : ""}`}>
                    <nav
                        className={`navigation__popup navigation__popup-none  ${isOpenPopup ? 'navigation__popup-opened' : ''}`}>
                        <button className='navigation__close-btn' alt='крестик закрывает бургер-меню'
                                onClick={handlePopupClose}></button>
                        <div className="navigation__links">
                            <Link className='navigation__link' to='/'>
                                Главная
                            </Link>
                            <Link className='navigation__link navigation__link-active' to='/movies'>
                                Фильмы
                            </Link>
                            <Link className='navigation__link' to='/saved-movies'>
                                Сохраненые фильмы
                            </Link>
                        </div>
                        <Link className='navigation__link-account' to='/profile'>
                            Аккаунт
                            <img className='navigation__link-icon' src={account} alt='иконка аккаунта'></img>
                        </Link>
                    </nav>
                </div>
                <button className="navigation__burger-btn" onClick={handlePopupOpen}></button>
            </>) : (
                <>
                    <div className="navigation__laptop">
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
                    </div>
                </>
            )}
        </section>
    );
};

export default Navigation;
