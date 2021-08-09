import LinkButton from "../general/LinkButton";
import TopicCard from "../topics/TopicCard";

const topics = [
  {
    className: "Class Name",
    title: "Topic Title Goes here",
    by: "Instructor",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    className: "SS 3",
    title: "Introduction to Integration",
    by: "RastaXarm",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    className: "Class Name",
    title: "Topic Title Goes here",
    by: "Instructor",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    className: "JSS 2",
    title: "Set Theory and its application",
    by: "RastaXarm",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    className: "Class Name2",
    title: "Topic Title Goes here2",
    by: "Instructor",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    className: "Class Name that is way long that normal name",
    title: "Topic Title Goes here2",
    by: "Instructor",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
];
const Topics = () => {
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
        {topics.length > 0
          ? topics.map((topic, index) => (
              <TopicCard key={index} topic={topic} />
            ))
          : "No class"}
      </div>
    </section>
  );
};

export default Topics;
