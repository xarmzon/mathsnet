import dynamic from "next/dynamic";
import { useEffect } from "react";
import katex from "katex";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const modulesSnow = {
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
    ["image"],
    ["clean"],
  ],
};
const modulesBubble = {
  toolbar: [["formula", "bold", "italic", "underline", "blockquote", "clean"]],
};
const modulesProfile = {
  toolbar: [["bold", "italic", "underline", "blockquote", {list: "ordered"}, { list: "bullet" },]]
}

export interface QuillEditorProps {
  defaultValue?: string;
  value: string;
  placeholder?: string;
  theme?: "bubble" | "snow" | "profile";
  className?: string;
  onChange: (text: string, delta: any, source: string, editor: any) => void;
}

const QuillEditor = (props: QuillEditorProps) => {
  useEffect(() => {
    if (katex) window.katex = katex;
  }, []);
  return (
    <ReactQuill
      value={props.value}
      onChange={(text: string, delta: any, source: string, editor: any) => {
        return props.onChange(text, delta, source, editor);
      }}
      placeholder={props.placeholder}
      modules={
        props.theme && props.theme === "bubble" ? modulesBubble : props.theme === "profile"?  modulesProfile: modulesSnow
      }
      //theme={props.theme ? props.theme : "snow"}
      className={props.className ? props.className : ""}
    />
  );
};

export default QuillEditor;
