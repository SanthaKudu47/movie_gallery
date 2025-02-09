import { useMemo, useState } from "react";
import {
  initialInfo,
  MovieInfoDataContext,
} from "../../context/movie.info.context";
import MovieInfo from "../movieInfo";

function MovieInfoState() {
  return <MovieInfo />;
}

export default MovieInfoState;
