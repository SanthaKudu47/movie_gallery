import {useEffect } from "react";
import getTrailer from "../../fetch/trailer";

function YoutubePlayer({
  movieId,
  width = 640,
  height = 390,
}: {
  movieId?: number;
  width?: number;
  height?: number;
}) {
  const SCRIPT_SRC = "https://www.youtube.com/iframe_api";

  const loadPlayer = async function () {
    const trailerKey = await loadTrailerVideo();
    if (!trailerKey) return;
    type IUpdatedWindow = Window & typeof globalThis & { YT?: any };
    let updatedWindow: IUpdatedWindow = window;

    if (!updatedWindow.YT) return;

    try {
      let player: any;
      function onYouTubeIframeAPIReady() {
        console.log("calling....");
        player = new updatedWindow.YT.Player("player", {
          height:'100%',
          width: '100%',
          videoId: trailerKey,
          
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

      onYouTubeIframeAPIReady();
    } catch (error) {
      console.log("Failed to Load Trailer");
    }
  };

  const loadTrailerVideo = async function () {
    if (!movieId) return;
    const data = await getTrailer(movieId);
    if (!data) return;
    const { results } = data;
    if (results.length > 0) {
      const trailer = results[0].key;

      return trailer;
    } else {
      return null;
    }
  };

  useEffect(() => {
    //initialize player
    //check for script

    const firstScriptTag = document.getElementsByTagName(
      "script"
    )[0] as HTMLScriptElement;
    firstScriptTag.onload = function () {
      loadPlayer();
    };

    if (firstScriptTag.src !== SCRIPT_SRC) {
      const tag = document.createElement("script");
      tag.src = SCRIPT_SRC;
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else {
      loadPlayer();
    }
  }, []);
  return (
    <div className="w-full">
      <div id="player" className="w-full"></div>;
    </div>
  );
}

export default YoutubePlayer;
