import Head from "next/head";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { CONSTANTS } from "../utils/constants";
import "nprogress/nprogress";
import "../styles.css";
import axios from "axios";

NProgress.configure({ showSpinner: false });

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost.com:3000/api/";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const startProgress = () => NProgress.start();
    const stopProgress = () => NProgress.done();

    router.events.on("routeChangeStart", startProgress);
    router.events.on("routeChangeComplete", stopProgress);
    router.events.on("routeChangeError", stopProgress);

    return () => {
      router.events.off("routeChangeStart", startProgress);
      router.events.off("routeChangeComplete", stopProgress);
      router.events.off("routeChangeError", stopProgress);
    };
  }, [router]);
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${CONSTANTS.APP_NAME}`}
        defaultTitle={CONSTANTS.APP_NAME}
        description="MathsNet, Online maths learning portal. MathsNet is a platform that teaches all the curriculum Mathematics at Primary, Secondary and A levels Mathematics."
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
