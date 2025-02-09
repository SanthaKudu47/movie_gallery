import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/header";
import AllMovies from "./components/header/PopularMovies";
import { GlobalContext } from "./context/global.context";
import getConfiguration from "./fetch/configuration";
import { ConfigurationType } from "./types";
import MovieInfo from "./components/movieInfo";
import {
  initialInfo,
  MovieInfoDataContext,
  MovieInfoDataContextDispatch,
} from "./context/movie.info.context";
import MovieInfoState from "./components/movieInfoState";

function App() {
  const [configuration, setConfiguration] = useState<ConfigurationType | null>(
    null
  );
  const [initial, setInfoState] = useState(initialInfo);
  const handleConfigurationSettings = async function () {
    const data = await getConfiguration();
    if (!data) return;
    setConfiguration(data);
  };
  useEffect(() => {
    handleConfigurationSettings();
  }, []);

  const providerVal = useMemo(() => {
    return {
      ...initial,
    };
  }, [initial]);

  return (
    <>
      <div className="fixed h-[20px]  z-20">
        {/* <div className="flex relative top-0 left-0 justify-end">
        button
      </div> */}
      </div>
      <main className="bg-bg">
        <Header />
      </main>
      <MovieInfoDataContextDispatch.Provider value={setInfoState}>
        <section className="bg-bg" id="all_movies">
          <GlobalContext.Provider value={configuration}>
            <AllMovies />
          </GlobalContext.Provider>
        </section>
        <div>
          <MovieInfoDataContext.Provider value={providerVal}>
            <GlobalContext.Provider value={configuration}>
              <MovieInfo />
            </GlobalContext.Provider>
          </MovieInfoDataContext.Provider>
        </div>
      </MovieInfoDataContextDispatch.Provider>
    </>
  );
}

export default App;
