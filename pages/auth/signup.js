import Link from "next/link";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/controls/Input";
import MessageBox from "../../components/general/MessageBox";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { useRouter } from "next/router";
import { validateRegForm } from "../../utils/auth";

const SignUp = () => {
  const router = useRouter();

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
    validateRegForm(formData);
  };

  return (
    <>
      <NextSeo title="Signup" />
      <AuthLayout>
        <div>
          {alert.state && <Alert type={alert.type}>{alert.msg}</Alert>}
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
                error={errors.fullName.error}
              />
              <MessageBox
                show={errors.fullName.error}
                type="error"
                msg={errors.fullName.msg}
              />
            </div>
            <div className="flex flex-col">
              <Input
                showLabel
                labelValue="Username"
                required
                type="text"
                name="username"
                maxLength="15"
                minLength="3"
                value={formData.username}
                placeholder="Eg: samson"
                onChange={handleChange}
                error={errors.username.error}
              />
              <MessageBox
                show={errors.username.error}
                type="error"
                msg={errors.username.msg}
              />
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
                error={errors.email.error}
              />
              <MessageBox
                show={errors.email.error}
                type="error"
                msg={errors.email.msg}
              />
            </div>
            <div className="flex flex-col">
              <Input
                required
                showLabel
                labelValue="Password"
                minLength="6"
                maxLength="32"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your Password"
                onChange={handleChange}
                error={errors.password.error}
              />
              <MessageBox
                show={errors.password.error}
                type="error"
                msg={errors.password.msg}
              />
            </div>
            <div className="flex flex-col">
              <Input
                required
                showLabel
                labelValue="Confirm Password"
                minLength="6"
                maxLength="32"
                type="password"
                name="cPassword"
                value={formData.cPassword}
                placeholder="Confirm your Password"
                onChange={handleChange}
                error={errors.cPassword.error}
              />
              <MessageBox
                show={errors.cPassword.error}
                type="error"
                msg={errors.cPassword.msg}
              />
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
                  <Link href="/auth/login">
                    <a className="text-ascent hover:text-ascent-light">Login</a>
                  </Link>{" "}
                  if you're a registered user
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
