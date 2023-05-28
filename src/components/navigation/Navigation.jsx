import './Navigation.css';
import account from '../../images/account-min.svg';

function Navigation() {
    return (
        <nav className="nav">
            <div className="nav__container">
                <p className="nav__element">Фильмы</p>
                <p className="nav__element">Сохранённые фильмы</p>
            </div>
            <div className="nav__container">
                <p className="nav__account-title">Аккаунт</p>
                <img className="nav__img" src={account} alt="изображение пользователя"/>
            </div>
        </nav>
    );
};

export default Navigation;
