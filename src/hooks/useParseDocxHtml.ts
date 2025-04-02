import { useState } from "react";
import { DEFAULT_WORD_LAYOUT } from "@/utils/constants";
import { useEffect } from "react";
import { parseDocxPageLayout } from "@/components/ui/DocViewer/helpers";
import { createScopedCss } from "@/components/ui/DocViewer/helpers";
import DOMPurify from "dompurify";

export function useParseDocxHtml(html: string | undefined) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [docData, setDocData] = useState({
    styles: "",
    content: "",
    layout: DEFAULT_WORD_LAYOUT,
  });

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (!html) {
      setDocData({
        styles: "",
        content: "",
        layout: DEFAULT_WORD_LAYOUT,
      });
      setError("No content found");
      setIsLoading(false);
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const styleElements = doc.querySelectorAll("style");
      const styles = Array.from(styleElements)
        .map((style) => createScopedCss(style))
        .join("\n");

      const layout = parseDocxPageLayout(styles, DEFAULT_WORD_LAYOUT);

      const wordSection = doc.body.querySelector(".WordSection1");
      const content = wordSection ? wordSection.outerHTML : doc.body.innerHTML;

      const sanitizedContent = DOMPurify.sanitize(content);

      setDocData({
        styles,
        content: sanitizedContent,
        layout,
      });
    } catch (err) {
      console.error("Error parsing DOCX HTML", err);
      setError("Failed to parse document content");
      setDocData({
        styles: "",
        content: "",
        layout: DEFAULT_WORD_LAYOUT,
      });
    } finally {
      setIsLoading(false);
    }
  }, [html]);

  return { docData, error, isLoading };
}
