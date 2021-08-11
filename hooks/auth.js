import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { CONSTANTS, ROUTES } from "../utils/constants";

const useAuth = (authPage = false, link = "/") => {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  if (isLoggedIn && authPage) router.replace(link);
  else if (!isLoggedIn && !authPage) router.replace(ROUTES.AUTH.LOGIN);
};

export default useAuth;
