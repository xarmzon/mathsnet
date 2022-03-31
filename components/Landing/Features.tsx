const Features = () => {
  return (
    <section className="bg-gray-100 min-h-[55vh] flex flex-col justify-evenly">
      <div className="container flex flex-col px-5 py-5 md:py-8 lg:py-12 space-y-7">
        <h1 className="text-ascent font-bold text-lg text-center sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl">
          WHY LEARNING WITH US?
        </h1>
        <div className="grid grid-cols-1 text-center md:text-left md:grid-cols-2 mt-3">
          <div className="border-b-2 border-gray-100 pb-4 sm:pb-1 mb-1 md:border-none">
            <h4 className="text-sm font-semibold text-primary sm:text-lg lg:text-2xl">
              LEARN WITH EXPERTS
            </h4>
            <p className="text-xs text-gray-600 sm:text-sm sm:max-w-[90%] sm:mx-auto md:mx-0 lg:text-xl">
              Amazing quality video contents by superb insturctors to help you
              cross every mathematics hurdles .
            </p>
          </div>
          <div className="mt-3 pb-1 mb-1 md:mt-0">
            <h4 className="text-sm font-semibold text-primary sm:text-lg lg:text-2xl">
              FLEXIBLE LEARNING
            </h4>
            <p className="text-xs text-gray-600 sm:text-sm sm:max-w-[90%] sm:mx-auto md:mx-0 lg:text-xl">
              You get access to your courses anytime and anywhere .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
