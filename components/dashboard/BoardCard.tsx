import { useState, useRef, useEffect } from "react";
import Loader from "../general/Loader";

export type BoardColor = "primary" | "ascent" | "white";
export type RoundType =
  | "none"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge";
export type ShadowType =
  | "none"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge";

export interface BoardCardProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  color?: BoardColor;
  rounded?: RoundType;
  shadow?: ShadowType;
  text: string;
  count: number;
  loading?: boolean;
}

const BoardCard = ({
  children,
  icon,
  count,
  text,
  rounded = "none",
  shadow = "medium",
  color = "primary",
  loading = false,
}: BoardCardProps) => {
  return (
    <div
      className={`transition duration-500 w-full min-w-[100px] min-h-[100px] ring-1 ring-offset-1 ring-opacity-60 ${
        color === "primary"
          ? "bg-primary-100 text-primary ring-primary"
          : color === "ascent"
          ? "bg-ascent-light-200 text-primary ring-ascent"
          : "text-primary ring-primary-400"
      } ${
        rounded === "xsmall"
          ? "rounded-sm"
          : rounded === "small"
          ? "rounded"
          : rounded === "medium"
          ? "rounded-md"
          : rounded === "large"
          ? "rounded-lg"
          : rounded === "xlarge"
          ? "rounded-xl"
          : ""
      } ${
        shadow === "xsmall"
          ? "shadow-sm"
          : shadow === "small"
          ? "shadow"
          : shadow === "medium"
          ? "shadow-md"
          : shadow === "large"
          ? "shadow-lg"
          : shadow === "xlarge"
          ? "shadow-xl"
          : ""
      }
      `}
    >
      {loading ? (
        <div className="flex justify-center items-center max-h-[100px]">
          <Loader text="" type="spinner1" />
        </div>
      ) : children ? (
        children
      ) : (
        <div className={`flex gap-x-2 h-full`}>
          {icon && (
            <div
              className={`flex-shrink-0 w-[30%] text-6xl place-self-end opacity-30`}
            >
              {icon}
            </div>
          )}
          <div
            className={`h-full p-5 space-y-1 flex-shrink-0 ${
              icon ? "w-[65%]" : "w-full"
            }`}
          >
            <p className={`text-4xl font-bold`}>{count}</p>
            <p className={`text-sm opacity-70`}>{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardCard;
