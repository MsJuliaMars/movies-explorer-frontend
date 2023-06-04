import SearchForm from "./search-form/SearchForm";
import './Movies.css';
import MoviesCardList from "./movies-card-list/MoviesCardList";
import {InitialCards} from "../../utils/InitialCards";
function Movies() {
    return (
        <section className="movies">
            <SearchForm/>
            <MoviesCardList movieLibrary={InitialCards}/>
            <button type="button" className="movies__btn-more" atl="показывает больше карточек">Ещё</button>
        </section>
    )
}

export default Movies;
