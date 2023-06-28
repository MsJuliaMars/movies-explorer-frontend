import SearchForm from "../search-form/SearchForm";
import './Movies.css';
import MoviesCardList from "../movies-card-list/MoviesCardList";
import {useContext, useEffect, useState} from "react";
import * as MoviesApi from "../../utils/MoviesApi";

// import {InitialCards} from "../../utils/InitialCards";
function Movies({allMovies, savedMovies, onCardLike, onCardUnlike, }) {
    const [cards, setCards] = useState([]);


    useEffect(() => {
                    // получение карточек с сервера
                        MoviesApi.getMovies()
                            .then((res) => setCards(res))
                            .catch((err) => console.log(err));
                }, []);


    return (
        <main className="movies">
            <SearchForm/>
            <MoviesCardList allMovies={allMovies} savedMovies={savedMovies} onCardLike={onCardLike} onCardUnlike={onCardUnlike} isSavedMoviesPage={false}/>
            <button type="button" className="movies__btn-more" atl="показывает больше карточек">Ещё</button>
        </main>
    )
}

export default Movies;
