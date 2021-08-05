import Image from "next/image";
import Link from "next/link";
import LinkButton from "../general/LinkButton";

const HeroBanner = () => {
  return (
    <section className="bg-primary sm:pb-5 -mt-2  md:h-[340px]">
      <div className="container mx-auto sm:p-5 pt-8 text-white h-full flex flex-col sm:flex-row sm:items-center sm:pt-16 relative">
        <div className="w-full sm:1/2">
          <h1 className="text-3xl sm:text-4xl sm:text-left md:text-4xl font-bold text-center">
            Learn Mathematics
            <br /> Easily and Swiftly
          </h1>
          <h4 className="text-sm my-5 text-center sm:text-lg sm:text-left text-gray-300 sm:max-w-[90%] md:max-w-[80%]">
            A Platform designed to equip you with the right knowledge you need
            to succeed in mathematics.
          </h4>
          <p className="text-center sm:text-left">
            <LinkButton href="/learn/classes" txt="Browse Classes" roundedSm />
          </p>
        </div>
        <div className="mt-3 w-[80%] flex-shrink-0 mx-auto sm:w-1/2">
          <Image
            className=""
            src="/assets/images/hero_image_.png"
            alt="Hero Image"
            height="1598"
            width="2672"
            layout="responsive"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
