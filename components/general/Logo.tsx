import Image from "next/image";
import Link from "next/link";
const Logo = ({ type = "trans" }) => {
  const logo = type === "trans" ? "mathsnet_logo_t.png" : "mathsnet_logo_p.png";
  return (
    <div>
      <Link href="/">
        <a className="h-8 w-28 object-contain">
          <img
            // priority={true}
            src={`/assets/images/${logo}`}
            height="32"
            width="112"
          />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
