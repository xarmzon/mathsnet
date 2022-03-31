import { useState } from "react";
import Header from "../components/general/Header";
import HeroBanner from "../components/Landing/HeroBanner";
import Topics from "../components/Landing/Topics";
import { NextSeo } from "next-seo";
import Features from "../components/Landing/Features";
import Footer from "../components/general/Footer";
import { GetServerSideProps } from "next";
import { connectDB } from "../utils/database";
import { getClassesData } from "./api/class";
import { getTopicsData } from "./api/topic";
import { PER_PAGE } from "../utils/constants";
import { IFeaturedClass, IFeaturedTopics } from "../utils/types";
import Classes from "../components/Landing/Classes";

const Home = ({ featuredClasses, featuredTopics }) => {
  const [classesData, setClassesData] = useState<IFeaturedClass[]>(() => {
    if (featuredClasses && featuredClasses.length > 0) {
      const data = JSON.parse(featuredClasses);
      return data?.results?.map((d: any) => ({
        thumbnail: d?.thumbnail,
        title: d?.title,
        price: d?.price,
        shortDesc: d?.shortDesc,
        slug: d?.slug,
        topicsCount: d?.topics?.length,
      }));
    } else {
      return [];
    }
  });
  const [topicsData, setTopicsData] = useState<IFeaturedTopics[]>(() => {
    if (featuredTopics && featuredTopics.length > 0) {
      const data = JSON.parse(featuredTopics);
      return data?.results?.map((d: any) => ({
        img: d?.thumbnail,
        title: d?.title,
        desc: d?.description,
        classData: d?.classData,
      }));
    } else {
      return [];
    }
  });
  //console.log(topicsData);
  //console.log(classesData);
  return (
    <main>
      <NextSeo title="Home" />
      <Header />
      <HeroBanner />
      <Classes featuredClasses={classesData} />
      <Topics topics={topicsData} />
      <Features />
      <Footer />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  let featuredClassesData: any;
  let featuredTopicsData: any;
  try {
    featuredClassesData = await getClassesData(0, PER_PAGE, {
      sample: { size: 10 },
    });
    featuredTopicsData = await getTopicsData(0, PER_PAGE, {
      sample: { size: 25 },
    });
  } catch (error) {}
  return {
    props: {
      featuredClasses: JSON.stringify(featuredClassesData || ""),
      featuredTopics: JSON.stringify(featuredTopicsData || ""),
    },
  };
};

export default Home;
