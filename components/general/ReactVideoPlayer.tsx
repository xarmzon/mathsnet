import React from "react";
import ReactPlayer from "react-player";

interface IReactVideoPlayer {
  url: string;
}

const ReactVideoPlayer = ({ url }: IReactVideoPlayer) => {
  return (
    <ReactPlayer
      className="absolute top-0 left-0"
      url={url}
      width="100%"
      height="100%"
    />
    // <div className="relative h-44 w-full overflow-hidden rounded-md bg-gray-100 pt-[56.25%] sm:h-64 md:h-96 lg:h-[400px] xl:h-[450px]">
    // </div>
  );
};

export default ReactVideoPlayer;
