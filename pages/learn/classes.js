import Header from "../../components/general/Header";
import Footer from "../../components/general/Footer";
import { NextSeo } from "next-seo";
import Input from "../../components/controls/Input";
import ClassCard from "../../components/class/ClassCard";
import { useState } from "react";

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
  const [searchText, setSearchText] = useState("");

  const searchClasses = (e) => {
    e.preventDefault();
    console.log(searchText);
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div>
      <NextSeo title="Browse Classes" />
      <Header />
      <div className="relative pt-2 md:pt-7 container">
        <div className="bg-primary w-full h-[100px] md:h-[150px] -top-1 absolute z-0" />
        <div className="z-20 relative flex flex-col p-5 mx-auto bg-gradient-to-br from-color5 to-color4 w-[90%]">
          <h1 className="capitalize font-bold text-2xl text-center text-primary">
            Ready to make your mathematics learning a beautiful one?
          </h1>
          <p className="text-center  text-sm text-gray-700 my-4">
            Browse through our available classes to brighten your horizon and
            excel in Mathematics
          </p>
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
        <div className="p-5 my-6 grid gap-8 grid-cols-1 sm:grid-cols-3 ">
          {classes.length > 0
            ? classes.map((c, i) => <ClassCard key={i} class_={c} />)
            : "No class"}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Classes;
