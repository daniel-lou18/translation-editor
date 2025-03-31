import { useEffect, useState } from "react";

export function useViewer(content: string | null) {
  const [pages, setPages] = useState<number>(0);

  useEffect(() => {
    if (!content) return;

    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Find all page breaks
    const pages = tempDiv.querySelectorAll(".page");

    setPages(pages.length);
  }, [content]);

  return {
    pages,
    setPages,
  };
}
