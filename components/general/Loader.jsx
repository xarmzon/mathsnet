const Loader = ({ text, full = true, type = "spinner" }) => {
  const variants = ["spinner", "book"];
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        full && "h-screen"
      } font-black text-primary text-lg md:text-3xl lg:text-5xl`}
    >
      <img
        src={`/assets/loader/${variants.includes(type) ? type : "spinner"}.gif`}
        alt="Spinner"
      />
      <p className="mt-2">{text ? text : "Loading, Please wait..."}</p>
    </div>
  );
};

export default Loader;
