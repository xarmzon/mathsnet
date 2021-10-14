import ClassCard from "../class/ClassCard";
import LinkButton from "../general/LinkButton";
import { ETypes } from "../general/LinkButton";
import useSWR, { useSWRConfig } from "swr";
import { ROUTES, CONSTANTS } from "../../utils/constants";
import Loader from "../general/Loader";

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
];
const Classes = () => {
  const { mutate } = useSWRConfig();
  const { data: classData, error: classDataError } = useSWR(
    `${ROUTES.API.CLASS}?type=featured`
  );

  //if (classData) console.log(classData);
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
          <div className="flex w-full justify-center">
        {!classDataError && !classData && (
          <Loader type="book" text="fetching..." />
        )}
        {classDataError && !classData (
          <p
            onClick={() => mutate(`${ROUTES.API.CLASS}?type=featured`)}
            className="text-center text-red-700 cursor-pointer underline w-[75%] md:w-[65%] mx-auto"
          >
            {CONSTANTS.MESSAGES.FETCH_LOADING_ERROR2}
          </p>
        )}

        {
          !classDataError && classData && classData?.data?.length===0 && (
            <p className="text-center">{CONSTANTS.MESSAGES.NO_DATA_TO_DISPLAY}</p>
          )
        }
          </div>

          {
              !classDataError && classData?.data && classData?.data?.length > 0 && (
      <div className="my-4 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {classData?.data.map((c, i) => (
              <ClassCard
                key={i}
                img={c.thumbnail && c.thumbnail}
                title={c.title}
                priceTag={c.price}
                desc={c.shortDesc}
                topicsCount={c.topicsCount ? c.topicsCount : 0}
                slug={c.slug}
              />
            ))
          }
      </div>
              )
          }
      <p className="text-center my-3">
        <LinkButton
          href="/learn/classes"
          txt="Browse More"
          type={ETypes.PRIMARY}
          rounded
          centered
        />
      </p>
    </section>
  );
};

export default Classes;
