import Link from "next/link";
import AuthLayout from "../../components/layouts/AuthLayout";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    type: "",
    state: false,
    msg: "",
  });

  const [submitText, setSubmitText] = useState("Signup");

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
    console.log(formData);
  };
  return (
    <>
      <NextSeo title="Signup" />
      <AuthLayout>
        <div>
          {alert.state && <Alert type={alert.type}>{alert.msg}</Alert>}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-sm md:text-md">
                Full Name
              </label>
              <input
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="E.g: Adelola Kayode Samson"
                onChange={handleChange}
                className="border-none bg-primary-100 rounded-sm  focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm md:text-md">
                Username
              </label>
              <input
                required
                type="text"
                name="username"
                maxLength="15"
                minLength="3"
                value={formData.username}
                placeholder="Eg: samson"
                onChange={handleChange}
                className="border-none bg-primary-100 rounded-sm  focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm md:text-md">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                placeholder="Eg: samson@gmail.com"
                onChange={handleChange}
                className="border-none bg-primary-100 rounded-sm  focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm md:text-md">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your Password"
                onChange={handleChange}
                className="border-none bg-primary-100 rounded-sm  focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-primary"
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
