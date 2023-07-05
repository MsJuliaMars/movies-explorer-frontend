import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import NavAuthorization from "../nav-authorization/NavAuthorization";
import Navigation from "../navigation/Navigation";

function Header({loggedIn}) {

    return (
        <>
            <header className={`header ${!loggedIn ? 'header_authorization' : ''}`}>
                <Link to="/" className="header__logo">
                    <img
                        src={logo}
                        alt="Изображен логотип"
                    /> </Link>
                {loggedIn ? (<Navigation/>) : (<NavAuthorization/>)}
            </header>
        </>
    )
}

export default Header;
