import ClassCard from "../class/ClassCard";
import LinkButton from "../general/LinkButton";

const classes = [
  {
    title: "Class Title",
    topicsCount: 10,
    priceTag: "5,000",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    title:
      "A Long and Long long Long long long class topic to showcase Class Title",
    topicsCount: 10,
    priceTag: "5,000",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    title: "Class Title",
    topicsCount: 10,
    priceTag: "5,000",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    title:
      "Class Title Class Title Class Title Class Title Class Title Class Title ",
    topicsCount: 10,
    priceTag: "5,000",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    title: "Class Title",
    topicsCount: 40,
    priceTag: "6,000",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    title: "Class Title Class Title Class Title Class Title ",
    topicsCount: 0,
    priceTag: "1,000",
    img: "",
    desc: "Mathsnet is platform that teaches all the curriculum of Mathematics at Primary, Secondary and A Level Mathematics.",
  },
  {
    title:
      "Class Title Class Title Class Title Class Title  Class Title Class Title Class Title  Class Title Class Title Class Title ",
    topicsCount: 0,
    priceTag: "5,000",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    title: "Class Title",
    topicsCount: 40,
    priceTag: "5,000",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
  {
    title: "Class Title",
    topicsCount: 80,
    priceTag: "5,000",
    img: "",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  },
];
const Classes = () => {
  return (
    <section className="my-5 container px-5">
      <h1 className="text-2xl md:text-3xl text-primary text-center font-bold relative">
        Your Personal Maths Friend is here!
        <span className="absolute left-1/2 transform -translate-x-1/2 h-1 w-24 rounded-full -bottom-2 bg-ascent-light"></span>
        <span className="absolute left-1/2 transform -translate-x-1/2 h-1 w-14 rounded-full -bottom-2 bg-primary"></span>
      </h1>
      <h4 className="mt-4 text-sm md:text-xl text-center text-gray-500">
        Learn Something new from the best online maths platform through our
        available classes.
      </h4>
      <div className="my-4 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {classes.length > 0
          ? classes.map((c, i) => <ClassCard key={i} class_={c} />)
          : "No class"}
      </div>
      <p className="text-center my-3">
        <LinkButton
          href="/learn/classes"
          txt="Browse More"
          type="primary"
          rounded
          centered
        />
      </p>
    </section>
  );
};

export default Classes;
