import './SearchForm.css';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function SearchForm({handleSearch, defaultValue}) {

    const [checked, setChecked] = useState(false); //установка галочки делается атрибутом "chacked"
    const [nameMovie, setNameMovie] = useState('');
 const location = useLocation();
    function handleChangeCheckbox(event) {
        const isShortFilms = event.target.checked;
        setChecked(isShortFilms);
        handleSearch(nameMovie, isShortFilms);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(nameMovie, checked);
    };

    useEffect(() => {
        setNameMovie(defaultValue)
        if (location.pathname === "/movies") {
            setChecked(JSON.parse(localStorage.getItem("shortFilms")) || false);
        }
    },[location, checked])

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
