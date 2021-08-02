import Header from "../components/general/Header";
import HeroBanner from "../components/Landing/HeroBanner";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo title="Home" />
      <Header />
      <HeroBanner />
    </>
  );
}
