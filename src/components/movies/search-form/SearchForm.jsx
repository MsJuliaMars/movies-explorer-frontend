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
                    <label className="search__text">
                        <input type="checkbox" className="search__checkbox" required/>
                        Короткометражки</label>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;
