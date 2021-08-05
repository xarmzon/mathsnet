import Header from "../components/general/Header";
import HeroBanner from "../components/Landing/HeroBanner";
import Classes from "../components/Landing/Classes";
import Topics from "../components/Landing/Topics";
import { NextSeo } from "next-seo";
import Features from "../components/Landing/Features";
import Footer from "../components/general/Footer";

export default function Home() {
  return (
    <main>
      <NextSeo title="Home" />
      <Header />
      <HeroBanner />
      <Classes />
      <Topics />
      <Features />
      <Footer />
    </main>
  );
}
