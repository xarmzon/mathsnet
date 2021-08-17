import Image from "next/image";
const Loader = ({ text, full = true, type = "" }) => {
  const variants = ["spinner", "book", "spinner2"];
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        full && "h-screen"
      } font-black text-primary text-lg md:text-3xl lg:text-5xl`}
    >
      <Image
        height="60"
        width="60"
        src={`/assets/loader/${variants.includes(type) ? type : "book"}.gif`}
        alt="Spinner"
      />
      <p className="mt-2">{text ? text : "Loading, Please wait..."}</p>
    </div>
  );
};

export default Loader;
