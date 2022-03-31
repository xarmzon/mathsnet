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

import { useRouter } from "next/router";

interface IClassAndTopicPageView {
  classD: any;
  isTopic: boolean;
  topicSlug: string;
}

const ClassAndTopicPageView = ({
  classD,
  isTopic,
  topicSlug,
}: IClassAndTopicPageView) => {
  const { classData, topicData } = useClassData({ classD, isTopic, topicSlug });
  const [breadcrumb, setBreadcrumb] = useState<IBreadcrumbData[]>([]);

  useEffect(() => {
    if (katex) window.katex = katex;
  }, []);

  useEffect(() => {
    const bc: IBreadcrumbData[] = [
      {
        last: false,
        link: ROUTES.GENERAL.CLASSES,
        text: "Browse Classes",
      },
    ];

    if (isTopic) {
      const d = [
        {
          last: false,
          link: `/${classData?.slug}` || "/",
          text: classData?.title || "Unknown",
        },
        {
          last: true,
          text: topicData?.title || "Unknown",
        },
      ];
      bc.push(...d);
    } else {
      bc.push({
        last: true,
        text: classData?.title || "Unknown",
      });
    }
    setBreadcrumb(bc);
  }, [classData?.slug, classData?.title, isTopic, topicData?.title, topicSlug]);

  return (
    <>
      <NextSeo
        title={`${
          isTopic
            ? topicData?.title ?? "Unknown"
            : classData?.title ?? "Unknown"
        } ${!isTopic ? "Class" : ""}`}
      />
      <Header fixed={true} />
      <div className="container pt-2">
        <Breadcrumb data={breadcrumb} />
        <MainContents
          classData={classData}
          isTopic={isTopic}
          topicData={topicData}
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
  const { slugs } = params;

  const classSlug = slugs[0];
  const isTopic = slugs.length > 1;

  const topicSlug = isTopic ? slugs[1] : "Uknown";

  const slug = "dasdsds";
  let classD: any;
  try {
    classD = await getClassData({ match: { slug: classSlug } });
  } catch (e) {
    console.log(e);
    classD = "";
  }
  //console.log(classD);
  return {
    props: {
      classD: JSON.stringify(classD || "", null, 4),
      isTopic,
      topicSlug,
    },
  };
};

export default ClassAndTopicPageView;
