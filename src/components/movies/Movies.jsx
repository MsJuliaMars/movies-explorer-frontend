import SearchForm from "../search-form/SearchForm";
import './Movies.css';
import MoviesCardList from "../movies-card-list/MoviesCardList";
import Preloader from "../preloader/Preloader";

function Movies({
                    handleSearch,
                    allMovies,
                    savedMovies,
                    shortMovies,
                    onCardLike,
                    onCardUnlike,
                    addSavedMoviesOnPage,
                    onDeleteSavedMovie,
                    isPreloader, isSave, onSaveMovie,
                }) {

    return (
        <main className="movies">
            <SearchForm handleSearch={handleSearch}/>
            {isPreloader ? <Preloader/> :
                <MoviesCardList shortMovies={shortMovies} handleSearch={handleSearch} allMovies={allMovies}
                                savedMovies={savedMovies} isSave={isSave} onSaveMovie={onSaveMovie}
                                onCardLike={onCardLike} onCardUnlike={onCardUnlike}
                                onDeleteSavedMovie={onDeleteSavedMovie} isSavedMoviesPage={false}/>}
            <button onClick={addSavedMoviesOnPage} type="button" className="movies__btn-more"
                    atl="показывает больше карточек">Ещё
            </button>
        </main>
    )
}

export default Movies;
