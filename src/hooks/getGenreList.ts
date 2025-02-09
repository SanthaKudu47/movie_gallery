import { useContext, useState } from "react";
import { GlobalContext } from "../context/global.context";

function useGenreList() {
  const value = useContext(GlobalContext);

  return value;
}
