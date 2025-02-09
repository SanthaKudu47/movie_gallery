import { IoIosStar } from "react-icons/io";
import { BsGraphUpArrow } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import {
  MovieInfoDataContext,
  MovieInfoDataContextDispatch,
} from "../../context/movie.info.context";
import { IoMdCloseCircle } from "react-icons/io";
import { GenreType } from "../../types";
import placeHolder from "/place_holder.jpg";
import { GlobalContext } from "../../context/global.context";
import getTrailer from "../../fetch/trailer";

function MovieInfo() {
  const { isModelOpen, movieInfo, genreList } =
    useContext(MovieInfoDataContext);
  const dispatch = useContext(MovieInfoDataContextDispatch);
  const configuration = useContext(GlobalContext);
  const [src, setSrc] = useState<string>(placeHolder);

  const getGenre = function (list: GenreType[], id: number) {
    return list.find((gen) => {
      return gen.id === id;
    });
  };

  const genList = function (ids: number[]) {
    if (!movieInfo) return [];
    const selectedGenres: string[] = [];
    if (!genreList) return selectedGenres;
    ids.forEach((id) => {
      const selected = getGenre(genreList.genres, id);

      if (selected) selectedGenres.push(selected.name);
    });

    return selectedGenres;
  };

  const closeModal = function () {
    if (!dispatch) return;
    setSrc(placeHolder);
    dispatch({
      isModelOpen: false,
      movieInfo: null,
      genreList: null,
    });
  };
  const loadPlaceHolderImage = async function () {
    if (!movieInfo) return;
    const posterUrl = movieInfo.poster_path;
    const img = new Image();
    img.src = `${configuration?.images.base_url}/w92${posterUrl}`;
    img.onload = function () {
      setSrc(img.src);
      loadActualImage();
    };
  };

  const loadActualImage = async function () {
    if (!movieInfo) return;
    const posterUrl = movieInfo.poster_path;
    const img = new Image();
    img.src = `${configuration?.images.base_url}/w500${posterUrl}`;
    img.onload = function () {
      setSrc(img.src);
      //setClassName("");
    };
  };

  const loadTrailerVideo = async function () {
    if (!movieInfo) return;
    const data = await getTrailer(movieInfo.id);
    if (!data) return;
    const { results } = data;
    if (results.length > 0) {
      const trailer = results[0].key;
      configTrailer(trailer);
    } else {
    }
  };

  const configTrailer = function (key: string) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (!firstScriptTag) return;
    if (firstScriptTag.parentElement === null) return;
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    type IUpdatedWindow = Window & typeof globalThis & { YT?: any };
    let updatedWindow: IUpdatedWindow = window;

    console.log(updatedWindow.YT);

    let player: any;
    function onYouTubeIframeAPIReady() {
      player = new updatedWindow.YT.Player("player", {
        height: "390",
        width: "640",
        videoId: key,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
          //onStateChange: onPlayerStateChange,
        },
      });
    }

    function onPlayerReady(event: any) {
      event.target.stopVideo();
    }

    var done = false;
    function onPlayerStateChange(event: any) {
      if (event.data == updatedWindow.YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      player.stopVideo();
    }

    onYouTubeIframeAPIReady();
  };

  useEffect(() => {
    loadPlaceHolderImage();
    loadTrailerVideo();
  }, [movieInfo?.title]);

  return (
    <>
      {isModelOpen && (
        <>
          <div className="w-full h-full top-0 left-0 fixed z-20 bg-bg py-5 px-5 sm:px-10">
            <div className=" relative min-w-[325px]  sm:min-w-[750px] max-w-[1200px] h-full mx-auto">
              <div className="absolute opacity-40 min-w-[325px] top-0 left-0 right-0 bottom-0 z-0  sm:min-w-[750px] max-w-[1200px] h-full mx-auto bg-blue-700 blur-3xl"></div>
              <div className="relative bg-primary-blue w-full h-full flex z-10 rounded-md  flex-col">
                <div className="flex flex-row px-5 py-2 justify-end items-center">
                  <div className="text-button-text text-[25px]">
                    <IoMdCloseCircle onClick={closeModal} />
                  </div>
                </div>
                <div className="flex flex-row px-5 py-5 justify-between">
                  <h4 className="font-dm-sans text-white font-semibold text-[25px]">
                    {movieInfo?.title}
                  </h4>
                  <div className="flex flex-row gap-x-2">
                    <div className="flex flex-row items-center justify-center gap-x-2 bg-button-bg rounded-md px-2">
                      <IoIosStar className="text-yellow-300" />
                      <span className="text-white">8.9</span>
                      <span className="text-button-text"> / 10 (200k)</span>
                    </div>
                    <div className="flex  flex-row gap-2 bg-button-bg rounded-md px-2 justify-center items-center text-button-text font-dm-sans">
                      <BsGraphUpArrow />
                      <span className="font-semibold">1</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-x-2 text-button-text px-5">
                  <span>{movieInfo?.release_date}</span>
                  <span>.</span>
                  <span>PG-13</span>
                  <span>.</span>
                  <span>{movieInfo?.popularity}</span>
                </div>

                <div className="py-2 px-5 grid grid-flow-col h-[580px] grid-cols-12 gap-x-5 overflow-hidden">
                  <div className="col-span-3 rounded-md w-[250px] h-[350px]">
                    <img
                      src={src}
                      alt=""
                      className={`relative object-cover rounded-md w-full h-full`}
                      loading="lazy"
                    />
                  </div>
                  <div className="col-span-9 rounded-md flex justify-center items-center">
                    <div id="player"/>
                  </div>
                </div>
                <div className="grid grid-cols-12 px-5 py-2">
                  <div className="col-span-3 font-dm-sans text-button-text">
                    Generes
                  </div>
                  {movieInfo ? (
                    <div className="col-span-9 font-dm-sans text-white flex flex-row gap-x-2 flex-wrap">
                      {genList(movieInfo?.genre_ids).map((gen, index) => {
                        return (
                          <div className="inline-flex p-1 bg-button-bg rounded-md">
                            <span key={index}>{gen}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="grid grid-cols-12 px-5 py-2">
                  <div className="col-span-3 font-dm-sans text-button-text">
                    Overview
                  </div>
                  <div className="col-span-9 font-dm-sans text-white">
                    {movieInfo?.overview}
                  </div>
                </div>
                <div className="grid grid-cols-12 px-5 py-2">
                  <div className="col-span-3 font-dm-sans text-button-text">
                    Language
                  </div>
                  <div className="col-span-9 font-dm-sans text-white">
                    {movieInfo?.original_language}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MovieInfo;
