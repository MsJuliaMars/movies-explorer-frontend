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
import {NUMBER_OF_CARDS, USER_MESS} from "../../utils/constants";


function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [userData, setUserData] = useState({name: '', email: ''});
    const [userErrorMessage, setUserErrorMessage] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const location = useLocation();
    const token = localStorage.getItem("token");

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
    const [searchMoviesCard, setSearchMoviesCard] = useState([]); // для загрузки найденного фильма
    const [userMessMovieDownload, setUserMessMovieDownload] = useState(''); // сообщение для пользователя о загрузке-поиске фильмов

    const [moviesLength, setMoviesLength] = useState(12);
    const [showMoreCards, setShowMoreCards] = useState(3);
    const width = useScreenWidth();

    useEffect(() => {
        if (width >= NUMBER_OF_CARDS.LAPTOP_WIDTH) {
            console.log(width);
            setMoviesLength(NUMBER_OF_CARDS.LAPTOP_LENGTH);
            setShowMoreCards(NUMBER_OF_CARDS.TABLET_ADDED_MOVIES);
        } else if (width < NUMBER_OF_CARDS.LAPTOP_WIDTH && width > NUMBER_OF_CARDS.TABLET_WIDTH) {
            console.log(width);
            setMoviesLength(NUMBER_OF_CARDS.TABLET_LENGTH);
            setShowMoreCards(NUMBER_OF_CARDS.TABLET_ADDED_MOVIES);
        } else if (width <= NUMBER_OF_CARDS.TABLET_WIDTH && width > NUMBER_OF_CARDS.PHONE_WIDTH) {
            console.log(width);
            setMoviesLength(NUMBER_OF_CARDS.PHONE_LENGTH);
            setShowMoreCards(NUMBER_OF_CARDS.PHONE_ADDED_MOVIES);
        }

    }, [width]);

    function addSavedMovies() {
        setMoviesLength(moviesLength + showMoreCards);
    }

    const login = useCallback(() => {
        setLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setLoggedIn(false);
    }, []);


    // function getSavedMovies() {
    //     api.downloadingCardsMovie()
    //         .then((savedMovies) => {
    //             setSavedMovies(savedMovies);
    //             localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    //         })
    //         .catch((err) => {
    //          console.log(`Что-то пошло не так! Ошибка сервера ${err}`);
    //         })
    // }


    // function getUserInfo() {
    //     api.getUserInfo()
    //         .then((data) => {
    //             setCurrentUser(data);
    //             setLoggedIn(true);
    //         })
    //         .catch((err) => {
    //             console.log(`Что-то пошло не так! Ошибка сервера ${err}`);
    //         })
    // }

    // сохраняем в контекст пользователя
    useEffect(() => {
        if (loggedIn) {
            api.getUserInfo()
                .then((response) => setCurrentUser(response))
                .catch((err) => {
                    console.log(`Ошибка при загрузке данных пользователя: ${err}`)
                });
        }
    }, [location]);


    useEffect(() => {
        if (loggedIn && location.pathname === '/movies') {
            setIsPreloader(true);
            MoviesApi.getMovies()
                .then((res) => {
                    if (res.length) {
                        localStorage.setItem('movies',
                            JSON.stringify(res.filter((item) => (item.image && item.country && item.nameEN && item.director && item.trailerLink.startsWith('http'))))
                        );

                        setAllMovies(JSON.parse(localStorage.getItem('movies')));
                        setMovies(JSON.parse(localStorage.getItem('movies')));
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке списка фильмов: ${err}`)
                }).finally(() => setIsPreloader(false))
        }
    }, [loggedIn, location, setAllMovies]);

    useEffect(() => {
        setIsPreloader(true);
        if (loggedIn && (location.pathname === '/saved-movies' || location.pathname === '/movies')) {
            api.getSaveCardsMovie()
                .then((res) => {
                    if (res.length) {
                        localStorage.setItem('savedMovies', JSON.stringify(res.filter((item) => (item.nameEN && item.director && item.image && item.country && item.trailerLink.startsWith('http')))));
                        setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка при загрузке списка сохранённых фильмов: ${err}`)
                }).finally(() => setTimeout(() => {
                setIsPreloader(false);
            }, 1000));
        }
    }, [loggedIn, location, ]);

    function searchMovie(nameMovie, isShortFilms) {
        setIsPreloader(true);
        MoviesApi.getMovies()
            .then((res) => {
                const searchedMovies = res.filter((item) => item.nameRU.toString().toLowerCase().includes(nameMovie.toLowerCase()));
                localStorage.setItem('searchMovieName', JSON.stringify(searchedMovies));
                const foundMovies = isShortFilms ? searchedMovies.filter((item) => item.duration <= 40) : searchedMovies;
                localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
                localStorage.setItem('shortFilms', isShortFilms);
                localStorage.setItem('saveNameMovie', nameMovie);
                setSearchMoviesCard(JSON.parse(localStorage.getItem('foundMovies')));
                setAllMovies(foundMovies);

                if (location.pathname === '/saved-movies') {
                    setSavedMovies(foundMovies);
                }

                if (foundMovies.length === 0) {
                    setUserMessMovieDownload(USER_MESS.NOT_FOUND);
                }
            })
            .catch((err) => {
                console.log(err.message);
                setUserMessMovieDownload(USER_MESS.TRY_AGAIN);
            }).finally(() => setTimeout(() => {
            setIsPreloader(false);
        }, 2000));
    }



    function handleSearch(nameMovie, isShortFilms) {
        searchMovie(nameMovie, isShortFilms)
    }

    function onSaveMovie(movie) {
        api.saveCardsMovie(movie)
            .then((newSavedMovie) => {
                const isMovieSawedAllReady = savedMovies.some(
                    (item) => item.movieId === movie.movieId
                );
                if (!isMovieSawedAllReady) {
                    localStorage.setItem('savedMovies58', JSON.stringify(newSavedMovie));

                    setSavedMovies([JSON.parse(localStorage.getItem('savedMovies58')), ...savedMovies]);
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
                    // login();
                    api.setToken(data.token); // передает в api новое значение токена
                    //getUserInfo();
                    //getSavedMovies();
                    setLoggedIn(true);
                    navigate("/movies");
                }
            })
            .catch((err) => {
                console.log(err);
                logout();
                setSuccessRegister(false);
                setUserErrorMessage(USER_MESS.FAIL_AUTH);
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
                handleLogin({email, password});
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

    //сохранение токена в локальном хранилище и передача email
    useEffect(() => {
        // если у пользователя есть токен в localStorage,
        // эта функция проверит валидность токена
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            // проверим токен
            Auth
                .checkToken(jwt)
                .then(({name, email, _id}) => {
                    // авторизуем пользователя
                    login();
                    setLoggedIn(true);
                    api.setToken(jwt);
                    setUserMessage("");
                    setCurrentUser({name, email, _id});
                })
                .catch((err) => console.log(err));
        }
    }, []);

    // сброс параметров после "выхода", удаление токена
    const handleLogout = () => {
        logout();
        setUserData({name: '', email: ''});
        setCurrentUser({});
        setAllMovies([]);
        setSavedMovies([]);
        localStorage.clear();
        navigate("/");
    };

    const handleUpdateUser = (userData) => {
        setIsLoading(true);
        api
            .setUserInfo(userData)
            .then((newData) => {
                setCurrentUser(newData);
                setSuccessEditProfile(true);
                setUserMessage(USER_MESS.SUCCESS_EDIT_USER);
                setUserErrorMessage("");
                setTimeout(() => {
                    setUserMessage("");
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                setSuccessEditProfile(false);
                setUserErrorMessage(USER_MESS.UPDATE_ERROR);
            }).finally(() => {
            setIsLoading(false);
        });
    };

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
                console.log(`Ошибка при удаления сохранённого фильма: ${err}`);
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
        <CurrentMovieContext.Provider value={{userData, currentUser, moviesLength}}>
            <div className="root">
                {location.pathname === "/" ||
                location.pathname === "/movies" ||
                location.pathname === "/saved-movies" ||
                location.pathname === "/profile" ? (<Header loggedIn={loggedIn}/>) : null}
                <Routes>
                    <Route exact path="/" element={<>
                        <Main />
                    </>}>
                    </Route>

                    <Route
                        path="/signup"
                        element={<Register onRegister={handleRegister} userErrorMessage={userErrorMessage}/>}
                    >
                    </Route>
                    <Route
                        path="/signin"
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
                            allMovies={allMovies}
                            savedMovies={savedMovies}
                            shortMovies={shortMovies}
                            onCardLike={handleCardLike}
                            onCardUnlike={handleCardUnlike}
                            addSavedMovies={addSavedMovies}
                            handleSearch={handleSearch}
                            userMessMovieDownload={userMessMovieDownload}
                            defaultValueInput={localStorage.getItem("saveNameMovie") || ""}
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
                            savedMovies={savedMovies}
                            onDeleteSavedMovie={handleDeleteSavedMovie}
                            handleSearch={handleSearch}
                            searchMoviesCard={searchMoviesCard}
                            userMessMovieDownload={userMessMovieDownload}
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
