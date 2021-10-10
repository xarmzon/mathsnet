import Image from "next/image";
import LinkButton from "../general/LinkButton";
import { ROUTES } from "../../utils/constants";
const ClassCard = ({ class_ }) => {
  return (
    <div className="bg-gray-50 md:max-w-sm lg:max-w-md rounded-lg min-h-[7rem] overflow-hidden shadow-lg">
      <div className="relative">
        <div className="">
          <Image
            className="object-cover"
            src={class_.img ? class_.img : "/assets/images/thumbnail.jpg"}
            height="334"
            width="500"
            layout="responsive"
          />
        </div>
      </div>
      <div className="px-3 mt-2">
        <div className="flex justify-between items-center text-xs sm:text-sm mb-2 md:mb-3">
          <p
            className="text-ascent-light"
            title={`${class_.topicsCount} ${
              class_.topicsCount > 1 ? "Topics" : "Topic"
            }`}
          >
            {class_.topicsCount} {class_.topicsCount > 1 ? "Topics" : "Topic"}
          </p>
          <p
            className="text-primary bg-primary-100 px-2 py-1 font-bold"
            title={`${class_.priceTag}`}
          >
            &#8358;{class_.priceTag}
          </p>
        </div>
        <h4
          className="capitalize font-bold text-lg line-clamp-1 text-primary"
          title={class_.title}
        >
          {class_.title}
        </h4>
        <p
          className="mt-1 line-clamp-3 sm:line-clamp-2 text-sm text-gray-500"
          title={class_.desc}
        >
          {class_.desc}
        </p>
      </div>
      <div className="w-5/6 mx-auto h-[1px] bg-gray-200 mt-4"></div>
      <div className="text-center  pt-2 pb-3">
        <LinkButton href={ROUTES.GENERAL.CLASSES} txt="Add Class" roundedLg />
      </div>
    </div>
  );
};

export default ClassCard;
