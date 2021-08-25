import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS, ROUTES } from "../utils/constants";
import { setLoading } from "../redux/slice/dashboard";

export const useLoadingUser = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
};

export const useAuth = (authPage = false) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.loggedIn && authPage) {
      router.replace(ROUTES.GENERAL.OVERVIEW);
    } else {
      if (!auth.loading && !auth.loggedIn && !authPage) {
        router.replace(ROUTES.AUTH.LOGIN);
      } else if (!auth.loading && auth.loggedIn) {
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(true));
      }
    }
  }, [auth.loggedIn, auth.loading]);

  return auth;
};

export const useUserType = (userType = CONSTANTS.USER_TYPES.ADMIN) => {
  const router = useRouter();
  const auth = useAuth();
  useEffect(() => {
    notValidUser(auth, userType) && router.replace(ROUTES.GENERAL.OVERVIEW);
  }, [auth]);
};

const notValidUser = (auth, type) => {
  if (!auth.loading && auth.user?.userType !== type) {
    return true;
  } else {
    return false;
  }
};
