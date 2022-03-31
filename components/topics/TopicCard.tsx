import LinkButton from "../general/LinkButton";
import Image from "next/image";
import { ROUTES } from "../../utils/constants";
import { ETypes } from "../general/LinkButton";
import { IFeaturedTopics } from "../../utils/types";

interface ITopicCard {
  topic: IFeaturedTopics;
}

const TopicCard = ({ topic }: ITopicCard) => {
  return (
    <div>
      <div className="bg-gray-50 md:max-w-sm lg:max-w-md rounded-lg min-h-[7rem] overflow-hidden shadow-lg">
        <div className="relative">
          <div className="">
            <Image
              className="object-cover"
              src={topic.img ? topic.img : "/assets/images/thumbnail.jpg"}
              height="334"
              width="500"
              layout="responsive"
              alt="thumbnail"
            />
          </div>
        </div>
        <div className="px-3 mt-2">
          <div className="flex justify-end items-center text-xs sm:text-sm mb-2 md:mb-3">
            <p
              className="text-primary bg-primary-100 px-2 py-1 font-bold line-clamp-2 max-w-[70%]"
              title={`${topic.classData.title}`}
            >
              {topic.classData.title}
            </p>
          </div>
          <h4
            className="capitalize font-bold text-lg line-clamp-1 text-primary"
            title={topic.title}
          >
            {topic.title}
          </h4>
          <p
            className="mt-1 line-clamp-3 sm:line-clamp-2 text-sm text-gray-500"
            title={topic.classData.shortDesc}
          >
            {topic.classData.shortDesc}
          </p>
        </div>
        <div className="w-5/6 mx-auto h-[1px] bg-gray-200 mt-4"></div>
        <div className="text-center  pt-2 pb-3">
          <LinkButton
            href={`/${topic.classData.slug}`}
            txt="View Class"
            type={ETypes.PRIMARY}
            roundedLg
          />
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
