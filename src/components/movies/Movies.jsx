import SearchForm from "../search-form/SearchForm";
import './Movies.css';
import MoviesCardList from "../movies-card-list/MoviesCardList";
import Preloader from "../preloader/Preloader";

function Movies({
                    allMovies,
                    savedMovies,
                    onCardLike,
                    onCardUnlike,
                    addSavedMovies,
                    onDeleteSavedMovie,
                    isPreloader,
                    handleSearch,
                    userMessMovieDownload,
                    searchMoviesCard
                }) {

    return (
        <main className="movies">
            <SearchForm handleSearch={handleSearch}/>
            {isPreloader ? <Preloader/> :
                <MoviesCardList userMessMovieDownload={userMessMovieDownload}
                                allMovies={allMovies} searchMoviesCard={searchMoviesCard}
                                savedMovies={savedMovies}
                                onCardLike={onCardLike} onCardUnlike={onCardUnlike} addSavedMovies={addSavedMovies}
                                onDeleteSavedMovie={onDeleteSavedMovie}/>}
        </main>
    )
}

export default Movies;
