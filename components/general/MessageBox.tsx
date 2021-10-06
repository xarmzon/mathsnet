export interface MessageBoxProps {
  msg: string;
  type?: "error" | "success" | "none";
  show?: boolean;
}

const MessageBox = ({ msg, type = "none", show = false }: MessageBoxProps) => {
  const type_ = (type) => {
    switch (type) {
      case "error":
        return "text-red-600";

      case "success":
        return "text-green-600";

      default:
        return "";
    }
  };
  return (
    <>
      {show && (
        <span className={`mt-1 text-xs sm:text-sm md:text-lg ${type_(type)}`}>
          {msg}
        </span>
      )}
    </>
  );
};

export default MessageBox;
