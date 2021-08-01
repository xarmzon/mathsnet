import Image from "next/image";
import Link from "next/link";
import LinkButton from "../general/LinkButton";

const HeroBanner = () => {
  return (
    <div className="bg-primary -mt-2 h-[350px] md:h-[280px]">
      <div
        className="container mx-auto p-5 pt-8 text-white h-full bg-contain bg-right bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/images/hero_image.png)",
        }}
      >
        Hero
      </div>
    </div>
  );
};

export default HeroBanner;
