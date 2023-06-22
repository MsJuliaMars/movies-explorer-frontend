import React, {useState} from "react";
import './MoviesCard.css';

function MoviesCard({movie}) {
    const [save, setSave] = useState(false);

    function handleFlagToogle() {
        setSave(!save);
    }

    const durationFormat = (duration) => {
        const hours = Math.floor(duration / 60);
        const min = duration % 60;
        return `${hours > 0 ? hours + 'ч ' : ''}${min}м`;
    }

    return (
        <li className="card">
            <div className="card__group">
                <div className="card__header-text">
                    <h2 className="card__title">{movie.nameRU}</h2>
                    <p className="card__movie-time">{`${durationFormat(movie.duration)}`}</p>
                </div>
                <button

                    className={`card__save-button ${
                        window.location.pathname === '/saved-movies'
                            ? 'card__delete-button'
                            : save ? 'card__save-button_active' : ''
                    }`}
                    type="button"
                    aria-label="Флажок"
                    onClick={handleFlagToogle}
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
