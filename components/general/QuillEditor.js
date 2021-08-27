import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    [{ size: ["small", false, "large"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["formula"],
    ["clean"],
  ],
};

const QuillEditor = (props) => {
  return (
    <ReactQuill
      value={props.value}
      onChange={(e) => props.onChange}
      placeholder={props.placeholder}
      modules={modules}
    />
  );
};

export default QuillEditor;
