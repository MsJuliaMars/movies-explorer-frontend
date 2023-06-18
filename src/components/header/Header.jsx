import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import NavAuthorization from "../nav-authorization/NavAuthorization";
import Navigation from "../navigation/Navigation";


function Header({loggedIn=true}) {

    return (
    <header className={`header ${!loggedIn ? 'header_authorization' : ''}`}>
        <Link to="/" className="header__logo">
        <img
            src={logo}
            alt="Изображен логотип"
        /> </Link>
        {!loggedIn && <NavAuthorization />}
        {loggedIn && <Navigation />}
    </header>
    )
}
export default Header;
