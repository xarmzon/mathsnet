import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { connectDB } from "../../utils/database";
import { getClassData } from "../api/class";
import { ROUTES, CONSTANTS } from "../../utils/constants";
import Footer from "../../components/general/Footer";
import Header from "../../components/general/Header";
import { NextSeo } from "next-seo";
import katex from "katex";
import dateformat from "dateformat";
import Sidebar from "../../components/class/Sidebar";
import useClassData from "../../hooks/useClassData";
import Breadcrumb, {
  IBreadcrumbData,
} from "../../components/general/Breadcrumb";
import FAB from "../../components/class/FAB";
import CommentReview from "../../components/class/CommentReview";

export interface ITopics {
  id: string;
  title: string;
  slug: string;
}
export interface IClassData {
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
  const [showMobileTopicsNav, setShowMobileTopicsNav] =
    useState<boolean>(false);

  const { classData } = useClassData({ classD });
  const [breadcrumb, __] = useState<IBreadcrumbData[]>([
    {
      last: false,
      link: ROUTES.GENERAL.CLASSES,
      text: "Browse Classes",
    },
    {
      last: true,
      text: classData?.title || "Unknown",
    },
  ]);

  useEffect(() => {
    if (katex) window.katex = katex;
  }, []);

  return (
    <div>
      <NextSeo title={classData?.title || "Unknown Class"} />
      <div className="mb-2">
        <Header fixed={true} />
      </div>
      <div className="container pt-2">
        <Breadcrumb data={breadcrumb} />
        <div className="mt-[60px] p-5 w-full text-secondary">
          <div className="w-full">
            {classData ? (
              <div className="flex md:space-x-4 transition duration-700">
                <FAB
                  toggle={setShowMobileTopicsNav}
                  show={showMobileTopicsNav}
                />
                <Sidebar
                  showMobileTopicsNav={showMobileTopicsNav}
                  classData={classData}
                />
                <div className="w-full md:w-[65%]">
                  <img
                    className="w-full object-cover mt-2 rounded"
                    src={classData.thumbnail || "/assets/images/thumbnail.jpg"}
                  />
                  <p className="mt-1 text-xs md:text-sm text-gray-400">
                    Added on:{" "}
                    {classData.createdAt
                      ? dateformat(classData.createdAt, "fullDate")
                      : "Unknown"}
                  </p>
                  <h1 className="mt-2 mb-4 font-bold text-xl md:text-2xl">
                    {classData.title || "Unknown"}
                  </h1>
                  {/* <PaymentBox classData={classData} /> */}
                  <CommentReview classData={classData} />
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
    classD = "";
  }
  //console.log(classD);
  return {
    props: {
      classD: JSON.stringify(classD || "", null, 4),
    },
  };
};

export default ClassViewPage;
