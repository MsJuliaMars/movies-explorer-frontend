import SearchForm from "../search-form/SearchForm";
import MoviesCardList from "../movies-card-list/MoviesCardList";
import './SavedMovies.css';
import {useEffect, useState} from "react";

import api from "../../utils/MainApi";
// import {deleteCardMovie} from "../../utils/MainApi";

function SavedMovies({savedMovies, setSavedMovies, allMovies, }) {

    const [moviesForRender, setMoviesForRender] = useState(savedMovies);

    const jwt = localStorage.getItem("jwt");

    useEffect(() => setMoviesForRender(savedMovies), [savedMovies]);

    // async function handleCardClick(movie) {
    //     const savedMovie = savedMovies.find(
    //         (savedMovie) => savedMovie.movieId === movie.movieId,
    //     );
    //     await onDeleteSavedMovie(savedMovie);
    //
    // }


    return (
        <main className='saved-movies'>
            <SearchForm />
            <MoviesCardList allMovies={moviesForRender} savedMovies={allMovies}  />
            <div className='saved-movies__container'></div>
        </main>
    );
}

export default SavedMovies;
