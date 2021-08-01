import Link from "next/link";

const LinkButton = ({ href, txt, type, rounded, px, py }) => {
  const button = {
    primary: "bg-ascent-light text-primary",
    outline: "bg-white border border-ascent-light text-primary",
    outlineTrans: "bg-transparent border border-ascent-light white",
    text: "text-white",
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
        className={`cursor-pointer  ${px ? px : "px-4"} ${
          py ? py : "py-2"
        } transition-all duration-500 ease-out ${extraClassName.type} ${
          extraClassName.rounded
        }`}
      >
        {txt}
      </a>
    </Link>
  );
};

export default LinkButton;
