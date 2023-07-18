import Footer from "../footer/Footer";
import PageNotFound from "../page-not-found/PageNotFound";
import Login from "../login/Login";
import Header from "../header/Header";
import Register from "../register/Register";
import Profile from "../profile/Profile";
import Main from "../main/Main";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {CurrentMovieContext} from "../../contexts/CurrentMovieContext";
import Movies from "../movies/Movies";
import SavedMovies from "../saved-movies/SavedMovies";
import {useCallback, useEffect, useState} from "react";
import * as Auth from "../../utils/Auth";
import api from "../../utils/MainApi";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import * as MoviesApi from "../../utils/MoviesApi";
import useScreenWidth from "../../hooks/useScreenWidth";

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [userData, setUserData] = useState({name: '', email: ''});
    const [userErrorMessage, setUserErrorMessage] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const location = useLocation();
    const token = localStorage.getItem("token");
    //
    const [savedMoviesToDisplay, setSavedMoviesToDisplay] = useState([]);
    //

    const [isLoading, setIsLoading] = useState(false); // для отслеживания загрузки во время ожидагия от сервера ответа
    const [isPreloader, setIsPreloader] = useState(true);
    const [isSave, setIsSave] = useState(false);

    // Авторизация
    const [loggedIn, setLoggedIn] = useState(false);
    const [successRegister, setSuccessRegister] = useState(false);
    const [successEditProfile, setSuccessEditProfile] = useState(false);
    const [jwt, setJwt] = useState('');
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]); // для загрузки сохраненных фильмов
    const [shortMovies, setShortMovies] = useState([]); // для загрузки короткометражек

    const [moviesLength, setMoviesLength] = useState(12);
    const [showMoreCards, setShowMoreCards] = useState(3);
    const width = useScreenWidth();

    useEffect(() => {
        if (width >= 1280) {
            console.log(width);
            setMoviesLength(12);
            setShowMoreCards(3);
        } else if (width < 1279 && width > 480) {
            console.log(width);
            setMoviesLength(8);
            setShowMoreCards(2);
        } else if (width <= 480 && width > 320) {
            console.log(width);
            setMoviesLength(5);
            setShowMoreCards(2);
        }

    }, [width]);

    function addSavedMoviesOnPage() {
        setMoviesLength(moviesLength + showMoreCards);
    }

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

    // Загрузка всех фильмов
    useEffect(() => {
        MoviesApi
            .getMovies()
            .then((movies) => {
                setAllMovies(movies);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.status}`);
            })
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn && location.pathname === '/movies') {
            setIsPreloader(true);
            MoviesApi.getMovies()
                .then((res) => {
                    if (res.length) {
                        localStorage.setItem('movies',
                            JSON.stringify(res.filter((item) => (item.image && item.country && item.nameEN && item.director && item.trailerLink.startsWith('http'))))
                        );
                        setMovies(JSON.parse(localStorage.getItem('movies')));

                    }
                    // localStorage.setItem('shortMovies', JSON.stringify(res.filter((item) => item.duration <= 40)));
                    // setShortMovies(JSON.parse(localStorage.getItem('shortMovies')));
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке списка фильмов: ${err}`)
                }).finally(() => setIsPreloader(false))
        }
    }, [loggedIn, location]);

    useEffect(() => {
        setIsPreloader(true);
        if (loggedIn && (location.pathname === '/saved-movies' || location.pathname === '/movies')) {
            api.getSaveCardsMovie()
                .then((res) => {
                    if (res.length) {
                        // if (res.some(item => item.movieId === movies.id)) {
                        //const ownerSavedMovies = res.filter((item) => (item.owner === userData.id));
                        //   savedMovies.some(item => item.movieId === movies.movieId);
                        localStorage.setItem('savedMovies', JSON.stringify(res.filter((item) => (item.image && item.country && item.nameEN && item.director && item.trailerLink.startsWith('http')))));
                        setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
                        // }

                    }
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке списка сохранённых фильмов: ${err}`)
                }).finally(() => setTimeout(() => {
                setIsPreloader(false);
            }, 1000));
        }
    }, [loggedIn,]);

    function searchMovie(isShortFilms) {
        MoviesApi.getMovies()
            .then((res) => {
                if (isShortFilms) {
                    localStorage.setItem('shortMovies', JSON.stringify(res.filter((item) => item.duration <= 40)));
                    setShortMovies(JSON.parse(localStorage.getItem('shortMovies')));
                }
                //  const searchedMovies = movies.filter((item) => item.nameRU.toLowerCase().includes(nameMovie.toLowerCase()))
                // const foundMovies = isShortFilms ? searchedMovies.filter((item) => item.duration <= 40) : searchedMovies
                // localStorage.setItem('foundMovies', JSON.stringify(foundMovies))
                // localStorage.setItem('searchMovieName', nameMovie)
                // localStorage.setItem('shortFilms', isShortFilms)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    function handleSearch(isShortFilms) {
        searchMovie(isShortFilms)
    }

    function onSaveMovie(movie) {
        api.saveCardsMovie(movie)
            .then((newSavedMovie) => {
                const isMovieSawedAllReady = savedMovies.some(
                    (item) => item.movieId === movie.movieId
                );
                if (!isMovieSawedAllReady) {
                    localStorage.setItem('savedMovies', JSON.stringify(newSavedMovie));

                    setSavedMovies([JSON.parse(localStorage.getItem('savedMovies')), ...savedMovies]);
                }
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
                setUserErrorMessage("Неправильрые почта или пароль");
                setTimeout(() => {
                    setUserErrorMessage("");
                }, 2000);
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
                setUserErrorMessage("Что-то пошло не так...");
                setSuccessRegister(false);
                setTimeout(() => {
                    setUserErrorMessage("");
                }, 2000);
            });
    };

    // сброс параметров после "выхода", удаление токена
    const handleLogout = () => {
        logout();
        setUserData({name: '', email: ''});
        setCurrentUser({});
        localStorage.clear();
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
                    setUserData({name: res.name, email: res.email, idUser: res.id});
                    setCurrentUser(res);
                    setUserMessage("");
                    console.log(setCurrentUser);
                    console.log(setUserData);
                    navigate("/movies");
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const handleUpdateUser = (userData) => {
        setIsLoading(true);
        api
            .setUserInfo(userData)
            .then((newData) => {
                setCurrentUser(newData);
                setSuccessEditProfile(true);
                setUserMessage("Профиль пользователя отредактирован успешно");
                setUserErrorMessage("");
                setTimeout(() => {
                    setUserMessage("");
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                setSuccessEditProfile(false);
                setUserErrorMessage("При обновлении профиля пользователя произошла оршибка");
            }).finally(() => {
            setIsLoading(false);
        });
    };

    function getSavedMovies() {
        api.downloadingCardsMovie()
            .then((savedMovies) => {
                setSavedMovies(savedMovies)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
                getSavedMovies()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [loggedIn, location])

    function handleCardLike(movie) {
        api.addCardMovie(movie)
            .then((movieData) => {
                setSavedMovies([...savedMovies, movieData])
            })
            .catch((error) => console.log(error));
    }

    function handleDeleteSavedMovie(movie) {
        api.deleteCardMovie(movie._id)
            .then((card) => {
                setSavedMovies([...savedMovies, card])
                setSavedMovies(savedMovies.filter(item => item.id !== card.id))
                const res = savedMovies.filter((item) => item.movieId !== movie.movieId);

                localStorage.setItem('savedMovies', JSON.stringify(res));

                setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
            })
            .catch((err) => {
                console.log(`Ошибка при удаления сохранённого фильма из списка: ${err}`);
            });
    }

    function handleCardUnlike(card) {
        api.deleteCardMovie(card._id)
            .then((card) => {
                setSavedMovies([...savedMovies, card])
                setSavedMovies(savedMovies.filter(item => item._id !== card._id))
                localStorage.setItem('savedMovies', JSON.stringify(setSavedMovies));
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return (
        <CurrentMovieContext.Provider value={{userData, moviesLength}}>
            <div className="root">
                {location.pathname === "/" ||
                location.pathname === "/movies" ||
                location.pathname === "/saved-movies" ||
                location.pathname === "/profile" ? (<Header loggedIn={loggedIn}/>) : null}
                <Routes>
                    <Route exact path="/" element={<>
                        <Main/>
                    </>}>
                    </Route>

                    <Route
                        path="/sign-up"
                        element={<Register onRegister={handleRegister} userErrorMessage={userErrorMessage}/>}
                    >
                    </Route>
                    <Route
                        path="/sign-in"
                        element={<Login onLogin={handleLogin} userErrorMessage={userErrorMessage}/>}
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
                            onUpdateUser={handleUpdateUser}
                            onLogout={handleLogout}
                            successEditProfile={successEditProfile}
                            userMessage={userMessage}
                            userErrorMessage={userErrorMessage}
                        >
                            {" "}
                        </ProtectedRouteElement>}>
                    </Route>

                    <Route path="/movies" element={
                        <ProtectedRouteElement
                            loggedIn={loggedIn}
                            element={Movies}
                            isPreloader={isPreloader}
                            isSave={isSave}
                            onSaveMovie={onSaveMovie}
                            allMovies={allMovies}
                            savedMovies={savedMovies}
                            shortMovies={shortMovies}
                            onCardLike={handleCardLike}
                            onCardUnlike={handleCardUnlike}
                            handleSearch={handleSearch}
                            addSavedMoviesOnPage={addSavedMoviesOnPage}

                        >
                            {" "}
                        </ProtectedRouteElement>}>
                    </Route>

                    <Route path="/saved-movies" element={
                        <ProtectedRouteElement
                            loggedIn={loggedIn}
                            element={SavedMovies}
                            isSave={isSave}
                            isPreloader={isPreloader}
                            allMovies={setSavedMovies}
                            setSavedMovies={setSavedMovies}
                            savedMovies={savedMovies}
                            onSaveMovie={onSaveMovie}
                            onDeleteSavedMovie={handleDeleteSavedMovie}
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
