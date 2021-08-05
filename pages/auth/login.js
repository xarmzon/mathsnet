import AuthLayout from "../../components/layouts/AuthLayout";
import { NextSeo } from "next-seo";
import { useState } from "react";
import Link from "next/link";
import Alert from "../../components/general/Alert";
import axios from "axios";

const Login = () => {
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
        const d = await axios.post("http://localhost:3000/api/auth", {
          ...formData,
        });
        console.log(d);
        setAlert((prev) => {
          return { state: true, msg: "success", type: "success" };
        });
      } catch (error) {
        console.log(error.message);
        setAlert((prev) => {
          return { type: "error", state: true, msg: "error occured" };
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
            {alert.state && <Alert type={alert.type}>{alert.msg}</Alert>}
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="usernameOrEmail" className="text-sm md:text-md">
                Username or Email
              </label>
              <input
                required
                type="text"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                placeholder="Username or Email"
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
                className="cursor-pointer inline-block px-5 py-2 bg-primary text-primary-100 min-w-[50%]"
              />
              <div className="mt-2">
                <p className="text-xs md:text-sm">
                  Or{" "}
                  <Link href="/auth/signup">
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
