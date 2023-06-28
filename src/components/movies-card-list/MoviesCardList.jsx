import './MoviesCardList.css';
import MoviesCard from "../movies-card/MoviesCard";
import {useContext, useState} from "react";
import {CurrentMovieContext} from "../../contexts/CurrentMovieContext";

function MoviesCardList({
                            allMovies, savedMovies,
                            onCardLike,
                            onCardUnlike, isSavedMoviesPage
                        })
{
console.log(allMovies);
    return (
        <section className="cards">

            <ul className='cards__items'>
                {allMovies?.map((movie) => (
                    <MoviesCard
                        allMovies={allMovies}
                        isSavedMoviesPage={isSavedMoviesPage}
                        savedMovies={savedMovies}
                        onCardLike={onCardLike}
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
