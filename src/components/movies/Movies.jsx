import SearchForm from "../search-form/SearchForm";
import './Movies.css';
import MoviesCardList from "../movies-card-list/MoviesCardList";
import {useContext, useEffect, useState} from "react";
import * as MoviesApi from "../../utils/MoviesApi";

// import {InitialCards} from "../../utils/InitialCards";
function Movies({allMovies}) {
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
            <MoviesCardList  allMovies={allMovies} />
            {/*movieLibrary={InitialCards}/>*/}
            <button type="button" className="movies__btn-more" atl="показывает больше карточек">Ещё</button>
        </main>
    )
}

export default Movies;
