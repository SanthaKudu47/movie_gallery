type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};
type PopularMovies = {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
};

type GenreType = {
  id: number;
  name: string;
};

type GenreList = {
  genres: GenreType[];
};

type ConfigurationType = {
  change_keys: string[];
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: ["w300", "w780", "w1280", "original"];
    logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"];
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"];
    profile_sizes: ["w45", "w185", "h632", "original"];
    still_sizes: ["w92", "w185", "w300", "original"];
  };
};

type VideoResultType = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: false;
  published_at: string;
  id: string;
};
type VideDetailsType = {
  id: number;
  results: VideoResultType[];
};

export type {
  PopularMovies,
  MovieType,
  GenreType,
  GenreList,
  ConfigurationType,
  VideDetailsType,
};
