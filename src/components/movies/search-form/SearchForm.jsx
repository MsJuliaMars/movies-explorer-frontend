import './SearchForm.css';
function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input className="search__input" placeholder="Фильм" required/>
                <button className="search__btn">
                    Поиск
                </button>
                <div className="search__container">
                    <input type="checkbox" className="search__checkbox" required/>
                    <label className="search__text">Короткометражки</label>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;
