import React, { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({
  movie,
  onCardLike,
  onCardUnlike,
  savedMovies,
  onDeleteSavedMovie,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // окрашиваем кнопку лайка, если он фильм нашелся в сохраненных
    if (savedMovies.find((item) => item.movieId === movie.id)) {
      setIsLiked(true);
    }
  }, [location, savedMovies]);

  function handleMovieLike() {
    if (location.pathname === "/movies" && isLiked === false) {
      if (onCardLike(movie)) {
        setIsLiked(true);
      }
    }
    if (location.pathname === "/movies" && isLiked === true) {
      const unSaved = savedMovies.find((item) => item.movieId === movie.id);
      onCardUnlike(unSaved);
      setIsLiked(false);
    }
  }

  function handleMovieDeleteLike() {
    onDeleteSavedMovie(movie);
  }

  const durationFormat = (duration) => {
    const hours = Math.floor(duration / 60);
    const min = duration % 60;
    return `${hours > 0 ? hours + "ч" : ""}${min}м`;
  };

  return (
    <li className="card">
      <div className="card__group">
        <div className="card__header-text">
          <h2 className="card__title">{movie.nameRU}</h2>
          <p className="card__movie-time">{`${durationFormat(
            movie.duration
          )}`}</p>
        </div>
        {location.pathname === "/movies" ? (
          <button
            type="button"
            aria-label="Флажок сохранение/удаление"
            className={`card__save-button ${
              isLiked ? "card__save-button_active" : ""
            }`}
            onClick={handleMovieLike}
          ></button>
        ) : (
          <button
            type="button"
            aria-label="Флажок сохранение/удаление"
            className={`card__save-button ${
              isClosing ? "" : "card__delete-button"
            }`}
            onClick={handleMovieDeleteLike}
          ></button>
        )}
      </div>
      <a
        className="card__link"
        href={movie.trailerLink}
        title={movie.trailerLink}
      >
        <img
          src={
            movie.image.url
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          className="card__image"
          alt={movie.nameRU}
        />
      </a>
    </li>
  );
}

export default MoviesCard;
