import Image from "next/image";
import LinkButton from "../general/LinkButton";
import { ROUTES } from "../../utils/constants";
import { formatPrice } from "../../utils";
import { IClassCardProps } from "../../utils/types";
import dateformat from "dateformat";

const ClassCard = (props: IClassCardProps) => {
  return (
    <div className="bg-gray-50 md:max-w-sm lg:max-w-md rounded-lg min-h-[7rem] overflow-hidden shadow-lg">
      <div className="relative">
        <div className="">
          <Image
            className="object-cover"
            src={props.img ? props.img : "/assets/images/thumbnail.jpg"}
            height="334"
            width="500"
            layout="responsive"
            alt="class display image"
          />
        </div>
        {props.addedOn && (
          <div className="absolute top-2 text-[10px] md:text-xs left-2 max-w-max px-3 py-2 flex items-center justify-center bg-slate-900/30 text-white/80 rounded">
            <span>Added on: {dateformat(props.addedOn, "shortDate")}</span>
          </div>
        )}
      </div>
      <div className="px-3 mt-2">
        <div className="flex justify-between items-center text-xs sm:text-sm mb-2 md:mb-3">
          <p
            className="text-ascent-light"
            title={`${props.topicsCount} ${
              props.topicsCount > 1 ? "Topics" : "Topic"
            }`}
          >
            {props.topicsCount} {props.topicsCount > 1 ? "Topics" : "Topic"}
          </p>
          <p
            className="text-primary bg-primary-100 px-2 py-1 font-bold"
            title={`${formatPrice(props.priceTag)}`}
          >
            &#8358;{formatPrice(props.priceTag)}
          </p>
        </div>
        <h4
          className="capitalize font-bold text-lg line-clamp-1 text-primary"
          title={props.title}
        >
          {props.title}
        </h4>
        <p
          className="mt-1 line-clamp-3 sm:line-clamp-2 text-sm text-gray-500"
          title={props.desc}
        >
          {props.desc}
        </p>
      </div>
      <div className="w-5/6 mx-auto h-[1px] bg-gray-200 mt-4"></div>
      <div className="text-center pt-2 pb-3">
        <LinkButton
          href={`${ROUTES.GENERAL.BASE}${props.slug}`}
          txt="View Class"
          roundedLg
        />
      </div>
    </div>
  );
};

export default ClassCard;
