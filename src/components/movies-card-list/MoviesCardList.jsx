import './MoviesCardList.css';
import MoviesCard from "../movies-card/MoviesCard";
import {useContext, useState} from "react";
import {CurrentMovieContext} from "../../contexts/CurrentMovieContext";

function MoviesCardList({allMovies}) {

    return (
        <section className="cards">

            <ul className='cards__items'>
                {allMovies?.map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie.id || movie.movieId}
                        {...movie}
                    />
                ))}
            </ul>
        </section>
    );
}

export default MoviesCardList;
