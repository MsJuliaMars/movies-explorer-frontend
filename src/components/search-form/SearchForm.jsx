import './SearchForm.css';
import {useState} from "react";

function SearchForm({savedMovies, handleSearch, shortMovies}) {

    const [checked, setChecked] = useState(false); //установка галочки делается атрибутом "chacked"
    const [nameMovie, setNameMovie] = useState('');

    function handleChangeCheckbox(event) {
        const isShortFilms = event.target.checked;
        setChecked(isShortFilms);
        handleSearch(nameMovie, isShortFilms);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(nameMovie, checked);
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
                    </label>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;
