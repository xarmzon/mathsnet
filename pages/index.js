import Head from "next/head";
import Header from "../components/general/Header";
import LinkButton from "../components/general/LinkButton";
import HeroBanner from "../components/Landing/HeroBanner";

export default function Home() {
  return (
    <>
      <Header />
      <HeroBanner />
    </>
  );
}
