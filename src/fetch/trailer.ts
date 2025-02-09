import { VideDetailsType } from "../types";
import { getRequestOptions } from "./options";

async function getTrailer(id: number) {
  let data: VideDetailsType | null = null;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/videos`,
      getRequestOptions()
    );
    data = await response.json();
  } catch (error) {
    console.log("Failed to Fetch video data");
  }
  return data;
}

export default getTrailer;
