import Footer from "../footer/Footer";
import PageNotFound from "../page-not-found/PageNotFound";
import Login from "../login/Login";
import Header from "../header/Header";
import Register from "../register/Register";
import Profile from "../profile/Profile";
import Main from "../main/Main";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {CurrentMovieContext} from "../../contexts/CurrentMovieContext";
import Movies from "../movies/Movies";
import SavedMovies from "../saved-movies/SavedMovies";
import {useCallback, useEffect, useState} from "react";
import * as Auth from "../../utils/Auth";
import api from "../../utils/MainApi";
import {getMovies} from "../../utils/MoviesApi";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import * as moviesApi from "../../utils/MoviesApi";
import * as MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";


function App() {
    const [currentUser, setCurrentUser] = useState({});
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false); // для отслеживания загрузки во время ожидагия от сервера ответа

    // Авторизация
    const [loggedIn, setLoggedIn] = useState(false);
    const [successRegister, setSuccessRegister] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    const login = useCallback(() => {
        setLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setLoggedIn(false);
    }, []);

    // useEffect(() => {
    //     if (loggedIn) {
    //         navigate("/");
    //     }
    // }, []);

    // Авторизация при открытии страницы по сохраненному логину
    useEffect(() => {
       Auth.checkToken();
    }, []);


    // получаем список фильмов, сохраненных пользователем
    useEffect(() => {
        if (isLoading) {
            MainApi.downloadingCardsMovie()
                .then((moviesData) => {
                    localStorage.setItem("savedMovies", JSON.stringify(moviesData));
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, []);


    useEffect(() => {
        MoviesApi
            .getMovies()
            .then((movies) => {
                setAllMovies(movies);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.status}`);
            })
    }, []);

    // useEffect(() => {
    //     tokenCheck();
    //     if (loggedIn) {
    //         mainApi.getAllSavedMovies()
    //             .then(movies => {
    //                 setSavedMovies(movies);
    //             });
    //     }
    // }, [loggedIn]);



    useEffect(() => {
        if (loggedIn && location.pathname === '/movies') {

            MoviesApi.getMovies()
                .then((res) => {
                    if (res.length) {
                        localStorage.setItem('movies',
                            JSON.stringify(res.filter((item) => (item.image && item.country && item.nameEN && item.director && item.trailerLink.startsWith('http'))))
                        );

                        setMovies(JSON.parse(localStorage.getItem('movies')));

                    }
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке списка фильмов: ${err}`)
                });
            // .finally(() => setTimeout(() => {
            //     setIsPreloader(false);
            // }, 2000));
        }
    }, [loggedIn, location]);

    const handleLogin = ({email, password}) => {
        Auth
            .authorize(email, password)
            .then((data) => {
                if (data?.token) {
                    localStorage.setItem("jwt", data.token);
                    login();
                    api.setToken(data.token); // передает в api новое значение токена
                    setEmail(email);
                    navigate("/movies");
                }
            })
            .catch((err) => {
                console.log(err);
                setSuccessRegister(false);
                // setIsInfoTooltipPopupOpen(true);
            });
    };

    const handleRegister = ({name, email, password}) => {
        Auth
            .register(name, email, password)
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
        <CurrentMovieContext.Provider value={currentUser}>
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
                        element={<Register onRegister={handleRegister}/>}
                    >
                    </Route>
                    <Route
                        path="/sign-in"
                        element={<Login onLogin={handleLogin}/>}
                    ></Route>
                    <Route
                        path="*"
                        element={<PageNotFound/>}
                    >
                    </Route>

                    <Route path="/profile" element={
                        <ProtectedRouteElement
                            loggedIn={loggedIn}
                            element={Profile}
                            // onEditAvatar={handleEditAvatarClick}
                            // onEditProfile={handleEditProfileClick}
                            // onAddPlace={handleAddPlaceClick}
                            // onCardClick={handleCardClick}
                            // cards={cards}
                            // onCardLike={handleCardLike}
                            // onCardDelete={handleCardDelete}
                        >
                            {" "}
                        </ProtectedRouteElement>}>
                    </Route>

                    <Route path="/movies" element={
                        <ProtectedRouteElement
                            loggedIn={loggedIn}
                            element={Movies}
                            allMovies={allMovies}
                            // onEditAvatar={handleEditAvatarClick}
                            // onEditProfile={handleEditProfileClick}
                            // onAddPlace={handleAddPlaceClick}
                            // onCardClick={handleCardClick}
                            // cards={cards}
                            // onCardLike={handleCardLike}
                            // onCardDelete={handleCardDelete}
                        >
                            {" "}
                        </ProtectedRouteElement>}>
                    </Route>

                    <Route path="/saved-movies" element={
                        <ProtectedRouteElement
                            loggedIn={loggedIn}
                            element={SavedMovies}
                            // onEditAvatar={handleEditAvatarClick}
                            // onEditProfile={handleEditProfileClick}
                            // onAddPlace={handleAddPlaceClick}
                            // onCardClick={handleCardClick}
                            // cards={cards}
                            // onCardLike={handleCardLike}
                            // onCardDelete={handleCardDelete}
                        >
                            {" "}
                        </ProtectedRouteElement>}>
                    </Route>

                    <Route path="*" element={<PageNotFound/>}>
                    </Route>
                </Routes>
                {location.pathname === '/' ||
                location.pathname === '/movies' ||
                location.pathname === '/saved-movies' ? (<Footer/>) : null}
            </div>
        </CurrentMovieContext.Provider>
    );
}

export default App;
