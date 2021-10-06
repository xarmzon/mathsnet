import Link from "next/link";
import { CONSTANTS } from "../../utils/constants";
const FootyLink = ({ href, children }) => {
  return (
    <li className="group hover:text-gray-50 text-sm mb-2 md:mb-4 md:mt-2">
      <Link href={href}>{children}</Link>
    </li>
  );
};
const Footer = () => {
  return (
    <div className="bg-primary text-primary-100 pb-2">
      <div className="container p-5 flex flex-col flex-wrap md:flex-row md:justify-between">
        <div className="mb-3 md:mb-0 pb-2 md:pb-0 border-b border-gray-400 md:border-none md:w-1/4">
          <h1 className="font-bold md:text-lg mb-1">Quick Links</h1>
          <ul className="mt-1">
            <FootyLink href="/">Home</FootyLink>
            <FootyLink href="/auth/login">Login</FootyLink>
            <FootyLink href="/auth/signup">Signup</FootyLink>
            <FootyLink href="/learn/classes">Start Learning</FootyLink>
          </ul>
        </div>
        <div className="mb-3 md:mb-0 pb-2 md:pb-0 border-b border-gray-400 md:border-none md:w-1/4">
          <h1 className="font-bold md:text-lg mb-1">24 x 7 Support</h1>
          <ul className="text-sm space-y-2 mt-2">
            <li>+234-81-41161177</li>
            <li>mathsnet@gmail.com</li>
          </ul>
        </div>
        <div className="md:mb-0 md:w-2/4">
          <h1 className="font-bold md:text-lg mb-1">
            About {CONSTANTS.APP_NAME}
          </h1>
          <div className="space-y-4 text-xs sm:text-sm md:text-lg">
            <p>
              Mathsnet is platform that teaches all the curriculum of
              Mathematics at Primary, Secondary and A Level Mathematics.
            </p>
            <p>
              All the tutors are professionals in Mathematics with a minimum
              qualification of Master of Science in Mathematics in different
              areas of Mathematics.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 px-5 md:px-3 flex justify-center text-xs sm:text-sm md:text-lg text-center">
        <p>
          &copy;{new Date().getFullYear()}, {CONSTANTS.APP_NAME}. All Right
          Reserved. Crafted and Developed by{" "}
          <a
            className="hover:text-ascent-light text-ascent inline-block"
            href={CONSTANTS.RASTAARC.GITHUB}
            target="_blank"
          >
            Rastaarc
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
