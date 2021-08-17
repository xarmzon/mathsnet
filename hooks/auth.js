import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS, ROUTES } from "../utils/constants";
import { setLoading } from "../redux/slice/dashboard";

const useAuth = (authPage = false) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.loggedIn && authPage) {
      router.replace(ROUTES.GENERAL.OVERVIEW);
    } else {
      if (!auth.loading && !auth.loggedIn) {
        router.replace(ROUTES.AUTH.LOGIN);
      } else if (!auth.loading && auth.loggedIn) {
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(true));
      }
    }
  }, [auth.loggedIn, auth.loading]);
};

export default useAuth;
