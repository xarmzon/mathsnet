import Link from "next/link";

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
  color = "primary",
}) => {
  const button = {
    primary:
      "bg-primary hover:text-primary hover:bg-ascent-light text-primary-100",
    outline:
      "bg-gray-50 hover:bg-gray-200 border border-ascent-light text-primary",
    outlineTrans: "bg-transparent border border-ascent-light white",
    text: `${
      color
        ? color === "primary"
          ? "text-gray-100 hover:text-primary-100"
          : "text-primary hover:text-ascent-light"
        : ""
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
          : button.primary
        : button.ascent
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
