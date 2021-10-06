import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { menu } from "../../data/menu";
import { CONSTANTS } from "../../utils/constants";
const MenuItem = ({ miniSidebar }) => {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  const userMenu = menu.filter(
    (m) => m.for === user.userType || m.for === CONSTANTS.USER_TYPES.ALL
  );
  return (
    <div className="mt-4">
      <ul className="space-y-4">
        {userMenu.map((m) => (
          <li
            title={m.name}
            className={`pl-2 flex items-center cursor-pointer ${
              router.pathname === m.link && "bg-primary text-primary-100"
            }`}
            key={m.name}
          >
            <Link href={m.link}>
              <a
                onClick={() => miniSidebar()}
                className="flex items-center text-sm md:text-lg py-2"
              >
                <span className="inline-block mr-4 text-lg">
                  {m.icon && m.icon}
                </span>
                <span className={``}>{m.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItem;
