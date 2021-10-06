import Image from "next/image";

export interface LoaderProps {
  type?: "spinner1" | "book" | "spinner2";
  text?: string;
}

const Loader = (props: LoaderProps) => {
  const imgType: string =
    props.type === "book"
      ? "book.gif"
      : props.type === "spinner1"
      ? "spinner.gif"
      : "spinner2.gif";
  return (
    <div className="w-full h-72 md:h-80 flex flex-col justify-center items-center space-y-1">
      <div className="object-contain h-7 w-7 md:h-12 md:w-12">
        <img className="w-full" src={`/assets/loader/${imgType}`} />
      </div>
      <p className="text-primary text-lg md:text-xl font-bold">
        {props.text ? props.text : "Loading..."}
      </p>
    </div>
  );
};

export default Loader;
