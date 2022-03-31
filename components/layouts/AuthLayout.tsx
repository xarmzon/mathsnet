import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { CONSTANTS } from "../../utils/constants";

interface IAuthLayout {
  children: ReactNode;
}

const AuthLayout = ({ children }: IAuthLayout) => {
  return (
    <div
      className="text-gray-200 min-h-screen w-full bg-cover bg-left-bottom bg-no-repeat"
      style={{ backgroundImage: "url(/assets/images/auth_bg.jpg)" }}
    >
      <div className="bg-gradient-to-t from-indigo-900 to-primary opacity-95 min-h-screen flex flex-col">
        <div className="container mx-auto min-h-full flex flex-col items-center md:justify-center mt-14 md:mt-20">
          <div className="font-bold text-lg md:text-2xl mb-20 md:mb-16">
            Let&apos;s Get Started Now!
          </div>
          <div className="relative bg-gray-50 w-[85%] sm:w-[70%] md:max-w-sm lg:max-w-md xl:max-w-lg text-primary opacity-100 rounded-lg shadow-lg">
            <div className="absolute -top-10 transform -translate-x-1/2 left-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
              <Link href="/">
                <a className="cursor-pointer relative w-full h-16 md:h-20">
                  <Image
                    alt="logo"
                    layout="fill"
                    src="/assets/images/mathsnet_logo_c.png"
                    className=""
                    objectFit="cover"
                    objectPosition="top"
                  />
                </a>
              </Link>
            </div>
            <div className="p-5 mt-8">{children}</div>
          </div>
          <div className="px-9 md:px-0 md:max-w-sm mt-5 mb-8 flex justify-center text-xs md:text-sm text-center">
            <p>
              &copy; {new Date().getFullYear()}, {CONSTANTS.APP_NAME}. All Right
              Reserved. Crafted and Developed by{" "}
              <a
                className="hover:text-ascent-light text-ascent inline-block"
                href={CONSTANTS.RASTAARC.GITHUB}
                target="_blank"
                rel="noreferrer"
              >
                Rastaarc
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
