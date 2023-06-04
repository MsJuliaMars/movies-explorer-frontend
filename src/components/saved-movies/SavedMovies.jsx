import SearchForm from "../movies/search-form/SearchForm";
import MoviesCardList from "../movies/movies-card-list/MoviesCardList";
import {SaveInitialCards} from "../../utils/InitialCards";

function SavedMovies() {
    return (
        <section className='saved-movies'>
            <SearchForm />
            <MoviesCardList movieLibrary={SaveInitialCards} />
        </section>
    );
}

export default SavedMovies;
