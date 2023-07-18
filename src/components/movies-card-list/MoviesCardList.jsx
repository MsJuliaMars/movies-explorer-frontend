import './MoviesCardList.css';
import MoviesCard from "../movies-card/MoviesCard";
import {CurrentMovieContext} from "../../contexts/CurrentMovieContext";
import {useContext} from "react";
function MoviesCardList({
                            allMovies, savedMovies, shortMovies,
                            onCardLike,
                            onCardUnlike, isSave,onDeleteSavedMovie,
                        })
{
console.log(allMovies);
console.log(savedMovies);
console.log(shortMovies);
    const { moviesLength } = useContext(CurrentMovieContext);

    return (
        <section className="cards">
            <ul className='cards__items'>
                {  allMovies.slice(0, moviesLength).map((movie) => (
                    <MoviesCard
                        allMovies={allMovies}
                        savedMovies={savedMovies}
                        shortMovies={shortMovies}
                        isSave={isSave}
                        onCardLike={onCardLike}
                        onDeleteSavedMovie={onDeleteSavedMovie}
                        onCardUnlike={onCardUnlike}
                        movie={movie}
                        key={movie.id || movie.movieId}
                    />
                ))}
            </ul>
        </section>
    );
}

export default MoviesCardList;
