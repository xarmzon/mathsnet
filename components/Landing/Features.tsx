const Features = () => {
  return (
    <section className="bg-gray-100 md:h-48 flex flex-col justify-evenly">
      <div className="container px-5 py-5">
        <h1 className="text-ascent font-bold text-lg text-center sm:text-xl md:text-2xl">
          WHY LEARNING WITH US?
        </h1>
        <div className="grid grid-cols-1 text-center md:text-left md:grid-cols-2 mt-3">
          <div className="border-b-2 border-gray-100 pb-4 sm:pb-1 mb-1 md:border-none">
            <h4 className="text-sm font-semibold text-primary sm:text-lg">
              LEARN WITH EXPERTS
            </h4>
            <p className="text-xs text-gray-600 sm:text-sm sm:max-w-[90%] sm:mx-auto md:mx-0">
              Amazing quality video contents by superb insturctors to help you
              cross every mathematics hurdles .
            </p>
          </div>
          <div className="mt-3 pb-1 mb-1 md:mt-0">
            <h4 className="text-sm font-semibold text-primary sm:text-lg">
              FLEXIBLE LEARNING
            </h4>
            <p className="text-xs text-gray-600 sm:text-sm sm:max-w-[90%] sm:mx-auto md:mx-0">
              You get access to your courses anytime and anywhere .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
