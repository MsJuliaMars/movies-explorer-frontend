import React, {useContext, useEffect, useState} from "react";
import {CurrentMovieContext} from "../../contexts/CurrentMovieContext";
import './MoviesCard.css';

function MoviesCard({movie, onCardLike, onCardUnlike, wasSaved, savedMovies, isSavedMoviesPage }) {
    const [save, setSave] = useState(false);

    const [isLiked, setIsLiked] = useState(false);

    // useEffect(() => {
    //     console.log(savedMovies);
    //     if (savedMovies.some((movie) => movie.movieId === movie.id)) {
    //         setIsLiked(true);
    //         console.log(savedMovies);
    //     }
    // }, [savedMovies, movie.id]);


    function handleMovieLike() {
        if (isLiked === false) {
            onCardLike(movie);
            setIsLiked(true);
        }
        // if (isLiked === true) {
        //     onCardUnlike(movie);
        //     setIsLiked(false);
        // }
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
                <button
                    // onClick={handleMovieLike}
                    onClick={isSavedMoviesPage ? '' : handleMovieLike}
                    className={`card__save-button ${
                        window.location.pathname === '/saved-movies'
                            ? 'card__delete-button'
                            : isLiked ? 'card__save-button_active' : ''
                    }`}
                    // className={`card__save-button ${isLiked ? 'card__save-button_active' : ''}`}
                    type="button"
                    aria-label="Флажок сохранение/удаление"
                ></button>
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
