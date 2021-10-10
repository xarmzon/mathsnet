import AuthLayout from "../../components/layouts/AuthLayout";
import { NextSeo } from "next-seo";
import { useState } from "react";
import Link from "next/link";
import Alert, { TypeAlert } from "../../components/general/Alert";
import fetcher from "../../utils/fetcher";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addToken, addUser, setLoginState } from "../../redux/slice/auth";
import { NOTIFY_TYPES, updateNotify } from "../../redux/slice/notify";
import Input from "../../components/controls/Input";
import { ROUTES, CONSTANTS } from "../../utils/constants";
import { useAuth } from "../../hooks/auth";
import { useCookies } from "react-cookie";
import { saveToLocalStorage } from "../../utils";

const Login = () => {
  useAuth(true);
  const notify = useAppSelector((state) => state.notify);
  const dispatch = useAppDispatch();
  const [cookie, setCookie] = useCookies(["token"]);

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [submitText, setSubmitText] = useState("Login");

  const [alert, setAlert] = useState({
    state: false,
    msg: "",
    type: "error",
  });

  const handleChange = (e) => {
    setFormData((prev) => {
      const val = e.target.value;
      const name = e.target.name;
      return { ...prev, [name]: val };
    });
    if (alert.state)
      setAlert((prev) => {
        return { ...prev, state: false };
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitText !== "Loading") {
      setSubmitText("Loading");

      setAlert((prev) => {
        return { ...prev, state: false };
      });

      try {
        const { data } = await fetcher.post(ROUTES.AUTH.LOGIN, {
          ...formData,
        });

        setAlert((prev) => {
          return { state: true, msg: data.msg, type: "success" };
        });

        setCookie("token", data.token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, //7days
          sameSite: "strict",
        });
        saveToLocalStorage("user", data.user);
        dispatch(addUser(data.user));
        dispatch(addToken(cookie.token));
        dispatch(setLoginState(true));
      } catch (error) {
        //console.log(error.message);
        setAlert((prev) => {
          return {
            type: "error",
            state: true,
            msg: error.response?.data?.msg
              ? error.response.data.msg
              : error.response?.data?.msg
              ? error.response.data.msg
              : CONSTANTS.MESSAGES.UNKNOWN_ERROR,
          };
        });
      } finally {
        setSubmitText("Login");
      }
    }
  };
  return (
    <>
      <NextSeo title="Login" />
      <AuthLayout>
        <div>
          <div className="md:mt-3 md:mb-3">
            {alert.state && (
              <Alert type={alert.type as TypeAlert}>{alert.msg}</Alert>
            )}
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Input
                required
                showLabel
                labelValue="Username or Email"
                type="text"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                placeholder="Username or Email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <Input
                required
                showLabel
                labelValue="Password"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your Password"
                onChange={handleChange}
              />
            </div>
            <div className="text-center mb-5">
              <input
                required
                type="submit"
                value={submitText}
                className="cursor-pointer inline-block px-5 py-2 bg-primary text-primary-100 min-w-[50%]"
              />
              <div className="mt-2">
                <p className="text-xs md:text-sm">
                  Or{" "}
                  <Link href={ROUTES.AUTH.SIGNUP}>
                    <a className="text-ascent hover:text-ascent-light">
                      Create an Account
                    </a>
                  </Link>{" "}
                  if not yet registered
                </p>
              </div>
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
