
import './Header.css';
import logo from '../../images/logo.svg';
import NavAuthorization from "../nav-authorization/NavAuthorization";
import Navigation from "../navigation/Navigation";


function Header({loggedIn}) {
    return (
    <header className={`header ${!loggedIn ? 'header_authorization' : ''}`}>
        <img
            src={logo}
            alt="Изображен логотип"
            className="header__logo"
        />
        {/*{!loggedIn && <NavAuthorization />}*/}
        {!loggedIn && <Navigation />}
    </header>
    )
}
export default Header;
