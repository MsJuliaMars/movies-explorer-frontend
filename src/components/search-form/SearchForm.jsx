import './SearchForm.css';
import {useState} from "react";
import {useLocation} from "react-router-dom";

function SearchForm({savedMovies, handleSearch, shortMovies}) {
    const [statusCheckbox, setStatusCheckbox] = useState(false);

    const [checked, setChecked] = useState(false); //установка галочки делается атрибутом "chacked"
    const [nameMovie, setNameMovie] = useState('');
    const location = useLocation();
    const [searchError, setSearchError] = useState('');

    function handleChangeCheckbox(event) {
        const isShortFilms = event.target.checked;
        setChecked(isShortFilms);
        handleSearch(isShortFilms);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(nameMovie);
        // if (location.pathname === '/movies') {
        //     if (!nameMovie) {
        //         setSearchError('You need to enter a keyword');
        //     }
            // else {
            //     dispatch(setSearchParams({params: searchData, short: shortSelected}));
            //     dispatch(setSearchSuccses(true));
            // }
        // }

    };

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <input type="text" name="search" value={nameMovie} onChange={event => setNameMovie(event.target.value)}
                       className="search__input"
                       placeholder="Фильм" required/>
                <button className="search__btn">
                    Поиск
                </button>
                <div className="search__container">
                    <label className="search__text">
                        <input type="checkbox" checked={checked} onChange={handleChangeCheckbox}
                               className="search__checkbox"/>
                        Короткометражки
                        <span>{setSearchError}</span>
                    </label>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;
