import { createContext } from "react";
import { GenreList, MovieType } from "../types";

type MovieInfoData = {
  isModelOpen: boolean;
  movieInfo: MovieType | null;
  genreList: GenreList | null;
};

const initialInfo: MovieInfoData = {
  isModelOpen: false,
  movieInfo: null,
  genreList: null,
};

type DispatchType = React.Dispatch<React.SetStateAction<MovieInfoData>> | null;

const MovieInfoDataContext = createContext(initialInfo);

const MovieInfoDataContextDispatch = createContext<DispatchType>(null);

export { MovieInfoDataContext, initialInfo, MovieInfoDataContextDispatch };
export type { MovieInfoData, DispatchType };
