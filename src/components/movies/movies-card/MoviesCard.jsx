import React, {useState} from "react";
import './MoviesCard.css';

function MoviesCard({title, time, movie}) {
    const [save, setSave] = useState(false);

    function handleFlagToogle() {
        setSave(!save);
    }

    return (
        <li className="card">
            <div className="card__group">
                <div className="card__header-text">
                    <h2 className="card__title">{title}</h2>
                    <p className="card__movie-time">{time}</p>
                </div>
                <button
                    className={`card__save-button ${
                        save ? "card__save-button_active" : ""
                    }`}
                    type="button"
                    aria-label="Флажок"
                    onClick={handleFlagToogle}
                ></button>
            </div>
            <img
                src={movie}
                className="card__image"
                alt="Превью фильма"
            />
        </li>
    );
}

export default MoviesCard;
