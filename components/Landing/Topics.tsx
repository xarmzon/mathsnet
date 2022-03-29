import { CONSTANTS } from "../../utils/constants";
import { IFeaturedTopics } from "../../utils/types";
import LinkButton from "../general/LinkButton";
import TopicCard from "../topics/TopicCard";

interface ITopics {
  topics: IFeaturedTopics[];
}

const Topics = ({ topics }: ITopics) => {
  return (
    <section className="my-14 md:my-10 container px-5">
      <h1 className="text-2xl md:text-3xl text-primary text-center font-bold relative">
        See What Others Are Learning
        <span className="absolute left-1/2 transform -translate-x-1/2 h-1 w-24 rounded-full -bottom-2 bg-ascent-light"></span>
        <span className="absolute left-1/2 transform -translate-x-1/2 h-1 w-14 rounded-full -bottom-2 bg-primary"></span>
      </h1>
      <h4 className="mt-4 text-sm md:text-xl text-center text-gray-500">
        Browse through our topics to see what others are learning
      </h4>
      <div className="my-4 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {topics.length > 0 ? (
          topics.map((topic, index) => <TopicCard key={index} topic={topic} />)
        ) : (
          <p className="text-center">{CONSTANTS.MESSAGES.NO_DATA_TO_DISPLAY}</p>
        )}
      </div>
    </section>
  );
};

export default Topics;
