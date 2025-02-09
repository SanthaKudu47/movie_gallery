import MoviePoster from "./Poster";
import posterCenter from "/poster_center.png";
import posterLeft from "/poster_left.png";
import posterRight from "/poster_right.png";
import { MdSearch } from "react-icons/md";

import classes from "./styles.module.css";
import { useEffect } from "react";

function Header() {
  useEffect(() => {
    const screenW = window.innerWidth;
    const elements = document.getElementsByClassName(
      "posterWrapper"
    ) as HTMLCollectionOf<HTMLDivElement>;
    const lights = document.getElementsByClassName(
      "poster_light"
    ) as HTMLCollectionOf<HTMLDivElement>;
    if (!lights) return;
    if (!elements && elements[0]) return;
    //const element = elements[0];
   // const { height } = element.getBoundingClientRect();

    let heightOfElement = Math.round(353);
    if (screenW < 768) {
      heightOfElement = Math.round(259);
    }

    setTimeout(() => {
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        const light = lights[index];

        if (element.id === "right") {
          element.classList.add(classes.poster_right_animation);
        }

        if (element.id === "left") {
          element.classList.add(classes.poster_left_animation);
        }

        light.style.top = `${heightOfElement}px`;
      }
      //elements.classList.add(classes.poster_right_animation);
    }, 1000);
  }, []);
  return (
    <div className="w-full bg-bg flex flex-col  items-center  bg-[url(bg_img.png)] bg-cover bg-center relative h-screen px-2">
      <div className="py-7 sm:py-2">
        <h2 className="font-dm-sans text-[45px] sm:text-[55px] text-title-gradient-start font-semibold uppercase">
          CineSnap
        </h2>
      </div>

      <div className="relative flex flex-col shrink">
        <div className="z-10 posterWrapper" id="center">
          <div
            className={`absolute left-0 right-0 top-0 bg-white h-3 ${classes.light} opacity-0 blur-sm poster_light z-10`}
          />
          <MoviePoster src={posterCenter} />
        </div>

        <div
          className={`z-0 absolute origin-bottom-right rotate-0 right-[0px] bottom-0 top-0 posterWrapper`}
          id="right"
        >
          <div
            className={`absolute left-0 right-0 top-0 bg-white  h-3 ${classes.light} opacity-0 blur-sm poster_light  z-10`}
          />
          <MoviePoster src={posterLeft} />
        </div>

        <div
          className="z-0 absolute origin-bottom-left rotate-0 left-[0px] bottom-0 top-0 posterWrapper"
          id="left"
        >
          <div
            className={`absolute left-0 right-0 top-0 bg-white  h-3 ${classes.light} opacity-0 blur-sm poster_light  z-10`}
          />
          <MoviePoster src={posterRight} />
        </div>
      </div>
      <div className="relative bottom-0 pt-16">
        <h1 className="text-white font-dm-sans text-[50px] text-center leading-14 font-semibold hidden sm:inline-block">
          Find
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-title-gradient-start to-title-gradient-finish ">
            &nbsp;Movies
          </span>
          You’ll <br />
          Love Without the Hassle
        </h1>
        <h1 className="text-white font-dm-sans text-[45px] text-center leading-14 font-semibold inline-block sm:hidden">
          Find
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-title-gradient-start to-title-gradient-finish ">
            &nbsp;Movies
          </span>
          You’ll Love Without the Hassle
        </h1>
      </div>
      <div className="px-5  flex-flex-row justify-center items-center py-10 w-full sm:w-[560px]">
        <div className="bg-primary-blue flex flex-row items-center p-1 rounded-md">
          <div>
            <MdSearch className="text-title-gradient-start text-[30px]" />
          </div>
          <input
            type="text"
            name=""
            id=""
            className="bg-primary-blue w-full text-[30px] focus:outline-0 text-title-gradient-start px-2"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
