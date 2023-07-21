import './MoviesCardList.css';
import MoviesCard from "../movies-card/MoviesCard";
import {CurrentMovieContext} from "../../contexts/CurrentMovieContext";
import {useContext} from "react";
function MoviesCardList({
                            allMovies, savedMovies, shortMovies,
                            onCardLike,
                            onCardUnlike, isSave,onDeleteSavedMovie,setSearchMoviesCard, addSavedMovies, foundMovies, userMessMovieDownload
                        })
{
console.log(allMovies);
console.log(savedMovies);
console.log(shortMovies);
console.log(setSearchMoviesCard);
    const { moviesLength } = useContext(CurrentMovieContext);

    return (
        <section className="cards">
            {userMessMovieDownload ? <span className="error__message">{userMessMovieDownload}</span> : <span></span>}
            <ul className='cards__items'>
                {  allMovies.slice(0, moviesLength).map((movie) => (
                    <MoviesCard

                        allMovies={allMovies}
                        savedMovies={savedMovies}
                        shortMovies={shortMovies}
                        setSearchMoviesCard={setSearchMoviesCard}
                        foundMovies={foundMovies}
                        isSave={isSave}
                        onCardLike={onCardLike}
                        onDeleteSavedMovie={onDeleteSavedMovie}
                        onCardUnlike={onCardUnlike}
                        movie={movie}
                        key={movie.id || movie.movieId}
                    />
                ))}
            </ul>
            {allMovies.length < moviesLength ? (<div className='cards__user-message'>Фильмы закончились</div>) : (
            <button onClick={addSavedMovies} type="button"
                    className="movies__btn-more"
                    atl="показывает больше карточек">Ещё
            </button>)}
        </section>
    );
}

export default MoviesCardList;
