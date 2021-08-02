import Link from "next/link";
const AuthLayout = ({ children }) => {
  return (
    <div
      className="text-gray-200 min-h-screen w-full bg-cover bg-left-bottom bg-no-repeat"
      style={{ backgroundImage: "url(/assets/images/auth_bg.jpg)" }}
    >
      <div className="bg-gradient-to-t from-indigo-900 to-primary opacity-90 fixed inset-0 flex flex-col">
        <div className="container mx-auto min-h-full flex flex-col items-center md:justify-center mt-28 md:mt-0">
          <div className="font-bold text-lg md:text-2xl mb-20 md:mb-16">
            Let's Get Started Now!
          </div>
          <div className="relative bg-gray-50 w-[85%] sm:w-[70%] md:max-w-sm lg:max-w-md text-primary opacity-100 rounded-lg shadow-lg">
            <div className="absolute -top-10 transform -translate-x-1/2 left-1/2 w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
              <Link href="/">
                <a className="cursor-pointer">
                  <img
                    src="/assets/images/mathsnet_logo_c.png"
                    className="h-16 object-cover object-bottom"
                  />
                </a>
              </Link>
            </div>
            <div className="p-5 mt-8">{children}</div>
          </div>
          <div className="mt-5 mb-8 flex justify-center text-xs md:text-sm text-center">
            &copy; {new Date().getFullYear()}, MathsNet. All Right Reserved.
            Crafted and Developed by Rastaarc
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
