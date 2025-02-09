import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context/global.context";
import overlay from "/spark_overlay.png";
import ratingStar from "/rating.png";
import placeHolder from "/place_holder.jpg";
import { GenreList, GenreType } from "../../../../types";

function MovieCard({
  title,
  posterUrl,
  genre_ids,
  vote_average,
  genres,
}: {
  title: string;
  originalTitle: string;
  posterUrl: string;
  genre_ids: number[];
  vote_average: number;
  genres: GenreList | null;
}) {
  const configuration = useContext(GlobalContext);
  const isConfigurationAvailable = configuration ? true : false;
  const [src, setSrc] = useState<string>(placeHolder);
  const [className, setClassName] = useState<string>("blur-sm");

  const getGenre = function (list: GenreType[], id: number) {
    return list.find((gen) => {
      return gen.id === id;
    });
  };

  const genList = function (ids: number[]) {
    const selectedGenres: string[] = [];
    if (!genres) return selectedGenres;
    ids.forEach((id) => {
      const selected = getGenre(genres.genres, id);
      if (selected) selectedGenres.push(selected.name);
    });

    return selectedGenres;
  };

  const loadPlaceHolderImage = async function () {
    const img = new Image();
    img.src = `${configuration?.images.base_url}/w92${posterUrl}`;
    img.onload = function () {
      setSrc(img.src);
      loadActualImage();
    };
  };

  const loadActualImage = async function () {
    const img = new Image();
    img.src = `${configuration?.images.base_url}/w500${posterUrl}`;
    img.onload = function () {
      setSrc(img.src);
      setClassName("");
    };
  };

  useEffect(() => {
    loadPlaceHolderImage();
  }, []);

  return (
    <div className="min-w-[250px] h-full max-w-[300px] flex flex-col bg-card-bg justify-between items-center p-5 rounded-lg mx-auto overflow-hidden">
      <div className="flex flex-col gap-y-2 relative">
        <img
          className="absolute left-0 right-0 bottom-0 z-10"
          src={overlay}
          alt="overlay"
        />
        <div className="w-[264px] h-auto flex rounded-lg overflow-hidden relative">
          {!isConfigurationAvailable ? (
            <div className="min-w-[250px] h-[380px] max-w-[300px] bg-gray-800 animate-pulse top-0" />
          ) : (
            <img
              src={src}
              alt=""
              className={`relative ${className}`}
              width={264}
              height={380}
              loading="lazy"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="font-dm-sans text-[20px] font-semibold leading-10">
          {title}
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <img src={ratingStar} alt="star" />
          <span>{Math.round(vote_average * 10) / 10}</span>
        </div>
        <div className="flex flex-row flex-wrap text-gray-500 font-semibold">
          {genList(genre_ids).map((gen, index) => {
            return (
              <div className="flex flex-row gap-x-2 px-1">
                <span>.</span>
                <span key={index}>{gen}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default MovieCard;
