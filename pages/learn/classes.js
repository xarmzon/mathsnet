import Header from "../../components/general/Header";
import Footer from "../../components/general/Footer";
import { NextSeo } from "next-seo";
import Input from "../../components/controls/Input";
import ClassCard from "../../components/class/ClassCard";
import { useRef, useState } from "react";
import Pagination from "../../components/general/Pagination";

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
  // {
  //   title:
  //     "Class Title Class Title Class Title Class Title  Class Title Class Title Class Title  Class Title Class Title Class Title ",
  //   topicsCount: 0,
  //   priceTag: "5,000",
  //   img: "",
  //   desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  // },
  // {
  //   title: "Class Title",
  //   topicsCount: 40,
  //   priceTag: "5,000",
  //   img: "",
  //   desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  // },
  // {
  //   title: "Class Title",
  //   topicsCount: 80,
  //   priceTag: "5,000",
  //   img: "",
  //   desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, nihil ab delectus quae inventore autem in sit. Cum veniam aspernatur eaque. Sequi nostrum beatae dolores, numquam a dicta porro aperiam.",
  // },
];
const Classes = () => {
  const [searchText, setSearchText] = useState("");
  const classListRef = useRef();
  const totalPage = 2;

  const searchClasses = (e) => {
    e.preventDefault();
    console.log(searchText);
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handlePagination = (page, type) => {
    console.log(page, type);
    classListRef.current.focus();
  };
  return (
    <div>
      <NextSeo title="Browse Our Classes" />
      <Header />
      <div className="relative pt-2 md:pt-7">
        <div className="bg-primary w-screen h-[250px] sm:h-[200px] md:h-[150px] -top-1 left-0 absolute z-0" />
        <div className="container z-20 relative flex flex-col sm:flex-row sm:items-center p-5 mx-auto bg-gradient-to-br from-color5 to-color4 w-[90%]">
          <div className="sm:w-[65%]">
            <h1 className="capitalize font-bold text-2xl sm:text-3xl md:text-4xl text-center sm:text-left text-primary">
              Ready to make your mathematics learning a beautiful one?
            </h1>
            <p className="text-center sm:text-left sm:w-[90%] text-sm sm:text-lg md:text-xl text-gray-700 my-4">
              Browse through our available classes to brighten your horizon and
              excel in Mathematics
            </p>
          </div>
          <div className="sm:w-[35%]">
            <form
              onSubmit={searchClasses}
              className="flex flex-col space-y-3 w-full md:mt-0 items-center justify-center"
            >
              <Input
                value={searchText}
                onChange={handleChange}
                type="search"
                placeholder="Search"
              />
              <Input type="submit" value="Search" isBtn />
            </form>
          </div>
        </div>
        <div className="container p-5 my-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <input ref={classListRef} className="h-0 w-0" />
          {classes.length > 0
            ? classes.map((c, i) => <ClassCard key={i} class_={c} />)
            : "No class"}
        </div>
        <div className="mt-3 mb-12">
          <Pagination onClick={handlePagination} totalPage={totalPage} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Classes;
