import './MoviesCardList.css';
import MoviesCard from "../movies-card/MoviesCard";
import {CurrentMovieContext} from "../../contexts/CurrentMovieContext";
import {useContext} from "react";
function MoviesCardList({
                            allMovies, savedMovies, shortMovies,handleSearch, searchMoviesCard,
                            onCardLike,
                            onCardUnlike, isSave,onDeleteSavedMovie, addSavedMovies, foundMovies, userMessMovieDownload
                        })
{
console.log(allMovies);
console.log(savedMovies);
console.log(shortMovies);
console.log(foundMovies);
    const { moviesLength } = useContext(CurrentMovieContext);

    return (
        <section className="cards">
            {userMessMovieDownload ? <span className="error__message">{userMessMovieDownload}</span> : <span></span>}
            <ul className='cards__items'>
                {  allMovies.slice(0, moviesLength).map((movie) => (
                    <MoviesCard
                        allMovies={allMovies}
                        searchMoviesCard={searchMoviesCard}
                        savedMovies={savedMovies}
                        handleSearch={handleSearch}
                        isSave={isSave}
                        onCardLike={onCardLike}
                        onDeleteSavedMovie={onDeleteSavedMovie}
                        onCardUnlike={onCardUnlike}
                        movie={movie}
                        key={movie.id || movie.movieId}
                    />
                ))}
            </ul>
            {allMovies.length < moviesLength ? "" : (
            <button onClick={addSavedMovies} type="button"
                    className="movies__btn-more"
                    atl="показывает больше карточек">Ещё
            </button>)}
        </section>
    );
}

export default MoviesCardList;
