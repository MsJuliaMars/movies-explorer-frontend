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
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import * as MoviesApi from "../../utils/MoviesApi";


function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [userData, setUserData] = useState({ name: '', email: '' });
    const location = useLocation();
    const token = localStorage.getItem("token");

    //

    const [navigationOpened, setNavigationOpened] = useState(false);
    const [serverMessage, setServerMessage] = useState('');

    const [filterSavedData, setFilterSavedData] = useState({ params: '', short: false });
   const [initialMovies, setInitialMovies] = useState([]);
    const [filterData, setFilterData] = useState({ params: '', short: false });
    const [searchSuccses, setSearchSuccses] = useState(false);
    const [searchSavedSuccses, setSearchSavedSuccses] = useState(false);
    const [moviesToDisplay, setMoviesToDisplay] = useState([]);
    const [savedMoviesToDisplay, setSavedMoviesToDisplay] = useState([]);
    //

    const [isLoading, setIsLoading] = useState(false); // для отслеживания загрузки во время ожидагия от сервера ответа

    // Авторизация
    const [loggedIn, setLoggedIn] = useState(false);
    const [successRegister, setSuccessRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [jwt, setJwt] = useState('');
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]); // для загрузки сохраненных фильмов

    const login = useCallback(() => {
        setLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setLoggedIn(false);
    }, []);


    // Авторизация при открытии страницы по сохраненному логину
    useEffect(() => {
       Auth.checkToken();
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

    //
    // useEffect(() => {
    //     // const jwt = localStorage.getItem('jwt')
    //     if (jwt) {
    //         Promise.all([api.getUserInfo(), api.saveCardsMovie()])
    //             .then(([userData, savedMovies]) => {
    //                 setUserData(userData);
    //                 const userMovies = savedMovies.filter((movie) => movie.owner === userData._id);
    //                 localStorage.setItem("savedMovies", JSON.stringify(userMovies));
    //                 setSavedMovies(userMovies);
    //                 // setSavedMoviesToDisplay(userMovies);
    //             })
    //             .catch((error) => {
    //                 console.log(error.message);
    //             });
    //     }
    // }, []);


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
        }
    }, [loggedIn, location]);

    useEffect(() => {
        if (loggedIn && (location.pathname === '/saved-movies' || location.pathname === '/movies')) {
            api.getSaveCardsMovie()
                .then((res) => {
                    if (res.length) {
                        // const ownerSavedMovies = res.filter((item) => (item.owner === currentUser._id));

                        localStorage.setItem('savedMovies', JSON.stringify(res.filter((item) => (item.image && item.country && item.nameEN && item.director && item.trailerLink.startsWith('http')))));
                        setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));

                    }
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке списка сохранённых фильмов: ${err}`)
                });
        }
    }, [loggedIn, location, currentUser]);

    function onSaveMovie(movie) {
        api.saveCardsMovie(movie)
            .then((newSavedMovie) => {
                localStorage.setItem('savedMovies', JSON.stringify(newSavedMovie));

                setSavedMovies([JSON.parse(localStorage.getItem('savedMovies')), ...savedMovies]);
            })
            .catch((err) => {
                console.log(`Ошибка при сохранения фильма: ${err}`);
            });
    }



    const handleLogin = ({email, password}) => {
        Auth
            .authorize(email, password)
            .then((data) => {
                if (data?.token) {
                    localStorage.setItem("jwt", data.token);
                    login();
                    api.setToken(data.token); // передает в api новое значение токена
                    setUserData({name: userData.name, email: userData.email})
                    navigate("/movies");
                    setJwt(token);
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
                setUserData({name: userData.name, email: userData.email})
                navigate("/sign-in");
            })
            .catch((err) => {
                console.log(err);
                setSuccessRegister(false);
            });
    };

    // сброс параметров после "выхода", удаление токена
    const handleLogout = () => {
        logout();
        setUserData(null);
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
                    setUserData({ name: res.name, email: res.email, idUser: res.id});
                    navigate("/movies");
                })
                .catch((err) => console.log(err));
        }
    }, []);


    function movieRemover(movie) {
        api.deleteCardMovie(movie)
            .then((data) => {
                const adjustedSavedMovies = savedMovies.filter(item => item._id !== data._id);

                setSavedMovies(adjustedSavedMovies);
                localStorage.setItem('savedMovies', JSON.stringify(adjustedSavedMovies));
            })
            .catch(err => console.log(err));
    }



    function handleCardLike(movie) {
        api.addCardMovie(movie)
            .then((savedMovie) => {
                setSavedMoviesToDisplay((prevSavedMoviesToShow) => [...prevSavedMoviesToShow, savedMovie]);
                setSavedMovies((prevSavedMovies) => [...prevSavedMovies, savedMovie]);
            })
            .catch((error) => console.log(error));
    }

    function handleCardUnlike(movie) {
        if (movie._id) {
            movieRemover(movie._id);
        } else {
            const movieToDelete = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
            movieRemover(movieToDelete._id);
        }
    }

    return (
        <CurrentMovieContext.Provider value={userData}>
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
                        >
                            {" "}
                        </ProtectedRouteElement>}>
                    </Route>

                    <Route path="/movies" element={
                        <ProtectedRouteElement
                            loggedIn={loggedIn}
                            element={Movies}
                            allMovies={allMovies}
                            onSaveMovie={onSaveMovie}
                            savedMovies={savedMovies}
                            onCardLike={handleCardLike}
                            onCardUnlike={handleCardUnlike}
                        >
                            {" "}
                        </ProtectedRouteElement>}>
                    </Route>

                    <Route path="/saved-movies" element={
                        <ProtectedRouteElement
                            loggedIn={loggedIn}
                            element={SavedMovies}
                            allMovies={setSavedMovies}
                            setSavedMovies={setSavedMovies}
                            savedMovies={savedMovies}
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
