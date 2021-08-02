import AuthLayout from "../../components/layouts/AuthLayout";
import Head from "next/head";
const SignUp = () => {
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <AuthLayout>
        <div>Signup</div>
      </AuthLayout>
    </>
  );
};

export default SignUp;
