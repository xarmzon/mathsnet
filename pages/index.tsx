import { useState } from "react";
import Header from "../components/general/Header";
import HeroBanner from "../components/Landing/HeroBanner";
import Classes, { IFeaturedClass } from "../components/Landing/Classes";
import Topics from "../components/Landing/Topics";
import { NextSeo } from "next-seo";
import Features from "../components/Landing/Features";
import Footer from "../components/general/Footer";
import { GetServerSideProps } from "next";
import { connectDB } from "../utils/database";
import { getClassesData } from "./api/class";
import { PER_PAGE } from "../utils/constants";

const Home = ({ featuredClasses }) => {
  const [classesData, setClassesData] = useState<IFeaturedClass[]>(() => {
    if (featuredClasses && featuredClasses.length > 0) {
      const data = JSON.parse(featuredClasses);
      return data.results.map((d) => ({
        thumbnail: d.thumbnail,
        title: d.title,
        price: d.price,
        shortDesc: d.shortDesc,
        slug: d.slug,
        topicsCount: d.topics.length,
      }));
    } else {
      return [];
    }
  });
  // classesData && console.log(classesData);
  return (
    <main>
      <NextSeo title="Home" />
      <Header />
      <HeroBanner />
      <Classes featuredClasses={classesData} />
      <Topics />
      <Features />
      <Footer />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const res = await getClassesData(0, PER_PAGE, { sample: { size: 10 } });
  return {
    props: {
      featuredClasses: JSON.stringify(res),
    },
  };
};

export default Home;
