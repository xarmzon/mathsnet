import React from "react";

import Image from "next/image";

export interface IDisplayImage {
  title: string;
  type?: "topic" | "class";
  src: string;
}

const DisplayImage = ({ title, src, type = "class" }: IDisplayImage) => {
  return (
    <Image
      layout="fill"
      alt={`${title} ${type} thumbnail`}
      className="w-full object-cover mt-2 rounded"
      src={src || "/assets/images/thumbnail.jpg"}
    />
  );
};

export default DisplayImage;
