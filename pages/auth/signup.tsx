import Link from "next/link";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/controls/Input";
import Alert, { TypeAlert } from "../../components/general/Alert";
import MessageBox from "../../components/general/MessageBox";
import { NextSeo } from "next-seo";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { validateRegForm } from "../../utils/auth";
import { CONSTANTS, ENTITY_NUMBERS, ROUTES } from "../../utils/constants";
import fetcher from "../../utils/fetcher";
import { useAuth } from "../../hooks/auth";

const SignUp = () => {
  const router = useRouter();
  useAuth(true);
  const notificationRef = useRef<HTMLInputElement | undefined>();
  const [errors, setErrors] = useState({
    fullName: {
      error: false,
      msg: "",
    },
    username: {
      error: false,
      msg: "",
    },
    email: {
      error: false,
      msg: "",
    },
    password: {
      error: false,
      msg: "",
    },
    cPassword: {
      error: false,
      msg: "",
    },
  });

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [alert, setAlert] = useState({
    type: "",
    state: false,
    msg: "",
  });

  const [submitText, setSubmitText] = useState("Signup");

  const handleChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    setFormData((prev) => {
      return { ...prev, [name]: val };
    });
    setErrors((prev) => {
      return { ...prev, [name]: { type: false, msg: "" } };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitText === "Signup") {
      setSubmitText("Loading...");
      try {
        const errors = await validateRegForm(formData, true);
        if (errors.length > 0) {
          errors.map((err) => {
            setErrors((prev) => {
              return { ...prev, [err.name]: { error: true, msg: err.msg } };
            });
          });
        } else {
          const { data } = await fetcher.post(ROUTES.AUTH.SIGNUP, formData);

          notificationRef?.current?.focus();
          setAlert((prev) => {
            return { type: "success", state: true, msg: data.msg };
          });
          setTimeout(() => router.replace(ROUTES.AUTH.LOGIN), 1000);
        }
      } catch (err) {
        const msg = err.response?.data?.msg
          ? err.response.data.msg
          : err?.message
          ? err?.message
          : CONSTANTS.MESSAGES.UNKNOWN_ERROR;

        notificationRef?.current?.focus();
        //console.log(notificationRef.current);
        setAlert((prev) => {
          return { type: "error", state: true, msg };
        });
      } finally {
        setSubmitText("Signup");
      }
    }
  };

  return (
    <>
      <NextSeo title="Signup" />
      <AuthLayout>
        <div>
          <input ref={notificationRef} className="h-0 w-0 hidden" />
          {alert.state && (
            <Alert type={alert.type as TypeAlert}>{alert.msg}</Alert>
          )}
          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Input
                showLabel
                labelValue="Full Name"
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="E.g: Adelola Kayode Samson"
                onChange={handleChange}
                error={errors.fullName.msg}
              />
              {/* <MessageBox
                show={errors.fullName.error}
                type="error"
                msg={errors.fullName.msg}
              /> */}
            </div>
            <div className="flex flex-col">
              <Input
                showLabel
                labelValue="Username"
                required
                type="text"
                name="username"
                maxLength={ENTITY_NUMBERS.USERNAME_MAX}
                minLength={ENTITY_NUMBERS.USERNAME_MIN}
                value={formData.username}
                placeholder="Eg: samson"
                onChange={handleChange}
                error={errors.username.msg}
              />
              {/* <MessageBox
                show={errors.username.error}
                type="error"
                msg={errors.username.msg}
              /> */}
            </div>
            <div className="flex flex-col">
              <Input
                required
                showLabel
                labelValue="Email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Eg: samson@gmail.com"
                onChange={handleChange}
                error={errors.email.msg}
              />
              {/* <MessageBox
                show={errors.email.error}
                type="error"
                msg={errors.email.msg}
              /> */}
            </div>
            <div className="flex flex-col">
              <Input
                required
                showLabel
                labelValue="Password"
                maxLength={ENTITY_NUMBERS.PASSWORD_MAX}
                minLength={ENTITY_NUMBERS.PASSWORD_MIN}
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your Password"
                onChange={handleChange}
                error={errors.password.msg}
              />
              {/* <MessageBox
                show={errors.password.error}
                type="error"
                msg={errors.password.msg}
              /> */}
            </div>
            <div className="flex flex-col">
              <Input
                required
                showLabel
                labelValue="Confirm Password"
                maxLength={ENTITY_NUMBERS.PASSWORD_MAX}
                minLength={ENTITY_NUMBERS.PASSWORD_MIN}
                type="password"
                name="cPassword"
                value={formData.cPassword}
                placeholder="Confirm your Password"
                onChange={handleChange}
                error={errors.cPassword.msg}
              />
              {/* <MessageBox
                show={errors.cPassword.error}
                type="error"
                msg={errors.cPassword.msg}
              /> */}
            </div>
            <div className="text-center mb-5">
              <input
                required
                type="submit"
                value={submitText}
                className="inline-block px-5 py-2 bg-primary text-primary-100 min-w-[50%]"
              />
              <div className="mt-2">
                <p className="text-xs md:text-sm">
                  Or{" "}
                  <Link href={ROUTES.AUTH.LOGIN}>
                    <a className="text-ascent hover:text-ascent-light">Login</a>
                  </Link>{" "}
                  if you&apos;re a registered user
                </p>
              </div>
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default SignUp;
