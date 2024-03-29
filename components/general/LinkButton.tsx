import Link from "next/link";

export enum ETypes {
  OUTLINE = "outline",
  PRIMARY = "primary",
  TEXT = "text",
  TRANS = "outlineTrans",
  ASCENT = "ascent",
}

export interface LinkButtonProps {
  href: string;
  txt: string;
  type?: ETypes;
  rounded?: boolean;
  px?: string;
  py?: string;
  centered?: boolean;
  roundedSm?: boolean;
  roundedLg?: boolean;
  color?: string;
}

const LinkButton = ({
  href,
  txt,
  type,
  rounded,
  px,
  py,
  centered,
  roundedSm,
  roundedLg,
  color,
}: LinkButtonProps) => {
  const button = {
    primary:
      "bg-primary hover:text-primary hover:bg-ascent-light text-gray-100",
    outline:
      "bg-gray-50 hover:bg-gray-200 border border-ascent-light text-primary",
    outlineTrans: "bg-transparent border border-ascent-light white",
    text: `${
      color
        ? color === "primary"
          ? "text-gray-100 hover:text-ascent-light"
          : "text-primary hover:text-ascent-light"
        : "text-ascent hover:text-ascent-light"
    } `,
    ascent: "bg-ascent-light hover:bg-ascent-200 text-primary",
  };

  const extraClassName = {
    type: `${
      type
        ? type === "outline"
          ? button.outline
          : type === "outlineTrans"
          ? button.outlineTrans
          : type === "text"
          ? button.text
          : button.ascent
        : type === "ascent"
        ? button.ascent
        : button.primary
    }`,
    rounded: {
      rounded: rounded ? "rounded-full" : "",
      roundedSm: roundedSm ? "rounded-sm" : "",
      roundedLg: roundedLg ? "rounded-lg" : "",
    },
  };
  return (
    <Link href={href}>
      <a
        className={`inline-block my-2 text-sm md:text-lg min-w-max cursor-pointer  ${
          px ? px : "px-4"
        } ${py ? py : "py-2"} transition-all duration-500 ease-out ${
          extraClassName.type
        } ${extraClassName.rounded.rounded} ${
          extraClassName.rounded.roundedSm
        } ${extraClassName.rounded.roundedLg}

          `}
      >
        {txt}
      </a>
    </Link>
  );
};

export default LinkButton;
