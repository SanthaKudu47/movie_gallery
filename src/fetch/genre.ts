import { GenreList } from "../types";
import { getRequestOptions } from "./options";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function getGenreList() {
  let data: GenreList | null = null;
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list`,
      getRequestOptions()
    );
    data = await response.json();
  } catch (error) {
    console.log("Failed to Fetch Genre List");
    console.log(error);
  }

  return data;
}

export default getGenreList;
