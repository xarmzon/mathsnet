import Image from "next/image";
import Link from "next/link";
const Logo = ({ primary }) => {
  const logo = primary ? "mathsnet_logo_p.png" : "mathsnet_logo_t.png";
  return (
    <div>
      <Link href="/">
        <a>
          <Image
            priority={true}
            src={`/assets/images/${logo}`}
            height="27"
            width="100"
          />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
