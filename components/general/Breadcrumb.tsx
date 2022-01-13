import React from "react";
import { FaAngleRight } from "react-icons/fa";
import LinkButton, { ETypes } from "./LinkButton";

export interface IBreadcrumbData {
  link?: string;
  text: string;
  last: boolean;
}
export interface IBreadcrumb {
  data: IBreadcrumbData[];
  showHome?: boolean;
  homeText?: string;
}

const BreadcrumbItem = ({ link, text, last }: IBreadcrumbData) => {
  return (
    <span
      key={text}
      className={`${
        !last
          ? "flex items-center"
          : "in-block pl-4 text-gray-400 text-sm md:text-lg"
      }`}
    >
      {link ? <LinkButton href={link} txt={text} type={ETypes.TEXT} /> : text}

      {!last && <FaAngleRight className="text-sm md:text-lg text-gray-300" />}
    </span>
  );
};

const Breadcrumb = ({
  data,
  showHome = true,
  homeText = "Home",
}: IBreadcrumb) => {
  return (
    <div className="mt-[60px] -space-x-1 flex items-center flex-wrap">
      {showHome && <BreadcrumbItem last={false} text={homeText} link="/" />}

      {data &&
        data.length > 0 &&
        data.map((d) => (
          <BreadcrumbItem
            key={d.text}
            last={d.last}
            text={d.text}
            link={d.link ?? ""}
          />
        ))}
    </div>
  );
};

export default Breadcrumb;
