import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { connectDB } from "../../utils/database";
import { getClassData } from "../api/class";
import { ROUTES } from "../../utils/constants";
import Footer from "../../components/general/Footer";
import Header from "../../components/general/Header";
import { NextSeo } from "next-seo";
import katex from "katex";
import useClassData from "../../hooks/useClassData";
import Breadcrumb, {
  IBreadcrumbData,
} from "../../components/general/Breadcrumb";
import MainContents from "../../components/class/MainContents";

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
    <>
      <NextSeo title={`${classData?.title ?? "Unknown"} Class`} />
      <Header fixed={true} />
      <div className="container pt-2">
        <Breadcrumb data={breadcrumb} />
        <MainContents
          classData={classData}
          currentTopic={classData.topics[2].id}
        />
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </>
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
