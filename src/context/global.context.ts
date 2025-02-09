import { createContext } from "react";
import { ConfigurationType } from "../types";

const defaultConfiguration: ConfigurationType | null = null;
const GlobalContext = createContext<ConfigurationType | null>(
  defaultConfiguration
);

export { GlobalContext };
