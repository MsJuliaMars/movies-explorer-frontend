import "./NavAuthorization.css";
import { Link } from "react-router-dom";

function NavAuthorization() {
  return (
    <nav className="nav-auth">
      <Link to="/signup" className="nav-auth__register">
        Регистрация
      </Link>
      <Link to="/signin" className="nav-auth__login">
        Войти
      </Link>
    </nav>
  );
}

export default NavAuthorization;
