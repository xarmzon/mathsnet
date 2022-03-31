import Image from "next/image";

export type LoaderTypes = "spinner1" | "book" | "spinner2";
export interface LoaderProps {
  type?: LoaderTypes;
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
    <div className="w-full h-12 md:h-20 flex flex-col justify-center items-center space-y-1">
      <div className="object-contain relative h-7 w-7 md:h-12 md:w-12">
        <Image
          alt="Loader Image"
          className="w-full min-h-full"
          layout="fill"
          src={`/assets/loader/${imgType}`}
          objectFit="contain"
        />
      </div>
      <p className="text-primary text-lg md:text-xl font-bold">
        {props.text ? props.text : "Loading..."}
      </p>
    </div>
  );
};

export default Loader;
