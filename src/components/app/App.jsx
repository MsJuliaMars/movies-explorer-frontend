import Footer from "../footer/Footer";
import PageNotFound from "../page-not-found/PageNotFound";
import Login from "../login/Login";
import Header from "../header/Header";
import Register from "../register/Register";
import Profile from "../profile/Profile";
import Main from "../main/Main";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Movies from "../movies/Movies";
import SavedMovies from "../saved-movies/SavedMovies";
import {useCallback, useEffect, useState} from "react";
import * as Auth from "../../utils/Auth";
import api from "../../utils/Api";

function App() {
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false); // для отслеживания загрузки во время ожидагия от сервера ответа

    // Авторизация
    const [loggedIn, setLoggedIn] = useState(false);
    const [successRegister, setSuccessRegister] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const login = useCallback(() => {
        setLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setLoggedIn(false);
    }, []);

    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, []);

    const handleLogin = ({email, password}) => {
        Auth
            .authorize(email, password)
            .then((data) => {
                if (data?.token) {
                    localStorage.setItem("jwt", data.token);
                    login();
                    api.setToken(data.token); // передает в api новое значение токена
                    setEmail(email);
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
                setSuccessRegister(false);
                // setIsInfoTooltipPopupOpen(true);
            });
    };

    const handleRegister = ({email, password}) => {
        Auth
            .register(email, password)
            .then(() => {
                setSuccessRegister(true);
                // setIsInfoTooltipPopupOpen(true);
                navigate("/sign-in");
            })
            .catch((err) => {
                console.log(err);
                setSuccessRegister(false);
                // setIsInfoTooltipPopupOpen(true);
            });
    };

    // сброс параметров после "выхода", удаление токена
    const handleLogout = () => {
        logout();
        setEmail(null);
        localStorage.removeItem("jwt");
        navigate("/sign-in");
    };

    //сохранение токена в локальном хранилище и передача email
    useEffect(() => {
        // если у пользователя есть токен в localStorage,
        // эта функция проверит валидность токена
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            // проверим токен
            Auth
                .checkToken(jwt)
                .then((res) => {
                    // авторизуем пользователя
                    login();
                    setEmail(res.email);
                    navigate("/");
                })
                .catch((err) => console.log(err));
        }
    }, []);

    return (
        <div className="root">
            {location.pathname === "/" ||
            location.pathname === "/movies" ||
            location.pathname === "/saved-movies" ||
            location.pathname === "/profile" ? (<Header/>) : null}
            <Routes>
                <Route exact path="/" element={<>
                    <Main/>
                </>}>
                </Route>

                <Route
                    path="/sign-up"
                    element={<Register/>}
                >
                </Route>
                <Route
                    path="/sign-in"
                    element={<Login/>}
                ></Route>
                <Route
                    path="*"
                    element={<PageNotFound/>}
                >
                </Route>

                <Route path="/profile" element={<>
                    <Profile/>
                </>}>
                </Route>

                <Route path="/movies" element={<>
                    <Movies/>
                </>}>
                </Route>

                <Route path="/saved-movies" element={<>
                    <SavedMovies/>
                </>}>
                </Route>

                <Route path="*" element={<PageNotFound/>}>
                </Route>
            </Routes>
            {location.pathname === '/' ||
            location.pathname === '/movies' ||
            location.pathname === '/saved-movies' ? (<Footer/>) : null}
        </div>
    );
}

export default App;
