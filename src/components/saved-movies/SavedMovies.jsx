import SearchForm from "../search-form/SearchForm";
import MoviesCardList from "../movies-card-list/MoviesCardList";
import './SavedMovies.css';
import {useEffect, useState} from "react";
import Preloader from "../preloader/Preloader";

function SavedMovies({
                         savedMovies, onDeleteSavedMovie, isPreloader, isSave, onSaveMovie, handleSearch,
                         userMessMovieDownload,
                         searchMoviesCard
                     }) {

    const [moviesForRender, setMoviesForRender] = useState(savedMovies);

    useEffect(() => setMoviesForRender(savedMovies), [savedMovies]);

    return (
        <main className='saved-movies'>
            <SearchForm handleSearch={handleSearch}/>
            {isPreloader ? <Preloader/> :
                <MoviesCardList userMessMovieDownload={userMessMovieDownload}
                                searchMoviesCard={searchMoviesCard} allMovies={moviesForRender}
                                savedMovies={savedMovies}
                                onSaveMovie={onSaveMovie} onDeleteSavedMovie={onDeleteSavedMovie} isSave={isSave}/>}
            <div className='saved-movies__container'></div>
        </main>
    );
}

export default SavedMovies;
