import SearchForm from "../search-form/SearchForm";
import MoviesCardList from "../movies-card-list/MoviesCardList";
import {SaveInitialCards} from "../../utils/InitialCards";
import './SavedMovies.css';

function SavedMovies() {
    return (
        <section className='saved-movies'>
            <SearchForm />
            <MoviesCardList movieLibrary={SaveInitialCards} />
            <div className='saved-movies__container'></div>
        </section>
    );
}

export default SavedMovies;
