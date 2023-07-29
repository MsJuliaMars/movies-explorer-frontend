import SearchForm from "../search-form/SearchForm";
import MoviesCardList from "../movies-card-list/MoviesCardList";
import "./SavedMovies.css";
import { useEffect, useState } from "react";
import Preloader from "../preloader/Preloader";

function SavedMovies({
  savedMovies,
  onDeleteSavedMovie,
  isPreloader,
  isSave,
  onSaveMovie,
  searchMoviesCard,
}) {
  const [searchSavedMovies, setSearchSavedMovies] = useState([]);

  function handleSearch(nameMovie, isShortFilms) {
    const filteredMovies = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(nameMovie.toLowerCase())
    );
    if (isShortFilms) {
      setSearchSavedMovies(
        filteredMovies.filter((item) => item.duration <= 40)
      );
    } else {
      setSearchSavedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    setSearchSavedMovies(
      searchSavedMovies.filter((movie) =>
        savedMovies.some((card) => movie.movieId === card.movieId)
      )
    );
  }, [savedMovies]);

  function filteredMovies() {
    setSearchSavedMovies(savedMovies);
  }

  useEffect(() => {
    filteredMovies();
  }, []);

  return (
    <main className="saved-movies">
      <SearchForm handleSearch={handleSearch} defaultValue="" />
      {isPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
          searchMoviesCard={searchMoviesCard}
          allMovies={searchSavedMovies}
          savedMovies={savedMovies}
          onSaveMovie={onSaveMovie}
          onDeleteSavedMovie={onDeleteSavedMovie}
          isSave={isSave}
        />
      )}
      <div className="saved-movies__container"></div>
    </main>
  );
}

export default SavedMovies;
