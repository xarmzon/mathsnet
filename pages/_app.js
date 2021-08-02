import "../styles.css";
import Head from "next/head";
//import { Ne } from "next-seo";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Home | MathsNet</title>
        <meta
          name="description"
          content="MathsNet, Online maths learning portal. MathsNet is a platform that teaches all the curriculum Mathematics at Primary, Secondary and A levels Mathematics."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
