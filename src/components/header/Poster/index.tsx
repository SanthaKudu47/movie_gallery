import posterCenter from "/poster_center.png";
import overlay from "../../../../public/spark_overlay.png";
function MoviePoster({ src = posterCenter }: { src?: string }) {
  const widthWeb = 240;
  const heightWeb = 353;
  const widthMobile = 176;
  const heightMobile = 259;
  return (
    <div>
      <div
        style={{ width: widthMobile, height: heightMobile }}
        className={`md:hidden rounded-2xl flex flex-row justify-center relative items-center`}
      >
        <div className="absolute inset-0 bg-black opacity-70  blur-md z-0 "></div>
        <img
          src={src}
          alt="poster_center"
          className="z-0 rounded-2xl border-2 border-solid border-primary-blue"
        />

        <img src={overlay} alt="overlay" className="absolute" />
      </div>
      <div
        style={{ width: widthWeb, height: heightWeb }}
        className={`hidden rounded-2xl md:flex flex-row justify-center relative items-center`}
      >
        <div className="absolute inset-0 bg-black opacity-70  blur-md z-0 "></div>
        <img
          src={src}
          alt="poster_center"
          className="z-0 rounded-2xl border-2 border-solid border-primary-blue"
        />
        <img src={overlay} alt="overlay" className="absolute" />
      </div>
    </div>
  );
}

export default MoviePoster;
