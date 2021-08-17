import { CookiesProvider } from "react-cookie";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { CONSTANTS, ROUTES } from "../utils/constants";
import { Provider } from "react-redux";
import store from "../redux/store";
import "nprogress/nprogress.css";
import "../styles.css";
import { getLocalStorageItem } from "../utils";
import {
  addUser,
  setLoading,
  setLoginState,
  addToken,
} from "../redux/slice/auth";
import cookie from "cookie";

NProgress.configure({ showSpinner: false });

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

  useEffect(() => {
    store.dispatch(setLoading(true));
    const userData = getLocalStorageItem("user");
    const cookies = cookie.parse(document.cookie || "");
    const tokenAvailable = cookies.token ? true : false;
    if (tokenAvailable && userData && !store.getState().auth.loggedIn) {
      store.dispatch(addUser(userData));
      store.dispatch(setLoginState(true));
      store.dispatch(addToken(cookies.token));
    }
    if (!tokenAvailable && userData) {
      store.dispatch(addUser({}));
      store.dispatch(setLoginState(false));
      localStorage.removeItem("user");
    }
    store.dispatch(setLoading(false));
    Component.auth && !tokenAvailable && router.replace(ROUTES.AUTH.LOGIN);
  }, []);

  return (
    <Provider store={store}>
      <DefaultSeo
        titleTemplate={`%s | ${CONSTANTS.APP_NAME}`}
        defaultTitle={CONSTANTS.APP_NAME}
        description="MathsNet, Online maths learning portal. MathsNet is a platform that teaches all the curriculum Mathematics at Primary, Secondary and A levels Mathematics."
      />
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </Provider>
  );
}

export default MyApp;
