import React from "react";

interface HTMLRendererProps {
  htmlString: string;
}

const HTMLRenderer = ({ htmlString }: HTMLRendererProps) => {
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default HTMLRenderer;
