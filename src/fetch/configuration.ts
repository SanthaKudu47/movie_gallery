import { ConfigurationType } from "../types";
import { getRequestOptions } from "./options";

async function getConfiguration() {
  let data: ConfigurationType | null = null;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await fetch(
      `${BASE_URL}/configuration`,
      getRequestOptions()
    );
    data = await response.json();
  } catch (error) {
    console.log("Failed to Fetch configuration data");

  }
  return data;
}

export default getConfiguration;
