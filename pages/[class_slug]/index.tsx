import { useRef, useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { connectDB } from "../../utils/database";
import { getClassData } from "../api/class";
import { formatPrice } from "../../utils";
import { ROUTES, CONSTANTS } from "../../utils/constants";
import Footer from "../../components/general/Footer";
import Header from "../../components/general/Header";
import LinkButton, { ETypes } from "../../components/general/LinkButton";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { NextSeo } from "next-seo";
import { FaAngleRight } from "react-icons/fa";
import { FiBookOpen, FiX, FiBook, FiMessageCircle } from "react-icons/fi";
import Link from "next/link";
interface ITopics {
  id: string;
  title: string;
  slug: string;
}
interface IClassData {
  id: string;
  price: number;
  title: string;
  desc: string;
  slug: string;
  thumbnail: string;
  subMonths: number;
  createdAt: string;
  topics: ITopics[];
}

const ClassViewPage = ({ classD }) => {
  const [currentTab, setCurrentTab] = useState<number>(1)
  const [showMobileTopicsNav, setShowMobileTopicsNav] =
    useState<boolean>(false);
  const [classData, setClassData] = useState<IClassData>(() => {
    if (classD && classD.length > 0) {
      const data = JSON.parse(classD);
      return {
        id: data._id,
        price: data.price,
        title: data.title,
        desc: data.desc,
        slug: data.slug,
        thumbnail: data.thumbnail,
        subMonths: data.subMonths,
        createdAt: data.createdAt,
        topics: data.topics.map((t) => ({
          id: t._id,
          title: t.title,
          slug: t.slug,
        })),
      };
    } else {
      return {
        id: "",
        price: 0,
        title: "",
        desc: "",
        slug: "",
        thumbnail: "",
        subMonths: 0,
        createdAt: "",
        topics: [],
      };
    }
  });
  classData && console.log(classData);
  return (
    <div>
      <NextSeo title={classData?.title || "Loading"} />
      <div className="mb-2">
        <Header />
      </div>
      <div className="container pt-2">
        <div className="-space-x-1 flex items-center flex-wrap">
          <span className="flex items-center">
            <LinkButton href="/" txt="Home" type={ETypes.TEXT} />
            <FaAngleRight className="text-sm md:text-lg text-gray-300" />
          </span>{" "}
          <span className="flex items-center">
            <LinkButton
              href={ROUTES.GENERAL.CLASSES}
              txt="Browse Classes"
              type={ETypes.TEXT}
            />
            <FaAngleRight className="text-sm md:text-lg text-gray-300" />
          </span>
          <span className="in-block pl-4 text-gray-400 text-sm md:text-lg">
            {classData?.title || "Loading"}
          </span>
        </div>
        <div className="mt-3 p-5 w-full text-secondary">
          <div className="w-full">
            {classData ? (
              <div className="flex md:space-x-4 transition duration-700">
                <span
                  onClick={() => setShowMobileTopicsNav((prev) => !prev)}
                  className="cusor-pointer z-50 md:hidden fixed bottom-4 right-2 shadow-lg h-10 w-10 rounded-full bg-ascent-light text-primary flex items-center justify-center"
                >
                  {showMobileTopicsNav ? (
                    <FiX className="text-xl" />
                  ) : (
                    <FiBookOpen className="text-xl" />
                  )}
                </span>
                <div
                  className={`overflow-hidden ${
                    showMobileTopicsNav
                      ? "fixed top-0 left-0 bottom-0 w-[70%] shadow-md"
                      : "w-0"
                  } bg-gray-50 text-primary md:bg-primary md:text-gray-50 min-h-[100px] md:block md:w-[34%] transition duration-700`}
                >
                  <div className="space-y-3">
                    <h4 className="p-5 md:text-lg md:font-bold">Topics List</h4>
                    <ul className="h-full overflow-y-auto divide-y divide-gray-300 md:divide-primary-200">
                      {classData.topics.map((t, i) => (
                        <li
                          key={i}
                          className={`${
                            i > 0 && "pt-3"
                          } my-3 px-5 text-primary md:text-primary-100 cursor-pointer line-clamp-2`}
                        >
                          <Link href={`/${classData.slug}/${t.slug}`}>
                            <a>{t.title}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="w-full md:w-[65%]">
                  <h1 className="font-bold text-2xl md:text-3xl">
                    {classData.title}
                  </h1>
                  <img
                    className="w-full object-cover mt-2 rounded"
                    src={classData.thumbnail || "/assets/images/thumbnail.jpg"}
                  />
                  <div className="mt-4 w-full">
                    <div className="flex w-full overflow-x-auto space-x-4 min-h-[10px] border-b-2 border-gray-200">
                      <div className="flex items-center space-x-1">
                        <FiBook />
                        <span className="">Description</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiMessageCircle />
                        <span className="">Reviews</span>
                      </div>
                    </div>
                    <div>
                      <div className={`${currentTab === 1 ? "block w-full" : "hidden"}`}>
                        tab1 contents
                      </div>
                      <div className={`${currentTab === 2 ? "block w-full" : "hidden"}`}>
                        tab2 contents
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="md:max-w-screen-md md:mx-auto p-5">
                <p className="text-red-600 text-2xl text-center">
                  {CONSTANTS.MESSAGES.COURSE_NOT_FOUND}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await connectDB();
  const { class_slug: slug } = params;

  let classD: any;
  try {
    classD = await getClassData({ match: { slug } });
  } catch (e) {
    console.log(e);
    classD = null;
  }
  //console.log(classD);
  return {
    props: {
      classD: JSON.stringify(classD, null, 4),
    },
  };
};

export default ClassViewPage;
