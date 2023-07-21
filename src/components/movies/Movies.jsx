import SearchForm from "../search-form/SearchForm";
import './Movies.css';
import MoviesCardList from "../movies-card-list/MoviesCardList";
import Preloader from "../preloader/Preloader";

function Movies({
                    allMovies,
                    savedMovies,
                    shortMovies,
                    onCardLike,
                    onCardUnlike,
                    addSavedMovies,
                    onDeleteSavedMovie,
                    isPreloader, isSave, onSaveMovie,handleSearch, setSearchMoviesCard,userMessMovieDownload,
                }) {

    return (
        <main className="movies">
            <SearchForm handleSearch={handleSearch} />
            {isPreloader ? <Preloader/> :
                <MoviesCardList userMessMovieDownload={userMessMovieDownload} handleSearch={setSearchMoviesCard}
                                shortMovies={shortMovies} allMovies={allMovies}
                                savedMovies={savedMovies} isSave={isSave} onSaveMovie={onSaveMovie}
                                onCardLike={onCardLike} onCardUnlike={onCardUnlike} addSavedMovies={addSavedMovies}
                                onDeleteSavedMovie={onDeleteSavedMovie} isSavedMoviesPage={false}/>}
        </main>
    )
}

export default Movies;
