import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillEditorSSR = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorProps {
  initValue?: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ onChange, initValue }: QuillEditorProps) {
  const [content, setContent] = useState(initValue ?? "");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent);
  };

  return (
    <QuillEditorSSR
      value={content}
      onChange={handleEditorChange}
      modules={quillModules}
      formats={quillFormats}
      className="w-full min-h-36 max-h[900px] mb-11"
    />
  );
}
