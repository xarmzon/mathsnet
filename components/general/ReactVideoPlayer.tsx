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
  );
};

export default ReactVideoPlayer;
