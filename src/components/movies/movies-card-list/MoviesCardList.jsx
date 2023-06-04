import './MoviesCardList.css';
import MoviesCard from "../movies-card/MoviesCard";

function MoviesCardList({movieLibrary}) {
    return (
        <section className="cards">
            <ul className='cards__items'>
                {movieLibrary.map((movie) => (
                    <MoviesCard
                        title={movie.title}
                        time={movie.time}
                        movie={movie.movie}
                        key={movie.id}
                    />
                ))}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
                {/*<MoviesCard/>*/}
            </ul>
        </section>
    );
}

export default MoviesCardList;
