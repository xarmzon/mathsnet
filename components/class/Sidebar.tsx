import React from "react";
import Link from "next/link";
import { IClassData } from "../../pages/[class_slug]";

export interface ISidebar {
  showMobileTopicsNav: boolean;
  classData: IClassData;
  current?: string;
}

const Sidebar = ({ showMobileTopicsNav, classData, current }: ISidebar) => {
  return (
    <div
      className={`overflow-hidden z-40 md:z-auto ${
        showMobileTopicsNav
          ? "fixed top-[60px] left-0 bottom-0 w-[70%] shadow-md"
          : "w-0"
      } bg-gray-50 md:pb-20 text-primary md:bg-gray-100 md:text-primary md:min-h-[400px] md:max-h-[200px] md:block md:w-[34%] transition duration-700`}
    >
      <div className="h-full space-y-3 ">
        <h4 className="px-5 mt-5 md:text-lg md:font-bold">Class Topics </h4>
        <ul className="h-full overflow-y-auto divide-y divide-gray-300 md:divide-primary-200 scrollbar scrollbar-thin hover:scrollbar-thumb-primary">
          {classData.topics && classData.topics?.length > 0 ? (
            classData.topics?.map((t, i) => (
              <li
                key={i}
                className={`w-full px-5 py-2 line-clamp-2 ${
                  !current || current !== t.id
                    ? "text-primary cursor-pointer"
                    : "text-slate-400"
                }`}
              >
                {!current || current !== t.id ? (
                  <Link href={`/${classData.slug}/${t.slug}`}>
                    <a className="flex">{t.title}</a>
                  </Link>
                ) : (
                  t.title
                )}
              </li>
            ))
          ) : (
            <li className="px-5 italic text-red-600">No Topic</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
