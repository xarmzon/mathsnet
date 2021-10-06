import {
  HiOutlineXCircle,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";

export type TypeAlert = "error" | "success" | "info";
export interface AlertProps {
  type: TypeAlert;
  children: React.ReactNode;
}

const Alert = ({ type = "info", children }: AlertProps) => {
  const color = (type) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-500 border-red-500";
        break;
      case "success":
        return "bg-green-100 text-green-500 border-green-500";
        break;
      case "info":
        return "bg-yellow-100 text-ascent border-ascent";
        break;
    }
  };

  return (
    <div
      className={`${color(type)} p-4 w-full
      border-l-4
      max-w-md
      text-xs
      md:text-sm
       mb-5
       rounded
       shadow-md
       md:shadow-lg
       flex items-center
       space-x-4`}
    >
      <span className="text-lg flex-shrink-0">
        {type === "success" ? (
          <HiOutlineCheckCircle />
        ) : type === "error" ? (
          <HiOutlineXCircle />
        ) : (
          <HiOutlineInformationCircle />
        )}
      </span>
      <p className="flex-1 gap-x-2 line-clamp-4">{children}</p>
    </div>
  );
};

export default Alert;
