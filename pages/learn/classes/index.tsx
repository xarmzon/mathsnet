import Header from "../../../components/general/Header";
import Footer from "../../../components/general/Footer";
import { NextSeo } from "next-seo";
import Input from "../../../components/controls/Input";
import ClassCard from "../../../components/class/ClassCard";
import { useRef, useState } from "react";
import Pagination from "../../../components/general/Pagination";
import useSWR, { useSWRConfig } from "swr";
import { ROUTES, CONSTANTS } from "../../../utils/constants";
import Loader from "../../../components/general/Loader";
const classes = [
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

  const classListRef = useRef<HTMLInputElement | undefined>();

  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: classesData, error: classesDataError } = useSWR(
    `${ROUTES.API.CLASS}?search=${searchText}&page=${page}`
  );

  //classesData && console.log(classesData);

  const searchClasses = (e) => {
    e.preventDefault();
    console.log(searchText);
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handlePagination = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <NextSeo title="Browse Our Classes" />
      <Header />
      <div className="relative pt-2 md:pt-7">
        <div className="bg-primary w-screen h-[250px] sm:h-[200px] md:h-[150px] -top-1 left-0 absolute z-0" />
        <div className="container z-20 relative flex flex-col sm:flex-row sm:items-center p-5 mx-auto bg-gradient-to-br from-color5 to-color4 w-[90%]">
          <div className="md:w-[60%]">
            <h1 className="capitalize font-bold text-2xl sm:text-3xl md:text-4xl text-center sm:text-left text-primary">
              Ready to make your mathematics learning a beautiful one?
            </h1>
            <p className="text-center sm:text-left sm:w-[90%] text-sm sm:text-lg md:text-xl text-gray-700 my-4">
              Browse through our available classes to brighten your horizon and
              excel in Mathematics
            </p>
          </div>
          <div className="md:w-[40%]">
            <form
              onSubmit={searchClasses}
              className="flex flex-col space-y-3 w-full md:mt-0 items-center justify-center"
            >
              <Input
                name="search"
                value={searchText}
                onChange={handleChange}
                type="search"
                placeholder="Search"
                // className="w-full relative"
              />

              {/* <Input type="submit" value="Search" isBtn /> */}
            </form>
          </div>
        </div>
        <div className="cursor-pointer md:w-[60%] mx-auto text-center text-red-600 font-bold underline">
          {classesDataError && (
            <p
              onClick={() =>
                mutate(`${ROUTES.API.CLASS}?search=${searchText}&page=${page}`)
              }
            >
              {CONSTANTS.MESSAGES.FETCH_LOADING_ERROR2}
            </p>
          )}
        </div>
        <div
          className={`container p-5 my-6 grid gap-8 grid-cols-1 ${
            loading ||
            (!classesData && !classesDataError) ||
            (!classesDataError &&
              classesData &&
              classesData.results.length <= 0)
              ? "sm:grid-cols-1 md:grid-cols-1 justify-center items-center"
              : "sm:grid-cols-2 md:grid-cols-3"
          } lg:grid-cols-4`}
        >
          <input ref={classListRef} className="h-0 w-0 hidden" />
          {loading || (!classesData && !classesDataError) ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : !classesDataError &&
            classesData &&
            classesData.results.length > 0 ? (
            classesData.results.map((c, i) => (
              <ClassCard
                key={i}
                img={c.thumbnail}
                title={c.title}
                priceTag={c.price}
                desc={c.shortDesc}
                topicsCount={c.topics.length}
                slug={c.slug}
              />
            ))
          ) : (
            <p className="text-center text-xl font-bold uppercase mt-5 md:w-[60%] md:mx-auto text-red-600">
              {CONSTANTS.MESSAGES.COURSE_NOT_FOUND}.
            </p>
          )}
        </div>
        <div className="mt-3 mb-12">
          <Pagination
            showCount={true}
            onClick={(page: number) => handlePagination(page)}
            totalPage={
              classesData?.paging?.totalpages
                ? classesData?.paging?.totalpages
                : 1
            }
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Classes;
