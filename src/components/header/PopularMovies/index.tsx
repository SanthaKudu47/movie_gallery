import { useContext, useEffect, useState } from "react";
import { getPopularMovies } from "../../../fetch/popular";
import { GenreList, MovieType } from "../../../types";

import getGenreList from "../../../fetch/genre";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import MovieCard from "./card";
import CardPlaceHolder from "../../cardPlaceHolder";
import { MovieInfoDataContextDispatch } from "../../../context/movie.info.context";

function AllMovies() {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreList | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useContext(MovieInfoDataContextDispatch);

  const handleMovieData = async function (page: number) {
    const data = await getPopularMovies(page);
    if (!data) return;
    setMovies(data.results);
  };

  const handleGenreList = async function () {
    const data = await getGenreList();
    if (!data) return;
    setGenres(data);
  };

  const loadData = async function loadData() {
    setLoading(true);
    await handleMovieData(page);
    await handleGenreList();
    setLoading(false);
  };

  const setDataForModal = function (index: number) {
    if (!dispatch) return;
    dispatch({
      isModelOpen: true,
      movieInfo: movies[index],
      genreList: genres,
    });
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const goToNextPage = function () {
    if (page === 50) return;
    setPage((page) => page + 1);
  };

  const goToPreviousPage = function () {
    if (page === 1) return;
    setPage((page) => page - 1);
  };

  return (
    <div className="flex flex-col justify-center mx-auto">
      <div className="flex flex-col md:flex-row text-white  justify-center gap-4 flex-wrap items-stretch">
        {isLoading ? (
          <>
            {Array(20)
              .join()
              .split(",")
              .map((_val, _index) => {
                return (
                  <div>
                    <CardPlaceHolder />
                  </div>
                );
              })}
          </>
        ) : (
          movies.map((movie, index) => {
            return (
              <div
                className="relative"
                onClick={() => {
                  setDataForModal(index);
                }}
              >
                <MovieCard
                  title={movie.title}
                  originalTitle={movie.original_title}
                  posterUrl={movie.poster_path}
                  key={index}
                  genre_ids={movie.genre_ids}
                  vote_average={movie.vote_average}
                  genres={genres}
                />
              </div>
            );
          })
        )}
      </div>
      <div className="flex flex-row justify-center items-center w-full py-5 px-5">
        <div className="flex flex-row justify-between items-center  w-full px-2 md:px-10 max-w-[1230px]">
          <div
            onClick={goToPreviousPage}
            className="cursor-pointer w-[60px] h-[60px] bg-primary-blue rounded-lg flex justify-center items-center hover:text-title-gradient-start text-title-gradient-finish"
          >
            <FaArrowLeft size={40} />
          </div>
          <div className="text-title-gradient-start">{`${page}/50`}</div>
          <div
            onClick={goToNextPage}
            className="cursor-pointer w-[60px] h-[60px] bg-primary-blue rounded-lg flex justify-center items-center hover:text-title-gradient-start text-title-gradient-finish"
          >
            <FaArrowRight size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMovies;
