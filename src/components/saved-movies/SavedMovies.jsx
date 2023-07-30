import SearchForm from "../search-form/SearchForm";
import MoviesCardList from "../movies-card-list/MoviesCardList";
import "./SavedMovies.css";
import { useEffect, useState } from "react";
import Preloader from "../preloader/Preloader";
import { USER_MESS } from "../../utils/constants";

function SavedMovies({
  savedMovies,
  onDeleteSavedMovie,
  isPreloader,
  isSave,
  onSaveMovie,
  searchMoviesCard,
  defaultValueInput,
  setUserMessSavedMovieDownload,
}) {
  const [searchSavedMovies, setSearchSavedMovies] = useState([]);

  //const [userMessSavedMovieDownload, setUserMessSavedMovieDownload] = useState("");

  function handleSearch(nameMovie, isShortFilms) {
    const filteredMovies = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(nameMovie.toLowerCase())
    );

    localStorage.setItem("foundSavedMovies", JSON.stringify(filteredMovies));
    const foundSavedMovies = isShortFilms
      ? filteredMovies.filter((item) => item.duration <= 40)
      : filteredMovies;

    localStorage.setItem("foundSavedMovies", JSON.stringify(foundSavedMovies));
    localStorage.setItem("shortSavedFilms", isShortFilms);
    localStorage.setItem("nameSavedMovie", nameMovie);
    setSearchSavedMovies(foundSavedMovies);
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
      <SearchForm
        handleSearch={handleSearch}
        defaultValue={defaultValueInput}
      />
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
