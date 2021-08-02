import Link from "next/link";

const LinkButton = ({ href, txt, type, rounded, px, py }) => {
  const button = {
    primary: "bg-ascent-light hover:bg-ascent-200 text-primary",
    outline:
      "bg-gray-50 hover:bg-gray-200 border border-ascent-light text-primary",
    outlineTrans: "bg-transparent border border-ascent-light white",
    text: "text-gray-100 hover:text-primary-100",
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
        : button.primary
    }`,
    rounded: rounded ? "rounded-full" : "",
  };
  return (
    <Link href={href}>
      <a
        className={`inline-block min-w-max cursor-pointer  ${
          px ? px : "px-4"
        } ${py ? py : "py-2"} transition-all duration-500 ease-out ${
          extraClassName.type
        } ${extraClassName.rounded}`}
      >
        {txt}
      </a>
    </Link>
  );
};

export default LinkButton;
