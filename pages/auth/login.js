import AuthLayout from "../../components/layouts/AuthLayout";
import { NextSeo } from "next-seo";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  return (
    <>
      <NextSeo title="Login" />
      <AuthLayout title="Let's Get Started Now!">
        <div>
          <form>
            <div>
              <label htmlFor="usernameEmail">Username or Email</label>
              <input
                type="text"
                name="usernameEmail"
                value={formData.usernameOrEmail}
                placeholder="Username or Email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your Password"
              />
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
