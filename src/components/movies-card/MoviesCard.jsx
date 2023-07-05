import React, {useContext, useEffect, useState} from "react";
import {CurrentMovieContext} from "../../contexts/CurrentMovieContext";
import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import movies from "../movies/Movies";

function MoviesCard({movie, onCardLike, onCardUnlike, savedMovies, allMovies }) {
    const [save, setSave] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const location = useLocation();

    // useEffect(() => {
    //     //const sw = ;
    //     if (savedMovies.some((item) => item.movieId === movie.id)) {
    //         setIsLiked(true);
    //     } else {
    //         setIsLiked(false);
    //     }
    // }, [savedMovies, location.pathname==='/movies']);


    function handleMovieLike() {
        if (isLiked === false) {
            onCardLike(movie);
            setIsLiked(true);
        }
        if (isLiked === true) {
            const unSaved = savedMovies.find(item => item.movieId === movie.id);
            onCardUnlike(unSaved);
            setIsLiked(false);
        }
    }

    function handleMovieDeleteLike() {
        //console.log(movie + "____ " );
       // const unSaved = movies.filter(item => item.movieId === movie.id);
        onCardUnlike(movie);
    }

    const durationFormat = (duration) => {
        const hours = Math.floor(duration / 60);
        const min = duration % 60;
        return `${hours > 0 ? hours + 'ч' : ''}${min}м`;
    }

    return (
        <li className="card">
            <div className="card__group">
                <div className="card__header-text">
                    <h2 className="card__title">{movie.nameRU}</h2>
                    <p className="card__movie-time">{`${durationFormat(movie.duration)}`}</p>
                </div>
                {location.pathname === '/movies' ? (
                        <button  type="button"
                                 aria-label="Флажок сохранение/удаление"
                            className={`card__save-button ${isLiked ? 'card__save-button_active' : ''}`}
                            onClick={handleMovieLike}></button>
                ) : (
                    <button  type="button"
                             aria-label="Флажок сохранение/удаление"
                        className='card__save-button card__delete-button'
                        onClick={()=> handleMovieLike.onCardUnlike(movie)}></button>
                )}
                {/*<button*/}
                {/*    // onClick={handleMovieLike}*/}
                {/*    onClick={isSavedMoviesPage ? onCardUnlike(movie) : handleMovieLike}*/}
                {/*    className={`card__save-button ${*/}
                {/*        window.location.pathname === '/saved-movies'*/}
                {/*            ? 'card__delete-button'*/}
                {/*            : isLiked ? 'card__save-button_active' : ''*/}
                {/*    }`}*/}
                {/*    // className={`card__save-button ${isLiked ? 'card__save-button_active' : ''}`}*/}
                {/*    type="button"*/}
                {/*    aria-label="Флажок сохранение/удаление"*/}
                {/*></button>*/}
            </div>
            <img
                src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
                className="card__image"
                alt={movie.nameRU}
            />
        </li>
    );
}

export default MoviesCard;
