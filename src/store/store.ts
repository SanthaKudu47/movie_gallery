import { MovieInfoData } from "../context/movie.info.context";
import { MovieType } from "../types";

const store: MovieInfoData = {
  isModelOpen: false,
  movieInfo: null,
  genreList:null
};

const movieInfoReducer = function (
  state: MovieInfoData,
  action: { type: "OPEN" | "CLOSE" | "UPDATE"; data: null | MovieType }
) {
  switch (action.type) {
    case "OPEN":
      const current = { ...state };
      current.isModelOpen = true;
      return current;

    case "CLOSE": {
      const current = { ...state };
      current.isModelOpen = false;
      return current;
    }

    default:
      return state;
  }
};

const openMovieInfoModal = function () {
  return movieInfoReducer(store, { type: "OPEN", data: null });
};

const closeMovieInfoModal = function () {
  return movieInfoReducer(store, { type: "CLOSE", data: null });
};

export { openMovieInfoModal, closeMovieInfoModal };
