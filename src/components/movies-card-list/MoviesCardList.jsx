import "./MoviesCardList.css";
import MoviesCard from "../movies-card/MoviesCard";
import { CurrentMovieContext } from "../../contexts/CurrentMovieContext";
import { useContext } from "react";

function MoviesCardList({
  foundMovies,
  allMovies,
  savedMovies,
  shortMovies,
  handleSearch,
  searchMoviesCard,
  onCardLike,
  onCardUnlike,
  isSave,
  onDeleteSavedMovie,
  addSavedMovies,
  userMessMovieDownload,
  userMessSavedMovieDownload = allMovies.length === 0
    ? "Ничего не найдено"
    : allMovies == null
    ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
    : "",
}) {
  console.log(allMovies);
  console.log(savedMovies);
  console.log(shortMovies);
  console.log(foundMovies);
  const { moviesLength } = useContext(CurrentMovieContext);

  return (
    <section className="cards">
      {userMessMovieDownload || userMessSavedMovieDownload ? (
        <span className="error__message">
          {userMessMovieDownload || userMessSavedMovieDownload}
        </span>
      ) : (
        <span></span>
      )}
      <ul className="cards__items">
        {allMovies.slice(0, moviesLength).map((movie) => (
          <MoviesCard
            allMovies={allMovies}
            searchMoviesCard={searchMoviesCard}
            savedMovies={savedMovies}
            handleSearch={handleSearch}
            isSave={isSave}
            onCardLike={onCardLike}
            onDeleteSavedMovie={onDeleteSavedMovie}
            onCardUnlike={onCardUnlike}
            movie={movie}
            key={movie.id || movie.movieId}
          />
        ))}
      </ul>
      {allMovies.length < moviesLength ? (
        ""
      ) : (
        <button
          onClick={addSavedMovies}
          type="button"
          className="movies__btn-more"
          atl="показывает больше карточек"
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
