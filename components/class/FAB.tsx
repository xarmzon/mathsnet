import React from "react";
import { FiBookOpen, FiX } from "react-icons/fi";

export interface IFAB {
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const FAB = ({ toggle, show }: IFAB) => {
  return (
    <span
      onClick={() => toggle((prev) => !prev)}
      className="cursor-pointer z-50 md:hidden fixed bottom-4 right-2 shadow-lg h-10 w-10 rounded-full bg-ascent-light text-primary flex items-center justify-center"
    >
      {show ? <FiX className="text-xl" /> : <FiBookOpen className="text-xl" />}
    </span>
  );
};

export default FAB;
