import { PopularMovies } from "../types";
import { getRequestOptions } from "./options";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function getPopularMovies(page = 1) {
  let data: PopularMovies | null = null;

  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      getRequestOptions()
    );
    data = await response.json();
  } catch (error) {
    console.log(error);
    data = null;
  }

  return data;
}

export { getPopularMovies };
